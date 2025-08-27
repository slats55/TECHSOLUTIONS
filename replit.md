# MTV Industries - Business Website

## Overview

This is a modern business website for MTV Industries, a company offering computer repair and website design services. The application is built as a full-stack TypeScript solution with a React frontend and Express backend, featuring a contact form system and professional service showcase.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side navigation with routes for Home, Services, About, and Contact pages
- **State Management**: React Query (@tanstack/react-query) for server state management and data fetching
- **UI Framework**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **Form Handling**: React Hook Form with Zod validation for type-safe form submissions

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful endpoints with structured JSON responses
- **Data Storage**: In-memory storage implementation with interface for future database integration
- **Validation**: Zod schemas for request/response validation
- **Error Handling**: Centralized error middleware with structured error responses

### Design System
- **Color Scheme**: Dark theme with black background, space grey cards, and green accent colors
- **Typography**: Segoe UI font family for modern, professional appearance
- **Components**: Consistent UI components for service cards, pricing cards, and form elements
- **Responsive Design**: Mobile-first approach with responsive navigation and layout

### Data Models
- **Contact Submissions**: Captures name, email, service type, and message with validation
- **Users**: Basic user model prepared for future authentication features
- **Database Schema**: Drizzle ORM with PostgreSQL configuration for production deployment

### API Structure
- `POST /api/contact` - Submit contact form with validation
- `GET /api/contact/submissions` - Retrieve all contact submissions (admin functionality)

## External Dependencies

### Database & ORM
- **Drizzle ORM** with PostgreSQL dialect for database operations
- **Neon Database** serverless driver for cloud database connectivity
- **Database Configuration**: Environment-based connection with migration support

### UI & Styling
- **Radix UI** component primitives for accessible, unstyled components
- **Tailwind CSS** for utility-first styling with custom design tokens
- **Lucide React** for consistent iconography
- **Class Variance Authority** for component variant management

### Development Tools
- **Vite** for fast development and optimized production builds
- **TypeScript** for type safety across the entire stack
- **ESBuild** for server-side bundling and production builds
- **Replit Integration** with development banner and error handling plugins

### Form & Validation
- **React Hook Form** for performant form state management
- **Zod** for runtime type validation and schema definition
- **hookform/resolvers** for Zod integration with React Hook Form

### Additional Libraries
- **date-fns** for date manipulation and formatting
- **cmdk** for command palette functionality
- **embla-carousel-react** for carousel components
- **wouter** as lightweight React router alternative