import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store';
import { createBrowserRouter, RouterProvider } from 'react-router'
import  Home from './Pages/Home.jsx'
import Signup from './Pages/Signup.jsx'
import EditPost from "./Pages/EditPost";
import Login from './Pages/Login.jsx'
import AddPost from './Pages/AddPost.jsx'
import Post from "./Pages/Post";
import { AuthLayout } from './components/index.js'
const router =createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    children : [
      {
        path : "/",
        element : <Home/>,
      },
      {
        path : "/login",
        element :(
          <AuthLayout authentication ={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path : "/signup",
        element :(
          <AuthLayout authentication ={false}>
            <Signup />
          </AuthLayout> 
        )
      },
      {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
    </Provider>
  </StrictMode>
)
