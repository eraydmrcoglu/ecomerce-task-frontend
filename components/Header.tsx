'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiShoppingCart, FiSearch } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import CartDrawer from './CartDrawer';

interface User {
  role?: string;
  email?: string;
  name?: string;
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const cartItemCount = useSelector((state: RootState) => state.cart.items.length);
  const [search, setSearch] = useState('');
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const getUserFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem('user');
      if (stored && stored !== 'undefined') {
        const parsed = JSON.parse(stored);
        setUser(typeof parsed === 'object' ? parsed : null);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    getUserFromLocalStorage();
    const interval = setInterval(getUserFromLocalStorage, 500);
    const handleStorageChange = () => getUserFromLocalStorage();

    window.addEventListener('storage', handleStorageChange);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/products?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
  <>
    <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-700">
            🛍️ Ecommerce
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <Link href="/products" className="hover:text-blue-600 transition">Products</Link>
            <Link href="/categories" className="hover:text-blue-600 transition">Categories</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-1.5 rounded-md border border-gray-300 text-sm w-36 focus:w-56 transition-all duration-300"
              />
              <button type="submit" className="absolute left-2.5 top-2.5 text-gray-500 text-sm">
                <FiSearch />
              </button>
            </form>

            <button onClick={() => setDrawerOpen(true)} className="relative">
              <FiShoppingCart className="text-2xl text-gray-700 hover:text-blue-600" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {!user ? (
              <Link
                href="/auth/login"
                className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-white hover:text-black hover:border hover:border-black transition"
              >
                Login
              </Link>
            ) : (
              <>
                <span className="text-sm text-gray-700 font-medium">{user.name}</span>
                {user?.role === 'admin' && (
                  <Link
                    href="/admin/dashboard"
                    className="text-sm text-blue-600 underline hover:text-blue-800"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-gray-200 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-300 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>

    <CartDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
  </>
  );

}
