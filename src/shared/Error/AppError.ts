export class AppError extends Error {
  public statusCode = 401;

  constructor(msg: string, statusCode = 401) {
    super(`AppError > ${msg}`);
    this.statusCode = statusCode;
  }
}
