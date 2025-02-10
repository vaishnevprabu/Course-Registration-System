import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Course } from './Course';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('text')
  description: string;

  @OneToMany(() => Course, (course) => course.department)
  courses: Course[];
}