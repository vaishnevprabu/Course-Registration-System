"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminController_1 = require("../controllers/AdminController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
const adminController = new AdminController_1.AdminController();
router.post('/department', authMiddleware_1.authenticateToken, (req, res) => {
    adminController.createDepartment(req, res);
});
router.post('./course', authMiddleware_1.authenticateToken, (req, res) => {
    adminController.createCourse(req, res);
});
exports.default = router;
