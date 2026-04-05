import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { Target, Heart, Zap } from 'lucide-react';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About us - Wayntech</title>
        <meta name="description" content="Learn about Wayntech's mission to deliver premium custom printing solutions with quality craftsmanship and personalized service." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-background via-background to-muted">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center"
              >
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6" style={{ letterSpacing: '-0.02em' }}>
                  About Wayntech
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We are passionate about bringing your ideas to life through premium custom printing and personalized products. With years of experience and a commitment to excellence, we serve businesses, schools, organizations, and individuals across India.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Our values
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  The principles that guide everything we do
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-xl p-8 shadow-md"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Quality first
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We never compromise on quality. Every product is crafted with precision and attention to detail.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-xl p-8 shadow-md"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Customer focused
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Your satisfaction is our priority. We work closely with you to ensure perfect results.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-xl p-8 shadow-md"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Innovation driven
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We stay ahead with the latest printing technology and design trends to serve you better.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Story Section */}
          <section className="py-20 bg-muted">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                    Our story
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Wayntech was founded with a simple mission: to make high-quality custom printing accessible to everyone. What started as a small operation has grown into a trusted partner for businesses and individuals across Kerala and beyond.
                    </p>
                    <p>
                      We specialize in a wide range of products, from professional ID cards and lanyards to personalized gifts and awards. Our state-of-the-art printing facility and experienced team ensure that every order meets our exacting standards.
                    </p>
                    <p>
                      Today, we're proud to serve schools, corporations, event organizers, and individuals who demand excellence. Whether you need a single custom item or a large bulk order, we bring the same dedication and attention to detail to every project.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
