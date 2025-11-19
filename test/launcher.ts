import { handler } from "../src/services/handler.js";

// Run the lambda function locally so that we can debug it
handler(
  {
    httpMethod: "POST",
    body: JSON.stringify({ location: "Rome" }),
  } as any,
  {} as any
);
