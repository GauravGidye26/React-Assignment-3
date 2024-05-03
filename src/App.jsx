import './App.css';
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
import RootPage from "./pages/RootPage.jsx";
import ErrorPage from "./pages/error-page.jsx";
import DashboardPage from "./pages/DashboardPage.jsx"; 
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx"; 
import LogoutPage from "./pages/LogoutPage.jsx"; 
import { AuthProvider } from './contexts/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
		index: true,
        element: <HomePage />,
      },
      {
        path: "/login", 
        element: <LoginPage />,
      },
	     {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/dashboard', 
            element: <DashboardPage />,
          },
          {
            path: '/logout',
            element: <LogoutPage />, 
          }
        ]
      }
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
