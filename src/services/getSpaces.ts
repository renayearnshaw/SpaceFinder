import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

export async function getSpaces(
  event: APIGatewayProxyEvent,
  dbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {

  try {
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
