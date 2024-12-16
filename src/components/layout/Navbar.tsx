// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// // import { useToast } from "@/hooks/use-toast";
// import { LogIn, LogOut, Settings } from "lucide-react";
import { Link } from "react-router-dom";

// const Navbar = ({ session, isAdmin }: { session: null; isAdmin: boolean }) => {
const Navbar = () => {
  // const navigate = useNavigate();
  // const { toast } = useToast();

  // const handleSignOut = async () => {
  //   const { error } = await supabase.auth.signOut();
  //   if (error) {
  //     toast({
  //       title: "Error signing out",
  //       description: error.message,
  //       variant: "destructive",
  //     });
  //   } else {
  //     toast({
  //       title: "Signed out successfully",
  //       description: "You have been signed out of your account",
  //     });
  //     navigate("/");
  //   }
  // };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold">
                <span className="bg-[#9b87f5] text-white px-2 py-1 rounded">CaNo3</span>
              </Link>
            </div>
            <div className="hidden md:flex space-x-4">
              <Link
                to="/products"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Products
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
              {/*  {isAdmin && (
                <Link
                  to="/admin"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <Settings className="inline-block w-4 h-4 mr-1" />
                  Admin
                </Link>
              )}  */}
            </div>
          </div>
          {/*  <div className="flex items-center">
            {session ? (
              <Button
                variant="ghost"
              // onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            ) : (
              <Button
                variant="ghost"
                onClick={() => navigate("/auth")}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            )}
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
