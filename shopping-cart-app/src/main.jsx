import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import ShoppingCart from './ShoppingCart.jsx';
import { ProductContext } from './ProductContext'; // Import the context

//create context 
const ProductProvider = ({ children }) => {
  const [productsItemsForShoppingCart, setProductsItemsForShoppingCart] = useState([]);

  return (
    <ProductContext.Provider value={{ productsItemsForShoppingCart, setProductsItemsForShoppingCart }}>
      {children}
    </ProductContext.Provider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Default route
  },
  {
    path: '/home',
    element: <App />
  },
  {
    path: '/shoppingCart',
    element: <ShoppingCart />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider>
      <RouterProvider router={router} />
    </ProductProvider>
  </StrictMode>,
)
