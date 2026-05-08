# Saudi Services Backend

A professional, production-ready backend for a Saudi services website built with Node.js, Express, Prisma, and MongoDB.

## Features

- **Clean Architecture**: Modular structure with controllers, services, and routes.
- **Prisma ORM**: Modern database access with MongoDB.
- **JWT Authentication**: Secure login and registration with role-based access control (Admin/User).
- **Modules**:
  - **Auth**: Register, Login, Profile.
  - **Services**: CRUD for services with search and pagination.
  - **Visa Application**: Submit and track visa applications.
  - **Iqama Application**: Submit and track iqama applications.
  - **Tracker**: Public tracking of applications by ID.
  - **Contact**: Contact form submission and admin review.
  - **Admin Dashboard**: Statistics and overview of applications.
- **Security**: Helmet headers, CORS, password hashing with bcrypt, input validation with Zod.
- **Error Handling**: Centralized global error middleware and async handler.

## Tech Stack

- Node.js (ES Modules)
- Express.js
- Prisma ORM
- MongoDB Atlas
- JSON Web Token (JWT)
- bcryptjs
- Zod (Validation)
- Helmet & CORS

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB Atlas account (URL provided in .env)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up Prisma:
   ```bash
   npm run prisma:generate
   npm run prisma:db:push
   ```

### Running the App

- Development mode:
  ```bash
  npm run dev
  ```
- Production mode:
  ```bash
  npm start
  ```

## API Documentation

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Private)

### Services
- `GET /api/services` - Get all services (Search/Pagination)
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create service (Admin only)
- `PUT /api/services/:id` - Update service (Admin only)
- `DELETE /api/services/:id` - Delete service (Admin only)

### Applications
- `POST /api/visa` - Apply for Visa (Private)
- `POST /api/iqama` - Apply for Iqama (Private)
- `GET /api/tracker/:trackingId` - Track application status (Public)

### Admin
- `GET /api/admin/stats` - Dashboard stats (Admin only)
- `GET /api/visa` - View all visa applications (Admin only)
- `GET /api/iqama` - View all iqama applications (Admin only)
- `GET /api/contact` - View all contact messages (Admin only)

## Environment Variables

Create a `.env` file in the root directory:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="your_mongodb_url"
JWT_SECRET="your_secret"
JWT_EXPIRE=30d
```
