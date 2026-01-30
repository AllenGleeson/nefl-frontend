"use client";

// src/components/Management/FixturesManagement/ScoreEntry.tsx
import { useState } from 'react';
import Modal from '../../Modal';

interface GoalDetail {
  id: string;
  player: string;
  time: string;
}

interface ScoreEntryProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  fixtureId: string;
  homeTeam: string;
  awayTeam: string;
  currentHomeScore?: number;
  currentAwayScore?: number;
  onScoreUpdate: (fixtureId: string, homeScore: number, awayScore: number, homeGoals?: GoalDetail[], awayGoals?: GoalDetail[]) => void;
}

export default function ScoreEntry({
  isOpen,
  onClose,
  onSuccess,
  fixtureId,
  homeTeam,
  awayTeam,
  currentHomeScore = 0,
  currentAwayScore = 0,
  onScoreUpdate
}: ScoreEntryProps) {
  const [homeScore, setHomeScore] = useState(currentHomeScore);
  const [awayScore, setAwayScore] = useState(currentAwayScore);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [homeGoals, setHomeGoals] = useState<GoalDetail[]>([]);
  const [awayGoals, setAwayGoals] = useState<GoalDetail[]>([]);

  // Available players for dropdowns
  const players = [
    'John Smith', 'Mike O\'Brien', 'Pat Murphy', 'Sarah O\'Connor', 'David Walsh',
    'Emma Kelly', 'Tom Wilson', 'Lisa Brown', 'James Taylor', 'Anna Murphy',
    'Paul Kelly', 'Mary O\'Sullivan', 'Sean Murphy', 'Kate O\'Connor', 'Mark Walsh',
    'Claire Kelly', 'Peter Murphy', 'Helen O\'Brien', 'Brian Kelly', 'Fiona Murphy'
  ];

  // Available times for dropdowns (0-90 minutes + injury time)
  const times = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
    '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
    '41', '42', '43', '44', '45', '45+1', '45+2', '45+3', '45+4', '45+5',
    '46', '47', '48', '49', '50', '51', '52', '53', '54', '55',
    '56', '57', '58', '59', '60', '61', '62', '63', '64', '65',
    '66', '67', '68', '69', '70', '71', '72', '73', '74', '75',
    '76', '77', '78', '79', '80', '81', '82', '83', '84', '85',
    '86', '87', '88', '89', '90', '90+1', '90+2', '90+3', '90+4', '90+5'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      onScoreUpdate(fixtureId, homeScore, awayScore, homeGoals, awayGoals);
      onSuccess();
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScoreChange = (team: 'home' | 'away', value: string) => {
    const numValue = parseInt(value) || 0;
    if (team === 'home') {
      setHomeScore(numValue);
      // Adjust home goals array to match score
      if (numValue > homeGoals.length) {
        // Add new goals
        const newGoals = Array.from({ length: numValue - homeGoals.length }, (_, i) => ({
          id: `home-${Date.now()}-${i}`,
          player: '',
          time: ''
        }));
        setHomeGoals([...homeGoals, ...newGoals]);
      } else if (numValue < homeGoals.length) {
        // Remove excess goals
        setHomeGoals(homeGoals.slice(0, numValue));
      }
    } else {
      setAwayScore(numValue);
      // Adjust away goals array to match score
      if (numValue > awayGoals.length) {
        // Add new goals
        const newGoals = Array.from({ length: numValue - awayGoals.length }, (_, i) => ({
          id: `away-${Date.now()}-${i}`,
          player: '',
          time: ''
        }));
        setAwayGoals([...awayGoals, ...newGoals]);
      } else if (numValue < awayGoals.length) {
        // Remove excess goals
        setAwayGoals(awayGoals.slice(0, numValue));
      }
    }
  };

  const handleGoalChange = (team: 'home' | 'away', goalIndex: number, field: 'player' | 'time', value: string) => {
    if (team === 'home') {
      setHomeGoals(prev => prev.map((goal, index) => 
        index === goalIndex ? { ...goal, [field]: value } : goal
      ));
    } else {
      setAwayGoals(prev => prev.map((goal, index) => 
        index === goalIndex ? { ...goal, [field]: value } : goal
      ));
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Enter Match Score">
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-600 mt-1">Enter the final score for this match</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Score Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Score</h3>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex-1 text-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {homeTeam}
                </label>
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={homeScore}
                  onChange={(e) => handleScoreChange('home', e.target.value)}
                  className="w-full text-center text-2xl font-bold border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="text-2xl font-bold text-gray-500">-</div>

              <div className="flex-1 text-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {awayTeam}
                </label>
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={awayScore}
                  onChange={(e) => handleScoreChange('away', e.target.value)}
                  className="w-full text-center text-2xl font-bold border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* Advanced Score Toggle */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Advanced Score (Optional)</h3>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {showAdvanced ? 'Hide Details' : 'Add Goal Details'}
            </button>
          </div>

          {/* Advanced Score Section */}
          {showAdvanced && (
            <div className="space-y-6 border-t pt-6">
              {/* Home Team Goals */}
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">{homeTeam} Goals</h4>
                {homeGoals.length > 0 ? (
                  <div className="space-y-3">
                    {homeGoals.map((goal, index) => (
                      <div key={goal.id} className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Player
                          </label>
                          <select
                            value={goal.player}
                            onChange={(e) => handleGoalChange('home', index, 'player', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                            disabled={isSubmitting}
                          >
                            <option value="">Select player</option>
                            {players.map(player => (
                              <option key={player} value={player}>{player}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Time (min)
                          </label>
                          <select
                            value={goal.time}
                            onChange={(e) => handleGoalChange('home', index, 'time', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                            disabled={isSubmitting}
                          >
                            <option value="">Select time</option>
                            {times.map(time => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 py-2">
                    No goals scored by {homeTeam}
                  </p>
                )}
              </div>

              {/* Away Team Goals */}
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">{awayTeam} Goals</h4>
                {awayGoals.length > 0 ? (
                  <div className="space-y-3">
                    {awayGoals.map((goal, index) => (
                      <div key={goal.id} className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Player
                          </label>
                          <select
                            value={goal.player}
                            onChange={(e) => handleGoalChange('away', index, 'player', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                            disabled={isSubmitting}
                          >
                            <option value="">Select player</option>
                            {players.map(player => (
                              <option key={player} value={player}>{player}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Time (min)
                          </label>
                          <select
                            value={goal.time}
                            onChange={(e) => handleGoalChange('away', index, 'time', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                            disabled={isSubmitting}
                          >
                            <option value="">Select time</option>
                            {times.map(time => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 py-2">
                    No goals scored by {awayTeam}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Updating...' : 'Update Score'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
