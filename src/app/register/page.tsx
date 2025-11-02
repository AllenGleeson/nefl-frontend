// src/app/register/page.tsx
import RegisterForm from "@/components/Login/RegisterForm";
import AuthLayout from "@/components/Login/AuthLayout";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Join NEFL"
      subtitle="Create your account to get started"
      showRegisterLink={false}
    >
      <RegisterForm />
    </AuthLayout>
  );
}
