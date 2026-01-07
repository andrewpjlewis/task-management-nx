export enum Role {
  OWNER = 'owner',
  ADMIN = 'admin',
  VIEWER = 'viewer',
}

export interface User {
  id: string;
  email: string;
  role: Role;
  orgId: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  ownerId: string;
  orgId: string;
  completed: boolean;
}
