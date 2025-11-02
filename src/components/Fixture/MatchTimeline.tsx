"use client";

// src/components/Fixture/MatchTimeline.tsx
interface TimelineEvent {
  id: string;
  minute: number;
  type: 'goal' | 'substitution' | 'card' | 'penalty';
  player: string;
  team: 'home' | 'away';
  description: string;
  additionalInfo?: string;
}

interface MatchTimelineProps {
  events: TimelineEvent[];
}

export default function MatchTimeline({ events }: MatchTimelineProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'goal': return '⚽';
      case 'substitution': return '🔄';
      case 'card': return '🟨';
      case 'penalty': return '⚽';
      default: return '📝';
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'goal': return 'bg-green-100 text-green-800';
      case 'substitution': return 'bg-blue-100 text-blue-800';
      case 'card': return 'bg-yellow-100 text-yellow-800';
      case 'penalty': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold mb-4">Match Timeline</h3>
      
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${getEventColor(event.type)}`}>
                {getEventIcon(event.type)}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-bold text-sm">{event.minute}&apos;</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventColor(event.type)}`}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
                <span className={`text-sm font-medium ${event.team === 'home' ? 'text-blue-600' : 'text-red-600'}`}>
                  {event.team === 'home' ? 'Home' : 'Away'}
                </span>
              </div>
              
              <p className="font-semibold text-sm">{event.player}</p>
              <p className="text-sm text-gray-600">{event.description}</p>
              {event.additionalInfo && (
                <p className="text-xs text-gray-500 mt-1">{event.additionalInfo}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
