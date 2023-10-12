import { logger } from '@shared/log'
import { type APIGatewayProxyResult, type APIGatewayProxyEvent } from '@shared/classes/controller'
import { EventProcessor, type Route, type Handler } from './event-processor'
import { type Context } from '../types'
import { HttpError } from '@shared/http'

type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE'

export class LambdaHandlerForAPIGateway {
  private readonly routes: Route[] = []
  private eventProcessor?: EventProcessor

  public constructor (private readonly basePath: string) {
    this.handler = this.handler.bind(this)
  }

  public async handler (event: APIGatewayProxyEvent, context?: Context): Promise<APIGatewayProxyResult> {
    logger.info('Lambda invocation event', {
      cold_start: logger.isColdStart(),
      context,
      event
    })

    if (this.eventProcessor == null) {
      this.eventProcessor = new EventProcessor(this.routes)
    }

    try {
      const result = await this.eventProcessor.execute(event)
      return this.okResponse(result)
    } catch (error) {
      logger.error(`${this.constructor.name} | Handler`, error as Error)
      return this.errorResponse(error)
    }
  }

  private getHeaders (extras?: Record<string, string>): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      ...extras
    }
  }

  private okResponse (result: unknown): APIGatewayProxyResult {
    return {
      statusCode: 200,
      headers: this.getHeaders(),
      body: JSON.stringify(result)
    }
  }

  private errorResponse (error: unknown): APIGatewayProxyResult {
    if (error instanceof HttpError) {
      return {
        statusCode: error.statusCode,
        headers: this.getHeaders(),
        body: JSON.stringify({
          status: 'Error',
          code: error.statusCode,
          message: error.name,
          details: error.message
        })
      }
    }

    return {
      statusCode: 500,
      headers: this.getHeaders(),
      body: JSON.stringify({
        status: 'Error',
        code: 500,
        message: 'InternalServerError',
        details: 'An unexpected has happened.'
      })
    }
  }

  public addRoute (method: HttpMethods, path: string, handler: Handler): this {
    const _path = `${this.basePath}${path}`

    this.routes.push({
      method,
      path: _path,
      handler
    })

    return this
  }
}
