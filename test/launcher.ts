import { handler } from "../src/services/handler";

// Run the lambda function locally so that we can debug it
handler(
  {
    httpMethod: "GET",
    // body: JSON.stringify({ location: "Paris" }),
  } as any,
  {} as any
);
