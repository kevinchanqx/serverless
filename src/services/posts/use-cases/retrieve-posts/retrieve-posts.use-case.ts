import { err, ok, type Result } from '@shared/result'
import { IRetrievePostsUseCase, type RetrievePostsError } from './retrieve-posts.interface'
import { type RetrievePostsResponseDTO } from './retrieve-posts.dto'
import { type MiddlewareForJSONPlaceholder } from '@services/posts/adapters/secondary/middleware/JSONPlaceholder'
import { RetrievePostsMapper } from './retrieve-posts.mapper'

export class RetrievePosts extends IRetrievePostsUseCase {
  public constructor (private readonly middleware: MiddlewareForJSONPlaceholder) {
    super()
  }

  protected async execute (): Promise<Result<RetrievePostsResponseDTO, RetrievePostsError>> {
    const posts = await this.middleware.retrievePosts()

    if (posts == null) {
      return err('NOT_FOUND')
    }

    const result = RetrievePostsMapper.toResponseDTO(posts)

    return ok(result)
  }
}
