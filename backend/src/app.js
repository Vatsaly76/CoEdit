import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import roomRoutes from './routes/room.routes.js';
import executeRoutes from './routes/execute.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/room', roomRoutes);
app.use('/api/execute', executeRoutes);

export default app;