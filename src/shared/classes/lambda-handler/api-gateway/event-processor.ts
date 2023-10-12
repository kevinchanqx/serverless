import { createHttpError } from '@shared/http/errors'
import { type APIGatewayProxyEvent } from '@shared/classes/controller'
import { _ } from '@shared/utils'

export type Handler = (event: APIGatewayProxyEvent) => Promise<unknown>

export interface Route {
  method: string
  path: string
  handler: Handler
}

export type StaticRoutes = Record<string, Handler>
export type DynamicRoutes = Record<
string,
Array<{
  regex: RegExp
  handler: Handler
}>
>

export class EventProcessor {
  private readonly staticRoutes: StaticRoutes = {}
  private readonly dynamicRoutes: DynamicRoutes = {}

  public constructor (private readonly routes: Route[]) {}

  public async execute (event: APIGatewayProxyEvent): Promise<unknown> {
    const { method, path } = event.requestContext.http

    this.parseRoutes()

    const handler = this.staticRoutes[`${method}.${path}`]

    if (handler != null) {
      return await handler(event)
    }

    for (const route of this.dynamicRoutes[method] ?? []) {
      const match = path.match(route.regex)

      if (match != null) {
        event.pathParameters = {
          ...match.groups,
          ...event.pathParameters
        }

        return await route.handler(event)
      }
    }

    throw createHttpError(404, `[${this.constructor.name}] Route does not exist`)
  }

  private parseRoutes (): void {
    for (const route of this.routes) {
      let { handler, method, path } = route

      if (path.endsWith('/') && path !== '/') {
        path = path.substring(0, path.length - 1)
      }

      if (!path.includes('{')) {
        this.attachStaticRoute(method, path, handler, this.staticRoutes)
      }

      this.attachDynamicRoute(method, path, handler, this.dynamicRoutes)
    }
  }

  private attachStaticRoute (method: string, path: string, handler: Handler, staticRoutes: StaticRoutes): void {
    _.set(staticRoutes, `["${method}#${path}"]`, handler)
    _.set(staticRoutes, `["${method}#${path}/]"`, handler)
  }

  private attachDynamicRoute (method: string, path: string, handler: Handler, dynamicRoutes: DynamicRoutes): void {
    const regexpDynamicParameters = /\/{([a-zA-Z]*)}/g

    path = path.replace(regexpDynamicParameters, '/(?<$1>[^/]+)')

    const regex = new RegExp(`^${path}/?$`)

    if (dynamicRoutes[method] == null) {
      _.set(dynamicRoutes, method, [])
    }

    // @ts-expect-error value has been set
    dynamicRoutes[method].push({ regex, handler })
  }
}
