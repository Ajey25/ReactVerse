import { createBrowserRouter } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthSuccess from "./pages/AuthSuccess";
import Layout from "./components/layout/Layout";
import Learn from "./pages/Learn";
import Interview from "./pages/Interview";
import CardLevels from "./components/interview/CardLevels";
import LevelPage from "./components/interview/LevelPage";
import Components from "./pages/Components";
import Projects from "./pages/Projects";
import Profile from "./components/layout/Profile";
import EditProfile from "./components/layout/EditProfile";
import Leaderboard from "./components/layout/Leaderboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/auth/success",
    element: <AuthSuccess />,
  },

  // PROTECTED ROUTES
  {
    element: <ProtectedRoute />, // gatekeeper
    children: [
      {
        element: <Layout />, // navbar + sidebar
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/learn",
            element: <Learn />,
          },
          // ADD THIS: Dynamic lesson route
          {
            path: "/lesson/:lessonId",
            element: <Learn />,
          },
          {
            path: "/interview",
            element: <Interview />,
          },
          {
            path: "/interview/:cardId",
            element: <CardLevels />,
          },
          {
            path: "/interview/:cardId/level/:levelId",
            element: <LevelPage />,
          },
          {
            path: "/projects",
            element: <Projects />,
          },
          {
            path: "/components",
            element: <Components />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/profile/edit",
            element: <EditProfile />,
          },
          {
            path: "/profile/leaderboard",
            element: <Leaderboard />,
          },
        ],
      },
    ],
  },
]);

export default router;
