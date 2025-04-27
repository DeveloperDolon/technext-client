# Client & Project Management System
![Docker](https://img.shields.io/badge/Docker-Containerized-blue?logo=docker)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)


A full-stack application for managing clients, projects, interactions, and reminders with dashboard analytics.

## 🐳 Docker Setup

### Prerequisites
- Docker Engine (v20.10+)
- Docker Compose (v2.0+)
- Git

## 🚀 Features

- **Client Management**: Create, view, update, and delete client records
- **Project Tracking**: Manage projects with status updates and deadlines
- **Interaction Logging**: Record emails, meetings, and calls with clients
- **Reminder System**: Set and track important deadlines
- **Dashboard Analytics**: Visual overview of key metrics
- **User Authentication**: Secure login with JWT

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React.js | Frontend framework |
| TypeScript | Type safety |
| Redux Toolkit | State management |
| React Router | Navigation |
| Tailwind CSS | Styling |
| Redux RTK query | HTTP client |
| React Hook Form | Form handling |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express | Web framework |
| TypeScript | Type safety |
| Prisma | ORM |
| PostgreSQL | Database |
| JWT | Authentication |
| Zod | Validation |

### 1. Clone Both Repositories
```bash
# Clone frontend
git clone https://github.com/DeveloperDolon/technext-client.git
cd technext-client
```

```bash
# Clone backend
git clone https://github.com/DeveloperDolon/technext-server.git 
cd technext-server

```

### 1. Run project docker container

```bash
# Then run this command for all repositories to build and run project in docker
make build
or
docker compose build

make start
or
docker compose up
```