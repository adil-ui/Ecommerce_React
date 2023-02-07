import { Route, Routes } from 'react-router-dom';
import './App.css';

import AuthContext from './context/auth-context';
import Login from './Components/component-auth/component-login/Login';
import Register from './Components/component-auth/component-register/Register';
import Kid from './Components/component-categories/component-kid/Kid';
import Men from './Components/component-categories/Component-men/Men';
import OurProduct from './Components/component-categories/component-ourproduct/OurProduct';
import Women from './Components/component-categories/component-women/Women';
import ListOrder from './Components/Component-dashboard/comoponent-list-order/ListOrder';
import AddProduct from './Components/Component-dashboard/component-add-product/AddProduct';
import Aside from './Components/Component-dashboard/component-layout-dashboard/Aside';
import ListProduct from './Components/Component-dashboard/component-list-product/ListProduct';
import Profile from './Components/Component-dashboard/component-profil/Profile';
import Details from './Components/component-details/Details';
import Footer from './Components/component-footer/Footer';
import Home from './Components/component-home/Home';
import Navbar from './Components/component-navbar/Navbar';
import { useEffect, useState } from 'react';
import Cart from './Components/component-cart/Cart';
import Order from './Components/component.order/Order';
import EditProduct from './Components/Component-dashboard/component-edit-product/EditProduct';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

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
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/order' element={<Order/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/admin' element={<ProtectedRoute  user={user}>
            <Aside/>
          </ProtectedRoute>} end>
                <Route path='' element = {<Profile />} end />                 
                <Route path='list-product' element = {<ProtectedRoute  user={user}><ListProduct /></ProtectedRoute>}  />                 
                <Route path='edit-product/:id' element = {<ProtectedRoute  user={user}><EditProduct /></ProtectedRoute>}  />                 
                <Route path='add-product' element = {<AddProduct />} /> 
                <Route path='list-order' element = {<ListOrder />} /> 
          </Route>
          <Route path='*' element={<div className='page404 d-flex  justify-content-center align-items-center'><h2 className='text-danger fw-semibold'>404 Page Not Found</h2></div>} />
        </Routes>
         
         
      </main>
      <Footer />
    </AuthContext.Provider>
  );
}

export default App;
