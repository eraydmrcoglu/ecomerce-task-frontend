'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Category {
  _id: string;
  name: string;
  image: string;
  description: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 py-24">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map(category => (
          <div
            key={category._id}
            onClick={() => router.push(`/categories/${category._id}`)}
            className="cursor-pointer rounded overflow-hidden shadow hover:shadow-lg transition"
          >
            <Image
              src={category.image || '/placeholder.jpg'}
              alt={category.name}
              width={500} // örnek genişlik
              height={500}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{category.name}</h2>
              <p className="text-sm text-gray-600">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
