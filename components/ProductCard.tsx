'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { FiShoppingCart } from 'react-icons/fi';
import Image from 'next/image';

interface Props {
  product: Product;
  viewType?: 'grid' | 'list';
}

export default function ProductCard({ product }: Props) {
  const dispatch = useDispatch();
  const { _id, name, price, images = [], category } = product;

  const image1 = images[0] || '/placeholder.jpg';
  const image2 = images[1] || image1;

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  return (
    <div className="group block overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all">
      <Link href={`/products/${_id}`}>
        <div className="relative h-[350px] sm:h-[450px]">
          <Image
            src={image1}
            alt={`${name} front`}
            width={500} // örnek genişlik
            height={500}
            className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0 transition duration-300"
          />
          <Image
            src={image2}
            alt={`${name} hover`}
            width={500} // örnek genişlik
            height={500}
            className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition duration-300"
          />
        </div>
      </Link>

      <div className="relative bg-white pt-3 px-3 pb-4">
        <p className="text-xs uppercase text-gray-500 tracking-wide mb-1">
          {category || 'Uncategorized'}
        </p>
        <h3 className="text-sm font-medium text-gray-700 group-hover:underline group-hover:underline-offset-4 line-clamp-1">
          {name}
        </h3>
        <p className="mt-1 font-semibold text-gray-900">${price.toFixed(2)}</p>

        <button
          onClick={handleAddToCart}
          className="mt-3 w-full flex items-center justify-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black hover:border hover:border-black transition"
        >
          <FiShoppingCart className="text-lg" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
