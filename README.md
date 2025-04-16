# Trainee Management System

## Project Overview

The Trainee Management System is a comprehensive full-stack web application designed to help organizations manage their trainees efficiently. 
The system enables users to register and login, then view, add, edit, and delete trainee records through an intuitive user interface.

## Tech Stack

### Backend

> Spring Boot 3.2 - Java-based framework for creating stand-alone, production-grade applications

> MongoDB - NoSQL database for flexible, schema-less data storage

> Spring Security - Authentication and authorization framework

> JSON Web Token (JWT) - Secure API authentication mechanism

> Gradle - Build automation tool for managing dependencies and building the application

> Spring Data MongoDB - Data access layer abstraction for MongoDB

### Frontend

1. React 18 - JavaScript library for building user interfaces
   
2. Tailwind CSS - Utility-first CSS framework for rapid UI development
   
3. React Router - Library for handling routing in React applications
   
4. Axios - Promise-based HTTP client for making API requests
   
5. JWT Decode - Library for decoding JWT tokens
    
## Features

### Authentication System

Secure user registration and login

JWT-based authentication with token expiration

Persistent login sessions via localStorage

Protected routes requiring authentication

### Trainee Management

Comprehensive trainee listing with sortable columns

Detailed individual trainee profiles

Add new trainees with form validation

Edit existing trainee information

Delete trainees with confirmation prompt

### User Interface

Responsive design that works on mobile and desktop

Intuitive navigation with clearly labeled actions

Real-time feedback for user actions

Loading states for asynchronous operations

Error handling with user-friendly messages

## System Architecture

The application follows a standard 3-tier architecture:

### Presentation Layer (Frontend)

React components for UI rendering

State management using React Hooks

Axios for API communication

### Application Layer (Backend)

RESTful API endpoints in Spring Boot controllers

Business logic in service classes

JWT authentication and authorization

### Data Layer

MongoDB collections for persistent storage

Spring Data MongoDB repositories for data access


## Database Schema

Collections

### Users Collection

```
{
  _id: ObjectId,
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  roles: Array<String>
}
```

### Trainees Collection

```
{
  _id: ObjectId,
  traineeId: Number,
  name: String,
  email: String (unique)
}
```

## Installation and Setup

### Prerequisites

> Java Development Kit (JDK) 17 or higher

> Node.js and npm

> MongoDB

> Gradle


## Backend Setup

```
# Clone the repository
git clone https://github.com/yourusername/trainee-management-system.git
cd trainee-management-system

# Build and run the Spring Boot application
cd app
./gradlew bootRun
```

## Frontend Setup

```
# Navigate to the frontend directory
cd ../frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

## MongoDB Configuration

The application requires a MongoDB database. You can configure the connection in application.properties:

```
spring.data.mongodb.uri=mongodb://localhost:27017/traineedb
```

## Environment Variables (Production)

For security in production environments, configure these environment variables:

MONGODB_URI - MongoDB connection string

JWT_SECRET - Secret key for JWT token generation

JWT_EXPIRATION - Token expiration time in milliseconds

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


