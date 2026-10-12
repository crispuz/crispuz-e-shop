import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import products, { type Product } from "../assets/data";
import ProductCatalog from "../components/ProductCatalog";
import ProductDetails from "../components/ProductDetails";
import { useAuth } from "../context/useAuth";

interface CheckoutProps {
  onAddToCart: (product: Product) => void;
}

/** Displays the public catalog or the selected product's details. */
export default function Checkout({ onAddToCart }: CheckoutProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [addedProduct, setAddedProduct] = useState<Product | null>(null);
  const selectedProduct = products.find((product) => String(product.id) === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = (product: Product) => {
    if (!user) {
      navigate("/signup", { state: { returnTo: location.pathname } });
      return;
    }

    onAddToCart(product);
    setAddedProduct(product);
  };

  useEffect(() => {
    if (!addedProduct) return;

    const timeoutId = window.setTimeout(() => setAddedProduct(null), 2800);
    return () => window.clearTimeout(timeoutId);
  }, [addedProduct]);

  return (
    <>
      <section
        key={id ?? "catalog"}
        className="relative min-h-screen overflow-hidden py-32"
      >
        {id === undefined ? (
          <ProductCatalog
            onDetails={(product) => navigate(`/checkout/${product.id}`)}
            onAddToCart={handleAddToCart}
          />
        ) : selectedProduct ? (
          <ProductDetails
            product={selectedProduct}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <div className="container mx-auto max-w-6xl px-6">
            <div className="rounded-3xl border border-border/30 bg-card px-6 py-16 text-center">
              <h1 className="mb-3 text-3xl font-semibold text-foreground">
                Product not found
              </h1>
              <p className="mb-6 text-muted-foreground">
                This product may no longer be available.
              </p>
              <Link to="/checkout" className="text-primary hover:underline">
                Browse products
              </Link>
            </div>
          </div>
        )}
      </section>

      {createPortal(
        <AnimatePresence>
          {addedProduct && (
            <motion.div
              key={addedProduct.id}
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed bottom-6 right-6 z-40 flex w-[calc(100%-3rem)] max-w-sm items-start gap-3 rounded-2xl border border-green-500/30 bg-card p-4 shadow-xl shadow-black/30"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-500/15 text-green-400">
                <Check size={20} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground">
                  Added to your cart
                </p>
                <p className="truncate text-sm text-muted-foreground">
                  {addedProduct.name}
                </p>
              </div>
              <Link
                to="/cart"
                className="shrink-0 text-sm font-medium text-primary hover:underline"
              >
                View cart
              </Link>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
