import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import JournalList from "./components/JournalList";
import JournalPage from "./pages/JournalPage";
import ProtectedRoute from "./ProtectedRoute";
import ProfileCreation from "./pages/ProfileCreation";
import CreateJournal from "./components/CreateJournal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "journals",
        element: <JournalList />,
      },
      {
        path: "createJournal",
        element: <CreateJournal />,
      },
      // {
      //   path: 'journals/:id',
      //   element: <JournalPage />
      // },
    ],
  },
  {
    path: "/profile",
    element: <ProfileCreation />,
  },
  {
    path: "journals/:id",
    element: (
      <ProtectedRoute>
        <JournalPage />
      </ProtectedRoute>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
