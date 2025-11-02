// src/components/Management/StoreManagement/StoreStats.tsx
interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

function StatCard({ title, value, icon, change, changeType = 'neutral' }: StatCardProps) {
  const changeColor = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{title}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-xs sm:text-sm ${changeColor[changeType]} truncate`}>
              {change}
            </p>
          )}
        </div>
        <div className="text-2xl sm:text-3xl text-green-600 flex-shrink-0 ml-2">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function StoreStats() {
  const stats = [
    {
      title: 'Total Products',
      value: '89',
      icon: '🛍️',
      change: '+12 this month',
      changeType: 'positive' as const
    },
    {
      title: 'Active Products',
      value: '76',
      icon: '✅',
      change: '13 inactive',
      changeType: 'neutral' as const
    },
    {
      title: 'Total Revenue',
      value: '$12,456',
      icon: '💰',
      change: '+$2,340 this month',
      changeType: 'positive' as const
    },
    {
      title: 'Low Stock Items',
      value: '8',
      icon: '⚠️',
      change: 'Need restocking',
      changeType: 'negative' as const
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
