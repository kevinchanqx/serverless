import { type GatewayForJSONPlaceholder } from '../http-client'

export type RetrievePostsFunction = () => Promise<unknown>

export const makeRetrievePosts =
  (gateway: GatewayForJSONPlaceholder): RetrievePostsFunction =>
    async () => {
      const url = '/posts'

      const response = await gateway.get(url)

      return response.data
    }
