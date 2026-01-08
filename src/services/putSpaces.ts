import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { JsonError, parseJSON, validateSpace } from './utils/utils';
import { Space } from './model/Space';

export async function putSpaces(
  event: APIGatewayProxyEvent,
  dbDocumentClient: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> {
  try {
    if (event.queryStringParameters) {
      const id = event.queryStringParameters.id;
      if (id) {
        if (event.body) {
          const item = parseJSON(event.body!) as Space;
          item.id = id;

          // Validate that the item contains all required fields
          const validationResult = validateSpace(item);
          if (!validationResult.success) {
            return {
              statusCode: 400,
              body: JSON.stringify({ message: validationResult.error.message }),
            };
          }

          // Build update expression dynamically to handle optional photoUrl
          const updateExpressions: string[] = ['#loc = :loc', '#name = :name'];
          const expressionAttributeNames: Record<string, string> = {
            '#loc': 'location',
            '#name': 'name',
          };
          const expressionAttributeValues: Record<string, string> = {
            ':loc': item.location,
            ':name': item.name,
          };

          if (item.photoUrl !== undefined) {
            updateExpressions.push('#photoUrl = :photoUrl');
            expressionAttributeNames['#photoUrl'] = 'photoUrl';
            expressionAttributeValues[':photoUrl'] = item.photoUrl;
          }

          const command = new UpdateCommand({
            TableName: process.env.TABLE_NAME,
            Key: { id },
            UpdateExpression: `SET ${updateExpressions.join(', ')}`,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'ALL_NEW',
          });

          const result = await dbDocumentClient.send(command);
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
      body: JSON.stringify({
        message: error instanceof Error ? error.message : 'Internal server error',
      }),
    };
  }
}
