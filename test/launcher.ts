import { handler } from '../src/services/handler';

// You need to set these environment variables for the lambda function to run locally using ts-node
// ie. npx ts-node test/launcher.ts
process.env.AWS_REGION = 'eu-west-1';
process.env.TABLE_NAME = 'SpaceTable-06b6e52d7889';

// Run the lambda function locally so that we can debug it
handler(
  {
    httpMethod: 'POST',
    body: JSON.stringify({
      location: 'Leeds',
      // name: 'MyHomeTown',
    }),
    // queryStringParameters: {
    //   id: '306d6f39-769a-4b29-8a86-e98c00d2b481',
    // },
  } as any,
  {} as any
).then(console.log);
