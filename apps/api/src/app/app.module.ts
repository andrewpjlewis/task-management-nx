import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { User } from './entities/user.entity';
import { Task } from './entities/task.entity';
import { Organization } from './entities/organization.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // or 'postgres'
      database: 'data.db', // file name for SQLite
      entities: [User, Task, Organization],
      synchronize: true, // auto-create tables (good for dev/test)
    }),
    TasksModule,
    AuthModule,
    TypeOrmModule.forFeature([User, Task, Organization]), // optional in root module
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
