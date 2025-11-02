// src/app/forgot-password/page.tsx
import ForgotPasswordForm from "@/components/Login/ForgotPasswordForm";
import AuthLayout from "@/components/Login/AuthLayout";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your email to receive a reset link"
      showRegisterLink={false}
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
