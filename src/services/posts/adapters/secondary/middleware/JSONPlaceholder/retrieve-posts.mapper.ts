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
    this.data = _.flattenDeep(data)

    if (this.data == null) {
      return null
    }

    return this.data.map(this.getPost)
  }

  private getPost (data: unknown): IRetrievePostsResponse {
    return {
      title: _.get(data, 'title', ''),
      body: _.get(data, 'body', ''),
      id: _.get(data, 'id', ''),
      userId: _.get(data, 'userId', '')
    }
  }
}

export const mapper = new RetrievePostsMapper()
