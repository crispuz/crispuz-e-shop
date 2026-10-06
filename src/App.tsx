import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="*"
            element={
              <h1 className="flex justify-center items-center text-4xl text-primary min-h-screen font-medium p-32">
                404 Not Found.
              </h1>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
