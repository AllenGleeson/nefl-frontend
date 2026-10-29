import type { Metadata } from "next";
import { AdminPageHeader, AdminSection } from "@/components/Management/AdminUI";
import ActivityLog from "@/components/Management/Activity/ActivityLog";

export const metadata: Metadata = { title: "Activity | NEFL Admin" };

export default function ActivityPage() {
  return (
    <div className="pb-8">
      <AdminPageHeader title="Activity" description="Every change made in the admin: fixtures, results, clubs, news and users." />
      <AdminSection>
        <ActivityLog />
      </AdminSection>
    </div>
  );
}
