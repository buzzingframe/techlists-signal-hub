
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface MobileMenuProps {
  onLogin: () => void;
}

export function MobileMenu({ onLogin }: MobileMenuProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-b absolute left-0 right-0 top-16 bg-background z-50">
          <nav className="container mx-auto py-4 px-6">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/curated-lists"
                  className="text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Curated Lists
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  to="/submit"
                  className="text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Submit
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Button onClick={onLogin} className="w-full">
                  Sign In
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
