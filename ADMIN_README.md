# Rio Luxury Homes Admin Panel

## Overview

This admin panel provides secure access to manage the Rio Luxury Homes website with authentication, dashboard, and user management capabilities.

## Features

- **Secure Authentication**: NextAuth.js with MongoDB backend
- **Admin Dashboard**: Overview of website statistics and recent activities
- **User Management**: Create and manage admin users
- **Protected Routes**: Middleware-based route protection
- **Responsive Design**: Mobile-friendly interface matching the main site theme

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Connection
AMPLIFY_MONGODB_URI=your_mongodb_connection_string_here

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 2. Database Setup

The admin panel uses MongoDB with the following collections:

- `admins`: Admin user accounts
- `properties`: Property listings
- `blogs`: Blog posts
- `contacts`: Contact form submissions

### 3. Seed Admin User

1. Start your development server: `npm run dev`
2. Navigate to `/admin/seed` to create the default admin user
3. Default credentials:
   - **Username**: riodadmin
   - **Password**: @Alwin143
   - **Email**: admin@rioluxuryhomes.in
   - **Role**: super_admin

### 4. Access Admin Panel

1. Navigate to `/admin/login`
2. Use the seeded credentials to log in
3. Access the dashboard at `/admin/dashboard`

## API Endpoints

### Authentication

- `POST /api/auth/signin` - Admin login
- `POST /api/auth/signout` - Admin logout

### Admin Management

- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/users` - Get all admin users
- `POST /api/admin/users` - Create new admin user
- `POST /api/admin/seed` - Seed default admin user

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── login/page.tsx          # Admin login page
│   │   ├── dashboard/page.tsx      # Admin dashboard
│   │   ├── seed/page.tsx           # Seed admin user page
│   │   └── layout.tsx              # Admin layout with providers
│   └── api/
│       ├── auth/[...nextauth]/     # NextAuth configuration
│       └── admin/                  # Admin API routes
├── lib/
│   └── mongodb.js                  # MongoDB connection
├── models/
│   └── Admin.js                    # Admin user model
└── middleware.js                   # Route protection middleware
```

## Security Features

- Password hashing with bcryptjs
- JWT-based session management
- Route protection middleware
- Input validation and sanitization
- Secure environment variable handling

## Usage

1. **Login**: Access `/admin/login` with admin credentials
2. **Dashboard**: View website statistics and recent activities
3. **User Management**: Create and manage admin accounts
4. **Logout**: Secure session termination

## Development

- Built with Next.js 15 and TypeScript
- Uses Tailwind CSS for styling
- MongoDB for data persistence
- NextAuth.js for authentication
- React Toastify for notifications

## Production Deployment

Ensure the following environment variables are set in your production environment:

- `AMPLIFY_MONGODB_URI`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

The admin panel is fully integrated with the existing Rio Luxury Homes website and maintains the same design language and user experience.
