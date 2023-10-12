import { type Logger } from '@shared/log'

import { type ClientError } from '../http-client'

export const errorLog = (name: string, logger: Logger) => async (error: Error | ClientError) => {
  const _logger = logger.createChild({ serviceName: name })

  if ('response' in error) {
    _logger.error('Error', {
      error: {
        ...error.toJSON()
      }
    })

    return await Promise.reject(error)
  }

  _logger.error('Error', { error })
  return await Promise.reject(error)
}
