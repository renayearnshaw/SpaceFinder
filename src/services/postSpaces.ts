import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { randomUUID } from "crypto";

export async function postSpaces(
  event: APIGatewayProxyEvent,
  dbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  const randomId = randomUUID();

  try {
    const item = JSON.parse(event.body!);
    const command = new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: {
        id: {
          S: randomId,
        },
        location: {
          S: item.location,
        },
      },
    });
    const result = await dbClient.send(command);
    console.log(result);
    return {
      statusCode: 201,
      body: JSON.stringify({ id: randomId }),
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
