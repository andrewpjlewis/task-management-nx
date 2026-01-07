import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = new BehaviorSubject<Task[]>([
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Finish report', completed: true },
  ]);

  getTasks(): Observable<Task[]> {
    return this.tasks.asObservable();
  }

  addTask(task: Task) {
    const current = this.tasks.value;
    this.tasks.next([...current, task]);
  }

  updateTask(updated: Task) {
    const current = this.tasks.value.map(t => t.id === updated.id ? updated : t);
    this.tasks.next(current);
  }

  removeTask(id: number) {
    const current = this.tasks.value.filter(t => t.id !== id);
    this.tasks.next(current);
  }

  reorderTasks(tasks: Task[]) {
    this.tasks.next(tasks);
  }
}
