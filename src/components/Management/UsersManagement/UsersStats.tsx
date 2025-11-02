// src/components/Management/UsersManagement/UsersStats.tsx
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
        <div className="text-2xl sm:text-3xl text-indigo-600 flex-shrink-0 ml-2">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function UsersStats() {
  const stats = [
    {
      title: 'Total Users',
      value: '24',
      icon: '👥',
      change: '+3 this month',
      changeType: 'positive' as const
    },
    {
      title: 'Active Users',
      value: '20',
      icon: '✅',
      change: '4 inactive',
      changeType: 'neutral' as const
    },
    {
      title: 'Admins',
      value: '3',
      icon: '👑',
      change: 'No change',
      changeType: 'neutral' as const
    },
    {
      title: 'Pending Invites',
      value: '2',
      icon: '⏳',
      change: 'Awaiting approval',
      changeType: 'neutral' as const
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
