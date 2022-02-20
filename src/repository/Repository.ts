export default interface Repository<T, U> {
  save(item: U): Promise<void>;
  load(item: T): Promise<U>;
}
