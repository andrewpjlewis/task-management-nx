import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  email = '';
  password = '';
  error: string | null = null;

  constructor(private router: Router) {}

  login() {
    if (this.email === 'admin@example.com' && this.password === 'password') {
      localStorage.setItem('token', 'dummy');
      this.router.navigate(['/tasks']);
    } else {
      this.error = 'Invalid credentials';
    }
  }
}
