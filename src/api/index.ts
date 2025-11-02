// src/api/index.ts
export * from './config';
export * from './AuthService';
export * from './FixturesService';
export * from './ClubsService';
export * from './LeaguesService';
export * from './StatisticsService';
export * from './NewsService';
export * from './StoreService';

// Re-export the existing LoginService for backward compatibility
export { loginUser } from './LoginService';
