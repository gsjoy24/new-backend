import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

// parsers
app.use(express.json());
app.use(
	cors({
		origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
		credentials: true
	})
);

// Api Call
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
	res.send({
		success: true,
		message: 'The server is running'
	});
});

// global error handler middleware
app.use(globalErrorHandler);

// not found middleware
app.use(notFound);

export default app;
