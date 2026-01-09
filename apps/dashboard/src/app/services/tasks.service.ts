import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = new BehaviorSubject<Task[]>([
    { id: 1, title: 'Buy groceries', completed: false, description: '' },
    { id: 2, title: 'Finish report', completed: true, description: '' },
  ]);

  getTasks(): Observable<Task[]> {
    return this.tasks.asObservable();
  }

  addTask(task: Task): Observable<Task> {
    const current = this.tasks.value;
    const newTask = { ...task, id: current.length + 1 };
    this.tasks.next([...current, newTask]);
    return of(newTask);
  }

  updateTask(task: Task): Observable<Task> {
    const current = this.tasks.value.map(t => (t.id === task.id ? task : t));
    this.tasks.next(current);
    return of(task);
  }

  removeTask(id: number): Observable<void> {
    const current = this.tasks.value.filter(t => t.id !== id);
    this.tasks.next(current);
    return of(undefined);
  }

  reorderTasks(tasks: Task[]): Observable<Task[]> {
    this.tasks.next(tasks);
    return of(tasks);
  }
}
