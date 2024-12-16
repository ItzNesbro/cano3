import { Product } from "@/types/product";
import { ProductCard } from "@/components/products/ProductCard";

export default function Products() {
  const products: Product[] = [];

  products.push({
    id: '1',
    name: "White Smoke",
    description: "The **White Smoke Grande** is a sleek, minimalist product that can really beautify your space with clean, modern aesthetic appeal. Its soft white finish, along with refined details, makes it a versatile product that blends easily with modern or classic decor. Best for those who love style and simplicity, the White Smoke Grande is perfect with both style and functionality within one sophisticated package.",
    price: 50,
    image_url: "/white-smoke.jpg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    discount: '16%',
    multiple_colors: false
  });
  products.push({
    ...products[0],
    id: '2',
    name: "Colored Smokes",
    description: "The **Coloured Smoke Grande** adds vivid colors to your shots in bright tones of **red, blue, and yellow**. For the perfect shot that gives you a sense of drama for photo shoots, enhancing the mood of a celebration, or just creating an artistic statement, the colored smoke color guarantees an amazing time. It is very easy to use and great for any event; thus, it will always be your number one for bold, attention-grabbing visuals that really stand out.",
    price: 80,
    image_url: "/color-smoke.jpg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    discount: null,
    multiple_colors: true,
    colors: ["red", "blue", "yellow"]
  })

  return (
   <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <div className="grid grid-cols-1 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
