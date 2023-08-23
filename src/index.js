import express from "express";
import paymenteRoutes from './routes/payment.routes.js'
import { PORT } from "./config.js";
import morgan from "morgan";
import cors from 'cors';

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(paymenteRoutes);

app.listen(PORT);
console.log('Servidor funcionado en el puerto', PORT);