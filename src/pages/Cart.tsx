import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import Button from "../components/Button";
import products from "../assets/data";

type Product = (typeof products)[number];
type CartItem = { product: Product; quantity: number };

interface CartProps {
  items: CartItem[];
  onRemove: (productId: number) => void;
}

export default function Cart({ items, onRemove }: CartProps) {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section
      id="cart"
      className="container mx-auto min-h-screen max-w-6xl px-6 py-32"
    >
      <header className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Your selection
          </p>
          <h1 className="text-4xl font-semibold text-primary">Shopping Cart</h1>
        </div>
        {items.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
        )}
      </header>

      {items.length === 0 ? (
        <div className="glass rounded-3xl border border-border/30 px-6 py-16 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
            <ShoppingBag size={28} aria-hidden="true" />
          </div>
          <h2 className="mb-2 text-2xl font-semibold text-foreground">
            Your cart is empty.
          </h2>
          <p className="mb-6 text-muted-foreground">
            Find something you love and it will show up here.
          </p>
          <Link to="/checkout">
            <Button>Explore products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <ul className="space-y-4">
            {items.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="group flex flex-col gap-4 rounded-2xl border border-border/40 bg-card p-4 transition-colors hover:border-primary/40 sm:flex-row sm:items-center sm:p-5"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-32 w-full rounded-xl bg-surface object-cover sm:h-24 sm:w-24"
                />
                <div className="min-w-0 flex-1">
                  <span className="mb-2 inline-flex rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    {product.category}
                  </span>
                  <h2 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                    {product.name}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    TSh {product.price.toLocaleString()} each
                    <span className="px-2 text-border">·</span>
                    Qty {quantity}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-border/30 pt-3 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                  <p className="text-lg font-semibold text-foreground">
                    TSh {(product.price * quantity).toLocaleString()}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                    onClick={() => onRemove(product.id)}
                    aria-label={`Remove ${product.name} from cart`}
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <aside className="rounded-2xl border border-border/40 bg-card p-6 lg:sticky lg:top-28">
            <h2 className="mb-5 text-xl font-semibold text-foreground">
              Order summary
            </h2>
            <div className="mb-5 flex justify-between border-b border-border/40 pb-4 text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>TSh {total.toLocaleString()}</span>
            </div>
            <div className="mb-6 flex items-baseline justify-between gap-3">
              <span className="font-medium text-foreground">Total</span>
              <span className="text-xl font-bold text-primary">
                TSh {total.toLocaleString()}
              </span>
            </div>
            <Link to="/checkout" className="block">
              <Button className="w-full">Continue shopping</Button>
            </Link>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              You can remove items from your cart at any time.
            </p>
          </aside>
        </div>
      )}
    </section>
  );
}
