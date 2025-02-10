import "reflect-metadata";
import express from 'express';
import dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes';
import authRoutes from './routes/authRoutes';
import { AppDataSource } from './data-source';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

let server: any;


AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  });

export { app, server };
