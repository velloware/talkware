declare namespace Express {
  export interface Request {
    debug: (txt: string) => void,
    user: {
      id: string;
    };
  }
}
