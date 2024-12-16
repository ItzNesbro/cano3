import { Book, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            About <span className="text-[#9b87f5]">CaNo3</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Our journey of passion, innovation, and commitment to quality.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="transform transition duration-300 hover:scale-105">
              <CardHeader>
                <Book className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Our Story</CardTitle>
                <CardDescription>
                  The journey of CaNo3
                </CardDescription>
              </CardHeader>
              <CardContent>
                Founded with a passion for quality and innovation, CaNo3 is a dedicated venture committed to delivering exceptional solutions.
              </CardContent>
            </Card>

            <Card className="transform transition duration-300 hover:scale-105">
              <CardHeader>
                <User className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Our Founder</CardTitle>
                <CardDescription>
                  The vision behind CaNo3
                </CardDescription>
              </CardHeader>
              <CardContent>
                Our founder brings years of expertise and a relentless commitment to excellence, driving CaNo3's mission forward with innovative thinking and dedication.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
