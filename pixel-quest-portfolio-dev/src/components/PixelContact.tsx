import React, { useState } from 'react';
import { Mail, Linkedin, Instagram } from 'lucide-react';
import { useChatStore } from '@/Store/useChatStore';
import emailjs from '@emailjs/browser';

const PixelContact: React.FC = () => {
  const { setUser: setStoreUser } = useChatStore();

  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: '',
  });

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const emailData = {
      user_name: formData.user_name,
      user_email: formData.user_email,
      message: formData.message,
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID!,
        import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE_ID!,
        emailData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
      )
      .then(() => {
        return emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID!,
          import.meta.env.VITE_EMAILJS_USER_TEMPLATE_ID!,
          emailData,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
        );
      })
      .then(() => {
        setSent(true);
        setFormData({ user_name: '', user_email: '', message: '' });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
        setError('Failed to send your message.');
        setLoading(false);
      });
  };


  return (
    <section id="contact" className="relative py-20 bg-gradient-to-b from-[#1e3a8a] to-[#0a1128]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-300/10 via-transparent to-transparent"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 bg-clip-text text-transparent">
            Get in Touch
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl text-blue-200 mb-6">Let's Connect</h3>
              <p className="text-blue-100/80 text-lg leading-relaxed mb-8">
                Have a project in mind or want to discuss opportunities? I'd love to hear from you.
              </p>

              <div className="flex gap-4">
                <a href="https://linkedin.com/in/devpatel55566" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-[#2b5876] to-[#4e4376] p-4 rounded-full hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                  <Linkedin className="w-6 h-6 text-blue-200" />
                </a>
                <a href="https://www.instagram.com/dv_patel555/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-4 rounded-full hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                  <Instagram className="w-6 h-6 text-blue-200" />
                </a>
                <a href="mailto:your@email.com" className="bg-gradient-to-br from-[#1e3c72] to-[#2a5298] p-4 rounded-full hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                  <Mail className="w-6 h-6 text-blue-200" />
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Your Name"
                  required
                  value={formData.user_name}
                  onChange={handleChange}
                  className="w-full p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg focus:border-blue-400 focus:outline-none text-white placeholder-white/50"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="user_email"
                  placeholder="Your Email"
                  required
                  value={formData.user_email}
                  onChange={handleChange}
                  className="w-full p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg focus:border-blue-400 focus:outline-none text-white placeholder-white/50"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg focus:border-blue-400 focus:outline-none text-white placeholder-white/50"
                ></textarea>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 backdrop-blur-xl">
                {loading ? 'Sending...' : 'Send Message'}
              </button>

              {sent && (
                <p className="text-green-400 text-center pt-2">✅ Message sent successfully!</p>
              )}

              {error && (
                <p className="text-red-400 text-center pt-2">{error}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PixelContact;
