'use client';

import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';

export default function RecentlyViewedProducts() {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  useEffect(() => {
    const items = localStorage.getItem('recentlyViewed');
    if (items) {
      const parsed: Product[] = JSON.parse(items);
      setRecentlyViewed(parsed.slice(0, 4));
    }
  }, []);

  if (recentlyViewed.length === 0) return null;

  return (
    <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-10 mb-16">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
        <p className="text-gray-500 text-sm">
          Here are some products you recently checked out — maybe you would like to revisit them.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {recentlyViewed.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
