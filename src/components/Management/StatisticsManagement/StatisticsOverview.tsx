// src/components/Management/StatisticsManagement/StatisticsOverview.tsx
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
        <div className="text-3xl text-orange-600">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function StatisticsOverview() {
  const stats = [
    {
      title: 'Total Goals Scored',
      value: '1,247',
      icon: '⚽',
      change: '+156 this season',
      changeType: 'positive' as const
    },
    {
      title: 'Average Goals per Match',
      value: '2.8',
      icon: '📊',
      change: '+0.3 from last season',
      changeType: 'positive' as const
    },
    {
      title: 'Top Scorer Goals',
      value: '28',
      icon: '🏆',
      change: 'Erling Haaland',
      changeType: 'neutral' as const
    },
    {
      title: 'Clean Sheets',
      value: '89',
      icon: '🛡️',
      change: '+12 this season',
      changeType: 'positive' as const
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
