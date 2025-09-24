# TechQuest - Next.js

A modern AI-powered programming challenge platform built with Next.js, TypeScript, Tailwind CSS, and MongoDB.

## Features

- 🤖 **AI-Powered Challenges**: Generate programming questions using Google Gemini AI
- 🎯 **Multiple Subjects**: Data Structures, Algorithms, C++, Java, SQL, OOP, OS, DBMS, Networks
- 📊 **Difficulty Levels**: Easy, Medium, and Hard challenges
- 📈 **Progress Tracking**: Daily quotas and challenge history
- 🔐 **Secure Authentication**: Powered by Clerk
- 💾 **MongoDB Database**: Reliable data storage
- 🎨 **Beautiful UI**: Modern design with Tailwind CSS
- 📱 **Responsive**: Works on all devices

## Tech Stack

- **Frontend**: Next.js 14, React 18
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Authentication**: Clerk
- **AI**: Google Gemini API
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

* **Daily Quota System**: Provides a fair usage system, granting each user 5 new challenges per day.

---

## 🛠 Tech Stack

### Backend

- **FastAPI**: A modern, fast web framework for building APIs.
- **SQLAlchemy**: The SQL toolkit and Object-Relational Mapper for Python.
- **PostgreSQL**: A powerful, open-source object-relational database system.
- **Google Gemini AI**: The AI model used for generating challenges.
- **Clerk**: For user authentication and management.

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **React Router**: For declarative routing in React applications.
- **Vite**: A fast build tool and development server.

---

## 📊 API Endpoints

The application exposes the following API endpoints for managing challenges and user data.

### Challenge Management

- `POST /api/generate-challenge`: Generates a new coding challenge based on specified difficulty and subject.
- `GET /api/my-history`: Retrieves the current user's history of completed challenges.
- `GET /api/quota`: Checks the user's remaining daily challenge quota.
- `DELETE /api/delete-challenge/{challenge_id}`: Deletes a specific challenge from the user's history.
- `GET /api/test`: A health check endpoint to verify that the API is running.

### Webhooks

- `POST /webhooks/clerk`: Handles user creation events from Clerk to initialize user data in the application.

---

## 🤝 Contributing

1.  **Fork the repository**
2.  **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3.  **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4.  **Push to the branch** (`git push origin feature/amazing-feature`)
5.  **Open a Pull Request**
