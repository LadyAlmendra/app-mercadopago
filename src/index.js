import 'dotenv/config.js';
import './config/db.js';
import express from "express";
import indexRoutes from './routes/index.routes.js';
import { PORT } from "./config/config.js";
import morgan from "morgan";
import cors from 'cors';

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(indexRoutes);

app.listen(PORT);
console.log('Servidor funcionado en el puerto', PORT);