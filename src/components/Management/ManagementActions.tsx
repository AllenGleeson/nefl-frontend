// src/components/Management/ManagementActions.tsx
import Link from 'next/link';

interface ActionButtonProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'indigo';
}

function ActionButton({ title, description, icon, href, color }: ActionButtonProps) {
  const colorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700 border-blue-600',
    green: 'bg-green-600 hover:bg-green-700 border-green-600',
    purple: 'bg-purple-600 hover:bg-purple-700 border-purple-600',
    orange: 'bg-orange-600 hover:bg-orange-700 border-orange-600',
    red: 'bg-red-600 hover:bg-red-700 border-red-600',
    indigo: 'bg-indigo-600 hover:bg-indigo-700 border-indigo-600'
  };

  return (
    <Link
      href={href}
      className={`${colorClasses[color]} text-white rounded-lg p-4 sm:p-6 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1`}
    >
      <div className="flex items-center mb-2 sm:mb-3">
        <span className="text-xl sm:text-2xl mr-2 sm:mr-3 flex-shrink-0">{icon}</span>
        <h3 className="text-base sm:text-lg font-semibold truncate">{title}</h3>
      </div>
      <p className="text-xs sm:text-sm text-white/90 line-clamp-2">{description}</p>
    </Link>
  );
}

export default function ManagementActions() {
  const actions = [
    {
      title: 'Manage Fixtures',
      description: 'Create, edit, and schedule matches',
      icon: '📅',
      href: '/management/fixtures',
      color: 'blue' as const
    },
    {
      title: 'Club Management',
      description: 'Add, edit, and manage club information',
      icon: '🏆',
      href: '/management/clubs',
      color: 'green' as const
    },
    {
      title: 'League Tables',
      description: 'View and update league standings',
      icon: '📊',
      href: '/management/leagues',
      color: 'purple' as const
    },
    {
      title: 'Statistics',
      description: 'Track player and team performance',
      icon: '📈',
      href: '/management/statistics',
      color: 'orange' as const
    },
    {
      title: 'News & Updates',
      description: 'Manage league news and announcements',
      icon: '📰',
      href: '/management/news',
      color: 'blue' as const
    },
    {
      title: 'Store Management',
      description: 'Manage league merchandise and products',
      icon: '🛍️',
      href: '/management/store',
      color: 'green' as const
    },
    {
      title: 'Users Management',
      description: 'Manage user accounts and permissions',
      icon: '👥',
      href: '/management/users',
      color: 'indigo' as const
    }
  ];

  return (
    <section className="py-6 sm:py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {actions.map((action, index) => (
            <ActionButton key={index} {...action} />
          ))}
        </div>
      </div>
    </section>
  );
}