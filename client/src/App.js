import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import OrderSummary from './components/OrderSummary';
import ProductList from './components/ProductList';
import ProductPage from './components/ProductPage';
import ShoppingCart from './components/ShoppingCart';
import SideBar from './components/SideBar';
import TrendingProduct from './components/TrendingProducts';
import ViewAllShoes from './views/ViewAllShoes';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={ <NavBar /> } path="/" />
        <Route element={ <ProductPage /> } path="/product" />
        <Route element={ <TrendingProduct />} path="/trending" />
        <Route element={ <ProductList />} path="/products" />
        <Route element={ <SideBar />} path="/sidebar" />
        <Route element={ <ShoppingCart />} path="/cart" />
        <Route element={ <OrderSummary />} path="/summary" />
        <Route element={<ViewAllShoes/>} path="/shoe/view-all"/>
      </Routes>
    </div>
  );
}

export default App;
