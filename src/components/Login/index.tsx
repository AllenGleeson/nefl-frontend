// src/components/Login/index.tsx
export { default as LoginForm } from './LoginForm';
export { default as RegisterForm } from './RegisterForm';
export { default as ForgotPasswordForm } from './ForgotPasswordForm';
export { default as AuthLayout } from './AuthLayout';
export { default as AuthGuard } from './AuthGuard';
export { default as UserProfile } from './UserProfile';

// Re-export as named export for compatibility
export { UserProfile as UserProfileComponent } from './UserProfile';
