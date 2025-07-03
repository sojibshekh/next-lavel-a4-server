import express, { Application, Request, Response } from 'express';
import { bookRoutes } from './app/controllers/books.controler';
import { borrowRoutes } from './app/controllers/borrow.controler';

import cors from 'cors';

const app : Application = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'live-deploy-url']
   })
);

app.use(express.json());
app.use("/api",bookRoutes);
app.use("/api",borrowRoutes);







app.get('/', (req:Request, res:Response) => {

    res.send('Hello, Library Management!');
});



export default app;