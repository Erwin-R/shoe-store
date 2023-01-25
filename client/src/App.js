import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import OrderSummary from './components/OrderSummary';
import ProductList from './components/ProductList';
import ProductPage from './components/ProductPage';
import SideBar from './components/SideBar';
import TrendingProduct from './components/TrendingProducts';
import ShoppingCartPage from './views/ShoppingCartPage';
import ShoeContext from './context/ShoeContext';
import ViewAllShoes from './views/ViewAllShoes';


function App() {
  const itemsInCart = [
    {
      id: 1,
      name: 'ULTRABOOST 1.0',
      href: '#',
      price: '120.00',
      color: 'Black',
      inStock: true,
      size: '9.5',
      imageSrc: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c608f554cb3b4d12b392af000188c513_9366/Ultraboost_1.0_Shoes_Black_HQ4199_01_standard.jpg',
      imageAlt: "Front of men's Basic Tee in sienna.",
    },
    {
      id: 2,
      name: 'ULTRABOOST 1.0',
      href: '#',
      price: '200.00',
      color: 'White',
      inStock: false,
      leadTime: '3–4 weeks',
      size: '10',
      imageSrc: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/12a7dc066e2640898c10af15018481f8_9366/Ultraboost_1.0_Shoes_White_HR0063_01_standard.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
    },
    {
      id: 3,
      name: 'KAPTIR 2.0',
      href: '#',
      price: '90.00',
      color: 'White',
      inStock: true,
      size: '8',
      imageSrc: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/0846e90b15144861b33dacf500e3cfd1_9366/Kaptir_2.0_Shoes_White_H00276_01_standard.jpg',
      imageAlt: 'Insulated bottle with white base and black snap lid.',
    },
  ]

  const message = "hello"

  return (
    <div className="App">
      <ShoeContext.Provider value={{itemsInCart, message}}>
        <Routes>
          <Route element={ <NavBar /> } path="/" />
          <Route element={ <ProductPage /> } path="/product" />
          <Route element={ <TrendingProduct />} path="/trending" />
          <Route element={ <ProductList />} path="/products" />
          <Route element={ <SideBar />} path="/sidebar" />
          <Route element={ <ShoppingCartPage />} path="/cart" />
          <Route element={ <OrderSummary />} path="/summary" />
          <Route element={<ViewAllShoes/>} path="/shoe/view-all"/>
        </Routes>
      </ShoeContext.Provider>
    </div>
  );
}

export default App;
