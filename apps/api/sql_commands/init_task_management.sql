-- Create organizations table
CREATE TABLE organizations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_org_id INT REFERENCES organizations(id) ON DELETE SET NULL
);

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('OWNER', 'ADMIN', 'VIEWER')),
    organization_id INT REFERENCES organizations(id) ON DELETE SET NULL
);

-- Create tasks table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    owner_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    organization_id INT NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Dummy Organizations
INSERT INTO organizations (name) VALUES
('Headquarters'),
('Branch A'),
('Branch B');

-- Dummy Users
-- NOTE: I would replace these password hashes with actual bcrypt hashes in a real setup
INSERT INTO users (name, email, password, role, organization_id) VALUES
('Owner User', 'owner@example.com', 'password', 'OWNER', 1),
('Admin User', 'admin@example.com', 'password', 'ADMIN', 1),
('Viewer User', 'viewer@example.com', 'password', 'VIEWER', 1);

-- Dummy Tasks
INSERT INTO tasks (title, description, owner_id, organization_id) VALUES
('Task 1', 'First task description', 1, 1),
('Task 2', 'Second task description', 2, 1),
('Task 3', 'Third task description', 3, 1);


INSERT INTO "users" (name, email, password, role) 
VALUES ('Owner', 'owner@example.com', '$2b$10$9Ko2CpPpvCb/Y87XncOK9.NzzWFKcYFkMUpS30CEYtm2UldbahBLq', 'OWNER');