import 'dotenv/config.js';
import './config/db.js';
import express from "express";
import indexRoutes from './routes/index.routes.js';
import { PORT } from "./config/config.js";
import morgan from "morgan";
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());
app.use('/', indexRoutes);

app.listen(PORT, () => console.log('Server running on port:', PORT));