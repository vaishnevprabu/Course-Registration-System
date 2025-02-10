import express from 'express';
import { AuthController } from '../controllers/AuthController';

const router = express.Router();
const authController = new AuthController();


router.post('/register', async (req, res, next) => {
  try {
    await authController.createAdmin(req, res);
  } catch (error) {
    next(error);
  }
});


router.post('/login', async (req, res, next) => {
  try {
    await authController.loginAdmin(req, res); 
  } catch (error) {
    next(error);
  }
});

export default router;
