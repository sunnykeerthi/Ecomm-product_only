import { AnswersHeadlessProvider } from "@yext/answers-headless-react";
import { Navbar } from "./components/Navbar";
import { ProductsPage } from "./pages/ProductsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnalyticsProvider } from "@yext/answers-react-components";
import { answersSandboxEndpoints, config } from "./config";
import SingleProductPage from "./pages/SingleProductPage";
import CartPage from "./pages/CartPage";
function App() {
  return (
    <div className="p-4">
      <AnswersHeadlessProvider {...config} endpoints={answersSandboxEndpoints}>
        <AnalyticsProvider {...config}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route index element={<ProductsPage />} />
              <Route path="/product/:id" element={<SingleProductPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </BrowserRouter>
        </AnalyticsProvider>
      </AnswersHeadlessProvider>
    </div>
  );
}

export default App;
