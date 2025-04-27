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

## 🏗️ Project Structure
client-project-management/
├── backend/ # Backend server code
│ ├── src/
│ │ ├── controllers/ # Route controllers
│ │ ├── services/ # Business logic
│ │ ├── routes/ # API routes
│ │ ├── middlewares/ # Express middlewares
│ │ ├── utils/ # Utility functions
│ │ └── app.ts # Express app setup
│ ├── prisma/ # Database schema
│ └── package.json
│
├── frontend/ # Frontend React app
│ ├── public/
│ ├── src/
│ │ ├── components/ # Reusable components
│ │ ├── features/ # Feature modules
│ │ ├── store/ # Redux store
│ │ ├── utils/ # Utility functions
│ │ └── App.tsx # Main component
│ └── package.json
│
├── docs/ # Documentation
└── README.md # This file

