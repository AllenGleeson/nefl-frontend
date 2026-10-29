import type { ReactNode } from "react";
import AdminShell from "@/components/Management/AdminShell";

export default function ManagementLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
