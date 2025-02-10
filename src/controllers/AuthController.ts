import { Request, Response } from "express";
import { AppDataSource } from '../data-source';
import { Admin } from "../models/Admin";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthController {

    async createAdmin(req: Request , res: Response){

        const { name, email, password} = req.body;
        try {
            const adminRepo = AppDataSource.getRepository(Admin);
            const existingAdmin = await adminRepo.findOneBy({email});

            if(existingAdmin)
            {
                return res.status(400).json({message: 'Admin already exists'});
            }

            const hashedPassword = await bcrypt.hash(password,10);
            const newAdmin = adminRepo.create({name, email,password:hashedPassword});
            await adminRepo.save(newAdmin);
            return res.status(201).json({message: 'Admin created successfully'});

        } catch (error) {
            console.error("Error creating Admin:", error);
            return res.status(500).json({message: 'Error creating Admin'})
        }
    }

    async loginAdmin(req: Request, res: Response)
    {
        const {email, password} = req.body;
        try {
            const adminRepo = AppDataSource.getRepository(Admin);
            const admin = await adminRepo.findOneBy({email});
            if(!admin)
            {
                return res.status(404).json({message: 'Invalid credentials'});
            }
            const token = jwt.sign(
                {id: admin.id, email: admin.email},
                process.env.JWT_SECRET ||'secret',
                {expiresIn: '1h'}
            );
            return res.status(200).json({message: 'Login successful', token});
        } catch (error:any) {
            return res.status(500).json({message:'Error loggin in ',error: error.message});
        }
    }
}