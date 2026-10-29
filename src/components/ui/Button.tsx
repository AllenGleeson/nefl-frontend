import type { ButtonHTMLAttributes } from "react";

// Shared button styles. Use <Button> for buttons, and buttonStyles() for
// links (or anything else) that should look like a button.
//
//   primary  - main action on a page (one per area where possible)
//   tonal    - secondary action, softer brand colour
//   outline  - neutral action: filters, pagination, cancel
//   ghost    - low-emphasis action, no background
//   danger   - destructive action (delete, remove)
//   danger-ghost - small red delete icon/button with no background
//   inverse  - on dark/photo backgrounds, solid white
//   glass    - on dark/photo backgrounds, translucent white

export type ButtonVariant = "primary" | "tonal" | "outline" | "ghost" | "danger" | "danger-ghost" | "inverse" | "glass";
export type ButtonSize = "sm" | "md" | "lg" | "icon-sm" | "icon";

type StyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap select-none " +
  "transition-colors duration-200 cursor-pointer active:scale-[0.98] " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)] focus-visible:ring-offset-2 " +
  "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 " +
  "aria-disabled:opacity-50 aria-disabled:cursor-not-allowed";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--md-primary)] text-[var(--md-on-primary)] shadow-sm hover:bg-[var(--md-primary-hover)] disabled:hover:bg-[var(--md-primary)]",
  tonal:
    "bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)] hover:bg-[var(--md-primary-container-hover)] disabled:hover:bg-[var(--md-primary-container)]",
  outline:
    "bg-[var(--md-surface-container-lowest)] text-[var(--md-on-surface)] border border-[var(--md-outline-variant)] hover:bg-[var(--md-surface-container)] hover:border-[var(--md-outline)] disabled:hover:bg-[var(--md-surface-container-lowest)]",
  ghost:
    "bg-transparent text-[var(--md-primary)] hover:bg-[var(--md-primary)]/10 disabled:hover:bg-transparent",
  "danger-ghost":
    "bg-transparent text-[var(--md-error)] hover:bg-[var(--md-error)]/10 disabled:hover:bg-transparent focus-visible:ring-[var(--md-error)]",
  danger:
    "bg-[var(--md-error)] text-[var(--md-on-error)] shadow-sm hover:bg-[var(--md-error-hover)] disabled:hover:bg-[var(--md-error)]",
  inverse:
    "bg-white text-[var(--md-primary)] shadow-md hover:bg-[var(--md-primary-fixed)] focus-visible:ring-white focus-visible:ring-offset-transparent",
  glass:
    "bg-white/10 text-white border border-white/30 hover:bg-white/20 disabled:hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-transparent",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm sm:text-base",
  lg: "h-12 px-7 text-base",
  "icon-sm": "h-9 w-9 shrink-0",
  icon: "h-11 w-11 shrink-0",
};

export function buttonStyles({ variant = "primary", size = "md", fullWidth, className }: StyleOptions = {}) {
  return [base, variants[variant], sizes[size], fullWidth && "w-full", className].filter(Boolean).join(" ");
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & StyleOptions;

export default function Button({ variant, size, fullWidth, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonStyles({ variant, size, fullWidth, className })} {...props} />;
}
