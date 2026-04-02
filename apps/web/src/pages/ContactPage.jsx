import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };
  return <>
      <Helmet>
        <title>Contact us - Wayntech</title>
        <meta name="description" content="Get in touch with Wayntech for custom printing inquiries, quotes, and support. We're here to help bring your ideas to life." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 py-12 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{
              letterSpacing: '-0.02em'
            }}>
                Get in touch
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Have a question or ready to start your custom printing project? We'd love to hear from you.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <motion.div initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.5,
              delay: 0.2
            }}>
                <div className="bg-card rounded-xl p-8 shadow-lg">
                  <h2 className="text-2xl font-semibold text-foreground mb-6">
                    Send us a message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-foreground">Name</Label>
                      <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required className="mt-2 text-foreground" placeholder="Your name" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-foreground">Email</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="mt-2 text-foreground" placeholder="your.email@example.com" />
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-foreground">Message</Label>
                      <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} className="mt-2 text-foreground" placeholder="Tell us about your project..." />
                    </div>
                    <Button type="submit" className="w-full transition-all duration-200 active:scale-[0.98]" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : <>
                          <Send className="mr-2 h-4 w-4" />
                          Send message
                        </>}
                    </Button>
                  </form>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div initial={{
              opacity: 0,
              x: 20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.5,
              delay: 0.3
            }} className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-6">
                    Contact information
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                        <p className="text-muted-foreground">+91 90746 00471</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Monday - Saturday, 9am - 6pm
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Email</h3>
                        <p className="text-muted-foreground">wayntechmndy@gmail.com</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          We'll respond within 24 hours
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Location</h3>
                        <p className="text-muted-foreground">Aysha Arcade, Opposit Juma MAsjid
Pandikkadavu, Mananthavady,
Wayanad-670 645</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Serving customers across India
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-3">
                    Quick response via WhatsApp
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    For immediate assistance, reach out to us on WhatsApp and we'll get back to you right away.
                  </p>
                  <Button asChild variant="outline" className="w-full transition-all duration-200 active:scale-[0.98]">
                    <a href="https://wa.me/919074600471" target="_blank" rel="noopener noreferrer">
                      Chat on WhatsApp
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>;
};
export default ContactPage;
