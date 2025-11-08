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
      case 'goal': return 'bg-green-500';
      case 'substitution': return 'bg-blue-500';
      case 'card': return 'bg-yellow-500';
      case 'penalty': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  // Find max minute (for overtime calculation)
  const maxMinute = Math.max(...events.map(e => e.minute), 90);
  const hasOvertime = maxMinute > 90;
  const overtimeMinutes = hasOvertime ? maxMinute - 90 : 0;

  // Calculate position on timeline (0-90 minutes = 0-100%, overtime extends beyond)
  const getPosition = (minute: number) => {
    if (minute <= 90) {
      return (minute / 90) * 100;
    } else {
      // Overtime extends beyond 100%
      const overtimePercent = ((minute - 90) / 30) * 10; // Max 10% extra for up to 120 minutes
      return 100 + overtimePercent;
    }
  };

  return (
    <div className="rounded-lg px-12 py-0">
      <div className="relative">
        {/* Main Timeline Container */}
        <div className="relative w-full" style={{ height: '200px' }}>
          {/* Main Timeline Line (0-90 minutes) */}
          <div className="absolute top-20 left-0 right-0 h-1 bg-gray-300"></div>
          
          {/* Overtime Extension Line (red) */}
          {hasOvertime && (
            <div 
              className="absolute top-20 h-1 bg-red-500"
              style={{
                left: '100%',
                width: `${(overtimeMinutes / 30) * 10}%`,
                maxWidth: '10%'
              }}
            ></div>
          )}
          
          {/* Time Markers at Ends */}
          <div className="absolute top-16 left-0 text-sm font-bold text-gray-600">0&apos;</div>
          <div className="absolute top-16 right-0 text-sm font-bold text-gray-600">90&apos;</div>
          {hasOvertime && (
            <div 
              className="absolute top-16 text-sm font-bold text-red-600"
              style={{
                left: `${100 + (overtimeMinutes / 30) * 10}%`,
                transform: 'translateX(-50%)'
              }}
            >
              {maxMinute}&apos;
            </div>
          )}
          
          {/* Events */}
          {events.map((event) => {
            const position = getPosition(event.minute);
            const isOvertime = event.minute > 90;
            
            return (
              <div
                key={event.id}
                className="absolute"
                style={{
                  left: `${position}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                {/* Vertical Line from Timeline to Event */}
                <div 
                  className={`absolute top-20 w-0.5 ${isOvertime ? 'bg-red-500' : 'bg-gray-400'}`}
                  style={{ height: '60px' }}
                ></div>
                
                {/* Event Icon */}
                <div className="absolute top-24 left-1/2 transform -translate-x-1/2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${getEventColor(event.type)} shadow-lg`}>
                    <span className="text-lg">{getEventIcon(event.type)}</span>
                  </div>
                </div>
                
                {/* Event Info */}
                <div className="absolute top-36 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap">
                  <div className="text-xs font-bold text-gray-700 mb-1">{event.minute}&apos;</div>
                  <div className={`text-xs font-semibold ${event.team === 'home' ? 'text-blue-600' : 'text-red-600'}`}>
                    {event.player}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
