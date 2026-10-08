import { motion } from "framer-motion";
import { container, fadeInUp } from "../components/Animations";
import products from "../assets/data";
import ProductCard from "../components/ProductCard";

const categories = [
  { id: "1", label: "Electronics", href: "", details: "" },
  { id: "2", label: "Gaming", href: "", details: "" },
  { id: "3", label: "Foods", href: "", details: "" },
  { id: "4", label: "clothing", href: "", details: "" },
  { id: "5", label: "Beverages", href: "", details: "" },
];

export default function Checkout() {
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
              {categories.map((category, idx) => (
                <motion.a
                  variants={fadeInUp}
                  key={idx}
                  className="glass border border-surface/30 rounded-3xl md:px-3 hover:bg-primary/30 px-1 text-muted-foreground text-sm"
                >
                  {category.label}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* products */}
        <motion.div className="grid gap-4 m-6 pt-4 md:mt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <motion.div variants={fadeInUp}>
              <ProductCard
                key={product.id}
                image={product.image}
                productName={product.name}
                description={product.description}
                price={product.price}
                details="Details"
                addToCart="Add to Cart"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
