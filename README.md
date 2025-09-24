# TechQuest - AI-Powered Programming Challenge Platform

A modern AI-powered programming challenge platform built with Next.js, TypeScript, Tailwind CSS, and MongoDB. Generate personalized coding challenges across multiple subjects and track your progress with a built-in daily quota system.

## ✨ Features

- 🤖 **AI-Powered Challenges**: Generate programming questions using Google Gemini AI
- 🎯 **Multiple Subjects**: Data Structures, Algorithms, C++, Java, SQL, OOP, OS, DBMS, Networks
- 📊 **Difficulty Levels**: Easy, Medium, and Hard challenges
- 📈 **Progress Tracking**: Daily quotas and challenge history
- 🔐 **Secure Authentication**: Powered by Clerk
- 💾 **MongoDB Database**: Reliable data storage with Mongoose ODM
- 🎨 **Beautiful UI**: Modern design with Tailwind CSS
- 📱 **Responsive Design**: Works seamlessly on all devices
- ⚡ **Daily Quota System**: Fair usage with 5 new challenges per day per user

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with animations
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Clerk
- **AI**: Google Gemini API
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB database
- Clerk account
- Google AI API key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/techquest.git
   cd techquest
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # MongoDB
   MONGODB_URI=your_mongodb_connection_string

   # Google AI
   GOOGLE_AI_API_KEY=your_google_ai_api_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 API Routes

The application provides the following Next.js API routes:

### Challenge Management

- `POST /api/generate-challenge` - Generate a new coding challenge
- `GET /api/my-history` - Retrieve user's challenge history
- `GET /api/quota` - Check user's remaining daily quota
- `DELETE /api/delete-challenge/[id]` - Delete a specific challenge

### Webhooks

- `POST /api/webhooks/clerk` - Handle Clerk user creation events

## 🏗 Project Structure

```
techquest/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── components/        # React components
│   ├── lib/              # Utility functions
│   └── globals.css       # Global styles
├── models/               # MongoDB models
├── public/              # Static assets
└── ...config files
```

## 🎮 Usage

1. **Sign up/Sign in** using Clerk authentication
2. **Select a subject** and difficulty level
3. **Generate challenges** using AI (up to 5 per day)
4. **Track your progress** in the history section
5. **Delete completed challenges** to keep your workspace clean

## 🔧 Configuration

### MongoDB Setup

Ensure your MongoDB instance is running and accessible. The application will automatically create the necessary collections.

### Clerk Setup

1. Create a Clerk application
2. Configure authentication providers
3. Set up webhooks for user creation events

### Google AI Setup

1. Get your API key from Google AI Studio
2. Enable the Gemini API
3. Add the key to your environment variables

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powering the challenge generation
- Clerk for seamless authentication
- Vercel for hosting platform
- MongoDB for reliable data storage

---

Built with ❤️ using Next.js and modern web technologies.
