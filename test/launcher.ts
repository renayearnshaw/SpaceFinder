import { handler } from '../src/services/handler';

// You need to set these environment variables for the lambda function to run locally using ts-node
// ie. npx ts-node test/launcher.ts
process.env.AWS_REGION = 'eu-west-1';
process.env.TABLE_NAME = 'SpaceTable-06b6e52d7889';

// Run the lambda function locally so that we can debug it
handler(
  {
    httpMethod: 'PUT',
    body: JSON.stringify({
      location: 'Palma de Mallorca',
      name: 'MyLastHoliday',
      photoUrl:
        'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    }),
    queryStringParameters: {
      id: '8e2cc9c7-36d6-4b59-a398-4de9c92671c1',
    },
  } as any,
  {} as any
).then(console.log);
