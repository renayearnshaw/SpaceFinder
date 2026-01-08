import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBDocumentClient, GetCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

export async function getSpaces(
  event: APIGatewayProxyEvent,
  dbDocumentClient: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> {
  try {
    if (event.queryStringParameters) {
      const id = event.queryStringParameters.id;
      if (id) {
        const command = new GetCommand({
          TableName: process.env.TABLE_NAME,
          Key: {
            id: id,
          },
        });
        const result = await dbDocumentClient.send(command);
        if (result.Item) {
          console.log(result.Item);
          return {
            statusCode: 200,
            body: JSON.stringify(result.Item),
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
          body: JSON.stringify({ message: 'id is required' }),
        };
      }
    }

    const command = new ScanCommand({
      TableName: process.env.TABLE_NAME,
    });
    const result = await dbDocumentClient.send(command);
    console.log(result.Items);
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items ?? []),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error instanceof Error ? error.message : 'Internal server error',
      }),
    };
  }
}
