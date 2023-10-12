import { logger, type Logger } from '@shared/log'
import axios, {
  type AxiosInstance,
  type AxiosError,
  type InternalAxiosRequestConfig,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CreateAxiosDefaults
} from 'axios'

import { errorHandler, errorLog, requestLog, responseLog } from './interceptors'

export type CreateClientConfig = CreateAxiosDefaults & { name: string }
export type ClientError = AxiosError
export type ClientHeaders = Record<string, string | number | boolean>
export type ClientRequestConfig = AxiosRequestConfig
export type ClientResponse = AxiosResponse
export type InternalClientRequestConfig = InternalAxiosRequestConfig

export abstract class HttpClient {
  protected readonly _client: AxiosInstance

  private readonly logger: Logger
  private readonly name: string

  public constructor (config: CreateClientConfig) {
    this._client = axios.create(config)
    this.logger = logger
    this.name = config.name ?? this.constructor.name

    this._client.interceptors.request.use(requestLog(this.name, this.logger))
    this._client.interceptors.response.use(responseLog(this.name, this.logger))
    this._client.interceptors.response.use(undefined, errorLog(this.name, this.logger))
    this._client.interceptors.response.use(undefined, errorHandler(this.name))
  }

  public abstract post (url: string, data?: unknown, config?: ClientRequestConfig): Promise<ClientResponse>

  public abstract get (url: string, config?: ClientRequestConfig): Promise<ClientResponse>

  public abstract put (url: string, data?: unknown, config?: ClientRequestConfig): Promise<ClientResponse>

  public abstract delete (url: string, config?: ClientRequestConfig): Promise<ClientResponse>
}
