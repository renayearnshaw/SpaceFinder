import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { postSpaces } from "./postSpaces.js";

// The DB client is a module-level variable. It lives in the execution evironment, outside the handler.
// It is intialised on a cold start, and persists across warm starts.
const dbClient = new DynamoDBClient({}); // initialized once per environment

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  try {
    switch (event.httpMethod) {
      case "POST":
        return postSpaces(event, dbClient);
      case "GET":
        return {
          statusCode: 200,
          body: JSON.stringify(`Received request with method: GET`),
        };
      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Method not allowed" }),
        };
    }
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
