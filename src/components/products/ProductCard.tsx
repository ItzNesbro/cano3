import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<any>()

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <img
          src={product.image_url || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg mb-4"
        />
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">
            {product.price.toFixed(2)}rs
            <span className="text-muted-foreground ml-2">{product.discount}</span>
            {product.discount && <span className="text-muted-foreground ml-2">({((product.price * 1.2) - product.price).toFixed(2)}rs off)</span>}
            {product.multiple_colors && (
              <select
                value={selectedColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="ml-2 border border-gray-300 rounded-md p-2"
              >
                {product.colors?.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            )}
          </span>
          <Button
            variant="default"
            size="sm"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
