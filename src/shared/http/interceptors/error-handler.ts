import { createHttpError, type HttpError } from '../errors'
import { _ } from '@shared/utils'

import { type ClientError } from '../http-client'

export const errorHandler = (name: string) => async (error: Error | ClientError) => {
  const httpError = (statusCode: number, statusText: string = ''): HttpError => {
    return createHttpError(statusCode, statusText)
  }

  if ('response' in error) {
    const status = _.get(error.response, 'status', 500)
    const statusText = _.get(error.response, 'statusText')

    return await Promise.reject(httpError(status, `[${name}] ${statusText}`))
  }

  return await Promise.reject(httpError(500))
}
