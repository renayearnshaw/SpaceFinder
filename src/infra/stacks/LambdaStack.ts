import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { join } from 'path';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

interface LambdaStackProps extends StackProps {
  spacesTable: ITable;
}

export class LambdaStack extends Stack {

  public readonly lambdaIntegration: LambdaIntegration;

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    const spacesLambda = new NodejsFunction(this, 'SpacesLambda', {
      handler: 'handler',
      entry: join(__dirname, '../../services/spaces.ts'),
      environment: {
        TABLE_NAME: props.spacesTable.tableName,
      },
    });

    // Wrap the lambda so API Gateway knows how to call it
    this.lambdaIntegration = new LambdaIntegration(spacesLambda);
  }
}
