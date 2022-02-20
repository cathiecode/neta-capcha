import Repository from "../repository/Repository";

export default abstract class RepositoryMock<T extends {id: string}> implements Repository<string, T> {
  memory: {[id: string]: T} = {};

  async save(item: T): Promise<void> {
    //console.log(this.constructor.name, "save", item.id);
    this.memory[item.id] = item;
  }
  async load(id: string): Promise<T> {
    //console.log(this.constructor.name, "load", id);
    const result = this.memory[id];

    if (!result) {
      throw new Error("No such item.")
    }
    return result;
  }
}
