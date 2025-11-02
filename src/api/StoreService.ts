// src/api/StoreService.ts
import { API_ENDPOINTS, apiRequest } from './config';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  sku: string;
  stock: number;
  images: string[];
  tags: string[];
  specifications?: Record<string, any>;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  status: 'active' | 'inactive' | 'out_of_stock' | 'discontinued';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  children?: ProductCategory[];
  productCount: number;
  image?: string;
  status: 'active' | 'inactive';
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippingAddress: Address;
  billingAddress: Address;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  sku: string;
  stock: number;
  images: string[];
  tags: string[];
  specifications?: Record<string, any>;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  featured?: boolean;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  originalPrice?: number;
  category?: string;
  subcategory?: string;
  sku?: string;
  stock?: number;
  images?: string[];
  tags?: string[];
  specifications?: Record<string, any>;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  status?: Product['status'];
  featured?: boolean;
}

export interface StoreFilters {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: Product['status'];
  featured?: boolean;
  search?: string;
  tags?: string[];
  inStock?: boolean;
}

export class StoreService {
  // Get all products with filters and pagination
  static async getProducts(
    page = 1,
    limit = 20,
    filters?: StoreFilters
  ): Promise<{ products: Product[]; total: number; page: number; totalPages: number }> {
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
    
    const url = `${API_ENDPOINTS.STORE.PRODUCTS}?${params.toString()}`;
    return apiRequest<any>(url, { method: 'GET' });
  }

  // Get product by ID
  static async getProduct(id: string): Promise<Product> {
    return apiRequest<Product>(`${API_ENDPOINTS.STORE.PRODUCTS}/${id}`, {
      method: 'GET',
    });
  }

  // Create new product
  static async createProduct(data: CreateProductRequest): Promise<Product> {
    return apiRequest<Product>(API_ENDPOINTS.STORE.PRODUCTS, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Update product
  static async updateProduct(id: string, data: UpdateProductRequest): Promise<Product> {
    return apiRequest<Product>(`${API_ENDPOINTS.STORE.PRODUCTS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Delete product
  static async deleteProduct(id: string): Promise<{ message: string }> {
    return apiRequest<{ message: string }>(`${API_ENDPOINTS.STORE.PRODUCTS}/${id}`, {
      method: 'DELETE',
    });
  }

  // Get product categories
  static async getCategories(): Promise<ProductCategory[]> {
    return apiRequest<ProductCategory[]>(API_ENDPOINTS.STORE.CATEGORIES, {
      method: 'GET',
    });
  }

  // Create category
  static async createCategory(data: Omit<ProductCategory, 'id' | 'productCount'>): Promise<ProductCategory> {
    return apiRequest<ProductCategory>(API_ENDPOINTS.STORE.CATEGORIES, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Update category
  static async updateCategory(id: string, data: Partial<ProductCategory>): Promise<ProductCategory> {
    return apiRequest<ProductCategory>(`${API_ENDPOINTS.STORE.CATEGORIES}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Delete category
  static async deleteCategory(id: string): Promise<{ message: string }> {
    return apiRequest<{ message: string }>(`${API_ENDPOINTS.STORE.CATEGORIES}/${id}`, {
      method: 'DELETE',
    });
  }

  // Search products
  static async searchProducts(
    query: string,
    page = 1,
    limit = 20
  ): Promise<{ products: Product[]; total: number; page: number; totalPages: number }> {
    const params = new URLSearchParams();
    params.append('q', query);
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    const url = `${API_ENDPOINTS.STORE.PRODUCTS}/search?${params.toString()}`;
    return apiRequest<any>(url, { method: 'GET' });
  }

  // Get featured products
  static async getFeaturedProducts(limit = 10): Promise<Product[]> {
    return apiRequest<Product[]>(`${API_ENDPOINTS.STORE.PRODUCTS}/featured?limit=${limit}`, {
      method: 'GET',
    });
  }

  // Get related products
  static async getRelatedProducts(productId: string, limit = 5): Promise<Product[]> {
    return apiRequest<Product[]>(`${API_ENDPOINTS.STORE.PRODUCTS}/${productId}/related?limit=${limit}`, {
      method: 'GET',
    });
  }

  // Update product stock
  static async updateStock(productId: string, quantity: number): Promise<{ stock: number }> {
    return apiRequest<{ stock: number }>(`${API_ENDPOINTS.STORE.PRODUCTS}/${productId}/stock`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  }

  // Get user orders
  static async getUserOrders(): Promise<Order[]> {
    return apiRequest<Order[]>(API_ENDPOINTS.STORE.ORDERS, { method: 'GET' });
  }

  // Get order by ID
  static async getOrder(id: string): Promise<Order> {
    return apiRequest<Order>(`${API_ENDPOINTS.STORE.ORDERS}/${id}`, {
      method: 'GET',
    });
  }

  // Create order
  static async createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    return apiRequest<Order>(API_ENDPOINTS.STORE.ORDERS, {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  // Update order status
  static async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    return apiRequest<Order>(`${API_ENDPOINTS.STORE.ORDERS}/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Cancel order
  static async cancelOrder(id: string): Promise<Order> {
    return apiRequest<Order>(`${API_ENDPOINTS.STORE.ORDERS}/${id}/cancel`, {
      method: 'POST',
    });
  }

  // Get store statistics
  static async getStoreStats(): Promise<{
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    lowStockProducts: number;
    topSellingProducts: Product[];
  }> {
    return apiRequest<any>(`${API_ENDPOINTS.STORE.BASE}/stats`, { method: 'GET' });
  }
}
