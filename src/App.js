import './App.css';
import RootLayout from "./components/RootLayout"
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from "./components/home/Home"
import Register from "./components/register/Register"
import Login from "./components/login/Login"
import Aboutus from "./components/aboutus/Aboutus"
import Userprofile from "./components/user-profile/Userprofile"
// import Cart from "./components/cart/Cart"

function App() {
  const routerObj = createBrowserRouter([
    {
      path:"/",
      element:<RootLayout />,
      children:[
        {
          path:"/",
          element:<Home />
        },
        {
          path:"/register",
          element:<Register />
        },
        {
          path:"/login",
          element:<Login />
        },
        {
          path:"/aboutus",
          element:<Aboutus />
        },
        {
          path:"/user-profile",
          element:<Userprofile />
          // children:[
          //   {
          //     path:"/products",
          //     element:<Products />
          //   },
          //   {
          //     path:"/cart",
          //     element:<Cart />
          //   }
          // ]
        },
      ]
    }
  ])
  return (
    <div className>
      <RouterProvider router={routerObj} />
    </div>
  );
}

export default App;
