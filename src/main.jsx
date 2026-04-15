import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login'
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider} from 'react-router'
import { Provider } from 'react-redux'
import store from './Store/Store'
import PrivateRoute from './middleware/PrivateRoute'
import HeaderContextProvider from './components/context/HeaderContextProvider.jsx'
import SignUp from './pages/SignUp.jsx'
import BoardPage from './pages/BoardPage.jsx'
import WorkspacesPage from './pages/WorkspacePage.jsx'


  const router = createBrowserRouter([
    {
      path: '/',
      element:  <App/>,
      children:[
        {
          path:'/',
          element:<Login/>
        },
        {
          path:'/signUp',
          element:<SignUp/>
        },
        
       {
          path:'/workspace/:id',
          element:
            <PrivateRoute>
              <>
                  <BoardPage/> 
              </>
            </PrivateRoute>
        },

         {
          path:'/workspace',
          element:
            <PrivateRoute>
              <>
                  <WorkspacesPage/> 
              </>
            </PrivateRoute>
        },
  
      ]
    }
  ])



createRoot(document.getElementById('root')).render(
    <Provider store ={store}>
      <HeaderContextProvider>
      <RouterProvider router = {router}/>
      </HeaderContextProvider>
    </Provider>

)
