'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import api from '@/lib/api';

export default function ProductCollection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get<Product[]>('/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Featured Products</h2>
          <p className="mt-4 max-w-md text-gray-500">
            Browse trending products and popular new arrivals.
          </p>
        </header>

        {loading && <p className="mt-6 text-gray-500">Loading products...</p>}
        {error && <p className="mt-6 text-red-500">{error}</p>}

        {!loading && !error && (
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 8).map((product) => (
              <li key={product._id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
