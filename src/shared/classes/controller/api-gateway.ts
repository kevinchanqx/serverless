import type * as lambda from 'aws-lambda'

import { HttpBaseController } from './http'

export type APIGatewayProxyEvent = lambda.APIGatewayProxyEventV2 // V2 for HTTP, V1 for REST
export type APIGatewayProxyResult = lambda.APIGatewayProxyResultV2

export abstract class HttpControllerForAPIGateway extends HttpBaseController<APIGatewayProxyEvent> {}
