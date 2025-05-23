
import { Button } from "@/components/ui/button";
import { Twitter } from "lucide-react";

export function Footer() {
  const footerLinks = {
    Company: [
      { name: "About", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms", href: "#" }
    ],
    Resources: [
      { name: "Documentation", href: "#" },
      { name: "API", href: "#" },
      { name: "Community", href: "#" },
      { name: "Blog", href: "#" }
    ]
  };

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg gradient-web3 flex items-center justify-center">
                <span className="text-white font-bold text-sm">TL</span>
              </div>
              <span className="font-bold text-xl">TechLists</span>
            </div>
            <p className="text-sm text-muted-foreground">
              No Hype. Just Honest Web3 Tools.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <span className="w-4 h-4 flex items-center justify-center font-bold">G</span>
              </Button>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2024 TechLists. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
