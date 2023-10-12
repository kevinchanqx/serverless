import { type ClientHeaders, type ClientRequestConfig, type ClientResponse, HttpClient } from '@shared/http'
import { getEnv } from '@shared/environment'

const JSONPlaceholderBaseUrl = getEnv('JSONPlaceholder_BASE_URL')

export class GatewayForJSONPlaceholder extends HttpClient {
  private static instance: GatewayForJSONPlaceholder

  private constructor () {
    super({ baseURL: JSONPlaceholderBaseUrl, name: 'GatewayForJSONPlaceholder' })
  }

  private async getHeaders (config?: ClientRequestConfig): Promise<ClientHeaders> {
    // Can get accessToken or any authorization over here
    let headers = {}

    if (config?.headers != null) {
      headers = { ...config.headers }
    }

    return {
      // Authorization: `Bearer accessToken`
      ...headers
    }
  }

  public async get (url: string, config?: ClientRequestConfig | undefined): Promise<ClientResponse> {
    const headers = await this.getHeaders(config)

    return await this._client.get(url, { ...config, headers })
  }

  public async post (url: string, data?: unknown, config?: ClientRequestConfig | undefined): Promise<ClientResponse> {
    const headers = await this.getHeaders(config)

    return await this._client.post(url, data, { ...config, headers })
  }

  public async put (url: string, data?: unknown, config?: ClientRequestConfig | undefined): Promise<ClientResponse> {
    const headers = await this.getHeaders(config)

    return await this._client.put(url, data, { ...config, headers })
  }

  public async delete (url: string, config?: ClientRequestConfig | undefined): Promise<ClientResponse> {
    const headers = await this.getHeaders(config)

    return await this._client.delete(url, { ...config, headers })
  }

  public static getInstance (): GatewayForJSONPlaceholder {
    if (this.instance == null) {
      this.instance = new GatewayForJSONPlaceholder()
      return this.instance
    }

    return this.instance
  }
}
