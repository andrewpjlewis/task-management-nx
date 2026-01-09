import { Controller, Get, Post, Delete, Body, Param, Put, UseGuards, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from '../entities/user.entity';
import { GetUser } from '../auth/get-user.decorator';

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

  @Roles(Role.OWNER, Role.ADMIN)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<CreateTaskDto>, @GetUser() user: User) {
    return this.tasksService.update(id, dto, user);
  }
}
