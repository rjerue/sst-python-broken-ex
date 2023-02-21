import { SSTConfig } from "sst";
import { Api } from "sst/constructs";
import { ExampleStack } from "./stacks/ExampleStack";

export default {
  config(_input) {
    return {
      name: "rest-api-python",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Stack({ stack }) {
      const api = new Api(stack, "api", {
        defaults: {
          function: {
            runtime: "python3.9",
          },
        },
        routes: {
          "GET /": "packages/hello/lambda.handler",
        },
      });
      stack.addOutputs({
        ApiEndpoint: api.url,
      });
    });
    app.stack(ExampleStack);
  },
} satisfies SSTConfig;
