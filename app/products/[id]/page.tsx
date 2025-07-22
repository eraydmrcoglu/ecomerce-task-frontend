'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import ProductCard from '@/components/ProductCard';
import { FiShoppingCart } from 'react-icons/fi';
import type { Product } from '@/types/product'; // ✅ Doğru tip import edildi
import Image from 'next/image';

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [thumbnail, setThumbnail] = useState('');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)
      .then(res => {
        const raw = res.data;

        const data: Product = {
          _id: raw._id,
          name: raw.name,
          price: raw.price,
          description: Array.isArray(raw.description)
            ? raw.description.join('\n') // Eğer `description: string` ise string'e çevir
            : raw.description || '',
          images: Array.isArray(raw.images) ? raw.images : [],
          category: raw.category,
          rating: typeof raw.rating === 'number' ? raw.rating : 0,
          createdAt: raw.createdAt,
          stock: typeof raw.stock === 'number' ? raw.stock : 0,
          featured: raw.featured,
          specifications: raw.specifications,
          variants: raw.variants,
          tags: raw.tags,
          updatedAt: raw.updatedAt,
          numReviews: raw.numReviews
        };

        setProduct(data);
        setThumbnail(data.images[0]);

        const existing = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        const filtered = existing.filter((item: Product) => item._id !== data._id);
        const updated = [data, ...filtered].slice(0, 5);
        localStorage.setItem('recentlyViewed', JSON.stringify(updated));
        setRecentlyViewed(updated);
      })
      .catch(err => console.error('Product detail error:', err))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!product?.category) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/products/category/${product.category}`)
      .then(res => {
        const filtered = res.data.filter((p: Product) => p._id !== product._id);
        setRelatedProducts(filtered);
      });
  }, [product]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16 space-y-12">
      <p className="text-sm text-gray-600">
        Home / Products / {product.category} /{' '}
        <span className="text-indigo-500 font-medium">{product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {product.images.map((img, i) => (
              <div
                key={i}
                onClick={() => setThumbnail(img)}
                className="border max-w-20 border-gray-300 rounded overflow-hidden cursor-pointer hover:opacity-80"
              >
                <Image src={img} alt={`thumb-${i}`} width={500} height={500}/>
              </div>
            ))}
          </div>

          <div className="border border-gray-300 rounded overflow-hidden max-w-md">
            <Image src={thumbnail} alt="Selected" width={500} height={500} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="text-sm w-full md:w-1/2 space-y-2">
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <div className="flex items-center gap-1 text-indigo-600">
            {Array(5).fill(null).map((_, i) => (
              <svg key={i} width="16" height="16" fill="none" viewBox="0 0 18 17">
                <path
                  fill={i < product.rating! ? "#615fff" : "#615fff"}
                  fillOpacity={i < product.rating! ? "1" : "0.3"}
                  d="M8.05.93c.3-.92 1.6-.92 1.9 0l1.3 3.98a1 1 0 0 0 .95.69h4.19c.97 0 1.37 1.24.59 1.81l-3.39 2.46a1 1 0 0 0-.36 1.12l1.3 3.98c.3.92-.76 1.69-1.54 1.12l-3.39-2.46a1 1 0 0 0-1.18 0l-3.39 2.46c-.78.57-1.84-.2-1.54-1.12L4.78 10.99a1 1 0 0 0-.36-1.12L1.03 7.41c-.78-.57-.38-1.81.59-1.81h4.18a1 1 0 0 0 .95-.69L8.05.93Z"
                />
              </svg>
            ))}
            <span className="ml-2 text-base text-gray-600">({product.rating})</span>
          </div>

          <div className="mt-4">
            <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
          </div>

          <div className="mt-6">
            <p className="text-base font-medium mb-1">Product Description</p>
            <p className="text-gray-500">{product.description}</p>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <label htmlFor="quantity" className="text-sm text-gray-600">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              min={1}
              onChange={e => setQuantity(Number(e.target.value))}
              className="w-20 border border-gray-300 rounded px-2 py-1"
            />
          </div>

          <div className="flex items-center mt-8 gap-4 text-base">
            <button
              onClick={() => dispatch(addToCart({ product, quantity }))}
              className="w-56 py-3.5 bg-black text-white rounded font-medium transition-all duration-200 ease-in-out hover:bg-white hover:text-black hover:border hover:border-black"
            >
              <FiShoppingCart className="inline-block mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}

      {recentlyViewed.length > 1 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recently Viewed</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recentlyViewed
              .filter(p => p._id !== product._id)
              .map(p => (
                <ProductCard key={p._id} product={p} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
