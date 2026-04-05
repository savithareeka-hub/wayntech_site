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

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ HANDLE SUBMIT (FIXED API)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "https://wayntech-site.onrender.com"}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      toast.success("✅ Message sent successfully!");

      // RESET FORM
      setFormData({
        name: '',
        email: '',
        message: ''
      });

    } catch (err) {
      console.error("❌ Contact Error:", err);
      toast.error(err.message || "Error sending message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact us - Wayntech</title>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 py-12 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">

            {/* TITLE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Get in touch
              </h1>
              <p className="text-lg text-muted-foreground">
                Send us a message and we’ll get back to you.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

              {/* ✅ CONTACT FORM */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="bg-card rounded-xl p-8 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-6">
                    Send us a message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                      <Label>Name</Label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <Label>Message</Label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send message
                        </>
                      )}
                    </Button>

                  </form>
                </div>
              </motion.div>

              {/* 📞 CONTACT INFO */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <Phone /> +91 9074600471
                </div>

                <div className="flex items-center gap-3">
                  <Mail /> wayntechmndy@gmail.com
                </div>

                <div className="flex items-center gap-3">
                  <MapPin /> Mananthavady, Wayanad
                </div>
              </motion.div>

            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ContactPage;