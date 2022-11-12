export class Errors extends Error {
  constructor(msg: string) {
    super(`Errors > ${msg}`);
  }
}
