// src/api/NewsService.ts
import { API_ENDPOINTS, apiRequest } from './config';

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorId: string;
  category: string;
  tags: string[];
  image: string;
  isFeatured: boolean;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNewsRequest {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image?: string;
  isFeatured?: boolean;
  status?: 'draft' | 'published';
}

export interface UpdateNewsRequest {
  title?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  tags?: string[];
  image?: string;
  isFeatured?: boolean;
  status?: NewsArticle['status'];
}

export interface NewsFilters {
  category?: string;
  author?: string;
  status?: NewsArticle['status'];
  isFeatured?: boolean;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  tags?: string[];
}

export interface NewsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface NewsResponse {
  articles: NewsArticle[];
  pagination: NewsPagination;
}

export class NewsService {
  // Get all news articles with pagination and filters
  static async getNews(
    page = 1,
    limit = 10,
    filters?: NewsFilters
  ): Promise<NewsResponse> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(item => params.append(key, item));
          } else {
            params.append(key, value.toString());
          }
        }
      });
    }
    
    const url = `${API_ENDPOINTS.NEWS.BASE}?${params.toString()}`;
    return apiRequest<NewsResponse>(url, { method: 'GET' });
  }

  // Get news article by ID
  static async getArticle(id: string): Promise<NewsArticle> {
    return apiRequest<NewsArticle>(`${API_ENDPOINTS.NEWS.BASE}/${id}`, {
      method: 'GET',
    });
  }

  // Create new news article
  static async createArticle(data: CreateNewsRequest): Promise<NewsArticle> {
    return apiRequest<NewsArticle>(API_ENDPOINTS.NEWS.BASE, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Update news article
  static async updateArticle(id: string, data: UpdateNewsRequest): Promise<NewsArticle> {
    return apiRequest<NewsArticle>(`${API_ENDPOINTS.NEWS.BASE}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Delete news article
  static async deleteArticle(id: string): Promise<{ message: string }> {
    return apiRequest<{ message: string }>(`${API_ENDPOINTS.NEWS.BASE}/${id}`, {
      method: 'DELETE',
    });
  }

  // Get featured articles
  static async getFeaturedArticles(limit = 5): Promise<NewsArticle[]> {
    return apiRequest<NewsArticle[]>(`${API_ENDPOINTS.NEWS.FEATURED}?limit=${limit}`, {
      method: 'GET',
    });
  }

  // Get articles by category
  static async getArticlesByCategory(
    category: string,
    page = 1,
    limit = 10
  ): Promise<NewsResponse> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    const url = `${API_ENDPOINTS.NEWS.BY_CATEGORY}/${category}?${params.toString()}`;
    return apiRequest<NewsResponse>(url, { method: 'GET' });
  }

  // Search articles
  static async searchArticles(
    query: string,
    page = 1,
    limit = 10
  ): Promise<NewsResponse> {
    const params = new URLSearchParams();
    params.append('q', query);
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    const url = `${API_ENDPOINTS.NEWS.BASE}/search?${params.toString()}`;
    return apiRequest<NewsResponse>(url, { method: 'GET' });
  }

  // Increment article views
  static async incrementViews(id: string): Promise<{ views: number }> {
    return apiRequest<{ views: number }>(`${API_ENDPOINTS.NEWS.BASE}/${id}/views`, {
      method: 'POST',
    });
  }

  // Like/unlike article
  static async toggleLike(id: string): Promise<{ liked: boolean; likes: number }> {
    return apiRequest<{ liked: boolean; likes: number }>(`${API_ENDPOINTS.NEWS.BASE}/${id}/like`, {
      method: 'POST',
    });
  }

  // Get article statistics
  static async getArticleStats(id: string): Promise<{
    views: number;
    likes: number;
    shares: number;
    comments: number;
  }> {
    return apiRequest<any>(`${API_ENDPOINTS.NEWS.BASE}/${id}/stats`, {
      method: 'GET',
    });
  }

  // Get all categories
  static async getCategories(): Promise<string[]> {
    return apiRequest<string[]>(`${API_ENDPOINTS.NEWS.BASE}/categories`, {
      method: 'GET',
    });
  }

  // Get all tags
  static async getTags(): Promise<string[]> {
    return apiRequest<string[]>(`${API_ENDPOINTS.NEWS.BASE}/tags`, {
      method: 'GET',
    });
  }

  // Publish article
  static async publishArticle(id: string): Promise<NewsArticle> {
    return apiRequest<NewsArticle>(`${API_ENDPOINTS.NEWS.BASE}/${id}/publish`, {
      method: 'POST',
    });
  }

  // Archive article
  static async archiveArticle(id: string): Promise<NewsArticle> {
    return apiRequest<NewsArticle>(`${API_ENDPOINTS.NEWS.BASE}/${id}/archive`, {
      method: 'POST',
    });
  }

  // Bulk operations
  static async bulkUpdateArticles(
    updates: Array<{ id: string; data: UpdateNewsRequest }>
  ): Promise<NewsArticle[]> {
    return apiRequest<NewsArticle[]>(`${API_ENDPOINTS.NEWS.BASE}/bulk`, {
      method: 'PUT',
      body: JSON.stringify({ updates }),
    });
  }

  static async bulkDeleteArticles(ids: string[]): Promise<{ message: string; deletedCount: number }> {
    return apiRequest<{ message: string; deletedCount: number }>(`${API_ENDPOINTS.NEWS.BASE}/bulk`, {
      method: 'DELETE',
      body: JSON.stringify({ ids }),
    });
  }
}
