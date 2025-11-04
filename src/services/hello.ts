import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { S3Client, ListBucketsCommand} from '@aws-sdk/client-s3';

// Initialise outside the lambda function so it's not created on every invocation
const s3Client = new S3Client({});

export async function handler (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

  const command = new ListBucketsCommand({});
  const response = (await s3Client.send(command)).Buckets;

  console.log(response);
  return {
    statusCode: 200,
    body: JSON.stringify(`Hello from lambda, here are your buckets: ${response?.map((bucket) => bucket.Name).join(', ')}`),
  };
}