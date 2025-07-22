import Link from 'next/link';

export default function Hero() {
  return (
    <section
      className="relative h-[85vh] bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://t3.ftcdn.net/jpg/06/32/90/44/360_F_632904407_iPLi90WdjZ0oKAeRiL98gEIeHIUtzWae.jpg')",
        imageRendering: 'auto',
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Discover the Best Products Online
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            Shop new arrivals, trending items, and top-rated products.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/products"
              className="bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition"
            >
              Shop Now
            </Link>
            <Link
              href="/categories"
              className="border border-white px-6 py-3 rounded text-white hover:bg-white hover:text-black transition"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
