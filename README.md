# P Tour Sale Management System

## Overview

This is a fullstack web application to manage:
- Users
- Categories
- Products

It includes secure login and registration using JWT authentication, role-based access control, and complete CRUD functionality for all entities.

## Tech Stack

- Frontend: React, Axios, CSS
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)

## How to Run This Project

### Backend Setup

1. Open terminal and navigate to the backend folder:
   cd backend

2. Install backend dependencies:
   npm install

3. Create a `.env` file in the backend directory based on `.env.example`:

   MONGO_URI=mongodb://localhost:27017/myapp  
   JWT_SECRET=your_jwt_secret  
   PORT=5000

4. Start the backend server:
   npm start

Make sure MongoDB is running locally on your machine.

---

### Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
   cd frontend

2. Install frontend dependencies:
   npm install

3. Start the frontend development server:
   npm start

The app will run at: http://localhost:3000

## Environment Variables

See `backend/.env.example` for the required environment variables.  
You must create a `.env` file in the `backend` directory to run the backend server.

## Demo

Demo video showing the application in use (login/register and full CRUD):  
https://drive.google.com/your-demo-video-link-here

## Author

Rethy – Final Project Submission
