import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Package, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            Welcome to <span className="text-[#9b87f5]">CaNo3</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your premier destination for quality smoking accessories and premium products.
          </p>
          <Button size="lg" className="text-lg px-8 py-4 bg-zinc-500">
            <Link to="/products">
              <span className="text-zinc-50 font-bold">Shop Now</span>
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="transform transition duration-300 hover:scale-105">
              <CardHeader>
                <ShoppingBag className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Premium Selection</CardTitle>
                <CardDescription>
                  Curated collection of high-quality smoking accessories
                </CardDescription>
              </CardHeader>
              <CardContent>
                Browse through our carefully selected products from trusted brands and artisans.
              </CardContent>
            </Card>

            <Card className="transform transition duration-300 hover:scale-105">
              <CardHeader>
                <Package className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Secure Packaging</CardTitle>
                <CardDescription>
                  Discreet and secure packaging for all orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                Your privacy matters. All items are packaged securely and discreetly.
              </CardContent>
            </Card>

            <Card className="transform transition duration-300 hover:scale-105">
              <CardHeader>
                <Truck className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Fast Delivery</CardTitle>
                <CardDescription>
                  Quick and reliable shipping nationwide
                </CardDescription>
              </CardHeader>
              <CardContent>
                Enjoy fast shipping with real-time tracking on all your orders.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
