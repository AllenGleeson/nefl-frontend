"use client";

// src/components/Management/FixturesManagement/ScoreEntry.tsx
import { useState } from 'react';
import Modal from '../../Modal';
import { buttonStyles } from "@/components/ui/Button";

interface ScoreEntryProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  fixtureId: string;
  homeTeam: string;
  awayTeam: string;
  currentHomeScore?: number;
  currentAwayScore?: number;
  onScoreUpdate: (fixtureId: string, homeScore: number, awayScore: number) => void;
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      onScoreUpdate(fixtureId, homeScore, awayScore);
      onSuccess();
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScoreChange = (team: 'home' | 'away', value: string) => {
    const numValue = parseInt(value) || 0;
    if (team === 'home') {
      setHomeScore(numValue);
    } else {
      setAwayScore(numValue);
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
          <p className="text-sm text-[var(--md-on-surface-variant)] mt-1">Enter the final score for this match</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Score Section */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--md-on-surface)] mb-4">Score</h3>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex-1 text-center">
                <label className="block text-sm font-medium text-[var(--md-on-surface-variant)] mb-2">
                  {homeTeam}
                </label>
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={homeScore}
                  onChange={(e) => handleScoreChange('home', e.target.value)}
                  className="w-full text-center text-2xl font-bold border border-[var(--md-outline-variant)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)] disabled:bg-[var(--md-surface-container)]"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="text-2xl font-bold text-[var(--md-on-surface-variant)]">-</div>

              <div className="flex-1 text-center">
                <label className="block text-sm font-medium text-[var(--md-on-surface-variant)] mb-2">
                  {awayTeam}
                </label>
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={awayScore}
                  onChange={(e) => handleScoreChange('away', e.target.value)}
                  className="w-full text-center text-2xl font-bold border border-[var(--md-outline-variant)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)] disabled:bg-[var(--md-surface-container)]"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>


          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className={buttonStyles({ variant: "outline", size: "sm" })}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={buttonStyles({ size: "sm" })}
            >
              {isSubmitting ? 'Updating...' : 'Update Score'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
