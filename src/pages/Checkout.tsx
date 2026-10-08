import { motion } from "framer-motion";
import { container, fadeInUp } from "../components/Animations";
import products from "../assets/data";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import Button from "../components/Button";

type Product = (typeof products)[number];
const categories = ["All", ...new Set(products.map((product) => product.category))];

interface CheckoutProps {
  onAddToCart: (product: Product) => void;
}

export default function Checkout({ onAddToCart }: CheckoutProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const visibleProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <motion.section
      variants={container}
      initial={"hidden"}
      animate={"visible"}
      id="checkout"
      className="overflow-hidden relative py-32 min-h-screen"
    >
      <motion.div className="container mx-auto p-8">
        {/* Heading */}
        <motion.div className="grid items-center justify-center">
          {/* Header */}
          <motion.h2
            variants={fadeInUp}
            className="text-primary text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6 "
          >
            Explore amazing products
          </motion.h2>

          {/* Categories */}
          <div className="lg:flex lg:justify-between items-center">
            <motion.h3
              variants={fadeInUp}
              className="text-secondary-foreground text-2xl leading-relaxed tracking-wide"
            >
              You can explore products by category:
            </motion.h3>
            <div className="flex gap-4 justify-end mt-2 border border-border/20 rounded-3xl px-4">
              {categories.map((category) => (
                <motion.button
                  variants={fadeInUp}
                  key={category}
                  type="button"
                  aria-pressed={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                  className={`glass border border-surface/30 rounded-3xl md:px-3 hover:bg-primary/30 px-1 text-muted-foreground text-sm ${
                    selectedCategory === category ? "bg-primary/30" : ""
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* products */}
        <motion.div className="grid gap-4 m-6 pt-4 md:mt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product) => (
            <motion.div key={product.id} variants={fadeInUp}>
              <ProductCard
                image={product.image}
                productName={product.name}
                description={product.description}
                price={product.price}
                details="Details"
                addToCart="Add to Cart"
                onDetails={() => setSelectedProduct(product)}
                onAddToCart={() => onAddToCart(product)}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-details-title"
            className="glass w-full max-w-lg rounded-2xl border border-border/30 bg-background p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="mb-4 aspect-video w-full rounded-xl object-cover"
            />
            <h2
              id="product-details-title"
              className="mb-2 text-2xl font-semibold text-primary"
            >
              {selectedProduct.name}
            </h2>
            <p className="mb-3 text-muted-foreground">
              {selectedProduct.description}
            </p>
            <p className="mb-5 font-semibold text-primary">
              TSh {selectedProduct.price.toLocaleString()}
            </p>
            <Button onClick={() => setSelectedProduct(null)}>Close</Button>
          </motion.div>
        </div>
      )}
    </motion.section>
  );
}
