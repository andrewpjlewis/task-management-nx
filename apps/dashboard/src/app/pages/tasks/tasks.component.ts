import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';

interface Task {
  id: number;
  title: string;
  category: string;
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
export class TasksComponent {
  tasks: Task[] = [
    { id: 1, title: 'Buy groceries', category: 'Personal', completed: false },
    { id: 2, title: 'Finish report', category: 'Work', completed: true },
  ];
  newTaskTitle = '';
  newTaskCategory = 'Personal';
  categories = ['Work', 'Personal', 'Other'];
  sortBy: 'title' | 'completed' | 'category' = 'title';

  addTask() {
    if (!this.newTaskTitle.trim()) return;
    const id = this.tasks.length + 1;
    this.tasks.push({
      id,
      title: this.newTaskTitle,
      category: this.newTaskCategory,
      completed: false,
    });
    this.newTaskTitle = '';
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

  removeTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  toggleComplete(task: Task) {
    task.completed = !task.completed;
  }

  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  setSort(field: 'title' | 'completed' | 'category') {
    this.sortBy = field;
    this.tasks.sort((a, b) => {
      if (field === 'title' || field === 'category') {
        return a[field].localeCompare(b[field]);
      }
      return Number(a.completed) - Number(b.completed);
    });
  }
}
