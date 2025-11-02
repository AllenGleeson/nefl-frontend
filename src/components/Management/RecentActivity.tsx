// src/components/Management/RecentActivity.tsx
interface ActivityItemProps {
  type: 'fixture' | 'club' | 'news' | 'statistics' | 'general';
  title: string;
  description: string;
  timestamp: string;
  user: string;
}

function ActivityItem({ type, title, description, timestamp, user }: ActivityItemProps) {
  const typeIcons = {
    fixture: '⚽',
    club: '🏆',
    news: '📰',
    statistics: '📊',
    general: '⚙️'
  };

  const typeColors = {
    fixture: 'bg-blue-100 text-blue-800',
    club: 'bg-green-100 text-green-800',
    news: 'bg-purple-100 text-purple-800',
    statistics: 'bg-orange-100 text-orange-800',
    general: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="flex items-start space-x-3 sm:space-x-4 py-3 sm:py-4 border-b border-gray-200 last:border-b-0">
      <div className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${typeColors[type]}`}>
        {typeIcons[type]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
          <h4 className="text-xs sm:text-sm font-medium text-gray-900 truncate">{title}</h4>
          <time className="text-xs text-gray-500 flex-shrink-0">{timestamp}</time>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
        <p className="text-xs text-gray-500 mt-1">by {user}</p>
      </div>
    </div>
  );
}

export default function RecentActivity() {
  const activities = [
    {
      type: 'fixture' as const,
      title: 'New fixture added',
      description: 'Manchester United vs Liverpool scheduled for Saturday 3:00 PM',
      timestamp: '2 hours ago',
      user: 'Admin User'
    },
    {
      type: 'club' as const,
      title: 'Club information updated',
      description: 'Updated squad information for Arsenal FC',
      timestamp: '4 hours ago',
      user: 'League Manager'
    },
    {
      type: 'statistics' as const,
      title: 'Match results recorded',
      description: 'Chelsea 2-1 Tottenham - Match statistics updated',
      timestamp: '6 hours ago',
      user: 'Match Official'
    },
    {
      type: 'news' as const,
      title: 'News article published',
      description: 'New article: "Championship Race Heats Up"',
      timestamp: '1 day ago',
      user: 'Content Manager'
    },
    {
      type: 'general' as const,
      title: 'System maintenance completed',
      description: 'Database optimization and security updates applied',
      timestamp: '2 days ago',
      user: 'System Admin'
    }
  ];

  return (
    <section className="py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 sm:p-6">
            {activities.length > 0 ? (
              <div className="space-y-0">
                {activities.map((activity, index) => (
                  <ActivityItem key={index} {...activity} />
                ))}
              </div>
            ) : (
              <div className="text-center py-6 sm:py-8">
                <p className="text-gray-500">No recent activity</p>
              </div>
            )}
          </div>
          <div className="px-4 sm:px-6 py-3 bg-gray-50 rounded-b-lg">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all activity →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
