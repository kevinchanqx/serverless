import { type Result } from '@shared/result'

export abstract class BaseController<Req> {
  public constructor () {
    this.handler = this.handler.bind(this)
  }

  protected abstract execute (req: Req): Promise<Result<unknown, unknown>>

  public async handler (req: Req): Promise<unknown> {
    const result = await this.execute(req)

    if (result.isErr()) {
      throw result.error
    }

    return result.value
  }
}
