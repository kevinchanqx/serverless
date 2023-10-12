import { type Post, type RetrievePostsResponseDTO } from './retrieve-posts.dto'
import { type IRetrievePostsResponse } from '@services/posts/adapters/secondary/middleware/JSONPlaceholder'

export const RetrievePostsMapper = {
  toResponseDTO: (data: IRetrievePostsResponse[]): RetrievePostsResponseDTO => {
    const posts: Post[] = data.map((d) => ({
      content: {
        body: d.body,
        title: d.title
      },
      id: d.id,
      user: {
        id: d.userId
      }
    }))

    return {
      posts
    }
  }
}
