import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "./Button";

interface ProductCardProps {
  image: string;
  productName: string;
  description: string;
  price: number;
  stock: number;
  details: string;
  addToCart: string;
  detailsTo: string;
  onDetails?: () => void;
  onAddToCart?: () => void;
}

export default function ProductCard({
  image,
  productName,
  description,
  price,
  stock,
  details,
  addToCart,
  detailsTo,
  onDetails,
  onAddToCart,
}: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.06 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
        type: "spring",
        stiffness: 500,
        damping: 25,
      }}
      className="
        group
        overflow-hidden
        rounded-2xl
        border border-border/25
        bg-card
        glass
        shadow-lg
        transition-all
        duration-300
        hover:border-primary/40
        hover:shadow-[0_20px_50px_rgba(220,20,60,0.15)]
        hover:glow-border
      "
    >
      <Link
        to={detailsTo}
        aria-label={`View details for ${productName}`}
        className="block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
      >
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image}
            alt={productName}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />

          {/* Image Overlay */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-linear-to-t
              from-black/30
              via-transparent
              to-transparent
            "
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col gap-3 p-5">
          <h2 className="text-xl font-semibold text-foreground transition-all group-hover:text-primary">
            {productName}
          </h2>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
          <span className="text-xl font-bold text-primary">
            TSh {price.toLocaleString()}
          </span>
          <span
            className={`text-xs font-medium ${
              stock > 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {stock > 0 ? `${stock} in stock` : "Out of stock"}
          </span>
        </div>
      </Link>

      <div className="px-5 pb-5">
        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            size="sm"
            variant="secondary"
            className="flex-1"
            onClick={onDetails}
          >
            {details}
          </Button>

          <Button
            size="sm"
            variant="primary"
            className="flex-1 leading-tight"
            disabled={stock <= 0}
            onClick={onAddToCart}
          >
            {stock > 0 ? addToCart : "Out of stock"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
