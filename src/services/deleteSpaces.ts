import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {
  DeleteCommand,
  DynamoDBDocumentClient
} from '@aws-sdk/lib-dynamodb';

export async function deleteSpaces(
  event: APIGatewayProxyEvent,
  dbDocumentClient: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> {
  try {
    if (event.queryStringParameters) {
      const id = event.queryStringParameters.id;
      if (id) {
        const command = new DeleteCommand({
          TableName: process.env.TABLE_NAME,
          Key: {
            id: id,
          },
          ReturnValues: 'ALL_OLD',
        });
        const result = await dbDocumentClient.send(command);
        if (result.Attributes) {
          console.log(result.Attributes);
          return {
            statusCode: 200,
            body: JSON.stringify(result.Attributes),
          };
        } else {
          return {
            statusCode: 404,
            body: JSON.stringify({ message: `Space with id ${id} not found` }),
          };
        }
      } else {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'id must be provided' }),
        };
      }
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'id must be provided' }),
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
