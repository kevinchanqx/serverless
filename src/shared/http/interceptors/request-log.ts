import { type Logger } from '@shared/log'

import { type InternalClientRequestConfig } from '../http-client'

export const requestLog = (name: string, logger: Logger) => async (req: InternalClientRequestConfig) => {
  const _logger = logger.createChild({ serviceName: name })

  _logger.info('Request', {
    payload: {
      baseUrl: req.baseURL,
      data: req.data,
      headers: req.headers,
      method: req.method,
      params: req.params,
      url: req.url
    }
  })

  return await Promise.resolve(req)
}
