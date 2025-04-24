import Header from '@/components/Header';
import React from 'react';
import { mockProducts } from '@/data/mockData';

const ProductPage = () => {
  return (
    <>
      <Header
        isAuthenticated={false}
        user={undefined}
        logout={function (): void {
          throw new Error('Function not implemented.');
        }}
        searchQuery={''}
        setSearchQuery={function (value: React.SetStateAction<string>): void {
          throw new Error('Function not implemented.');
        }}
        suggestions={[]}
        showSuggestions={false}
        setShowSuggestions={function (value: React.SetStateAction<boolean>): void {
          throw new Error('Function not implemented.');
        }}
      />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold dark:text-white">
                {product.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                {product.category}
              </p>
              <p className="text-gray-800 dark:text-gray-200 font-bold mb-4">
                {product.price}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {product.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
