import { Api, StackContext, Function } from "sst/constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";

export function ExampleStack({ stack }: StackContext) {
  // Create the HTTP API

  const installPkgLayer = new lambda.LayerVersion(
    stack,
    `api-installer-layer`,
    {
      code: lambda.Code.fromAsset(path.resolve("python.zip")),
      compatibleRuntimes: [
        lambda.Runtime.PYTHON_3_9,
        lambda.Runtime.NODEJS_16_X,
      ],
      description: "PipInstaller",
    }
  );

  const makeHandler = (id: string, filePath: string, handler: string) => {
    const lambdaFunction = new Function(stack, id, {
      handler: `${filePath}${handler}`,
      runtime: "python3.9",
      layers: [
        "arn:aws:lambda:us-east-1:770693421928:layer:Klayers-p39-numpy:10",
      ],
      python: {},
    });
    //lambdaFunction.addLayers(installPkgLayer);
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
