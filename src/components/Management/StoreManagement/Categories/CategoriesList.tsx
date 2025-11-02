"use client";

// src/components/Management/StoreManagement/Categories/CategoriesList.tsx
import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  description: string;
  parentId?: string;
  productCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
  children?: Category[];
}

interface CategoriesListProps {
  onAddCategory?: () => void;
}

export default function CategoriesList({ onAddCategory }: CategoriesListProps) {
  const [categories] = useState<Category[]>([
    {
      id: '1',
      name: 'Jerseys',
      description: 'Official team jerseys and uniforms',
      productCount: 15,
      status: 'active',
      createdAt: '2024-01-01',
      children: [
        {
          id: '1-1',
          name: 'Home Jerseys',
          description: 'Home team jerseys',
          parentId: '1',
          productCount: 8,
          status: 'active',
          createdAt: '2024-01-01'
        },
        {
          id: '1-2',
          name: 'Away Jerseys',
          description: 'Away team jerseys',
          parentId: '1',
          productCount: 7,
          status: 'active',
          createdAt: '2024-01-01'
        }
      ]
    },
    {
      id: '2',
      name: 'Accessories',
      description: 'Team accessories and merchandise',
      productCount: 25,
      status: 'active',
      createdAt: '2024-01-01',
      children: [
        {
          id: '2-1',
          name: 'Scarves',
          description: 'Team scarves',
          parentId: '2',
          productCount: 12,
          status: 'active',
          createdAt: '2024-01-01'
        },
        {
          id: '2-2',
          name: 'Hats',
          description: 'Team hats and caps',
          parentId: '2',
          productCount: 13,
          status: 'active',
          createdAt: '2024-01-01'
        }
      ]
    },
    {
      id: '3',
      name: 'Programs',
      description: 'Match day programs and publications',
      productCount: 5,
      status: 'active',
      createdAt: '2024-01-01'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderCategory = (category: Category, level = 0) => (
    <div key={category.id} className={`border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow ${level > 0 ? 'ml-6' : ''}`}>
      {/* Mobile Layout */}
      <div className="block sm:hidden">
        <div className="flex items-start space-x-3 mb-3">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">📁</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold mb-1 line-clamp-2">{category.name}</h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{category.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(category.status)}`}>
                {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {category.productCount} products
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="text-green-600 hover:text-green-800 text-sm font-medium">
            Edit
          </button>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Add Subcategory
          </button>
          <button className="text-red-600 hover:text-red-800 text-sm font-medium">
            Delete
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl">📁</span>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.description}</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(category.status)}`}>
                {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {category.productCount} products
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
            <div>
              <p className="text-gray-500">Created</p>
              <p className="font-medium">{category.createdAt}</p>
            </div>
            <div>
              <p className="text-gray-500">Products</p>
              <p className="font-medium">{category.productCount}</p>
            </div>
            <div>
              <p className="text-gray-500">Subcategories</p>
              <p className="font-medium">{category.children?.length || 0}</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-green-600 hover:text-green-800 text-sm">
                Edit
              </button>
              <button className="text-blue-600 hover:text-blue-800 text-sm">
                Add Sub
              </button>
              <button className="text-red-600 hover:text-red-800 text-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Render children */}
      {category.children && category.children.length > 0 && (
        <div className="mt-4 space-y-4">
          {category.children.map(child => renderCategory(child, level + 1))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-lg sm:text-xl font-bold">Categories</h2>
          <div className="flex flex-row gap-2 flex-wrap">
            <button 
              onClick={onAddCategory}
              className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Add Category</span>
              <span className="sm:hidden">Add</span>
            </button>
            <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
              <span className="hidden sm:inline">Export Categories</span>
              <span className="sm:hidden">Export</span>
            </button>
            <button className="bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base">
              <span className="hidden sm:inline">Category Tree</span>
              <span className="sm:hidden">Tree</span>
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {categories.map(category => renderCategory(category))}
        </div>
      </div>
    </div>
  );
}
