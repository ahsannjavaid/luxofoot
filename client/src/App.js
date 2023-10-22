import './App.css';
import { Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import AboutDeveloper from './pages/About Developer/AboutDeveloper';
import Error from './pages/Error/Error';
import Cart from './pages/Cart/Cart';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import ProductDetails from './pages/Product Details/ProductDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <Route path='/*' element = {<Error />} />
      </Routes>
    </>
  );
}

export default App;
