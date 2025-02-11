import express from 'express';
import { AdminController } from '../controllers/AdminController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();
const adminController = new AdminController();

router.post('/department', authenticateToken, (req, res) => {
  adminController.createDepartment(req, res);
});

router.post('/course', authenticateToken, (req, res) => {
  adminController.createCourse(req, res);
});


import { Request, Response } from 'express';

router.get('/', (req: Request, res: Response): void => {
  res.status(200).json({ message: "Admin route is working" });
});


export default router;
