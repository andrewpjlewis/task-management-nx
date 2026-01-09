import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { User, Role } from '../entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private taskRepo: Repository<Task>) {}

  async create(dto: CreateTaskDto, user: User): Promise<Task> {
    if (![Role.OWNER, Role.ADMIN].includes(user.role)) {
      throw new ForbiddenException('You do not have permission to create tasks');
    }
    const task = this.taskRepo.create({
      ...dto,
      owner: user,
      organization: user.organization,
    });
    return this.taskRepo.save(task);
  }

  async findAll(user: User): Promise<Task[]> {
    return this.taskRepo.find({
      where: { organization: { id: user.organization.id } },
      relations: ['owner', 'organization'],
    });
  }

  async remove(id: number, user: User): Promise<{ success: boolean }> {
    const task = await this.taskRepo.findOne({
      where: { id },
      relations: ['owner', 'organization'],
    });
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);

    if (![Role.OWNER, Role.ADMIN].includes(user.role) && task.owner.id !== user.id) {
      throw new ForbiddenException('You cannot delete this task');
    }

    await this.taskRepo.remove(task);
    return { success: true };
  }

  async update(id: number, dto: Partial<CreateTaskDto>, user: User): Promise<Task> {
    const task = await this.taskRepo.findOne({ where: { id }, relations: ['owner', 'organization'] });
    if (!task) throw new NotFoundException('Task not found');

    if (![Role.OWNER, Role.ADMIN].includes(user.role) && task.owner.id !== user.id) {
      throw new ForbiddenException('You cannot edit this task');
    }

    Object.assign(task, dto);
    return this.taskRepo.save(task);
  }
}
