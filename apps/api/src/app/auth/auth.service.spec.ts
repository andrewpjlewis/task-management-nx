import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { User, Role } from '../entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'test' })],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('login returns a token', async () => {
    const user: User = {
      id: 1,
      email: 'test@test.com',
      name: 'Test',
      password: 'password',
      role: Role.ADMIN,
      organization: null,
    };
    const token = await service.login(user);
    expect(token.access_token).toBeDefined();
  });
});
