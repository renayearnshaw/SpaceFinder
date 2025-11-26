import { handler } from "../src/services/handler";

// You need to set these environment variables for the lambda function to run locally using ts-node
// ie. npx ts-node test/launcher.ts
process.env.AWS_REGION = "eu-west-1";
process.env.TABLE_NAME = "SpaceTable-06b6e52d7889";

// Run the lambda function locally so that we can debug it
handler(
  {
    httpMethod: "GET",
    queryStringParameters: {
      id: "d07663b0-cd76-4fcb-aad9-1c477bdf6633",
    },
  } as any,
  {} as any
);
