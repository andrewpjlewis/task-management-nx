import { Injectable, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

export enum Role {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  VIEWER = 'VIEWER',
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string; // hashed
  role: Role;
  organization: any | null;
}

@Injectable()
export class AuthService implements OnModuleInit {
  private users: User[] = [];

  constructor(private readonly jwtService: JwtService) {}

  async onModuleInit() {
    const hashedPassword = await bcrypt.hash('password', 10);
    this.users.push({
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
      role: Role.ADMIN,
      organization: null, // keep null for now
    });
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = this.users.find(u => u.email === email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }
}