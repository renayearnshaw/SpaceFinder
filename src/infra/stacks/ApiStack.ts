import { Stack, StackProps } from 'aws-cdk-lib';
import { AuthorizationType, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { IUserPool } from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';
import { CognitoUserPoolsAuthorizer } from 'aws-cdk-lib/aws-apigateway';

interface ApiStackProps extends StackProps {
  lambdaIntegration: LambdaIntegration;
  userPool: IUserPool;
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    // Create the API Gateway REST API
    const api = new RestApi(this, 'SpacesApi');

    // Create a Cognito User Pool authorizer for the API
    const authorizer = new CognitoUserPoolsAuthorizer(this, 'SpacesAuthorizer', {
      cognitoUserPools: [props.userPool],
      identitySource: 'method.request.header.Authorization',
    });
    authorizer._attachToApi(api);

    // The API's must include a valid authorization token in the HTTP Authorization header
    const authOptions = {
      authorizer: authorizer,
      authorizationType: AuthorizationType.COGNITO,
    };

    // And an API route, ie. a new path /spaces is added to the root of the API
    const spacesResource = api.root.addResource('spaces');
    // Add GET, PUT, POST and DELETE methods to the resource which are integrated with a 
    // Lambda function and protected by the Cognito User Pool authorizer
    spacesResource.addMethod('GET', props.lambdaIntegration, authOptions);
    spacesResource.addMethod('POST', props.lambdaIntegration, authOptions);
    spacesResource.addMethod('PUT', props.lambdaIntegration, authOptions);
    spacesResource.addMethod('DELETE', props.lambdaIntegration, authOptions);
  }
}
