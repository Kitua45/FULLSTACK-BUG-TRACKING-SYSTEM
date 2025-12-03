import { createBrowserRouter, RouterProvider } from "react-router-dom"; 

import LandingPage from "./pages/landingpage";
import Aboutpage from "./pages/Aboutpage"
import Services from "./components/Services"
import { Register } from './components/auth/Register'

function App() {
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
  ]);

  return (
    <>
      <RouterProvider router={router} />
      
    </>
  );
}

export default App;
