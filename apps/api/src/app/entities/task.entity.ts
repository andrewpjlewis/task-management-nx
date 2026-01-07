import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Organization } from './organization.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 }) // <-- explicit type!
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  owner: User;

  @ManyToOne(() => Organization, (org) => org.tasks, { nullable: false })
  organization: Organization;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
