// src/components/Management/ClubsManagement/ClubsStats.tsx
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
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm ${changeColor[changeType]}`}>
              {change}
            </p>
          )}
        </div>
        <div className="text-3xl text-green-600">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function ClubsStats() {
  const stats = [
    {
      title: 'Total Clubs',
      value: '24',
      icon: '🏆',
      change: '+2 this season',
      changeType: 'positive' as const
    },
    {
      title: 'Active Clubs',
      value: '22',
      icon: '✅',
      change: '2 inactive',
      changeType: 'neutral' as const
    },
    {
      title: 'Total Players',
      value: '552',
      icon: '👥',
      change: '+48 this season',
      changeType: 'positive' as const
    },
    {
      title: 'Average Squad Size',
      value: '23',
      icon: '📊',
      change: 'No change',
      changeType: 'neutral' as const
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
