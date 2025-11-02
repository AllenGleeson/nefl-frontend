"use client";

import React, { useState, useEffect } from 'react';
import { Formation, FormationPosition, Player, CreateFormationRequest } from '@/api/ClubsService';
import { FORMATION_TEMPLATES, FormationTemplate, getFormationsByCategory } from '@/data/formations';

interface FormationManagerProps {
  clubId: string;
  formations: Formation[];
  players: Player[];
  onFormationCreate: (data: CreateFormationRequest) => void;
  onFormationUpdate: (formationId: string, data: Partial<Formation>) => void;
  onFormationDelete: (formationId: string) => void;
  onFormationSelect: (formation: Formation) => void;
  selectedFormation?: Formation;
}

export default function FormationManager({
  clubId,
  formations,
  players,
  onFormationCreate,
  onFormationUpdate,
  onFormationDelete,
  onFormationSelect,
  selectedFormation
}: FormationManagerProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'defensive' | 'balanced' | 'attacking' | 'unconventional'>('all');
  const [editingFormation, setEditingFormation] = useState<Formation | null>(null);

  const handleUseTemplate = (template: FormationTemplate) => {
    // Check if we already have 3 favourite formations
    if (formations.length >= 3) {
      alert('You can only have a maximum of 3 favourite formations. Please remove one before adding another.');
      return;
    }

    const newFormation: CreateFormationRequest = {
      name: template.name,
      description: template.description,
      positions: template.positions.map((pos, index) => ({
        position: pos.position,
        x: pos.x,
        y: pos.y,
        isSubstitute: false
      })),
      isDefault: false
    };

    onFormationCreate(newFormation);
  };

  const handleSelectTemplate = (template: FormationTemplate) => {
    // Create a temporary formation object for viewing
    const tempFormation: Formation = {
      id: `temp-${template.id}`,
      name: template.name,
      description: template.description,
      positions: template.positions.map((pos, index) => ({
        id: `temp-pos-${index}`,
        position: pos.position,
        x: pos.x,
        y: pos.y,
        isSubstitute: false
      })),
      isDefault: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onFormationSelect(tempFormation);
  };

  const getFilteredTemplates = () => {
    if (selectedCategory === 'all') {
      return FORMATION_TEMPLATES;
    }
    return getFormationsByCategory(selectedCategory);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'defensive': return 'bg-red-100 text-red-800 border-red-200';
      case 'balanced': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'attacking': return 'bg-green-100 text-green-800 border-green-200';
      case 'unconventional': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteFormation = (formationId: string) => {
    if (confirm('Are you sure you want to delete this formation?')) {
      onFormationDelete(formationId);
    }
  };

  const handleSetDefault = (formationId: string) => {
    // First, set all formations to not be default
    formations.forEach(formation => {
      if (formation.isDefault) {
        onFormationUpdate(formation.id, { isDefault: false });
      }
    });
    // Then set the selected formation as default
    onFormationUpdate(formationId, { isDefault: true });
  };

  return (
    <div className="space-y-6">
      {/* Favourite Formations */}
      {formations.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Favourite Formations ({formations.length}/3)</h3>
            {formations.length >= 3 && (
              <span className="text-sm text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                Maximum favourites reached
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {formations.map((formation) => (
              <div
                key={formation.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedFormation?.id === formation.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onFormationSelect(formation)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{formation.name}</h4>
                  {formation.isDefault && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Active
                    </span>
                  )}
                </div>
                {formation.description && (
                  <p className="text-sm text-gray-600 mb-2">{formation.description}</p>
                )}
                <div className="flex space-x-2">
                  {!formation.isDefault && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSetDefault(formation.id);
                      }}
                      className="text-sm text-green-600 hover:text-green-800 font-medium"
                    >
                      Set as Active
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFormation(formation.id);
                    }}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Formation Templates */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Available Formations</h3>
          <div className="flex space-x-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="defensive">Defensive</option>
              <option value="balanced">Balanced</option>
              <option value="attacking">Attacking</option>
              <option value="unconventional">Unconventional</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getFilteredTemplates().map((template) => (
            <div
              key={template.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{template.name}</h4>
                <div className="flex space-x-1">
                  <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(template.category)}`}>
                    {template.category}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(template.difficulty)}`}>
                    {template.difficulty}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {template.positions.length} players
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSelectTemplate(template)}
                    className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                  >
                    Select Formation
                  </button>
                  <button
                    onClick={() => handleUseTemplate(template)}
                    className={`px-3 py-1 text-white text-sm rounded transition-colors ${
                      formations.length >= 3 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                    disabled={formations.length >= 3}
                  >
                    {formations.length >= 3 ? 'Max 3 Favourites' : 'Add to Favourites'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
