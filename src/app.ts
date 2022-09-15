import express from 'express';
import errorMiddleware from './middlewares/errorMiddleware';
import carRoute from './routes/carRoutes';
import motorCycleRoute from './routes/motorcycleRoutes';

const app = express();
app.use(express.json());

app.use('/cars', carRoute);
app.use('/motorcycles', motorCycleRoute);

app.use(errorMiddleware);

export default app;
