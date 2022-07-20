import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "@yext/answers-react-components/bundle.css";
import { ProductsProvider } from "./context/ProductsContext";
import { CartProvider } from "./context/CartContext";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ProductsProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductsProvider>
  </React.StrictMode>
);
