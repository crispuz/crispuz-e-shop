import { useState } from "react";
import { ChevronDown } from "lucide-react";
import products, { type Product } from "../assets/data";
import ProductCard from "./ProductCard";

interface ProductCatalogProps {
  onDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const categories = [
  "All",
  ...new Set(products.map((product) => product.category)),
];

export default function ProductCatalog({
  onDetails,
  onAddToCart,
}: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const visibleProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="container mx-auto p-8">
      <div className="grid items-center justify-center">
        <h1 className="mb-4 text-4xl text-primary md:mb-6 md:text-5xl lg:text-6xl">
          Explore amazing products
        </h1>

        <div className="flex min-w-0 flex-col items-start gap-3 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-xl leading-relaxed tracking-wide text-secondary-foreground sm:text-2xl">
            You can explore products by category:
          </h2>
          <div className="relative w-full sm:max-w-xs lg:w-64">
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
          </div>
        </div>
      </div>

      <div className="m-6 grid gap-4 pt-4 md:mt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleProducts.map((product) => (
          <div key={product.id}>
            <ProductCard
              image={product.image}
              imageAttribution={product.imageAttribution}
              productName={product.name}
              description={product.description}
              price={product.price}
              stock={product.stock}
              details="Details"
              addToCart="Add to Cart"
              detailsTo={`/checkout/${product.id}`}
              onDetails={() => onDetails(product)}
              onAddToCart={() => onAddToCart(product)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
