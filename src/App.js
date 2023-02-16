import { Route, Routes } from 'react-router-dom';
import './App.css';

import AuthContext from './context/auth-context';
import Login from './Components/component-auth/component-login/Login';
import Register from './Components/component-auth/component-register/Register';
import Kid from './Components/component-categories/component-kid/Kid';
import Men from './Components/component-categories/Component-men/Men';
import OurProduct from './Components/component-categories/component-ourproduct/OurProduct';
import Women from './Components/component-categories/component-women/Women';
import AddProduct from './Components/Component-dashboard/component-add-product/AddProduct';
import Aside from './Components/Component-dashboard/component-layout-dashboard/Aside';
import ListProduct from './Components/Component-dashboard/component-list-product/ListProduct';
import Profile from './Components/Component-dashboard/component-profil/Profile';
import Details from './Components/component-details/Details';
import Home from './Components/component-home/Home';
import Navbar from './Components/component-navbar/Navbar';
import { useEffect, useState } from 'react';
import Cart from './Components/component-cart/Cart';
import Order from './Components/component.order/Order';
import EditProduct from './Components/Component-dashboard/component-edit-product/EditProduct';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ForgotPassword from './Components/component-auth/component-forgot-password/ForgotPassword';
import ResetPassword from './Components/component-auth/component.reset-password/ResetPassword';
import Contact from './Components/component-contact/Contact';
import ConfirmEmail from './Components/component-auth/Component-validation/ConfirmEmail';
import OrderDetails from './Components/Component-dashboard/component-order-details/OrderDetails';
import AllOrders from './Components/Component-dashboard/component-all-orders/AllOrders';
import MyOrder from './Components/Component-dashboard/comoponent-list-order/MyOrder';
import LoggedIn from './Components/LoggedIn/LoggedIn';

function App() {
  const [user, setUser] = useState();
  useEffect(() =>{
    if(localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path='/' element = {<Home />} />
          <Route path='/details/:id' element={<Details/>}/>
          <Route path='/kid' element={<Kid/>}/>
          <Route path='/men' element={<Men/>}/>
          <Route path='/women' element={<Women/>}/>
          <Route path='/our-product' element={<OurProduct/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/order' element={<Order/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login'  element={<LoggedIn user={user}>
            <Login/>
          </LoggedIn>} />
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/confirm-email' element={<ConfirmEmail/>}/>
          <Route path='/reset-password/:token' element={<ResetPassword/>}/>
          <Route path='/admin' element={<ProtectedRoute  user={user}>
            <Aside/>
          </ProtectedRoute>} end>
                <Route path='' element = {<Profile />} end />                 
                <Route path='list-product' element = {<ProtectedRoute  user={user}><ListProduct /></ProtectedRoute>}  />                 
                <Route path='edit-product/:id' element = {<ProtectedRoute  user={user}><EditProduct /></ProtectedRoute>}  />                 
                <Route path='add-product' element = {<ProtectedRoute  user={user}><AddProduct /></ProtectedRoute>} /> 
                <Route path='all-orders' element = {<ProtectedRoute  user={user}><AllOrders /></ProtectedRoute>} /> 
                <Route path='list-order' element = {<ProtectedRoute  user={user}><MyOrder /></ProtectedRoute>} /> 
                <Route path='order-details/:id' element = {<ProtectedRoute  user={user}><OrderDetails /></ProtectedRoute>}  />                 
          </Route>
          <Route path='*' element={<div className='page404 d-flex  justify-content-center align-items-center'><h2 className='text-danger fw-semibold'>404 Page Not Found</h2></div>} />
        </Routes>
         
         
      </main>
      
    </AuthContext.Provider>
  );
}

export default App;
