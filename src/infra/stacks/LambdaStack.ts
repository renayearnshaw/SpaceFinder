import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function as LambdaFunction, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new LambdaFunction(this, 'HelloLambda', {
      runtime: Runtime.NODEJS_20_X,
      handler: 'hello.main',
      code: Code.fromAsset(join(__dirname, '../../services')),
    });
  }
}
