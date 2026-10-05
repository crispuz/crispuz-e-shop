import { forwardRef, type ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium " +
  "transition-colors focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-purple-700 active:bg-indigo-800 focus-visible:ring-indigo-500",
  secondary:
    "bg-linear-to-br from-primary via-pink500 to-purple-500 text-secondary-foreground hover:bg-primary/40 active:bg-slate-300 focus-visible:ring-slate-400",
  outline:
    "border border-slate-300 bg-transparent text-slate-900 hover:bg-slate-50 active:bg-slate-100 focus-visible:ring-slate-400",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200 focus-visible:ring-slate-400",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      type = "button",
      className = "",
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`.trim()}
      {...props}
    />
  ),
);

Button.displayName = "Button";

export default Button;
