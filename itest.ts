import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello World!');
}

app.listen(4444, () => {
  console.log(`Server started on 4444 ${4444}`);
});