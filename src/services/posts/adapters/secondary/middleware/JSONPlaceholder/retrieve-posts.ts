import * as JSONPlaceholder from '@gateways/JSONPlaceholder'
import { type IRetrievePostsResponse } from './retrieve-posts.mapper'
import { mapper } from './retrieve-posts.mapper'

export type RetrievePostsFunction = () => Promise<IRetrievePostsResponse[] | null>

export const makeRetrievePosts = (): RetrievePostsFunction => async () => {
  const posts = await JSONPlaceholder.retrievePosts()

  return mapper.toJson(posts)
}
