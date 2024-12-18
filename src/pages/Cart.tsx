import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth, db } from '@/lib/firebase';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash } from 'lucide-react';
import Checkout from './Checkout';

type CartItem = {
  id: string;
  createdAt: string;
  discount: string | null;
  image_url: string;
  name: string;
  price: number;
  productId: string;
  selectedColor: string | null;
  selectedSets: number;
  total: number;
  userId: string;
};

const Cart = () => {
  const [carts, setCarts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkouting, setCheckouting] = useState(false);
  const [checkoutingItem, setCheckoutingItem] = useState<CartItem | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      const fetchCartItems = async () => {
        setLoading(true);
        try {
          const user = auth.currentUser;
          const ref = collection(db, 'carts');
          const q = query(ref, where('userId', '==', user?.uid));
          const querySnapshot = await getDocs(q);

          const fetchedCarts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setCarts(fetchedCarts);
        } catch (error: any) {
          toast({
            title: 'Error loading cart',
            description: error.message,
            variant: 'destructive',
          });
        } finally {
          setLoading(false);
        }
      };

      fetchCartItems();
    } else {
      setLoading(false);
    }
  }, [loggedIn, toast]);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'carts', id));
      toast({
        title: 'Item deleted successfully',
        variant: 'default',
      });
      setCarts((prevCarts) => prevCarts.filter((cart) => cart.id !== id));
    } catch (error: any) {
      toast({
        title: 'Error deleting item',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleCheckout = (item: CartItem) => {
    setCheckouting(true);
    setCheckoutingItem(item);
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : loggedIn ? (
        <>
          {carts.length > 0 ? (
            <div className={`min-h-screen bg-background ${checkouting ? 'hidden' : ''}`}>
              <section className="py-20 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
                    Your Cart
                  </h1>
                </div>
              </section>

              <section className="py-16 px-4 bg-muted/50">
                <div className="max-w-6xl mx-auto">
                  <div className="grid md:grid-cols-3 gap-8">
                    {carts.map((cartItem: CartItem) => (
                      <Card className="flex flex-col">
                        <CardHeader>
                          <img
                            src={cartItem.image_url || "/placeholder.svg"}
                            alt={cartItem.name}
                            className="w-full h-48 object-cover rounded-t-lg mb-4"
                          />
                          <CardTitle>{cartItem.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="mt-auto">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-lg font-semibold">
                                Total: {(cartItem.total).toFixed(2)}rs
                              </span>
                              <div className="mt-2">
                                <label className="mr-2">Color:</label>
                                <p className={`font-semibold text-${cartItem.selectedColor}-300`}>{cartItem.selectedColor}</p>
                              </div>
                              <div className="mt-2">
                                <label className="mr-2">Sets:</label>
                                <p className="font-semibold">{cartItem.selectedSets}</p>
                              </div>
                            </div>
                            <div>
                              <Button variant="default" size="sm" onClick={() => handleCheckout(cartItem)}>
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Checkout
                              </Button>
                              <Button variant="destructive" className="ml-2" size="sm" onClick={() => handleDelete(cartItem.id)}>
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div className="min-h-screen bg-background">
              <section className="py-20 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
                    Your Cart is Empty
                  </h1>
                </div>
              </section>
            </div>
          )}

          {checkouting && checkoutingItem && (
            <Checkout cartItems={[checkoutingItem]} />
          )}
        </>
      ) : (
        <div className="min-h-screen bg-background">
          <section className="py-20 px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
                Please Log In to View Your Cart
              </h1>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Cart;
