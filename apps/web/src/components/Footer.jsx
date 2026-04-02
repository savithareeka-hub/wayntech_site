import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* BRAND */}
          <div className="flex flex-col items-start">
            <Link to="/" className="inline-block mb-4 hover:opacity-90">
              <img 
                src="https://horizons-cdn.hostinger.com/18607e11-cb0f-44a8-aa26-a132b41ab66f/632e327aa0adf7c3ef4b8cb86b7bbaab.png" 
                alt="Wayntech Logo" 
                className="h-10 md:h-12 w-auto object-contain grayscale hover:grayscale-0 transition duration-300" 
              />
            </Link>

            <p className="text-sm leading-relaxed max-w-xs">
              Your trusted partner for custom printing and personalized products. 
              Quality craftsmanship for every occasion.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <span className="text-lg font-semibold text-foreground">Quick links</span>

            <nav className="mt-4 flex flex-col space-y-2">
              <Link to="/" className="text-sm hover:text-foreground">Home</Link>
              <Link to="/products" className="text-sm hover:text-foreground">Products</Link>
              <Link to="/about" className="text-sm hover:text-foreground">About</Link>
              <Link to="/contact" className="text-sm hover:text-foreground">Contact</Link>
            </nav>
          </div>

          {/* CONTACT */}
          <div>
            <span className="text-lg font-semibold text-foreground">Contact us</span>

            <div className="mt-4 flex flex-col space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 9074600471</span>
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>wayntechmndy@gmail.com</span>
              </div>

              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1" />
                <span>
                  Aysha Arcade, Opposit Juma Masjid Pandikkadavu, 
                  Mananthavady, Wayanad - 670 645
                </span>
              </div>
            </div>

            {/* SOCIAL */}
            <div className="mt-6 flex space-x-5">
              <a href="https://www.facebook.com/share/1E2KeDL5VG/" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-6 w-6 hover:scale-110 transition" />
              </a>

              <a href="https://www.instagram.com/wayn.tec" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-6 w-6 hover:scale-110 transition" />
              </a>

              <a href="https://www.linkedin.com/in/wayntech-mndy-32529a3bb" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-6 w-6 hover:scale-110 transition" />
              </a>
            </div>
          </div>

          {/* MAP SECTION */}
          <div>
            <span className="text-lg font-semibold text-foreground">Location</span>

            <div className="mt-4 w-full h-[200px] rounded-lg overflow-hidden shadow">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.09839309362448!2d75.99588972760343!3d11.794995601325716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba5dfce34295aad%3A0x221294b752d056bc!2sWAYN%20TECH%20CARDS!5e0!3m2!1sen!2sin!4v1775143889676!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* OPTIONAL BUTTON */}
            
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            <p className="text-sm">
              © {currentYear} Wayntech. All rights reserved.
            </p>

            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="hover:text-foreground">
                Privacy Policy
              </Link>

              <Link to="/terms" className="hover:text-foreground">
                Terms of Service
              </Link>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;