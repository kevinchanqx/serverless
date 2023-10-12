import { type Logger } from '@shared/log'

import { type ClientResponse } from '../http-client'

export const responseLog = (name: string, logger: Logger) => async (res: ClientResponse) => {
  const _logger = logger.createChild({ serviceName: name })

  _logger.info('Response', {
    payload: {
      headers: res.headers,
      data: res.data,
      config: res.config,
      status: res.status,
      statusText: res.statusText
    }
  })

  return await Promise.resolve(res)
}
