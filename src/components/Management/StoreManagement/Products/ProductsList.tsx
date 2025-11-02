"use client";

// src/components/Management/StoreManagement/ProductsList.tsx
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  image: string;
  description: string;
}

type Props = {
  onAddProduct?: () => void;
}

export default function ProductsList({ onAddProduct }: Props) {
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'NEFL Official Jersey',
      price: 49.99,
      category: 'Jerseys',
      stock: 25,
      status: 'active',
      image: '/images/products/jersey.jpg',
      description: 'Official NEFL team jersey with league logo'
    },
    {
      id: '2',
      name: 'League Scarf',
      price: 19.99,
      category: 'Accessories',
      stock: 0,
      status: 'out_of_stock',
      image: '/images/products/scarf.jpg',
      description: 'Warm wool scarf with team colors'
    },
    {
      id: '3',
      name: 'Match Day Program',
      price: 5.99,
      category: 'Programs',
      stock: 150,
      status: 'active',
      image: '/images/products/program.jpg',
      description: 'Official match day program booklet'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-lg sm:text-xl font-bold">Products</h2>
          <div className="flex flex-row gap-2 flex-wrap">
            {onAddProduct && (
              <button 
                onClick={onAddProduct}
                className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline">Add Product</span>
                <span className="sm:hidden">Add</span>
              </button>
            )}
            <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
              <span className="hidden sm:inline">Export Products</span>
              <span className="sm:hidden">Export</span>
            </button>
            <button className="bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base">
              <span className="hidden sm:inline">Bulk Edit</span>
              <span className="sm:hidden">Bulk</span>
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              {/* Mobile Layout */}
              <div className="block sm:hidden">
                <div className="flex items-start space-x-3 mb-3">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">🛍️</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        {product.status.replace('_', ' ').charAt(0).toUpperCase() + product.status.replace('_', ' ').slice(1)}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                  <div className="text-center bg-gray-50 rounded p-2">
                    <p className="text-gray-500">Price</p>
                    <p className="font-medium">${product.price}</p>
                  </div>
                  <div className="text-center bg-gray-50 rounded p-2">
                    <p className="text-gray-500">Stock</p>
                    <p className="font-medium">{product.stock}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                    Edit
                  </button>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View
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
                    <span className="text-2xl">🛍️</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.description}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        {product.status.replace('_', ' ').charAt(0).toUpperCase() + product.status.replace('_', ' ').slice(1)}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                    <div>
                      <p className="text-gray-500">Price</p>
                      <p className="font-medium">${product.price}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Stock</p>
                      <p className="font-medium">{product.stock}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Category</p>
                      <p className="font-medium">{product.category}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-green-600 hover:text-green-800 text-sm">
                        Edit
                      </button>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        View
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
