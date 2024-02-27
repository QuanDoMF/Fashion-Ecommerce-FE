import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import ShopCategoryMen from './pages/ShopCategoryMen';
import ShopCategoryWomen from './pages/ShopCategoryWomen';
import ShopCategoryKid from './pages/ShopCategoryKid';
import Product from './pages/Product';
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div >
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />}/>
          <Route path='/mens'element={<ShopCategoryMen />}/>
          <Route path='/womens'element={<ShopCategoryWomen  />}/>
          <Route path='/kids'element={<ShopCategoryKid />}/>
          <Route path='/product/:productId'element={<Product />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/login' element={<LoginSignup />}/>
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
