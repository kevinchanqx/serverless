import { Mapper } from '@shared/classes/mapper'
import { _ } from '@shared/utils'

export interface IRetrievePostsResponse {
  userId: string
  id: string
  title: string
  body: string
}

export class RetrievePostsMapper extends Mapper<IRetrievePostsResponse[] | null> {
  private data?: unknown[]

  public toJson (...data: unknown[]): IRetrievePostsResponse[] | null {
    this.data = data

    if (this.data == null) {
      return null
    }

    return this.data.map(this.getPost)
  }

  private getPost (): IRetrievePostsResponse {
    return {
      title: _.get(this.data, 'title', ''),
      body: _.get(this.data, 'body', ''),
      id: _.get(this.data, 'id', ''),
      userId: _.get(this.data, 'userId', '')
    }
  }
}

export const mapper = new RetrievePostsMapper()
