import { type ClientForJSONPlaceholder } from '../http-client'

export interface GetPostInput {
  id: string
}

export type GetPostFunction = (input: GetPostInput) => Promise<unknown>

export const makeGetPost =
  (gateway: ClientForJSONPlaceholder): GetPostFunction =>
    async (input: GetPostInput) => {
      const url = `/post/${input.id}`

      const response = await gateway.get(url)

      return response.data
    }
