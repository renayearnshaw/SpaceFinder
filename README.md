# Space Finder
This project contains code I wrote while following the [AWS & Typescript Masterclass - CDK, Serverless, React](https://www.udemy.com/course/aws-typescript-cdk-serverless-react/?couponCode=KEEPLEARNINGOCTA) course by Alex Dan.

### Description
This is a project for CDK development with TypeScript.
It provides a CRUD interface to a DynamoDB database via API Gateway endpoints.
It creates three stacks: one each for the database, API and lambda resources.

### Authentication and Authorization

This application uses AWS Cognito and AWS Amplify to handle user authentication and API authorization.

The app creates an AWS Cognito User Pool, which acts as the central user directory. Users in the pool are created externally of the app.

The app uses AWS Amplify to sign users into Cognito. After a successful login, Amplify establishes an authenticated session for the user and retrieves a JWT ID token issued by Cognito, which represents the user’s authenticated identity.

The app’s REST APIs are protected using a Cognito User Pool authorizer. Requests to these APIs must include a valid authorization token (as generated above) in the HTTP Authorization header. API Gateway automatically validates the token against the Cognito User Pool before allowing the request to reach the backend.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run test`    perform the jest unit tests
* `npm run format:check`    performs Prettier format checks on source files
* `npm run format`    performs Prettier formatting on source files
* `npx ts-node test/launcher.ts`   to run the application
* `cdk deploy --all`  deploy the stacks to your default AWS account/region
* `cdk synth`   emits the synthesized CloudFormation template
