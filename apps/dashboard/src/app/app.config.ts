import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TasksComponent } from './pages/tasks/tasks.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'tasks', component: TasksComponent },
    ])
  ]
};
