"use client";

// src/components/Management/StoreManagement/Categories/CategoryTree.tsx
import { useState } from 'react';

interface CategoryNode {
  id: string;
  name: string;
  description: string;
  productCount: number;
  status: 'active' | 'inactive';
  children?: CategoryNode[];
}

export default function CategoryTree() {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['1', '2']));
  
  const [categories] = useState<CategoryNode[]>([
    {
      id: '1',
      name: 'Jerseys',
      description: 'Official team jerseys and uniforms',
      productCount: 15,
      status: 'active',
      children: [
        {
          id: '1-1',
          name: 'Home Jerseys',
          description: 'Home team jerseys',
          productCount: 8,
          status: 'active'
        },
        {
          id: '1-2',
          name: 'Away Jerseys',
          description: 'Away team jerseys',
          productCount: 7,
          status: 'active'
        }
      ]
    },
    {
      id: '2',
      name: 'Accessories',
      description: 'Team accessories and merchandise',
      productCount: 25,
      status: 'active',
      children: [
        {
          id: '2-1',
          name: 'Scarves',
          description: 'Team scarves',
          productCount: 12,
          status: 'active'
        },
        {
          id: '2-2',
          name: 'Hats',
          description: 'Team hats and caps',
          productCount: 13,
          status: 'active'
        }
      ]
    },
    {
      id: '3',
      name: 'Programs',
      description: 'Match day programs and publications',
      productCount: 5,
      status: 'active'
    }
  ]);

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderNode = (node: CategoryNode, level = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);
    const indent = level * 24;

    return (
      <div key={node.id} className="border-b border-gray-200 last:border-b-0">
        <div 
          className="flex items-center p-4 hover:bg-gray-50 cursor-pointer"
          style={{ paddingLeft: `${16 + indent}px` }}
          onClick={() => hasChildren && toggleNode(node.id)}
        >
          {/* Expand/Collapse Icon */}
          <div className="w-6 h-6 flex items-center justify-center mr-3">
            {hasChildren ? (
              <span className="text-gray-500">
                {isExpanded ? '▼' : '▶'}
              </span>
            ) : (
              <span className="text-gray-300">•</span>
            )}
          </div>

          {/* Category Icon */}
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
            <span className="text-sm">📁</span>
          </div>

          {/* Category Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {node.name}
                </h3>
                <p className="text-xs text-gray-500 truncate">
                  {node.description}
                </p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(node.status)}`}>
                  {node.status}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {node.productCount}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 ml-4">
            <button className="text-green-600 hover:text-green-800 text-xs">
              Edit
            </button>
            <button className="text-blue-600 hover:text-blue-800 text-xs">
              Add
            </button>
            <button className="text-red-600 hover:text-red-800 text-xs">
              Delete
            </button>
          </div>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div>
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-lg sm:text-xl font-bold">Category Tree</h2>
          <div className="flex flex-row gap-2 flex-wrap">
            <button 
              onClick={() => setExpandedNodes(new Set(categories.map(c => c.id)))}
              className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Expand All
            </button>
            <button 
              onClick={() => setExpandedNodes(new Set())}
              className="bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
            >
              Collapse All
            </button>
          </div>
        </div>

        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Instructions:</strong> Click on category names to expand/collapse subcategories. Use the action buttons to manage categories.
          </p>
        </div>
        
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {categories.map(category => renderNode(category))}
        </div>
      </div>
    </div>
  );
}
