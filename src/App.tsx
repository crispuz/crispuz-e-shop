import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import products from "./assets/data";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import AuthProvider from "./context/AuthContext";

type Product = (typeof products)[number];
type CartItem = { product: Product; quantity: number };

/** Renders the shop routes within the authentication provider and manages cart state. */
export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.product.id === product.id);

      if (existingItem) {
        return items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...items, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((items) =>
      items.filter((item) => item.product.id !== productId),
    );
  };

  return (
    <AuthProvider>
      <div>
        <Navbar />
        <main className="min-h-screen overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/checkout"
              element={<Checkout onAddToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={<Cart items={cartItems} onRemove={removeFromCart} />}
            />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />

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
    </AuthProvider>
  );
}
