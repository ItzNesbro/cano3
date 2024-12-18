import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { LogIn, User, Menu, List, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { logout } from "@/lib/authUtils";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { collection, getDocs, query, where } from "firebase/firestore";

const Navbar = () => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [numberOfCarts, setNumberOfCarts] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoggedIn(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out.",
        description: "You've logged out successfully.",
        variant: "default",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error logging out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (loggedIn) {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          const ref = collection(db, "carts");
          const q = query(ref, where("userId", "==", user.uid));

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(() => {
            setNumberOfCarts(querySnapshot.size);
          });
        }
      });

      return () => unsubscribe();
    }
  }, [loggedIn]);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl font-bold">
                <span className="bg-[#9b87f5] text-white px-2 py-1 rounded">
                  CaNo3
                </span>
              </Link>
            </div>
          </div>

          <div className="lg:hidden flex items-center">
            <button
              className="p-2 rounded-md focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
            {isMobileMenuOpen && (
              <div className="absolute border top-16 right-4 bg-white shadow-md rounded-md w-48">
                <div className="flex flex-col space-y-2 py-2">
                  <Link
                    to="/products"
                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 flex items-center rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Products <List className="h-4 w-4 ml-2" />
                  </Link>
                  <Link
                    to="/about"
                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 flex items-center rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About <Info className="h-4 w-4 ml-2" />
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
                      Account <User className="h-4 w-4 ml-2" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="bg-white">
                      <DropdownMenuItem
                        onClick={() => {
                          navigate("/cart");
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Cart <span className="ml-1 text-red-600">({numberOfCarts})</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          navigate("/help");
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Help
                      </DropdownMenuItem>
                      {loggedIn && (
                        <DropdownMenuItem
                          onClick={() => {
                            handleLogout();
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          Sign Out
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            )}
          </div>

          <div className="hidden lg:flex items-center space-x-8">
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
            ) : loggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-4">
                  <User className="mr-2 h-4 w-4" />
                  Account
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/cart")}>
                    Cart <span className="ml-1 text-red-600">({numberOfCarts})</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/help")}>
                    Help
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" onClick={() => navigate("/login")}>
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

