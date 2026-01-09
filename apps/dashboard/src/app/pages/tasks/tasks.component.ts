import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { AuthService } from '../../services/auth.service';

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  editing?: boolean;
}

@Component({
  standalone: true,
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  imports: [CommonModule, FormsModule, DragDropModule],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle = '';
  newTaskDescription = '';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    // Example initial tasks
    this.tasks = [
      { id: 1, title: 'Buy groceries', description: 'Milk, Eggs, Bread', completed: false },
      { id: 2, title: 'Finish report', description: 'Due Monday', completed: true },
    ];
  }

  addTask() {
    if (!this.newTaskTitle.trim()) return;
    const id = this.tasks.length ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
    this.tasks.push({
      id,
      title: this.newTaskTitle,
      description: this.newTaskDescription,
      completed: false,
    });
    this.newTaskTitle = '';
    this.newTaskDescription = '';
  }

  editTask(task: Task) {
    task.editing = true;
  }

  saveTask(task: Task) {
    task.editing = false;
  }

  cancelEdit(task: Task) {
    task.editing = false;
  }

  removeTask(task: Task) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }

  toggleComplete(task: Task) {
    task.completed = !task.completed;
  }

  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  logout() {
    this.auth.logout();
  }
}
