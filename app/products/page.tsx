import { Suspense } from "react";
import ProductsPage from "@/components/ProductPage";

export default function Products() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-20">Loading products...</div>}>
      <ProductsPage />
    </Suspense>
  );
}
