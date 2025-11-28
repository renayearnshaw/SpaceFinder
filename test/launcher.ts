import { handler } from "../src/services/handler";

// You need to set these environment variables for the lambda function to run locally using ts-node
// ie. npx ts-node test/launcher.ts
process.env.AWS_REGION = "eu-west-1";
process.env.TABLE_NAME = "SpaceTable-06b6e52d7889";

// Run the lambda function locally so that we can debug it
handler(
  {
    httpMethod: "GET",
    // body: JSON.stringify({
    //   location: "Birmingham",
    // }),
    queryStringParameters: {
      id: "28b96b86-7147-460c-9e51-c643d21b7d7b",
    },
  } as any,
  {} as any
);
