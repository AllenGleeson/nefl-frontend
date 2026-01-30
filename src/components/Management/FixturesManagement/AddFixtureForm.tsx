"use client";

// src/components/Management/FixturesManagement/AddFixtureForm.tsx
import { useState, useEffect } from 'react';
import Modal from '../../Modal';

interface Team {
  id: string;
  name: string;
  ground: string;
  league: string;
}

type Props = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function AddFixtureForm({ isOpen, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    homeTeam: '',
    awayTeam: '',
    league: '',
    date: '',
    time: '',
    venue: '',
    homeScore: '',
    awayScore: '',
    status: 'scheduled'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock teams data - in real app, this would come from API
  // Note: Teams can be in multiple leagues, so we show their primary league here
  const [teams] = useState<Team[]>([
    { id: '1', name: 'Walshestown FC', ground: 'Walshestown Park', league: 'Division 1' },
    { id: '2', name: 'Athboy Celtic', ground: 'Athboy Sports Complex', league: 'Division 1' },
    { id: '3', name: 'Dublin United', ground: 'Dublin Sports Ground', league: 'Division 1' },
    { id: '4', name: 'Cork City', ground: 'Turner\'s Cross', league: 'Division 2' },
    { id: '5', name: 'Galway United', ground: 'Eamonn Deacy Park', league: 'Division 2' },
    { id: '6', name: 'Limerick FC', ground: 'Markets Field', league: 'Division 2' },
    { id: '7', name: 'Shamrock Rovers', ground: 'Tallaght Stadium', league: 'Premier League' },
    { id: '8', name: 'Bohemians', ground: 'Dalymount Park', league: 'Premier League' },
    { id: '9', name: 'St. Patrick\'s Athletic', ground: 'Richmond Park', league: 'Premier League' }
  ]);

  // Auto-populate venue when home team is selected
  useEffect(() => {
    if (formData.homeTeam) {
      const selectedTeam = teams.find(team => team.name === formData.homeTeam);
      if (selectedTeam) {
        setFormData(prev => ({
          ...prev,
          venue: selectedTeam.ground
        }));
      }
    }
  }, [formData.homeTeam, teams]);

  // Get unique leagues from teams data
  const availableLeagues = Array.from(new Set(teams.map(team => team.league))).sort();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would make the actual API call to save the fixture
      
      // Reset form and close modal on success
      setFormData({
        homeTeam: '',
        awayTeam: '',
        league: '',
        date: '',
        time: '',
        venue: '',
        homeScore: '',
        awayScore: '',
        status: 'scheduled'
      });
      
      onSuccess?.();
      onClose();
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Auto-update status when scores are entered
    if (name === 'homeScore' || name === 'awayScore') {
      const homeScore = name === 'homeScore' ? value : formData.homeScore;
      const awayScore = name === 'awayScore' ? value : formData.awayScore;
      
      if (homeScore && awayScore) {
        setFormData(prev => ({
          ...prev,
          status: 'completed'
        }));
      } else if (homeScore || awayScore) {
        setFormData(prev => ({
          ...prev,
          status: 'live'
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          status: 'scheduled'
        }));
      }
    }
  };

  // Filter away teams to exclude the selected home team
  const availableAwayTeams = teams.filter(team => team.name !== formData.homeTeam);

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Fixture" size="xl">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Home Team *
          </label>
          <select
            name="homeTeam"
            value={formData.homeTeam}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            required
            disabled={isSubmitting}
          >
              <option value="">Select Home Team</option>
              {teams.map(team => (
                <option key={team.id} value={team.name}>{team.name}</option>
              ))}
            </select>
          </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Away Team *
          </label>
          <select
            name="awayTeam"
            value={formData.awayTeam}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            required
            disabled={!formData.homeTeam || isSubmitting}
          >
              <option value="">Select Away Team</option>
              {availableAwayTeams.map(team => (
                <option key={team.id} value={team.name}>{team.name}</option>
              ))}
            </select>
          </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            League *
          </label>
          <select
            name="league"
            value={formData.league}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            required
            disabled={isSubmitting}
          >
            <option value="">Select League</option>
            {availableLeagues.map(league => (
              <option key={league} value={league}>{league}</option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">Select the league for this fixture</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time *
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Venue
          </label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-600"
            readOnly
          />
          <p className="text-sm text-gray-500 mt-1">Auto-populated from home team&apos;s ground</p>
        </div>

        {/* Score Section */}
        <div className="border-t border-gray-200 pt-6 bg-gray-50 -mx-6 px-6 py-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Match Score (Optional)</h3>
          <div className="grid grid-cols-3 gap-2 sm:gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {formData.homeTeam || 'Home Team'} Score
              </label>
              <input
                type="number"
                name="homeScore"
                value={formData.homeScore}
                onChange={handleChange}
                min="0"
                max="99"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                placeholder="0"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="text-center">
              <span className="text-2xl font-bold text-gray-400">-</span>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {formData.awayTeam || 'Away Team'} Score
              </label>
              <input
                type="number"
                name="awayScore"
                value={formData.awayScore}
                onChange={handleChange}
                min="0"
                max="99"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                placeholder="0"
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Match Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              disabled={isSubmitting}
            >
              <option value="scheduled">Scheduled</option>
              <option value="live">Live</option>
              <option value="completed">Completed</option>
              <option value="postponed">Postponed</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">
              Status auto-updates when scores are entered
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 bg-white -mx-6 px-6 py-4 rounded-lg">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors shadow-sm"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Fixture'}
          </button>
        </div>
        </form>
      </div>
    </Modal>
  );
}
