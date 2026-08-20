# AI Resume Interview Platform

An AI-powered interview platform that analyzes a user's resume, generates personalized interview questions, evaluates interview performance, and provides detailed feedback and preparation guidance.

## Features

* 🔐 User registration and login with JWT authentication
* 📄 Resume upload and processing
* 🤖 AI-generated interview questions based on the user's resume
* 🎤 Technical and behavioral interview questions
* 📊 AI-powered interview performance analysis
* 📝 Detailed interview reports
* 🎯 Skill-gap identification
* 📚 Personalized interview preparation recommendations
* 🖼️ ImageKit integration for file handling
* 🔒 Protected routes and authenticated API endpoints

## Tech Stack

### Frontend

* React
* Vite
* React Router
* SCSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs

### AI & Services

* AI API integration for interview generation and evaluation
* ImageKit for file management

## Project Structure

```text
resume/
├── resume_backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   └── server.js
│
├── resume_frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   └── ...
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## How It Works

1. The user creates an account and logs in.
2. The user uploads their resume.
3. The platform processes the resume and uses AI to generate personalized interview questions.
4. The user completes the interview.
5. The AI analyzes the interview performance.
6. The platform generates a detailed report containing feedback, skill gaps, and preparation recommendations.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Debrup-Fouzdar/ai-resume-interview-platform.git
cd ai-resume-interview-platform
```

### 2. Install backend dependencies

```bash
cd resume_backend
npm install
```

### 3. Install frontend dependencies

Open another terminal:

```bash
cd resume_frontend
npm install
```

### 4. Configure environment variables

Create a `.env` file inside `resume_backend` and add the required configuration values.

Example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Add the remaining API/service credentials required by the backend.

**Never commit your `.env` file to GitHub.**

### 5. Start the backend

```bash
cd resume_backend
npm run dev
```

### 6. Start the frontend

```bash
cd resume_frontend
npm run dev
```

Open the local frontend URL provided by Vite.

## Security

Sensitive configuration values are stored in environment variables and excluded from version control using `.gitignore`.

## Future Improvements

* Real-time interview interaction
* Voice-based interview support
* More advanced resume analysis
* Interview history and progress tracking
* Additional AI-powered career recommendations
* Deployment with production-grade infrastructure

## Author

**Debrup Fouzdar**

GitHub: [Debrup-Fouzdar](https://github.com/Debrup-Fouzdar)
