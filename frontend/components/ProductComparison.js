"use client";

import { useState } from 'react';

const ProductComparison = ({ products, onClose, onRemoveProduct }) => {
  const [selectedFeature, setSelectedFeature] = useState('all');

  const features = [
    { key: 'price', label: 'Price', format: (value) => `$${value}` },
    { key: 'rating', label: 'Rating', format: (value) => `${value}/5 ⭐` },
    { key: 'reviews', label: 'Reviews', format: (value) => `${value} reviews` },
    { key: 'category', label: 'Category', format: (value) => value },
  ];

  if (products.length === 0) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-scale-in shadow-2xl">
          <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Product Comparison
              </h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition"
              >
                ✕
              </button>
            </div>

            {/* Feature Filter */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
              <button
                onClick={() => setSelectedFeature('all')}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                  selectedFeature === 'all' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                All Features
              </button>
              {features.map((feature) => (
                <button
                  key={feature.key}
                  onClick={() => setSelectedFeature(feature.key)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                    selectedFeature === feature.key 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {feature.label}
                </button>
              ))}
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-4 border-b dark:border-slate-600">Feature</th>
                    {products.map((product) => (
                      <th key={product.id} className="text-center p-4 border-b dark:border-slate-600 min-w-[200px]">
                        <div className="flex flex-col items-center">
                          <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-slate-700 dark:to-slate-600 rounded-xl flex items-center justify-center mb-3">
                            <span className="text-3xl">{product.emoji}</span>
                          </div>
                          <h3 className="font-bold text-gray-900 dark:text-white text-sm">{product.name}</h3>
                          <button
                            onClick={() => onRemoveProduct(product.id)}
                            className="text-red-500 hover:text-red-600 text-xs mt-2"
                          >
                            Remove
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features
                    .filter(feature => selectedFeature === 'all' || selectedFeature === feature.key)
                    .map((feature) => (
                      <tr key={feature.key} className="border-b dark:border-slate-600">
                        <td className="p-4 font-medium text-gray-900 dark:text-white">
                          {feature.label}
                        </td>
                        {products.map((product) => (
                          <td key={product.id} className="p-4 text-center text-gray-600 dark:text-gray-300">
                            {feature.format(product[feature.key])}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              {products.map((product) => (
                <button
                  key={product.id}
                  className="px-6 py-3 btn-primary text-white rounded-xl font-semibold"
                >
                  Add to Cart - ${product.price}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductComparison;