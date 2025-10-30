import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';

export async function handler (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  console.log(event);
  return {
    statusCode: 200,
    body: JSON.stringify(`Hello from lambda, this is the id: ${uuidv4()}`),
  };
}