import { handler } from '../src/services/handler';

// You need to set these environment variables for the lambda function to run locally using ts-node
// ie. npx ts-node test/launcher.ts
process.env.AWS_REGION = 'eu-west-1';
process.env.TABLE_NAME = 'SpaceTable-06b6e52d7889';

// Run the lambda function locally so that we can debug it
handler(
  {
    httpMethod: 'PUT',
    // body: JSON.stringify({
    //   location: "Birmingham",
    // }),
    queryStringParameters: {
      id: 'a6cb3169-3dfb-45fa-8443-f55888776701',
    },
    body: JSON.stringify({
      location: 'Somewhere new and exciting',
    }),
  } as any,
  {} as any
);
