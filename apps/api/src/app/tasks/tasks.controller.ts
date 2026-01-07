import { Controller, Get, Post, Delete, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '@myorg/auth';
import { Roles } from '@myorg/auth';
import { Role } from '@myorg/data';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetUser } from '../auth/dto/get-user.decorator';
import { User } from '../entities/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Roles(Role.OWNER, Role.ADMIN)
  @Post()
  create(@Body() dto: CreateTaskDto, @GetUser() user: User) {
    return this.tasksService.create(dto, user);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.tasksService.findAll(user);
  }

  @Roles(Role.OWNER, Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.tasksService.remove(id, user);
  }
}
