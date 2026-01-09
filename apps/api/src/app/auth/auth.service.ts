import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { User, Role } from '../entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { Organization } from '../entities/organization.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Organization) private orgRepo: Repository<Organization>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterUserDto) {
    const existing = await this.userRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already registered');

    const hashed = await bcrypt.hash(dto.password, 10);
    // For demo: assign to default organization
    const org = await this.orgRepo.findOne({ where: { id: 1 } });

    const user = this.userRepo.create({
      name: dto.name,
      email: dto.email,
      password: hashed,
      role: Role.VIEWER,
      organization: org || null,
    });

    await this.userRepo.save(user);
    return { message: 'User registered successfully' };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { email }, relations: ['organization'] });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }
}
