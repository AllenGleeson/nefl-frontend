// src/data/formations.ts
// Predefined football formations with standard positions

export interface FormationTemplate {
  id: string;
  name: string;
  description: string;
  positions: Array<{
    position: string;
    x: number;
    y: number;
  }>;
  category: 'defensive' | 'balanced' | 'attacking' | 'unconventional';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const FORMATION_TEMPLATES: FormationTemplate[] = [
  // DEFENSIVE FORMATIONS
  {
    id: '5-4-1',
    name: '5-4-1',
    description: 'Ultra-defensive formation with 5 defenders',
    category: 'defensive',
    difficulty: 'beginner',
    positions: [
      { position: 'GK', x: 50, y: 5 },
      { position: 'CB', x: 25, y: 20 },
      { position: 'CB', x: 50, y: 20 },
      { position: 'CB', x: 75, y: 20 },
      { position: 'LWB', x: 15, y: 35 },
      { position: 'RWB', x: 85, y: 35 },
      { position: 'CM', x: 35, y: 50 },
      { position: 'CM', x: 65, y: 50 },
      { position: 'LM', x: 20, y: 65 },
      { position: 'RM', x: 80, y: 65 },
      { position: 'ST', x: 50, y: 85 }
    ]
  },
  {
    id: '4-5-1',
    name: '4-5-1',
    description: 'Defensive formation with packed midfield',
    category: 'defensive',
    difficulty: 'beginner',
    positions: [
      { position: 'GK', x: 50, y: 5 },
      { position: 'LB', x: 20, y: 25 },
      { position: 'CB', x: 35, y: 25 },
      { position: 'CB', x: 65, y: 25 },
      { position: 'RB', x: 80, y: 25 },
      { position: 'CDM', x: 50, y: 40 },
      { position: 'CM', x: 30, y: 55 },
      { position: 'CM', x: 50, y: 55 },
      { position: 'CM', x: 70, y: 55 },
      { position: 'CAM', x: 50, y: 70 },
      { position: 'ST', x: 50, y: 85 }
    ]
  },

  // BALANCED FORMATIONS
  {
    id: '4-4-2',
    name: '4-4-2',
    description: 'Classic balanced formation with two strikers',
    category: 'balanced',
    difficulty: 'beginner',
    positions: [
      { position: 'GK', x: 50, y: 5 },
      { position: 'LB', x: 20, y: 25 },
      { position: 'CB', x: 35, y: 25 },
      { position: 'CB', x: 65, y: 25 },
      { position: 'RB', x: 80, y: 25 },
      { position: 'LM', x: 20, y: 45 },
      { position: 'CM', x: 40, y: 45 },
      { position: 'CM', x: 60, y: 45 },
      { position: 'RM', x: 80, y: 45 },
      { position: 'ST', x: 40, y: 75 },
      { position: 'ST', x: 60, y: 75 }
    ]
  },
  {
    id: '4-4-1-1',
    name: '4-4-1-1',
    description: 'Balanced formation with attacking midfielder',
    category: 'balanced',
    difficulty: 'intermediate',
    positions: [
      { position: 'GK', x: 50, y: 5 },
      { position: 'LB', x: 20, y: 25 },
      { position: 'CB', x: 35, y: 25 },
      { position: 'CB', x: 65, y: 25 },
      { position: 'RB', x: 80, y: 25 },
      { position: 'LM', x: 20, y: 45 },
      { position: 'CM', x: 40, y: 45 },
      { position: 'CM', x: 60, y: 45 },
      { position: 'RM', x: 80, y: 45 },
      { position: 'CAM', x: 50, y: 65 },
      { position: 'ST', x: 50, y: 85 }
    ]
  },
  {
    id: '4-2-3-1',
    name: '4-2-3-1',
    description: 'Modern balanced formation with double pivot',
    category: 'balanced',
    difficulty: 'intermediate',
    positions: [
      { position: 'GK', x: 50, y: 5 },
      { position: 'LB', x: 20, y: 25 },
      { position: 'CB', x: 35, y: 25 },
      { position: 'CB', x: 65, y: 25 },
      { position: 'RB', x: 80, y: 25 },
      { position: 'CDM', x: 40, y: 40 },
      { position: 'CDM', x: 60, y: 40 },
      { position: 'LW', x: 20, y: 60 },
      { position: 'CAM', x: 50, y: 60 },
      { position: 'RW', x: 80, y: 60 },
      { position: 'ST', x: 50, y: 80 }
    ]
  },

  // ATTACKING FORMATIONS
  {
    id: '4-3-3',
    name: '4-3-3',
    description: 'Attacking formation with wingers',
    category: 'attacking',
    difficulty: 'intermediate',
    positions: [
      { position: 'GK', x: 50, y: 5 },
      { position: 'LB', x: 20, y: 25 },
      { position: 'CB', x: 35, y: 25 },
      { position: 'CB', x: 65, y: 25 },
      { position: 'RB', x: 80, y: 25 },
      { position: 'CDM', x: 50, y: 40 },
      { position: 'CM', x: 35, y: 55 },
      { position: 'CM', x: 65, y: 55 },
      { position: 'LW', x: 20, y: 75 },
      { position: 'ST', x: 50, y: 75 },
      { position: 'RW', x: 80, y: 75 }
    ]
  },
  {
    id: '3-4-3',
    name: '3-4-3',
    description: 'Very attacking formation with 3 forwards',
    category: 'attacking',
    difficulty: 'advanced',
    positions: [
      { position: 'GK', x: 50, y: 5 },
      { position: 'CB', x: 30, y: 25 },
      { position: 'CB', x: 50, y: 25 },
      { position: 'CB', x: 70, y: 25 },
      { position: 'LWB', x: 15, y: 45 },
      { position: 'RWB', x: 85, y: 45 },
      { position: 'CM', x: 40, y: 60 },
      { position: 'CM', x: 60, y: 60 },
      { position: 'LW', x: 20, y: 80 },
      { position: 'ST', x: 50, y: 80 },
      { position: 'RW', x: 80, y: 80 }
    ]
  },
  {
    id: '4-1-4-1',
    name: '4-1-4-1',
    description: 'Attacking formation with single pivot',
    category: 'attacking',
    difficulty: 'advanced',
    positions: [
      { position: 'GK', x: 50, y: 5 },
      { position: 'LB', x: 20, y: 25 },
      { position: 'CB', x: 35, y: 25 },
      { position: 'CB', x: 65, y: 25 },
      { position: 'RB', x: 80, y: 25 },
      { position: 'CDM', x: 50, y: 40 },
      { position: 'LM', x: 20, y: 60 },
      { position: 'CM', x: 40, y: 60 },
      { position: 'CM', x: 60, y: 60 },
      { position: 'RM', x: 80, y: 60 },
      { position: 'ST', x: 50, y: 80 }
    ]
  },

  // UNCONVENTIONAL FORMATIONS
  {
    id: '3-5-2',
    name: '3-5-2',
    description: 'Unconventional formation with wing-backs',
    category: 'unconventional',
    difficulty: 'advanced',
    positions: [
      { position: 'GK', x: 50, y: 5 },
      { position: 'CB', x: 30, y: 25 },
      { position: 'CB', x: 50, y: 25 },
      { position: 'CB', x: 70, y: 25 },
      { position: 'LWB', x: 15, y: 45 },
      { position: 'CDM', x: 50, y: 40 },
      { position: 'RWB', x: 85, y: 45 },
      { position: 'CM', x: 35, y: 60 },
      { position: 'CM', x: 65, y: 60 },
      { position: 'ST', x: 40, y: 80 },
      { position: 'ST', x: 60, y: 80 }
    ]
  },
  {
    id: '4-2-2-2',
    name: '4-2-2-2',
    description: 'Diamond midfield with two strikers',
    category: 'unconventional',
    difficulty: 'advanced',
    positions: [
      { position: 'GK', x: 50, y: 5 },
      { position: 'LB', x: 20, y: 25 },
      { position: 'CB', x: 35, y: 25 },
      { position: 'CB', x: 65, y: 25 },
      { position: 'RB', x: 80, y: 25 },
      { position: 'CDM', x: 40, y: 40 },
      { position: 'CDM', x: 60, y: 40 },
      { position: 'CAM', x: 30, y: 60 },
      { position: 'CAM', x: 70, y: 60 },
      { position: 'ST', x: 40, y: 80 },
      { position: 'ST', x: 60, y: 80 }
    ]
  },
  {
    id: '5-3-2',
    name: '5-3-2',
    description: 'Defensive formation with wing-backs',
    category: 'unconventional',
    difficulty: 'intermediate',
    positions: [
      { position: 'GK', x: 50, y: 5 },
      { position: 'CB', x: 25, y: 20 },
      { position: 'CB', x: 50, y: 20 },
      { position: 'CB', x: 75, y: 20 },
      { position: 'LWB', x: 15, y: 40 },
      { position: 'RWB', x: 85, y: 40 },
      { position: 'CM', x: 35, y: 60 },
      { position: 'CM', x: 50, y: 60 },
      { position: 'CM', x: 65, y: 60 },
      { position: 'ST', x: 40, y: 80 },
      { position: 'ST', x: 60, y: 80 }
    ]
  },
  {
    id: '4-6-0',
    name: '4-6-0 (False 9)',
    description: 'Revolutionary formation without traditional striker',
    category: 'unconventional',
    difficulty: 'advanced',
    positions: [
      { position: 'GK', x: 50, y: 5 },
      { position: 'LB', x: 20, y: 25 },
      { position: 'CB', x: 35, y: 25 },
      { position: 'CB', x: 65, y: 25 },
      { position: 'RB', x: 80, y: 25 },
      { position: 'CDM', x: 50, y: 40 },
      { position: 'CM', x: 30, y: 55 },
      { position: 'CM', x: 50, y: 55 },
      { position: 'CM', x: 70, y: 55 },
      { position: 'CAM', x: 40, y: 75 },
      { position: 'CAM', x: 60, y: 75 }
    ]
  }
];

// Helper functions
export const getFormationsByCategory = (category: FormationTemplate['category']) => {
  return FORMATION_TEMPLATES.filter(formation => formation.category === category);
};

export const getFormationsByDifficulty = (difficulty: FormationTemplate['difficulty']) => {
  return FORMATION_TEMPLATES.filter(formation => formation.difficulty === difficulty);
};

export const getFormationById = (id: string) => {
  return FORMATION_TEMPLATES.find(formation => formation.id === id);
};

