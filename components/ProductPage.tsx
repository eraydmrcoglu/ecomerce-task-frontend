'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import { useSearchParams } from 'next/navigation';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999]);
  const [rating, setRating] = useState<number>(0);
  const [sort, setSort] = useState('');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      const data = await res.json();
      setProducts(data);
      setFiltered(data);

      const uniqueCategories = Array.from(new Set(data.map((p: Product) => p.category))) as string[];
      setCategories(uniqueCategories);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let updated = [...products];

    if (searchQuery) {
      updated = updated.filter(product =>
        product.name.toLowerCase().includes(searchQuery)
      );
    }

    if (selectedCategory) {
      updated = updated.filter(p => p.category === selectedCategory);
    }

    updated = updated.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (rating > 0) {
      updated = updated.filter(p => p.rating >= rating);
    }

    switch (sort) {
      case 'price-asc':
        updated.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        updated.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        updated.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        updated.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        updated.sort((a, b) => {
          const dateA = new Date(a.createdAt ?? 0).getTime();
          const dateB = new Date(b.createdAt ?? 0).getTime();
          return dateB - dateA;
        });
        break;
    }

    setFiltered(updated);
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, priceRange, rating, sort, products]);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / productsPerPage);

  const resetFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 9999]);
    setRating(0);
    setSort('');
  };

  return (
    <main className="max-w-7xl mx-auto pt-24 pb-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">
        <aside className="bg-white border rounded-lg p-6 shadow space-y-6 sticky top-24">
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Category</h2>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Price Range</h2>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
                className="w-20 border border-gray-300 p-1 rounded"
              />
              <span>-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                className="w-20 border border-gray-300 p-1 rounded"
              />
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Rating</h2>
            <div className="flex flex-col gap-1">
              {[5, 4, 3, 2, 1].map(star => (
                <button
                  key={star}
                  onClick={() => setRating(prev => prev === star ? 0 : star)}
                  className={`flex items-center gap-1 text-sm ${
                    rating === star ? 'text-yellow-500 font-bold' : 'text-gray-500 hover:text-yellow-400'
                  }`}
                >
                  {Array(star).fill(null).map((_, i) => (<span key={i}>★</span>))} & Up
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={resetFilters}
            className="w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-black rounded hover:bg-white hover:text-black hover:border hover:border-black transition"
          >
            Reset All Filters
          </button>
        </aside>

        <section className="space-y-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setViewType('grid')}
                className={`px-4 py-2 border rounded-md text-sm font-medium ${viewType === 'grid' ? 'bg-black text-white' : 'bg-white text-black'}`}
              >🔳 Grid</button>
              <button
                onClick={() => setViewType('list')}
                className={`px-4 py-2 border rounded-md text-sm font-medium ${viewType === 'list' ? 'bg-black text-white' : 'bg-white text-black'}`}
              >📃 List</button>
            </div>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="border border-gray-300 p-2 rounded-md text-sm"
            >
              <option value="">Sort by</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A-Z</option>

            </select>
          </div>

          <div className={viewType === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 gap-6' : 'space-y-4'}>
            {currentProducts.length > 0 ? (
              currentProducts.map(product => (
                <ProductCard key={product._id} product={product} viewType={viewType} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">No products found.</p>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 border rounded-md text-sm ${currentPage === i + 1 ? 'bg-black text-white' : 'bg-gray-200'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
