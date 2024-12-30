import {createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Route , RouterProvider , createRoutesFromElements} from 'react-router'
import { createBrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import store from './redux/store'
import Register from './pages/Auth/Register.jsx'


// Auth
import LogIn from './pages/Auth/LogIn.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path='/login' element={<LogIn />} />
      <Route path='/register' element={<Register />} />
    </Route>
  )
);


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
    

)
