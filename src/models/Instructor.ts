import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Department } from './Department';

@Entity()
export class Instructor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  employeeId: string;

  @Column({ type: 'varchar', length: 100 })
  specialization: string;

  @ManyToOne(() => Department, (department) => department.courses)
  department: Department;
}
