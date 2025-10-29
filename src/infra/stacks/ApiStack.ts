import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

interface ApiStackProps extends StackProps {
  lambdaIntegration: LambdaIntegration;
}

export class ApiStack extends Stack {
    constructor(scope: Construct, id: string, props: ApiStackProps) {
      super(scope, id, props);

    // Create the API Gateway REST API
    const api = new RestApi(this, 'SpacesApi');
    // And an API route, ie. a new path /spaces is added to the root of the API
    const spacesResource = api.root.addResource('spaces');
    // Add a GET method to the resource which is integrated with a Lambda function
    spacesResource.addMethod('GET', props.lambdaIntegration);
  }
}
