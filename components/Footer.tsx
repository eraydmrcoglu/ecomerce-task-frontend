export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 border-t border-gray-200 mt-10">
      <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Ecommerce</h3>
            <p className="mt-2 text-sm text-gray-600">
              We’re here to provide you with a smarter shopping experience.
            </p>
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-900">About</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Company</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-900">Support</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Contact</a></li>
              <li><a href="#" className="hover:underline">FAQs</a></li>
              <li><a href="#" className="hover:underline">Shipping & Returns</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-900">Follow Us</h4>
            <ul className="mt-2 flex flex-wrap gap-4 text-sm">
              <li><a href="#" className="hover:text-gray-900">Instagram</a></li>
              <li><a href="#" className="hover:text-gray-900">Twitter</a></li>
              <li><a href="#" className="hover:text-gray-900">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Ecommerce. All rights reserved.
        </p>
      </div>
    </footer>
  );
}