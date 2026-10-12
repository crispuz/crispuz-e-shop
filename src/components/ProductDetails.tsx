import { useState } from "react";
import { Check, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./Button";
import type { Product } from "../assets/data";

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

function formatLabel(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function ProductDetails({
  product,
  onAddToCart,
}: ProductDetailsProps) {
  const gallery = [
    ...new Set(product.images.length ? product.images : [product.image]),
  ];
  const [selectedImage, setSelectedImage] = useState(gallery[0]);

  return (
    <div className="container mx-auto max-w-6xl px-6">
      <Link
        to="/checkout"
        className="mb-5 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ChevronLeft size={17} aria-hidden="true" />
        Back to products
      </Link>

      <article className="grid gap-8 rounded-3xl border border-border/30 glass glow-border p-5 sm:p-8 lg:grid-cols-2 lg:items-start">
        <div>
          <img
            src={selectedImage}
            alt={product.name}
            className="aspect-square w-full rounded-2xl bg-surface object-cover"
          />
          {gallery.length > 1 && (
            <div className="mt-3 flex gap-3 overflow-x-auto">
              {gallery.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  aria-label={`View product image ${index + 1}`}
                  aria-pressed={selectedImage === image}
                  className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 ${
                    selectedImage === image
                      ? "border-primary"
                      : "border-border/40"
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {product.category}
            </span>
            {product.isNew && (
              <span className="rounded-full border border-border/40 px-3 py-1 text-xs text-foreground">
                New
              </span>
            )}
            {product.isFeatured && (
              <span className="rounded-full border border-border/40 px-3 py-1 text-xs text-foreground">
                Featured
              </span>
            )}
          </div>

          <p className="mb-2 text-sm text-muted-foreground">
            {product.brand} <span aria-hidden="true">·</span> SKU: {product.sku}
          </p>
          <h1 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            {product.name}
          </h1>
          <p className="mb-6 leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <section className="mb-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
              Product highlights
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Check
                    size={16}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="mb-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="text-2xl font-bold text-primary">
              TSh {product.price.toLocaleString()}
            </p>
            {product.originalPrice > product.price && (
              <>
                <p className="text-sm text-muted-foreground line-through">
                  TSh {product.originalPrice.toLocaleString()}
                </p>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  Save TSh{" "}
                  {(product.originalPrice - product.price).toLocaleString()}
                </span>
              </>
            )}
          </div>

          <p
            className={`mb-4 text-sm font-medium ${
              product.stock > 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {product.stock > 0
              ? `${product.availability} · ${product.stock} available`
              : product.availability}
          </p>
          <Button
            className="w-full sm:w-auto"
            disabled={product.stock <= 0}
            onClick={() => onAddToCart(product)}
          >
            {product.stock > 0 ? "Add to Cart" : "Out of stock"}
          </Button>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div>
              <h2 className="mb-2 text-sm font-semibold text-foreground">
                Available colors
              </h2>
              <p className="text-sm text-muted-foreground">
                {product.colors.join(", ")}
              </p>
            </div>
            <div>
              <h2 className="mb-2 text-sm font-semibold text-foreground">
                Shipping
              </h2>
              <p className="text-sm text-muted-foreground">
                {product.shipping}
              </p>
            </div>
            <div className="sm:col-span-2">
              <h2 className="mb-2 text-sm font-semibold text-foreground">
                Warranty
              </h2>
              <p className="text-sm text-muted-foreground">
                {product.warranty}
              </p>
            </div>
          </div>

          <section className="mt-7 rounded-2xl border border-border/30 bg-background/40 p-5">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Specifications
            </h2>
            <dl className="divide-y divide-border/30">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="grid gap-1 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] sm:gap-4"
                >
                  <dt className="text-sm text-muted-foreground">
                    {formatLabel(key)}
                  </dt>
                  <dd className="text-sm text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Confirm model-specific specifications, colors, and warranty
              coverage with the supplier before purchase.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
