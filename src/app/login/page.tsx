// src/app/login/page.tsx
import LoginForm from "@/components/Login/LoginForm";
import AuthLayout from "@/components/Login/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your NEFL account"
      showRegisterLink={true}
    >
      <LoginForm />
    </AuthLayout>
  );
}
