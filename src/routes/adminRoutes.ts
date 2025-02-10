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

export default router;
