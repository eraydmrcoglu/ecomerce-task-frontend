import Hero from '@/components/Hero';
import Newsletter from '@/components/Newsletter';
import ProductCollection from '@/components/ProductCollection';
import RecentlyViewedProducts from '@/components/RecentlyViewedProducts';

export default function HomePage() {
  return (
    <main className="space-y-8 pb-20">
      <Hero />
      <ProductCollection />
      <RecentlyViewedProducts />
      <Newsletter />
    </main>
  );
}
