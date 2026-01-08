# Space Finder
This project contains code I wrote while following the [AWS & Typescript Masterclass - CDK, Serverless, React](https://www.udemy.com/course/aws-typescript-cdk-serverless-react/?couponCode=KEEPLEARNINGOCTA) course by Alex Dan.

### Description
This is a project for CDK development with TypeScript.
It provides a CRUD interface to a DynamoDB database via API Gateway endpoints.
It creates three stacks: one each for the database, API and lambda resources.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run test`    perform the jest unit tests
* `npm run format:check`    performs Prettier format checks on source files
* `npm run format`    performs Prettier formatting on source files
* `npx ts-node test/launcher.ts`   to run the application
* `cdk deploy --all`  deploy the stacks to your default AWS account/region
* `cdk synth`   emits the synthesized CloudFormation template
