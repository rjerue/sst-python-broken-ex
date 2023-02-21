import { Api, StackContext, Function } from "sst/constructs";

export function ExampleStack({ stack }: StackContext) {
  // Create the HTTP API

  const makeHandler = (id: string, filePath: string, handler: string) => {
    const lambdaFunction = new Function(stack, id, {
      handler: `${filePath}${handler}`,
      runtime: "python3.8",
      python: {
        installCommands: ["pip install -r requirements.txt"],
      },
    });
    return lambdaFunction;
  };

  const api = new Api(stack, "Api", {
    routes: {
      "GET /notes": makeHandler(
        "GetNotes",
        "packages/functions/src/",
        "list.main"
      ),
      "GET /notes/{id}": makeHandler(
        "GetNotesById",
        "packages/functions/src/",
        "get.main"
      ),
      "PUT /notes/{id}": makeHandler(
        "PutNotesById",
        "packages/functions/src/",
        "update.main"
      ),
    },
  });

  // Show API endpoint in output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
