import { type RetrievePostsFunction, makeRetrievePosts } from './retrieve-posts'

interface IMiddlewareForJSONPlaceholder {
  retrievePosts: RetrievePostsFunction
}

export class MiddlewareForJSONPlaceholder implements IMiddlewareForJSONPlaceholder {
  public retrievePosts = makeRetrievePosts()
}

export const middleware = new MiddlewareForJSONPlaceholder()
