import { type Result } from '@shared/result'

export type UseCaseError<T = string> = T

export abstract class UseCase<Req, Res, Err extends UseCaseError> {
  public constructor () {
    this.handler = this.handler.bind(this)
  }

  protected abstract execute (req: Req): Promise<Result<Res, Err>>

  public async handler (req: Req): Promise<Result<Res, Err>> {
    return await this.execute(req)
  }
}
