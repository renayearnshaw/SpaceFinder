import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";

export async function getSpaces(
  event: APIGatewayProxyEvent,
  dbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  try {

    if (event.queryStringParameters) {
      const id = event.queryStringParameters.id;
      if (id) {
        const command = new GetItemCommand({
          TableName: process.env.TABLE_NAME,
          Key: {
            'id': { S: id},
          },
        });
        const result = await dbClient.send(command);
        if (result.Item) {
          console.log(result.Item);
          return {
            statusCode: 200,
            body: JSON.stringify(result.Item),
          }
        } else {
          return {
            statusCode: 404,
            body: JSON.stringify({ message: `Space with id ${id} not found` }),
          };
        }
      } else {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "id is required" }),
        };
      }
    }

    const command = new ScanCommand({
      TableName: process.env.TABLE_NAME,
    });
    const result = await dbClient.send(command);
    console.log(result.Items);
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items ?? []),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify(
        error instanceof Error ? error.message : "Internal server error"
      ),
    };
  }
}
