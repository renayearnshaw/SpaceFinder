import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { postSpaces } from './postSpaces';
import { getSpaces } from './getSpaces';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { putSpaces } from './putSpaces';
import { deleteSpaces } from './deleteSpaces';

// The DB client is a module-level variable. It lives in the execution evironment, outside the handler.
// It is intialised on a cold start, and persists across warm starts.
const dbDocumentClient = DynamoDBDocumentClient.from(new DynamoDBClient({})); // initialized once per environment

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  try {
    switch (event.httpMethod) {
      case 'POST':
        return postSpaces(event, dbDocumentClient);
      case 'GET':
        return getSpaces(event, dbDocumentClient);
      case 'PUT':
        return putSpaces(event, dbDocumentClient);
      case 'DELETE':
        return deleteSpaces(event, dbDocumentClient);
      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Method not allowed' }),
        };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error instanceof Error ? error.message : 'Internal server error'),
    };
  }
}
