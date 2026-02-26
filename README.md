🚀 ReactVerse

ReactVerse is a full-stack React learning and interview preparation platform built to help developers strengthen core concepts, practice structured questions, and compete through a leaderboard-based XP system.

It combines authentication, learning modules, XP tracking, and a responsive UI into one focused platform.

✨ Core Features
🔐 Authentication

Email + password authentication

Google OAuth 2.0 login

Works both locally and on Vercel

Secure session handling

📚 Learning & Practice

React concept-based questions

Coding & theoretical practice modules

Structured scoring system

Performance tracking

⚡ XP System

XP sync logic is centralized

All XP-granting actions use a shared logic controller

Prevents inconsistent XP updates

Supports scalable XP expansion

🏆 Leaderboard

XP-based ranking

Paginated leaderboard

Mobile-friendly design

Optimized queries for performance

📱 Responsive Design

Fully responsive layout

Components page works on desktop & mobile

Tailwind CSS-based UI

Clean and modern interface

📸 Gallery
A quick look at ReactVerse in action:
<img width="1362" height="728" alt="landingpage1" src="https://github.com/user-attachments/assets/23e9cbad-68a4-46fc-9c62-ce6bdafe36ed" />
<img width="1366" height="728" alt="dashboard2" src="https://github.com/user-attachments/assets/94635046-61cf-4218-afaf-19c2de35504d" />
<img width="1366" height="724" alt="interview3" src="https://github.com/user-attachments/assets/4db759f5-3c91-4ccd-8134-da4dbfa5abc6" />
<img width="1366" height="724" alt="apti4" src="https://github.com/user-attachments/assets/d83fc35a-0548-48c5-bed7-a3d0f4f67165" />
<img width="1366" height="724" alt="coding5" src="https://github.com/user-attachments/assets/d9999aaf-ea5a-4883-967e-8b53d91378ea" />
<img width="1366" height="722" alt="reanking6" src="https://github.com/user-attachments/assets/1ec01e74-c933-43fa-89df-fecb4b9d2192" />

🛠 Tech Stack
Frontend

React.js (Vite)

Tailwind CSS

React Router

Context API

Backend

Node.js

Express.js

Database

MongoDB (Atlas ready)

Authentication

Email-based auth

Google OAuth 2.0

Deployment

Vercel

🏗 Project Structure
reactverse/
│
├── client/
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── services/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── utils/
│
├── DEPLOYMENT.md
├── README-VERCEL.md
└── README.md
⚙️ Installation

Clone the repository:

git clone https://github.com/your-username/reactverse.git
cd reactverse
🔧 Backend Setup
cd server
npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

Start backend:

npm run dev
🎨 Frontend Setup
cd client
npm install
npm run dev

Open:

http://localhost:5173
🚀 Deployment

ReactVerse is configured to work on Vercel.

For deployment steps, see:

DEPLOYMENT.md

README-VERCEL.md

🧪 Future Improvements

Add unit / integration tests for core controllers

Add rate limiting & improved error handling for auth routes

Add dark/light theme toggle UI

Expand coding questions library

Support dynamic XP weight configuration

📈 Why This Project Matters

ReactVerse isn’t just a quiz app.
It’s a structured learning system designed to:

Reinforce React fundamentals

Track measurable growth

Encourage competitive learning

Scale into a full interview prep ecosystem

🤝 Contributing

Pull requests are welcome.
For major changes, please open an issue first to discuss improvements.

Contact Us
Email: reactverseproject@gmail.com
LinkedIn: https://www.linkedin.com/in/ajay-prajapati-4912981b3/


