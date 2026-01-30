"use client";

import { useState, useEffect } from 'react';
import Modal from '../../Modal';

interface GoalDetail {
  id: string;
  player: string;
  time: string;
}

interface Fixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  league: string;
  status: 'scheduled' | 'live' | 'completed' | 'postponed';
  homeScore?: number;
  awayScore?: number;
  homeGoals?: GoalDetail[];
  awayGoals?: GoalDetail[];
}

interface EditFixtureFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  fixture?: Fixture | null;
}

export default function EditFixtureForm({ 
  isOpen, 
  onClose, 
  onSuccess, 
  fixture 
}: EditFixtureFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<{
    homeTeam: string;
    awayTeam: string;
    date: string;
    time: string;
    venue: string;
    league: string;
    status: 'scheduled' | 'live' | 'completed' | 'postponed';
    homeScore: string;
    awayScore: string;
  }>({
    homeTeam: '',
    awayTeam: '',
    date: '',
    time: '',
    venue: '',
    league: '',
    status: 'scheduled',
    homeScore: '',
    awayScore: ''
  });

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

  // Available teams and leagues for dropdowns
  const teams = [
    'Walshestown FC', 'Athboy Celtic', 'Dublin United', 'Cork City FC',
    'Galway United', 'Limerick FC', 'Waterford FC', 'Sligo Rovers',
    'Shamrock Rovers', 'Bohemians', 'St. Patrick\'s Athletic'
  ];

  const leagues = [
    'Division 1', 'Division 2', 'Premier League', 'Championship', 'League One'
  ];

  const statusOptions = [
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'live', label: 'Live' },
    { value: 'completed', label: 'Completed' },
    { value: 'postponed', label: 'Postponed' }
  ];

  // Update form data when fixture changes
  useEffect(() => {
    if (fixture) {
      setFormData({
        homeTeam: fixture.homeTeam,
        awayTeam: fixture.awayTeam,
        date: fixture.date,
        time: fixture.time,
        venue: fixture.venue,
        league: fixture.league,
        status: fixture.status,
        homeScore: fixture.homeScore?.toString() || '',
        awayScore: fixture.awayScore?.toString() || ''
      });
      setHomeGoals(fixture.homeGoals || []);
      setAwayGoals(fixture.awayGoals || []);
    }
  }, [fixture]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Handle score changes and adjust goal arrays
    if (name === 'homeScore') {
      const numValue = parseInt(value) || 0;
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
    } else if (name === 'awayScore') {
      const numValue = parseInt(value) || 0;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form
      setFormData({
        homeTeam: '',
        awayTeam: '',
        date: '',
        time: '',
        venue: '',
        league: '',
        status: 'scheduled',
        homeScore: '',
        awayScore: ''
      });

      onSuccess();
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Fixture">
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-600 mt-1">Update fixture details and scores</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Teams */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="homeTeam" className="block text-sm font-medium text-gray-700 mb-2">
                Home Team
              </label>
              <select
                id="homeTeam"
                name="homeTeam"
                value={formData.homeTeam}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              >
                <option value="">Select home team</option>
                {teams.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="awayTeam" className="block text-sm font-medium text-gray-700 mb-2">
                Away Team
              </label>
              <select
                id="awayTeam"
                name="awayTeam"
                value={formData.awayTeam}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              >
                <option value="">Select away team</option>
                {teams.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              />
            </div>
          </div>

          {/* Venue and League */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="venue" className="block text-sm font-medium text-gray-700 mb-2">
                Venue
              </label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                placeholder="Enter venue name"
              />
            </div>

            <div>
              <label htmlFor="league" className="block text-sm font-medium text-gray-700 mb-2">
                League
              </label>
              <select
                id="league"
                name="league"
                value={formData.league}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              >
                <option value="">Select league</option>
                {leagues.map(league => (
                  <option key={league} value={league}>{league}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* Scores */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Scores</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="homeScore" className="block text-sm font-medium text-gray-700 mb-2">
                  Home Score
                </label>
                <input
                  type="number"
                  id="homeScore"
                  name="homeScore"
                  value={formData.homeScore}
                  onChange={handleInputChange}
                  min="0"
                  max="99"
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="0"
                />
              </div>

              <div>
                <label htmlFor="awayScore" className="block text-sm font-medium text-gray-700 mb-2">
                  Away Score
                </label>
                <input
                  type="number"
                  id="awayScore"
                  name="awayScore"
                  value={formData.awayScore}
                  onChange={handleInputChange}
                  min="0"
                  max="99"
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="0"
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
                <h4 className="text-md font-medium text-gray-700 mb-3">{formData.homeTeam} Goals</h4>
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
                    No goals scored by {formData.homeTeam}
                  </p>
                )}
              </div>

              {/* Away Team Goals */}
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">{formData.awayTeam} Goals</h4>
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
                    No goals scored by {formData.awayTeam}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
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
              {isSubmitting ? 'Updating...' : 'Update Fixture'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
