import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  async login() {
    this.error = null;
    this.loading = true;

    try {
      await this.auth.login(this.email, this.password);
      this.router.navigate(['/tasks']);
    } catch (err: any) {
      this.error = err?.error?.message || 'Login failed';
    } finally {
      this.loading = false;
    }
  }
}
