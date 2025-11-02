// Types for club management functionality

export interface FormationPosition {
  id: string;
  position: string;
  x: number;
  y: number;
  playerId?: string;
  playerName?: string;
}

export interface Formation {
  id: string;
  name: string;
  description?: string;
  positions: FormationPosition[];
  isDefault?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Player {
  id: string;
  clubId: string;
  name: string;
  position: string;
  jerseyNumber: number;
  age: number;
  joinedDate: string;
  status: 'active' | 'inactive';
}

export interface Club {
  id: string;
  name: string;
  shortName: string;
  founded: number;
  ground: string;
  manager: string;
  email?: string;
  phone?: string;
  address: string;
  logo: string;
  colors: {
    primary: string;
    secondary: string;
  };
  leagues: string[];
  status: 'active' | 'inactive';
  formation?: Formation;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateFormationRequest {
  name: string;
  description?: string;
  positions: Omit<FormationPosition, 'id' | 'playerId' | 'playerName'>[];
  isDefault?: boolean;
}

