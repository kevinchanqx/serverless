import { makeGetPost, makeRetrievePosts } from './api'
import { GatewayForJSONPlaceholder } from './http-client'

const client = GatewayForJSONPlaceholder.getInstance()

export const getPost = makeGetPost(client)
export const retrievePosts = makeRetrievePosts(client)
