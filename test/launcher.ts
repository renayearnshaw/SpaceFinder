import { handler } from '../src/services/handler';

// You need to set these environment variables for the lambda function to run locally using ts-node
// ie. npx ts-node test/launcher.ts
process.env.AWS_REGION = 'eu-west-1';
process.env.TABLE_NAME = 'SpaceTable-0666253221a1';

// Run the lambda function locally so that we can debug it
handler(
  {
    httpMethod: 'GET',
    headers: {
      Authorization: 'eyJraWQiOiJ1VnR3VkxJZUtEQkZtTnlpUlNtOWo1ck5vc25UZ0dJdUM0dmhJcnJ4SVFJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5Mjc1ZTQxNC1jMDExLTcwODQtYzA3Zi0zODk1YzRmOTJiZjUiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9JUDBocjJJSmMiLCJjb2duaXRvOnVzZXJuYW1lIjoiZnJlZGVhcm5zaGF3Iiwib3JpZ2luX2p0aSI6Ijk0NzhhZGQ0LTIwOWUtNGZlYS05ZWUyLTU3NTExZmY4YmVmZiIsImF1ZCI6IjE1cGk1dG1saDR1bzZncjBxNjQybXFoNzUyIiwiZXZlbnRfaWQiOiJiNjRiMGQ1Ni1mY2I2LTQ5MzMtOTcyMS1jYTI1YjMzNzRlODAiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTc2ODgzMTY3OSwiZXhwIjoxNzY4ODM1Mjc5LCJpYXQiOjE3Njg4MzE2NzksImp0aSI6ImVhNzg1YmYxLTQzYzYtNDg4ZC05NjY0LTA5MDNmN2ZmNzYyMiIsImVtYWlsIjoiZnJlZGVhcm5zaGF3QGdtYWlsLmNvbSJ9.nxr06SUyqe5BpG7JzYVTUJcpLcUQWIeyXBwLbD7sQ_r8IJ6v8YatESKJizectH7ORpDNDokljm4I6mjQorbKiaYMGM-RTDxrJ3ytV5SkPH-H9AtvzLcDQwJFtPd92QwsjVj5Pq3YtA-A2MKm0sttAoTlXcugUGELhNPvvwqktwzveIkg8PRGq_kCCZBTiJmhDJW5e2ZXXH8-LfRNWiceFUd-B3XsdnhXGaapCYYDw1OqW0joegALhSlnra6fmQZZHKRQBLxUvNculJeVAI_rf2x6acFrya2K3ygSr4zKJHx_ksKfKaPqPl-MBXp0CiXgKBSUBWwytFKSXVvtDxbcgw',
    },
    // body: JSON.stringify({
    //   location: 'Palma de Mallorca',
    //   name: 'MyLastHoliday',
    //   photoUrl:
    //     'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    // }),
    // queryStringParameters: {
    //   id: '8e2cc9c7-36d6-4b59-a398-4de9c92671c1',
    // },
  } as any,
  {} as any
).then(console.log);
