import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ShoppingCart } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { useCart } from "../context/CartContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { cart } = useCart();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="https://horizons-cdn.hostinger.com/18607e11-cb0f-44a8-aa26-a132b41ab66f/632e327aa0adf7c3ef4b8cb86b7bbaab.png" 
              alt="Wayntech Logo" 
              className="h-8"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm ${
                  isActive(link.path)
                    ? "text-black font-semibold"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Section (Cart + Mobile Menu) */}
          <div className="flex items-center gap-4">

            {/* 🛒 Cart Icon (VISIBLE ALWAYS) */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-black" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-1 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="text-lg"
                    >
                      {link.name}
                    </Link>
                  ))}

                  {/* Optional (you can remove this if not needed) */}
                  
                </nav>
              </SheetContent>
            </Sheet>

          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;