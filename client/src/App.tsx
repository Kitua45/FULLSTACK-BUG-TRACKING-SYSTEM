import { createBrowserRouter, RouterProvider } from "react-router-dom"; 

import LandingPage from "./pages/landingpage";
import Aboutpage from "./pages/Aboutpage"
import Services from "./components/Services"
import { Toaster } from 'sonner'
import { Register } from './components/auth/Register'
import { Verification } from './components/auth/verification'
import {Login } from './components/auth/login'
import AdminDashboard from './dashboards/Admindashboard/content/AdminDashboard'
import Bugs from './dashboards/Admindashboard/content/bugs/bugs';
import Bugsuser from './dashboards/userdashboard/content/bugs/bugs';
import { Users } from './dashboards/Admindashboard/content/users/Users';
import UserDashboard from './dashboards/userdashboard/content/UserDashboard'
import Projects from './dashboards/Admindashboard/content/project/project';
import Projectsuser from './dashboards/userdashboard/content/Project';
import  Profile from "../src/components/Profile/profile";
import Analytics from "../src/components/Analytics/Analyticsdashboard";
import Comments from "./dashboards/Admindashboard/content/comments/comment"
import Comment from "./dashboards/userdashboard/content/Comments"
import { CreateBugModal } from "./dashboards/userdashboard/content/bugs/reportbug"

import { CreateProject } from './dashboards/Admindashboard/content/project/createproject'
import  { useSelector } from 'react-redux'
import type { RootState } from './app/store'




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
      path: '*',
      element: <Error />
    },
    //adminn dashboard
    {
  path: '/admin/dashboard',
  element: isAdmin ? <AdminDashboard /> : <Login />,
  children: [
    { index: true, element: <Profile /> },
     {
      path: 'bugs',
      element: <Bugs />
    },
   
    {
      path: 'projects',
      element: <Projects /> 
    },
     {
      path: 'users',
      element: <Users /> 
    },

     {
      path: 'create-project',
      element: <CreateProject /> 
    },
     {
      path: 'comments',
      element: <Comments /> 
    },
      {
      path: 'analytics',
      element: <Analytics /> 
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
     { index: true, element: <Profile /> },
    {
      path: 'bugs',
      element: <Bugsuser />
    },
      {
      path: 'create-bug',
      element: <CreateBugModal />
    },
     
 {
      path: 'projects',
      element: <Projectsuser /> 
    },
     {
      path: 'comments',
      element: <Comment /> 
    },
    
    
   
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