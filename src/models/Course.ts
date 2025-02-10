import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import {Department} from './Department';

@Entity()
export class Course{

    @PrimaryGeneratedColumn()
    id:number;

    @Column('varchar',{ length:255})
    name:string;

    @Column('text')
    description: string;

    @Column('varchar', {length:100})
    schedule: string;

    @Column('int')
    studentCapacity: number;

    @Column('int')
    instructorCapacity: number;

    @Column('int')
    startedDate: number;

    @ManyToOne(()=> Department, (department)=> department.courses)
    department: Department;
}