/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/first */
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import './database';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import tokenrRoutes from './routes/tokenRoutes';
import alunoRoutes from './routes/alunoRoutes';
import fotoRoutes from './routes/fotoRoutes';

const whitlist = [
  'http://192.168.1.4',
  'http://localhost:3000',
];

const corsOptions = {
  origin(origin, callback) {
    if (whitlist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('not aloweed '));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenrRoutes);
    this.app.use('/alunos/', alunoRoutes);
    this.app.use('/foto/', fotoRoutes);
  }
}

export default new App().app;
