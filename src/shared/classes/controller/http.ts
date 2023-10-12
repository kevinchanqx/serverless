import { createHttpError, type HttpError } from '@shared/http/errors'

import { BaseController } from './base'

export abstract class HttpBaseController<Req> extends BaseController<Req> {
  public constructor () {
    super()
  }

  protected notFound (message?: string): HttpError {
    return new createHttpError.NotFound(message)
  }

  protected unprocessableEntity (message?: string): HttpError {
    return new createHttpError.UnprocessableEntity(message)
  }

  protected fail (message?: string): HttpError {
    return new createHttpError.InternalServerError(message)
  }
}
