import { HttpControllerForAPIGateway, type APIGatewayProxyEvent } from '@shared/classes/controller'
import { type Result, err, ok } from '@shared/result'
import { middleware } from '@services/posts/adapters/secondary/middleware/JSONPlaceholder/middleware'
import { RetrievePosts } from './retrieve-posts.use-case'

export class RetrievePostsController extends HttpControllerForAPIGateway {
  protected async execute (req: APIGatewayProxyEvent): Promise<Result<unknown, unknown>> {
    const query = req.queryStringParameters ?? {}

    const useCase = new RetrievePosts(middleware)
    const result = await useCase.handler(query)

    if (result.isOk()) {
      return ok(result.value)
    }

    switch (result.error) {
      case 'NOT_FOUND':
        return err(this.notFound())

      default:
        break
    }

    return err(this.fail())
  }
}
