# Sports Talent Assessment Platform

## Overview

This is a full-stack web application for AI-powered sports talent assessment. The platform allows users to register, log in, input their physical information, and participate in sports performance tests. The system is designed to evaluate athletic abilities through video recording and analysis, providing comprehensive performance metrics for talent assessment purposes.

The application serves both registered users and guest users, enabling broad accessibility while maintaining user data for those who choose to create accounts. The platform focuses on sports performance evaluation through interactive testing modules with real-time feedback and scoring.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: Shadcn/ui component library with Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom CSS variables for theming, dark mode support
- **State Management**: Zustand for authentication state with persistence
- **Data Fetching**: TanStack Query for server state management and caching
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation

The frontend follows a component-based architecture with reusable UI components. Authentication state is managed globally and persists across sessions. The application supports responsive design and mobile-first approach.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Development Setup**: Hot reloading with Vite middleware in development
- **API Structure**: RESTful endpoints under `/api` prefix
- **Error Handling**: Centralized error middleware with structured error responses
- **Logging**: Request/response logging with execution time tracking

The backend uses a layered architecture with separate concerns for routing, business logic, and data access. API responses follow consistent JSON structure with success/error indicators.

### Data Storage
- **Database**: PostgreSQL configured through Drizzle ORM
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon Database serverless connection for cloud deployment
- **Fallback Storage**: In-memory storage implementation for development/testing

The database schema includes users table for authentication and user_profiles table for storing physical characteristics and sports preferences. UUID primary keys are used throughout.

### Authentication and Authorization
- **Strategy**: Session-based authentication without complex JWT implementation
- **User Types**: Regular users and guest users supported
- **Session Management**: Express sessions with PostgreSQL session store
- **Password Handling**: Basic password comparison (no hashing in current implementation)
- **Access Control**: Route-based protection with authentication state checks

Guest users can access the system without providing credentials, while registered users have persistent profiles and data.

### External Dependencies
- **Database**: Neon Database (PostgreSQL) for production data storage
- **UI Framework**: Radix UI for accessible component primitives
- **Validation**: Zod for runtime type checking and form validation
- **Development Tools**: ESBuild for production builds, TypeScript for type safety
- **Styling**: Tailwind CSS with PostCSS for processing

The application is designed for deployment on cloud platforms with serverless database connectivity. Development environment includes hot reloading and error overlays for efficient development workflow.