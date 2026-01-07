import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { randomUUID } from 'crypto';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

export async function postSpaces(
  event: APIGatewayProxyEvent,
  dbDocumentClient: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> {
  const randomId = randomUUID();

  try {
    const item = JSON.parse(event.body!);
    item.id = randomId;
    const command = new PutCommand({
      TableName: process.env.TABLE_NAME,
      Item: item,
    });
    await dbDocumentClient.send(command);
    return {
      statusCode: 201,
      body: JSON.stringify(item),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error instanceof Error ? error.message : 'Internal server error'),
    };
  }
}
