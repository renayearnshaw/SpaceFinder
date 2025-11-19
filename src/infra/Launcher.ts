import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack.js";
import { LambdaStack } from "./stacks/LambdaStack.js";
import { ApiStack } from "./stacks/ApiStack.js";


const app = new App();
const dataStack = new DataStack(app, 'DataStack');
const lambdaStack = new LambdaStack(app, 'LambdaStack', { spacesTable: dataStack.spacesTable });
new ApiStack(app, 'ApiStack', { lambdaIntegration: lambdaStack.lambdaIntegration });