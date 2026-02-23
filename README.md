🚀 ReactVerse

A modern React learning and interview preparation platform designed to help developers master React concepts and prepare for technical interviews through structured practice and performance tracking.

🔗 Live Demo: https://your-vercel-link.vercel.app

📂 Repository: https://github.com/your-username/reactverse

📖 Table of Contents

Introduction

Features

Tech Stack

Installation

Configuration

Usage

Environment Variables

Screenshots

Roadmap

Contributing

Troubleshooting

Author

License

✨ Introduction

ReactVerse is a full-stack platform built to help developers:

Learn core and advanced React concepts

Practice interview-focused questions

Track performance over time

Compete via a leaderboard system

It blends structured learning with competitive motivation to create a focused and engaging React preparation experience.

🚀 Features
🔐 Secure Authentication

Google OAuth 2.0 login

Session-based authentication

Secure dashboard access

📚 React Learning Modules

Core React concepts

Hooks-focused questions

Component architecture topics

State management fundamentals

🧠 Interview Practice

Structured question sets

Concept-based challenges

Score calculation logic

Performance-based evaluation

🏆 Leaderboard System

Rank users based on scores

Compare progress with others

Paginated leaderboard

📊 Performance Dashboard

Track attempts

View score history

Monitor improvement trends

🌙 Modern UI/UX

Responsive mobile-first design

Clean interface

Smooth animations (Framer Motion)

🛠 Tech Stack
Frontend

React.js (Vite)

Tailwind CSS

Framer Motion

React Router

Backend

Node.js

Express.js

Database

MongoDB Atlas

Authentication

Google OAuth 2.0

Deployment

Vercel


⚙️ Installation
1️⃣ Clone the Repository
git clone https://github.com/your-username/reactverse.git
cd reactverse
2️⃣ Backend Setup
cd server
npm install

Create a .env file inside the server directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_session_secret

Start the backend server:

npm run dev
3️⃣ Frontend Setup
cd client
npm install
npm run dev

Open in browser:

http://localhost:5173
🔧 Configuration

Ensure the backend URL is correctly configured inside your frontend environment (e.g., VITE_API_URL if used).

Example .env (client):

VITE_API_URL=http://localhost:5000
▶️ Usage

Sign in using Google OAuth

Navigate to learning modules

Attempt interview practice questions

Track your performance on the dashboard

Climb the leaderboard 🚀

🌍 Environment Variables
Server
Variable	Description
PORT	Server running port
MONGO_URI	MongoDB Atlas connection string
GOOGLE_CLIENT_ID	Google OAuth client ID
GOOGLE_CLIENT_SECRET	Google OAuth client secret
SESSION_SECRET	Secret for session encryption
Client (Optional)
Variable	Description
VITE_API_URL	Backend API base URL
📸 Screenshots

Add images inside /screenshots directory.

/screenshots
  ├── home.png
  ├── learning.png
  ├── practice.png
  └── leaderboard.png
![Home](./screenshots/home.png)
![Learning Module](./screenshots/learning.png)
![Interview Practice](./screenshots/practice.png)
![Leaderboard](./screenshots/leaderboard.png)
📈 Roadmap

Topic-wise difficulty levels

Timed interview mode

Mock interview simulation

Concept explanations after submission

Detailed analytics dashboard

🤝 Contributing

Pull requests are welcome!

For major improvements:

Open an issue

Discuss proposed changes

Submit a pull request

🧪 Troubleshooting
❌ MongoDB Connection Error

Ensure MONGO_URI is correct

Confirm IP whitelist settings in MongoDB Atlas

❌ OAuth Not Working

Verify Google credentials

Ensure correct callback URLs

❌ CORS Issues

Confirm backend CORS configuration

Match frontend and backend URLs properly

👨‍💻 Author

Aj

🔗 LinkedIn: https://www.linkedin.com/in/ajay-prajapati-4912981b3/

📄 License

This project is licensed under the MIT License.
Feel free to use, modify, and distribute.
