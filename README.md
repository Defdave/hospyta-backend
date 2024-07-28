# Backend API for Cross-Platform Mobile Application

This project is a backend API built with NestJS and TypeScript for a cross-platform mobile application. It handles user authentication, post creation, voting, commenting, and various other functionalities. MongoDB is used as the database, and Swagger is integrated for API documentation.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Performance Optimization](#performance-optimization)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login
- JWT-based authentication
- Create, update, delete, and retrieve posts
- Upvote and downvote posts
- Add and reply to comments
- Sort and filter posts
- Swagger API documentation

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo

2. **npm install**
   ```bash
   npm install

2. **npm install**
   ```bash
   npm install

3. **npm install**
   ```bash
   Set up environment variables:

4. **npm install**
   ```bash
   MONGO_URI=mongodb://localhost:27017/your-database
   JWT_SECRET=your_jwt_secret


## Usage

# API Endpoints

1. **Register a new user**
```bash
  POST /auth/register

2. **Login a user**
```bash
POST /auth/login

3. **Create a new post**
```bash
POST /posts

4. **Get all posts**
``bash
GET /posts

5. **Upvote a post**
```bash
POST /posts/:postId/upvote


- swagger docs link: http://localhost:3000/api

# problem faced
- I faced an authentication problem and it have not be resloved yet

# Summary about myself
- I'm a self taught software dev. I have been seeking for an intern or junior role where I can learn from inspiring devs, and gain actual work experience and i just started learning nodejs/nestjs cause of this intern i have experience with nodejs/expressjs so this task might not have be well done, unconventional as it may seem, can I get such an opportunity? I promise you would smile back at this decision because I'm a hard worker and I learn really fast.


