import express from 'express';
import errorMiddleware from './middlewares/errorMiddleware';
import carRoute from './routes/carRoutes';

const app = express();
app.use(express.json());

app.use('/cars', carRoute);

app.use(errorMiddleware);

export default app;
