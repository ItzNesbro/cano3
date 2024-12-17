import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedSets, setSelectedSets] = useState<any>('5');
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoggedIn(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleSetsChange = (sets: string) => {
    setSelectedSets(sets);
  };

  const handleAddToCart = async () => {
    if (loggedIn) {
      try {
        await addDoc(collection(db, "carts"), {
          userId: auth.currentUser?.uid,
          productId: product.id,
          name: product.name,
          price: product.price,
          image_url: product.image_url,
          discount: product.discount,
          multiple_colors: product.multiple_colors,
          sets: selectedSets,
          color: selectedColor,
          total: product.price * selectedSets,
        }).then(() => {
          toast({
            title: "Added to cart",
            description: product.name + " Product added to your cart successfully.",
            variant: "default",
          });
        })
      }
      catch (error: any) {
        toast({
          title: "Error adding to cart",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  }

  const handleLoginNotify = () => {
    toast({
      title: "Login required",
      description: "You must be logged in to add this product to your cart.",
      variant: "destructive",
    });
  }

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
              <>
                <span className="text-muted-foreground ml-2">|</span>
                <select
                  value={selectedColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="ml-2 text-center border border-zinc-200 text-white bg-transparent rounded-md p-1"
                >
                  {product.colors?.map((color) => (
                    <>
                      <option key={color} value={color}>
                        {color}
                      </option>
                    </>
                  ))}
                </select>
              </>
            )}
            {product.sets && (
              <>
                <span className="text-muted-foreground ml-2">|</span>
                <select
                  value={selectedSets}
                  onChange={(e) => handleSetsChange(e.target.value)}
                  className="ml-2 text-white text-center border border-zinc-200 bg-transparent rounded-md p-1"
                >
                  {product.sets?.map((set) => (
                    <>
                      <option key={set} value={set}>
                        {set}
                      </option>
                    </>
                  ))}
                </select>
                <span className="text-muted-foreground ml-2">Sets</span>
                <span className="text-muted-foreground ml-2">|</span>
                <span className="text-muted-foreground ml-2">Total: {selectedSets * product.price}rs</span>
              </>
            )}
          </span>
          {loading ? (
            <div role="status" className="flex items-center space-x-2">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (loggedIn ? (
            <Button
              variant="default"
              size="sm"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={() => handleLoginNotify()}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
