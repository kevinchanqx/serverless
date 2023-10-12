export abstract class Mapper<T> {
  public abstract toJson (...data: unknown[]): T
}
