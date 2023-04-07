import express from 'express';
import logger from 'morgan';
import cors from 'cors';
const app = express();

import indexRouter from './routers/index';
import apiRouter from './routers/api'
import swagger from './utils/swagger'
import connect  from './db/db';

swagger('/swagger', app);
app.use(express.json());
app.use(logger("dev"));
app.use(cors());
app.use('/', indexRouter);
app.use('/api/v1', apiRouter);
connect();


export default app;