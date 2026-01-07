import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from '@myorg/data';

const roleHierarchy: Record<Role, Role[]> = {
  [Role.OWNER]: [Role.OWNER, Role.ADMIN, Role.VIEWER],
  [Role.ADMIN]: [Role.ADMIN, Role.VIEWER],
  [Role.VIEWER]: [Role.VIEWER],
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user) return false;

    const allowedRoles = roleHierarchy[user.role] || [];
    return requiredRoles.some((role) => allowedRoles.includes(role));
  }
}
