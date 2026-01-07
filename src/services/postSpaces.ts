import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { randomUUID } from 'crypto';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { JsonError, parseJSON, validateSpace } from './utils/utils';
import { Space } from './model/Space';

export async function postSpaces(
  event: APIGatewayProxyEvent,
  dbDocumentClient: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> {
  try {
    const item = parseJSON(event.body!) as Space;
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
    if (error instanceof JsonError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: error.message }),
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error instanceof Error ? error.message : 'Internal server error'}),
    };
  }
}
