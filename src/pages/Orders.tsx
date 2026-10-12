import { ClipboardList } from "lucide-react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Orders() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ returnTo: location.pathname }}
      />
    );
  }

  return (
    <section className="container mx-auto min-h-screen max-w-6xl px-6 py-32">
      <header className="mb-8">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Your account
        </p>
        <h1 className="text-4xl font-semibold text-primary">My Orders</h1>
      </header>

      <div className="glass rounded-3xl border border-border/30 px-6 py-16 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
          <ClipboardList size={28} aria-hidden="true" />
        </div>
        <h2 className="mb-2 text-2xl font-semibold text-foreground">
          No orders yet
        </h2>
        <p className="mb-6 text-muted-foreground">
          When you place an order, it will appear here.
        </p>
        <Link
          to="/checkout"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary/50 hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          Explore products
        </Link>
      </div>
    </section>
  );
}
