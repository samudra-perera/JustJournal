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
import UpdateJournal from "./components/UpdateJournal";
import CreateJournal from "./components/CreateJournal";
import ProfilePage from "./pages/ProfilePage";
import FollowerList from "./components/FollowerList";
import FollowingList from "./components/FollowingList";
import HowToComponent from "./components/HowToComponent";
import { ChakraProvider } from "@chakra-ui/react";
import UserInformation from "./pages/UserInformation";

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
      {
        path: "howToUse",
        element: <HowToComponent/>
      }
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
    index: <JournalList />,
    children: [
      {
        path: "journals",
        element: <JournalList />,
      },
      {
        path: "createJournal",
        element: <CreateJournal />,
      },
      {
        path: "updateJournal/:id",
        element: <UpdateJournal />,
      },
      {
        path: "followers/:id",
        element: <FollowerList />,
      },
      {
        path: "following/:id",
        element: <FollowingList />,
      },
      {
        path: 'userInformation',
        element: <UserInformation/>
      },
    ],
  },
  {
    path: "/createProfile",
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
  {
    path: "profiles/:id",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "following/:id",
        element: <FollowingList />,
      },
      {
        path: "followers/:id",
        element: <FollowerList />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
