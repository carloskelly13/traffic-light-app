import { StackContext, Api } from "sst/constructs"

export function API({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    routes: {
      "GET /": "server/lambda.handler",
    },
  })

  stack.addOutputs({
    ApiEndpoint: api.url,
  })
}
