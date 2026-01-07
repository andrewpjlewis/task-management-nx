import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [CommonModule, RouterOutlet],
})
export class AppComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.isLoggedIn$ = this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
  }
}
