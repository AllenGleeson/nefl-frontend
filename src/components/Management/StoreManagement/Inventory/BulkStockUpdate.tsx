"use client";

// src/components/Management/StoreManagement/Inventory/BulkStockUpdate.tsx
import { useState } from 'react';

interface BulkUpdateItem {
  id: string;
  productName: string;
  sku: string;
  currentStock: number;
  newStock: number;
}

export default function BulkStockUpdate() {
  const [items] = useState<BulkUpdateItem[]>([
    {
      id: '1',
      productName: 'NEFL Official Jersey',
      sku: 'JER-001',
      currentStock: 25,
      newStock: 25
    },
    {
      id: '2',
      productName: 'League Scarf',
      sku: 'SCF-001',
      currentStock: 0,
      newStock: 0
    },
    {
      id: '3',
      productName: 'Match Day Program',
      sku: 'PRG-001',
      currentStock: 3,
      newStock: 3
    }
  ]);

  const [updateItems, setUpdateItems] = useState<BulkUpdateItem[]>(items);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStockChange = (id: string, newStock: number) => {
    setUpdateItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, newStock } : item
      )
    );
  };

  const handleBulkUpdate = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Bulk stock update:', updateItems);
      // Here you would make the actual API call
    } catch (error) {
      console.error('Error updating stock:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetToCurrent = () => {
    setUpdateItems(items);
  };

  const hasChanges = updateItems.some(item => {
    const original = items.find(i => i.id === item.id);
    return original && item.newStock !== original.currentStock;
  });

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-lg sm:text-xl font-bold">Bulk Stock Update</h2>
          <div className="flex flex-row gap-2 flex-wrap">
            <button 
              onClick={resetToCurrent}
              className="bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
            >
              Reset
            </button>
            <button 
              onClick={handleBulkUpdate}
              disabled={!hasChanges || isSubmitting}
              className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Updating...' : 'Update All'}
            </button>
          </div>
        </div>

        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Instructions:</strong> Update the stock quantities below and click &quot;Update All&quot; to apply changes to all products.
          </p>
        </div>
        
        <div className="space-y-4">
          {updateItems.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.productName}</h3>
                  <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Current Stock</p>
                    <p className="text-lg font-medium">{item.currentStock}</p>
                  </div>
                  
                  <div className="text-center">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Stock
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={item.newStock}
                      onChange={(e) => handleStockChange(item.id, parseInt(e.target.value) || 0)}
                      className="w-20 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-center"
                    />
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Change</p>
                    <p className={`text-lg font-medium ${
                      item.newStock > item.currentStock ? 'text-green-600' : 
                      item.newStock < item.currentStock ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {item.newStock > item.currentStock ? '+' : ''}{item.newStock - item.currentStock}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasChanges && (
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> You have unsaved changes. Click &quot;Update All&quot; to save your changes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
