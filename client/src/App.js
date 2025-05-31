import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import AboutDeveloper from './pages/about-developer/AboutDeveloper';
import Error from './pages/error/Error';
import Cart from './pages/cart/Cart';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import ProductDetails from './pages/product/ProductDetails';
import { ToastContainer } from 'react-toastify';
import AdminIndex from './pages/admin/AdminIndex';
import Users from './pages/admin/Users';
import Admins from './pages/admin/Admins';
import ShowProducts from './pages/admin/products/ShowProducts';

function App() {
  return (
    <>
    <ToastContainer />
      <Routes>
        <Route exact path='/' element = {<Home />} />
        <Route path='/about-developer' element = {<AboutDeveloper />} />
        <Route path='/login' element = {<Login />} />
        <Route path='/signup' element = {<Signup />} />
        <Route path='/cart' element = {<Cart />} />
        <Route path='/product-details/:id' element = {<ProductDetails />} />
        <Route path='/admin' element = {<AdminIndex />}>
          <Route path='users' element={<Users />} />
          <Route path='admins' element={<Admins />} />
          <Route path='products' element={<ShowProducts />} />
        </Route>
        <Route path='/*' element = {<Error />} />
      </Routes>
    </>
  );
}

export default App;
