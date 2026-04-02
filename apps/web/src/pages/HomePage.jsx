import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { ArrowRight, Award, Sparkles, Users } from 'lucide-react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';


const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Wayntech - Custom printing and personalized products</title>
        <meta
          name="description"
          content="Your trusted partner for custom printing, ID cards, trophies, certificates, and personalized products."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">

          {/* Hero Section */}
          <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-background via-background to-muted overflow-hidden">
            <div className="absolute inset-0 opacity-[0.02]" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto text-center"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Custom printing solutions for your business
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  From ID cards to trophies, we bring your vision to life with premium quality products.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link to="/products">
                      Browse products
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>

                  <Button asChild variant="outline" size="lg">
                    <Link to="/contact">
                      Get in touch
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Why choose Wayntech
                </h2>
                <p className="text-muted-foreground">
                  We deliver quality products with customer satisfaction
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">

                {/* Item */}
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Award className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Premium quality</h3>
                    <p className="text-muted-foreground">
                      We use high-quality materials for best results.
                    </p>
                  </div>
                </div>

                {/* Item */}
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Sparkles className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Custom designs</h3>
                    <p className="text-muted-foreground">
                      Fully customizable products for your needs.
                    </p>
                  </div>
                </div>

                {/* Item */}
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Users className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Support</h3>
                    <p className="text-muted-foreground">
                      We help you from design to delivery.
                    </p>
                  </div>
                </div>

                {/* Item */}
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <ArrowRight className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Fast delivery</h3>
                    <p className="text-muted-foreground">
                      Get your orders delivered on time.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-muted">
            <div className="container mx-auto text-center px-4">
              <h2 className="text-3xl font-bold mb-6">
                Ready to get started?
              </h2>

              <Button asChild size="lg">
                <Link to="/products">
                  View products
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </section>

        </main>

        {/* MAP SECTION */}
        
        

        {/* FOOTER */}
        <Footer />
      </div>
    </>
  );
};

export default HomePage;