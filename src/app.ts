import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import transactionRoutes from './routes/transactionRoutes';
import reportRoutes from './routes/reportRoutes';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/transactions', transactionRoutes);
app.use('/api/reports', reportRoutes);

export default app;