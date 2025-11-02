/**
 * Material Design 3 Theme Colors
 * Generated from seed color #263238
 * All colors are available as CSS variables in globals.css
 */

export const materialColors = {
  primary: {
    main: "var(--md-primary)",
    on: "var(--md-on-primary)",
    container: "var(--md-primary-container)",
    onContainer: "var(--md-on-primary-container)",
    fixed: "var(--md-primary-fixed)",
    onFixed: "var(--md-on-primary-fixed)",
    fixedDim: "var(--md-primary-fixed-dim)",
    onFixedVariant: "var(--md-on-primary-fixed-variant)",
  },
  secondary: {
    main: "var(--md-secondary)",
    on: "var(--md-on-secondary)",
    container: "var(--md-secondary-container)",
    onContainer: "var(--md-on-secondary-container)",
    fixed: "var(--md-secondary-fixed)",
    onFixed: "var(--md-on-secondary-fixed)",
    fixedDim: "var(--md-secondary-fixed-dim)",
    onFixedVariant: "var(--md-on-secondary-fixed-variant)",
  },
  tertiary: {
    main: "var(--md-tertiary)",
    on: "var(--md-on-tertiary)",
    container: "var(--md-tertiary-container)",
    onContainer: "var(--md-on-tertiary-container)",
    fixed: "var(--md-tertiary-fixed)",
    onFixed: "var(--md-on-tertiary-fixed)",
    fixedDim: "var(--md-tertiary-fixed-dim)",
    onFixedVariant: "var(--md-on-tertiary-fixed-variant)",
  },
  error: {
    main: "var(--md-error)",
    on: "var(--md-on-error)",
    container: "var(--md-error-container)",
    onContainer: "var(--md-on-error-container)",
  },
  background: {
    main: "var(--md-background)",
    on: "var(--md-on-background)",
  },
  surface: {
    main: "var(--md-surface)",
    on: "var(--md-on-surface)",
    variant: "var(--md-surface-variant)",
    onVariant: "var(--md-on-surface-variant)",
    dim: "var(--md-surface-dim)",
    bright: "var(--md-surface-bright)",
    containerLowest: "var(--md-surface-container-lowest)",
    containerLow: "var(--md-surface-container-low)",
    container: "var(--md-surface-container)",
    containerHigh: "var(--md-surface-container-high)",
    containerHighest: "var(--md-surface-container-highest)",
  },
  outline: {
    main: "var(--md-outline)",
    variant: "var(--md-outline-variant)",
  },
  inverse: {
    surface: "var(--md-inverse-surface)",
    onSurface: "var(--md-inverse-on-surface)",
    primary: "var(--md-inverse-primary)",
  },
  shadow: "var(--md-shadow)",
  scrim: "var(--md-scrim)",
} as const;

/**
 * Tailwind CSS class helpers for Material Design colors
 * Usage: className={theme.primary.bg} or className={theme.primary.text}
 */
export const theme = {
  primary: {
    bg: "bg-[var(--md-primary)]",
    text: "text-[var(--md-on-primary)]",
    container: "bg-[var(--md-primary-container)]",
    textOnContainer: "text-[var(--md-on-primary-container)]",
  },
  secondary: {
    bg: "bg-[var(--md-secondary)]",
    text: "text-[var(--md-on-secondary)]",
    container: "bg-[var(--md-secondary-container)]",
    textOnContainer: "text-[var(--md-on-secondary-container)]",
  },
  tertiary: {
    bg: "bg-[var(--md-tertiary)]",
    text: "text-[var(--md-on-tertiary)]",
    container: "bg-[var(--md-tertiary-container)]",
    textOnContainer: "text-[var(--md-on-tertiary-container)]",
  },
  error: {
    bg: "bg-[var(--md-error)]",
    text: "text-[var(--md-on-error)]",
    container: "bg-[var(--md-error-container)]",
    textOnContainer: "text-[var(--md-on-error-container)]",
  },
  surface: {
    bg: "bg-[var(--md-surface)]",
    text: "text-[var(--md-on-surface)]",
    variant: "bg-[var(--md-surface-variant)]",
    textVariant: "text-[var(--md-on-surface-variant)]",
    container: "bg-[var(--md-surface-container)]",
  },
  outline: {
    border: "border-[var(--md-outline)]",
    borderVariant: "border-[var(--md-outline-variant)]",
    text: "text-[var(--md-outline)]",
  },
} as const;

