import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Robynn has completely transformed how we handle our marketing. The AI-driven approach has increased our leads by 300%.",
    author: "Sarah Johnson",
    role: "CEO, TechStart",
    image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    quote: "The automated outreach and personalized messaging have helped us scale our business without increasing our team size.",
    author: "Michael Chen",
    role: "Founder, GrowthLabs",
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    quote: "Since implementing Robynn, our customer engagement has improved dramatically. It's like having a 24/7 marketing team.",
    author: "Emily Rodriguez",
    role: "Marketing Director, ScaleUp",
    image: "https://randomuser.me/api/portraits/women/2.jpg"
  }
];

export const Testimonials = () => {
  return (
    <div className="py-20 bg-black relative">
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-2 font-bold text-4xl text-white md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50"
          >
            What our clients say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-gray-400"
          >
            Join hundreds of satisfied businesses growing with Robynn
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="relative p-6 bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-3xl border border-gray-800 hover:border-gray-700 transition-colors duration-300">
                <div className="mb-8">
                  <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                </div>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.author}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
