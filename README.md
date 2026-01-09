Nx Angular Assessment Project

✨ Full-stack Nx Angular repository for the coding assessment ✨

This repository demonstrates a production-ready Angular monorepo with a frontend dashboard and backend API.

📦 Project Overview

Applications

dashboard – Angular frontend for task management

api – NestJS backend with JWT authentication

Libraries

@org/data – Shared models and types (User, Role, Organization, Task)

@org/shared-ui – Shared Angular UI components

@org/features – Dashboard feature libraries

Authentication

JWT-based login

Role-based access
- OWNER: Can do everything. (email: owner@example.com | password: password)
- ADMIN: Can create and delete tasks, manage their org. (email: admin@example.com | password: password)
- VIEWER: Can only view tasks in their organization. (email: viewer@example.com | password: password)

Test user seeded in-memory if no database is connected

Database

Supports SQLite, Postgres, or in-memory storage

🚀 Quick Start
# Clone the repository
git clone <your-fork-url>
cd <repository-name>

# Install dependencies
npm install

# Serve the frontend and backend
npx nx serve dashboard
npx nx serve api

# Build all projects
npx nx run-many -t build

# Run tests
npx nx run-many -t test

# Lint all projects
npx nx run-many -t lint


Test user for login (without database):

Email: test@example.com

Password: password

🏗️ Project Structure
apps/
├── dashboard/       # Angular frontend app
├── api/             # NestJS backend API
libs/
├── data/            # Shared models and types
├── shared-ui/       # Angular UI components
├── features/        # Dashboard feature logic
nx.json             # Nx configuration
tsconfig.json       # TypeScript config
eslint.config.mjs   # Linting rules

🔑 Authentication

Endpoint: POST http://localhost:3333/auth/login

Body:

{
  "email": "test@example.com",
  "password": "password"
}


Returns:

{
  "access_token": "<jwt_token>"
}

⚡ Nx Features

Module boundaries to enforce library dependencies

Unit testing with Jest/Vitest

E2E testing with Playwright

Project graph with npx nx graph

Code generation with Nx generators

💡 Adding Features
# Generate Angular component
npx nx g @nx/angular:component my-component --project=shared-ui

# Generate API library
npx nx g @nx/node:lib my-api-lib

📝 Notes

The project supports login without a database for assessment purposes.

To enable a real database, configure DataSource in apps/api/src/data-source.

📚 References

Nx Docs

Angular

NestJS

TypeORM