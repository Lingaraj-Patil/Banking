# Banking Website (MERN Stack)

## Overview

This project is a full-stack banking website built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It includes features such as user authentication (login and signup), a money transfer system, and a dashboard displaying all users with a filter option.

## Features

- **User Authentication**: Secure login and signup functionality using bcrypt for password hashing.
- **Money Transfer**: Users can transfer money to other users within the system.
- **User Dashboard**: A dashboard that displays all users with filter options to search and sort data.
- **Responsive Design**: The website is designed to be fully responsive and mobile-friendly.

## Technologies Used

### Frontend
- React.js (with hooks and functional components)
- Tailwind CSS (for styling)

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose for data modeling)

### Additional Libraries
- JWT (JSON Web Tokens) for authentication
- Axios for API calls
- dotenv for environment variable management

## Installation

### Prerequisites
- Node.js (v14 or above)
- MongoDB

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/banking-website.git
   cd banking-website
   ```

2. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```

3. Install dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the following variables:
     ```env
     PORT=5000
     MONGO_URI=your-mongodb-connection-string
     ```

5. Start the backend server:
   ```bash
   cd ../backend
   npm start
   ```

6. Start the frontend development server:
   ```bash
   cd ../frontend
   npm start
   ```

7. Open your browser and visit `http://localhost:5000` to access the application.

## Video


## Screenshots

