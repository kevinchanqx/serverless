import { makeGetPost, makeRetrievePosts } from './api'
import { ClientForJSONPlaceholder } from './http-client'

const gateway = ClientForJSONPlaceholder.getInstance()

export const getPost = makeGetPost(gateway)
export const retrievePosts = makeRetrievePosts(gateway)
