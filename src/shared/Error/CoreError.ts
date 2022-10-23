export class CoreError extends Error {
  constructor(msg: string) {
    super(`CoreError > ${msg}`);
  }
}
