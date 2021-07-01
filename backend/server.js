import express from 'express';
import dotenv from 'dotenv';
import userRouter from './Router/userRouter.js';
import authRouter from './Router/authRouter.js';
import noteRouter from './Router/notesRouter.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

dotenv.config({ path: './config.env' });
import './Connection/Connection.js';
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://192.168.10.121:3000'],
    credentials: true,
  })
);

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/note', noteRouter);

app.listen(5000, () => {
  console.log('http://localhost:5000');
});
