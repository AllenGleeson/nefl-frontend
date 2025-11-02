"use client";

// src/components/Management/ClubsManagement/AddClubForm.tsx
import { useState, useEffect, useRef } from 'react';
import Modal from '../../Modal';

type Props = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function AddClubForm({ isOpen, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    leagues: [] as string[],
    founded: '',
    stadium: '',
    manager: '',
    website: '',
    email: '',
    latitude: '',
    longitude: '',
    logo: null as File | null
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLeagueDropdownOpen, setIsLeagueDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock list of users with manager role - in real app this would come from API
  const managerUsers = [
    { id: '1', name: 'John Smith', email: 'john.smith@nefl.com' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah.johnson@nefl.com' },
    { id: '3', name: 'Mike O\'Brien', email: 'mike.obrien@nefl.com' },
    { id: '4', name: 'Pat Murphy', email: 'pat.murphy@nefl.com' },
    { id: '5', name: 'Emma Davis', email: 'emma.davis@nefl.com' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLeagueDropdownOpen(false);
      }
    };

    if (isLeagueDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLeagueDropdownOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that at least one league is selected
    if (formData.leagues.length === 0) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Adding club:', formData);
      // Here you would make the actual API call to save the club
      
      // Reset form and close modal on success
      setFormData({
        name: '',
        leagues: [],
        founded: '',
        stadium: '',
        manager: '',
        website: '',
        email: '',
        latitude: '',
        longitude: '',
        logo: null
      });
      
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error adding club:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLeagueToggle = (league: string) => {
    setFormData(prev => ({
      ...prev,
      leagues: prev.leagues.includes(league)
        ? prev.leagues.filter(l => l !== league)
        : [...prev.leagues, league]
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        logo: file
      }));
    }
  };

  const removeLogo = () => {
    setFormData(prev => ({
      ...prev,
      logo: null
    }));
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setIsLeagueDropdownOpen(false);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Club" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Club Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter club name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Leagues *
          </label>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsLeagueDropdownOpen(!isLeagueDropdownOpen)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-green-500 bg-white flex items-center justify-between"
              disabled={isSubmitting}
            >
              <span className={formData.leagues.length === 0 ? 'text-gray-500' : 'text-gray-900'}>
                {formData.leagues.length === 0 
                  ? 'Select Leagues' 
                  : `${formData.leagues.length} league${formData.leagues.length === 1 ? '' : 's'} selected`
                }
              </span>
              <svg 
                className={`w-5 h-5 text-gray-400 transition-transform ${isLeagueDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isLeagueDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                <div className="p-2">
                  {['Premier League', 'Championship', 'League One', 'League Two', 'Division 1', 'Division 2', 'Youth League'].map((league) => (
                    <label key={league} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.leagues.includes(league)}
                        onChange={() => handleLeagueToggle(league)}
                        disabled={isSubmitting}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{league}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {formData.leagues.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-1">Selected leagues:</p>
              <div className="flex flex-wrap gap-1">
                {formData.leagues.map((league) => (
                  <span
                    key={league}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {league}
                    <button
                      type="button"
                      onClick={() => handleLeagueToggle(league)}
                      className="ml-1 text-green-600 hover:text-green-800"
                      disabled={isSubmitting}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {formData.leagues.length === 0 && (
            <p className="text-sm text-red-500 mt-1">Please select at least one league</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Founded Year *
            </label>
            <input
              type="number"
              name="founded"
              value={formData.founded}
              onChange={handleChange}
              placeholder="e.g., 1878"
              min="1800"
              max="2024"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stadium *
            </label>
            <input
              type="text"
              name="stadium"
              value={formData.stadium}
              onChange={handleChange}
              placeholder="Enter stadium name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Manager
          </label>
          <select
            name="manager"
            value={formData.manager}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isSubmitting}
          >
            <option value="">No Manager Assigned</option>
            {managerUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">Select from users with manager role (optional)</p>
        </div>

        {/* Location Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Latitude
              </label>
              <input
                type="number"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="e.g., 53.3498"
                step="any"
                min="-90"
                max="90"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={isSubmitting}
              />
              <p className="text-sm text-gray-500 mt-1">Decimal degrees (-90 to 90)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Longitude
              </label>
              <input
                type="number"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="e.g., -6.2603"
                step="any"
                min="-180"
                max="180"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={isSubmitting}
              />
              <p className="text-sm text-gray-500 mt-1">Decimal degrees (-180 to 180)</p>
            </div>
          </div>
        </div>

        {/* Logo Upload Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Club Logo</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Logo
            </label>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="logo-upload"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="logo-upload"
                  className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Choose File
                </label>
                <span className="text-sm text-gray-500">
                  {formData.logo ? formData.logo.name : 'No file selected'}
                </span>
              </div>
              
              {formData.logo && (
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                    <img
                      src={URL.createObjectURL(formData.logo)}
                      alt="Logo preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{formData.logo.name}</p>
                    <p className="text-sm text-gray-500">
                      {(formData.logo.size / 1024).toFixed(1)} KB
                    </p>
                    <button
                      type="button"
                      onClick={removeLogo}
                      className="text-sm text-red-600 hover:text-red-800 mt-1"
                      disabled={isSubmitting}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Recommended: Square image, minimum 200x200px, max 2MB
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="club@example.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Club'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
