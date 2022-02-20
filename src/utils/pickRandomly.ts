export default function pickRandomly<T>(origin: T[], length: number): T[] {
  if (length > origin.length) {
    throw new Error("No enough item(s) in original array for picking without overlapping.");
  }

  // OPTIMIZE: more efficient way
  const originItems = [...origin];
  const result = [];

  for(let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * originItems.length);
    const item = originItems.splice(index, 1)[0];
    if (item === undefined) {
      throw new Error("Logic error");
    }
    result.push(item);
  }

  return result;
}
