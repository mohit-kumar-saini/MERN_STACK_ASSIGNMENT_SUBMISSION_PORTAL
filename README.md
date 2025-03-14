# Assignment Submission Portal

A MERN stack application for managing student assignments and teacher reviews.

## Features

- User authentication for students and teachers
- Students can submit assignments with URLs
- Teachers can review and provide feedback
- Real-time status updates
- Secure JWT-based authentication
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/mohit-kumar-saini/MERN_STACK_ASSIGNMENT_SUBMISSION_PORTAL.git
cd MERN_STACK_ASSIGNMENT_SUBMISSION_PORTAL
```

2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGO_URI=mongodb://localhost:27017/assignment-portal
JWT_SECRET=your-secret-key-here
PORT=5000
```

3. Frontend Setup
```bash
cd ../frontend
npm install
```

## Running the Application

1. Start MongoDB server
```bash
mongod
```

2. Start Backend Server
```bash
cd backend
npm run dev
```

3. Start Frontend Development Server
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Usage

### For Students
1. Register as a student with enrollment number
2. Login with credentials
3. Submit assignments using valid URLs
4. Track submission status and feedback

### For Teachers
1. Register as a teacher
2. Login with credentials
3. View all student submissions
4. Accept/Reject assignments and provide feedback

## API Endpoints

### Authentication
- POST `/api/register` - Register new user
- POST `/api/login` - User login

### Assignments
- POST `/api/submit` - Submit assignment
- GET `/api/submissions` - Get student's submissions
- GET `/api/assignments` - Get all assignments (teachers only)
- PATCH `/api/assignments/:id/status` - Update assignment status

## Tech Stack

- **Frontend**: React.js, React Router, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Development**: Vite, Nodemon

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
