import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Task } from './task.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 }) 
  name: string;

  @ManyToOne(() => Organization, (org) => org.children)
  parentOrg: Organization;

  @OneToMany(() => Organization, (org) => org.parentOrg)
  children: Organization[];

  @OneToMany(() => User, (user) => user.organization)
  users: User[];

  @OneToMany(() => Task, (task) => task.organization)
  tasks: Task[];
}
