import { motion } from "framer-motion";
import Button from "./Button";

interface ProductCardProps {
  image: string;
  productName: string;
  description: string;
  price: number;
  details: string;
  addToCart: string;
  onDetails?: () => void;
  onAddToCart?: () => void;
}

export default function ProductCard({
  image,
  productName,
  description,
  price,
  details,
  addToCart,
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
        {/* Product Name */}
        <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-all duration-300">
          {productName}
        </h2>

        {/* Description */}
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* Price */}
        <span className="text-xl font-bold text-primary">
          TSh {price.toLocaleString()}
        </span>

        {/* Buttons */}
        <div className="mt-2 flex gap-3">
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
            onClick={onAddToCart}
          >
            {addToCart}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
