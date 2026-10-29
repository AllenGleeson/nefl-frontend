"use client";

// src/components/Management/LeaguesManagement/AddLeagueForm.tsx
import { useState } from 'react';
import Modal from '../../Modal';
import { buttonStyles } from "@/components/ui/Button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AddLeagueForm({ isOpen, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    season: '',
    teams: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would make the actual API call to save the league
      
      // Reset form and close modal on success
      setFormData({
        name: '',
        season: '',
        teams: '',
        startDate: '',
        endDate: '',
        description: ''
      });
      
      onSuccess?.();
      onClose();
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New League" size="lg">
      <div className="bg-[var(--md-surface-container-lowest)] rounded-2xl shadow-sm border border-[var(--md-outline-variant)] p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--md-on-surface-variant)] mb-1">
              League Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter league name"
              className="w-full border border-[var(--md-outline-variant)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)] shadow-sm"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--md-on-surface-variant)] mb-1">
              Season
            </label>
            <input
              type="text"
              name="season"
              value={formData.season}
              onChange={handleChange}
              placeholder="e.g., 2024-25"
              className="w-full border border-[var(--md-outline-variant)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)] shadow-sm"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--md-on-surface-variant)] mb-1">
              Number of Teams
            </label>
            <input
              type="number"
              name="teams"
              value={formData.teams}
              onChange={handleChange}
              placeholder="e.g., 20"
              min="2"
              max="50"
              className="w-full border border-[var(--md-outline-variant)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)] shadow-sm"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--md-on-surface-variant)] mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border border-[var(--md-outline-variant)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)] shadow-sm"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--md-on-surface-variant)] mb-1">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border border-[var(--md-outline-variant)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)] shadow-sm"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--md-on-surface-variant)] mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter league description"
              rows={3}
              className="w-full border border-[var(--md-outline-variant)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)] shadow-sm"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] -mx-6 px-6 py-4 rounded-lg">
            <button
              type="button"
              onClick={handleClose}
              className={buttonStyles({ variant: "outline", size: "sm", className: "flex-1" })}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={buttonStyles({ size: "sm", className: "flex-1" })}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create League'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
