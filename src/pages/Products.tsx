// import { Product } from "@/types/product";
// import { ProductCard } from "@/components/products/ProductCard";

export default function Products() {

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-8">
              Our Products
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            </div>
          </div>
          <div className="lg:col-span-1">
            {/* <Cart /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
