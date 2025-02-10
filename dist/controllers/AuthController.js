"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const data_source_1 = require("../data-source");
const Admin_1 = require("../models/Admin");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    createAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            try {
                const adminRepo = data_source_1.AppDataSource.getRepository(Admin_1.Admin);
                const existingAdmin = yield adminRepo.findOneBy({ email });
                if (existingAdmin) {
                    return res.status(400).json({ message: 'Admin already exists' });
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const newAdmin = adminRepo.create({ name, email, password: hashedPassword });
                yield adminRepo.save(newAdmin);
                return res.status(201).json({ message: 'Admin created successfully' });
            }
            catch (error) {
                console.error("Error creating Admin:", error);
                return res.status(500).json({ message: 'Error creating Admin' });
            }
        });
    }
    loginAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const adminRepo = data_source_1.AppDataSource.getRepository(Admin_1.Admin);
                const admin = yield adminRepo.findOneBy({ email });
                if (!admin) {
                    return res.status(404).json({ message: 'Invalid credentials' });
                }
                const token = jsonwebtoken_1.default.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
                return res.status(200).json({ message: 'Login successful', token });
            }
            catch (error) {
                return res.status(500).json({ message: 'Error loggin in ', error: error.message });
            }
        });
    }
}
exports.AuthController = AuthController;
