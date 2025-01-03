import {createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Route , RouterProvider , createRoutesFromElements} from 'react-router'
import { createBrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import store from './redux/store'
import Profile from './pages/User/Profile.jsx'
import AdminRoutes from './pages/Admin/AdminRoutes.jsx'
import UserList from './pages/Admin/UserList.jsx'
import CategoryList from './pages/Admin/CategoryList.jsx'
import ProductList from './pages/Admin/ProductList.jsx'
import ProductUpdate from './pages/Admin/ProductUpdate.jsx'
import AllProducts from './pages/Admin/AllProducts.jsx'

//Private Routes
import PrivateRoutes from './components/PrivateRoutes.jsx'


// Auth
import LogIn from './pages/Auth/LogIn.jsx'
import Register from './pages/Auth/Register.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >


      <Route path='/login' element={<LogIn />} />
      <Route path='/register' element={<Register />} />


      <Route path='' element={<PrivateRoutes />} >
        <Route path='/profile' element={<Profile />} />
      </Route>

      {/* Admin Routes */}
      <Route path='/admin' element={<AdminRoutes />} >
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="productlist/:pageNumber" element={<ProductList />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
      </Route>


    </Route>
  )
);


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
    

)
