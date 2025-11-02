import StoreManagementLayout from "@/components/Management/StoreManagement/StoreManagementLayout";
import StoreStats from "@/components/Management/StoreManagement/StoreStats";
import { QuickActions, RecentOrders, LowStockAlerts, SalesSummary } from "@/components/Management/StoreManagement/Overview";

export default function StoreOverviewPage() {
  return (
    <StoreManagementLayout currentPage="overview" pageTitle="Store Overview">
      {/* Stats Overview */}
      <StoreStats />
      
      {/* Quick Actions */}
      <div className="mt-6 sm:mt-8">
        <QuickActions />
      </div>
      
      {/* Dashboard Grid */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders />
        <LowStockAlerts />
      </div>
      
      {/* Sales Summary */}
      <div className="mt-6 sm:mt-8">
        <SalesSummary />
      </div>
    </StoreManagementLayout>
  );
}

