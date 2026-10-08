import { motion } from "framer-motion";
import { container, fadeInUp } from "../components/Animations";
import products from "../assets/data";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import Button from "../components/Button";
import { ChevronDown } from "lucide-react";

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
          <div className="flex min-w-0 flex-col items-start gap-3 lg:flex-row lg:items-center lg:justify-between">
            <motion.h3
              variants={fadeInUp}
              className="text-secondary-foreground text-xl leading-relaxed tracking-wide sm:text-2xl"
            >
              You can explore products by category:
            </motion.h3>
            <motion.div
              variants={fadeInUp}
              className="relative w-full sm:max-w-xs lg:w-64"
            >
              <label htmlFor="category-filter" className="sr-only">
                Filter products by category
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="glass w-full appearance-none rounded-xl border border-border/30 px-4 py-3 pr-10 text-sm text-foreground outline-none transition-colors hover:border-primary/50 focus:border-primary"
              >
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-card text-foreground"
                  >
                    {category === "All" ? "All categories" : category}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            </motion.div>
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
