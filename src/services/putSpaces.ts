import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { JsonError, parseJSON } from './utils/utils';

export async function putSpaces(
  event: APIGatewayProxyEvent,
  dbDocumentClient: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> {
  try {
    if (event.queryStringParameters) {
      const id = event.queryStringParameters.id;
      if (id) {
        if (event.body) {
          const newLocation = parseJSON(event.body).location as string;
          if (!newLocation) {
            return {
              statusCode: 400,
              body: JSON.stringify({ message: 'location is required' }),
            };
          }
          const command = new UpdateCommand({
            TableName: process.env.TABLE_NAME,
            Key: { id },
            UpdateExpression: 'SET #loc = :loc',
            ExpressionAttributeNames: {
              '#loc': 'location',
            },
            ExpressionAttributeValues: {
              ':loc': newLocation,
            },
            ReturnValues: 'ALL_NEW',
          });

          const result = await dbDocumentClient.send(command);
          console.log(result.Attributes);
          return {
            statusCode: 200,
            body: JSON.stringify(result.Attributes),
          };
        } else {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: 'body is required' }),
          };
        }
      } else {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'id is required' }),
        };
      }
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'query string parameters are required',
        }),
      };
    }
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
