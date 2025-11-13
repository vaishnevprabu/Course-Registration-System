import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  studentId: string;

  @Column({ type: 'varchar', length: 100 })
  major: string;

  @Column({ type: 'int', default: 1 })
  yearLevel: number;
}
