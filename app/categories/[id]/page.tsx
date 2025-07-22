'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function CategoryRedirectPage() {
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      router.push(`/products?category=${encodeURIComponent(id.toString())}`);
    }
  }, [id, router]);

  return null;
}
