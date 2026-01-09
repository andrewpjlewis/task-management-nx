import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Task } from './task.entity';
import { Organization } from './organization.entity';

// Export Role enum so other files can import it
export enum Role {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  VIEWER = 'VIEWER',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  role: Role;

  @ManyToOne(() => Organization, (org) => org.users)
  organization: Organization | null;

  @OneToMany(() => Task, (task) => task.owner)
  tasks: Task[];
}
