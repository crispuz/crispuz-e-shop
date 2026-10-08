import { Link } from "react-router-dom";
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

  return (
    <section id="cart" className="container mx-auto min-h-screen px-6 py-32">
      <h1 className="mb-8 text-4xl font-semibold text-primary">Your Cart</h1>
      {items.length === 0 ? (
        <div className="glass rounded-2xl border border-border/20 p-8 text-center">
          <p className="mb-6 text-lg text-muted-foreground">
            Your cart is empty.
          </p>
          <Link to="/checkout">
            <Button>Browse products</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <ul className="space-y-4">
            {items.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="glass flex flex-wrap items-center gap-4 rounded-2xl border border-border/20 p-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-20 w-20 rounded-xl object-cover"
                />
                <div className="min-w-40 flex-1">
                  <h2 className="font-semibold text-foreground">
                    {product.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {product.category} · Quantity: {quantity}
                  </p>
                </div>
                <p className="font-semibold text-primary">
                  TSh {(product.price * quantity).toLocaleString()}
                </p>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onRemove(product.id)}
                  aria-label={`Remove ${product.name} from cart`}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
          <p className="text-right text-xl font-semibold text-primary">
            Total: TSh {total.toLocaleString()}
          </p>
        </div>
      )}
    </section>
  );
}
