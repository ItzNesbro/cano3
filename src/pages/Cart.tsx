import { ProductCard } from '@/components/products/ProductCard';
import { useToast } from '@/hooks/use-toast';
import { auth, db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react'

const Cart = () => {
  const [carts, setCarts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      return setLoading(true);
    } else {
      setLoading(false);
      const user = auth.currentUser;
      const fetch = async () => {
        try {
          const ref = collection(db, "carts")
          const q = query(ref, where("userId", "==", user?.uid));

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setCarts(doc.data())
            console.log(doc.data())
          })
        } catch (error: any) {
          toast({
            title: "Error loading cart",
            description: error.message,
            variant: "destructive",
          });
        }
      }

      fetch();
    }
  }, [loggedIn]);


  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          {carts && Object.keys(carts).length ? (
            <div className="min-h-screen bg-background">
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
                    <ProductCard product={carts} />
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
        </>
      )}
    </>
  )
}

export default Cart
