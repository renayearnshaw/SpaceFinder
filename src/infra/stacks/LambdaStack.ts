import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function as LambdaFunction, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';

export class LambdaStack extends Stack {

  public readonly lambdaIntegration: LambdaIntegration;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const helloLambda = new LambdaFunction(this, 'HelloLambda', {
      runtime: Runtime.NODEJS_20_X,
      handler: 'hello.main',
      code: Code.fromAsset(join(__dirname, '../../services')),
    });

    // Wrap the lambda so API Gateway knows how to call it
    this.lambdaIntegration = new LambdaIntegration(helloLambda);
  }
}
