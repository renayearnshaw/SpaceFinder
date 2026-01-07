import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { randomUUID } from 'crypto';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { validateSpace } from './utils/utils';
import { Space } from './model/Space';

export async function postSpaces(
  event: APIGatewayProxyEvent,
  dbDocumentClient: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> {
  try {
    const item = JSON.parse(event.body!) as Space;
    item.id = randomUUID();

    // Validate that the item contains all required fields
    const result = validateSpace(item);
    if (!result.success) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: result.error.message }),
      };
    }

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
