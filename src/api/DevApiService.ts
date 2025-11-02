// src/api/DevApiService.ts
// Development API service that uses mock data when backend is not available
import { mockUsers, mockFixtures, mockClubs, mockProducts } from './mockData';

export class DevApiService {
  // Simulate API delay
  private static delay(ms: number = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Mock authentication
  static async login(email: string, password: string) {
    await this.delay();
    
    const user = mockUsers.find(u => u.email === email);
    if (!user || password !== 'password123') {
      throw new Error('Invalid credentials');
    }

    return {
      token: `mock-token-${user.id}`,
      user,
      expiresIn: 3600
    };
  }

  // Mock fixtures
  static async getFixtures() {
    await this.delay();
    return mockFixtures;
  }

  static async getFixture(id: string) {
    await this.delay();
    const fixture = mockFixtures.find(f => f.id === id);
    if (!fixture) throw new Error('Fixture not found');
    return fixture;
  }

  static async createFixture(data: any) {
    await this.delay();
    const newFixture = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockFixtures.push(newFixture);
    return newFixture;
  }

  // Mock clubs
  static async getClubs() {
    await this.delay();
    return mockClubs;
  }

  static async getClub(id: string) {
    await this.delay();
    const club = mockClubs.find(c => c.id === id);
    if (!club) throw new Error('Club not found');
    return club;
  }

  static async createClub(data: any) {
    await this.delay();
    const newClub = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockClubs.push(newClub);
    return newClub;
  }

  // Mock products
  static async getProducts() {
    await this.delay();
    return {
      products: mockProducts,
      total: mockProducts.length,
      page: 1,
      totalPages: 1
    };
  }

  static async getProduct(id: string) {
    await this.delay();
    const product = mockProducts.find(p => p.id === id);
    if (!product) throw new Error('Product not found');
    return product;
  }

  static async createProduct(data: any) {
    await this.delay();
    const newProduct = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockProducts.push(newProduct);
    return newProduct;
  }

  // Mock news
  static async getNews() {
    await this.delay();
    // This would use the newsPosts from your data file
    return {
      articles: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false
      }
    };
  }

  // Mock statistics
  static async getPlayerStats() {
    await this.delay();
    return [
      {
        playerId: '1',
        playerName: 'Erling Haaland',
        teamId: '1',
        teamName: 'Manchester City',
        position: 'ST',
        season: '2023-24',
        matchesPlayed: 25,
        minutesPlayed: 2100,
        goals: 28,
        assists: 5,
        yellowCards: 2,
        redCards: 0,
        shots: 120,
        shotsOnTarget: 45,
        passes: 450,
        passAccuracy: 85.5,
        tackles: 12,
        interceptions: 8,
        rating: 8.2
      }
    ];
  }

  static async getTeamStats() {
    await this.delay();
    return [
      {
        teamId: '1',
        teamName: 'Manchester City',
        season: '2023-24',
        matchesPlayed: 20,
        wins: 15,
        draws: 3,
        losses: 2,
        goalsFor: 45,
        goalsAgainst: 15,
        goalDifference: 30,
        points: 48,
        averagePossession: 68.5,
        averageShots: 18.2,
        averageShotsOnTarget: 6.8,
        averagePasses: 650,
        averagePassAccuracy: 89.2,
        averageTackles: 15.3,
        averageInterceptions: 12.1,
        cleanSheets: 8,
        goalsConceded: 15,
        yellowCards: 25,
        redCards: 1
      }
    ];
  }
}
