import { Api, StackContext } from "sst/constructs";

export function ExampleStack({ stack }: StackContext) {
  // Create the HTTP API

  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        runtime: "python3.9",
      },
    },
    routes: {
      "GET /notes": "packages/functions/list.main",
      "GET /notes/{id}": "packages/functions/get.main",
      "PUT /notes/{id}": "packages/functions/update.main",
    },
  });

  // Show API endpoint in output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
