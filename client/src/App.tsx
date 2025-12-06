import { createBrowserRouter, RouterProvider } from "react-router-dom"; 

import LandingPage from "./pages/landingpage";
import Aboutpage from "./pages/Aboutpage"
import Services from "./components/Services"
import { Toaster } from 'sonner'
import { Register } from './components/auth/Register'
import { Verification } from './components/auth/verification'
import {Login } from './components/auth/login'
import AdminDashboard from './dashboards/Admindashboard/content/AdminDashboard'
import UserDashboard from './dashboards/userdashboard/content/UserDashboard'
import  { useSelector } from 'react-redux'
import type { RootState } from './app/store'

import { Profile } from './components/Profile/profile'
import Error from './components/Error'

function App() {
  const isAdmin = useSelector((state: RootState) => state.user.user?.role === 'admin')
  const isUser = useSelector((state: RootState) => state.user.user?.role === 'user')
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },

     {
      path: "/about",
      element: <Aboutpage />,
    },
     {
      path: "/services",
      element: <Services />,
    },
       {
      path: "/register",
      element: <Register />,
    },
    {
      path: '/verify',
      element: <Verification />
    },
    {
      path: '/login',
      element: <Login />
    },
     {
          path: 'profile',
          element: <Profile />
        },
        {
      path: '*',
      element: <Error />
    },
    //adminn dashboard
    {
  path: '/admin/dashboard',
  element: isAdmin ? <AdminDashboard /> : <Login />,
  children: [
    {
      path: 'bugs',
      element: <h1>Our Bugs</h1>
    },
    {
      path: 'projects',
      element: <h1>Our Projects</h1>
    },
    {
      path: 'users',
      element: <h1>Our Users</h1>
    },
    {
      path: 'profile',
      element: <h1>Your Profile</h1>
    },
    {
      path: 'analytics',
      element: <h1>Our Analytics</h1>
    }
  ]
},


//user dashboard 
 
  {
  path: '/user/dashboard',
  element: isUser ? <UserDashboard /> : <Login />,
  children: [
    {
      path: 'bugs',
      element: <h1>Our Bugs</h1>
    },
    {
      path: 'projects',
      element: <h1>Our Projects</h1>
    },
    
    {
      path: 'profile',
      element: <h1>Your Profile</h1>
    }
   
  ]
}


  ])
      
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position='top-right' richColors />

    </>
  )
}

export default App;
