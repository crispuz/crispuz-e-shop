import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
    </div>
  );
}
