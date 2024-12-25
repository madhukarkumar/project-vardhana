import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const features = [
  {
    title: "24/7 Growth",
    description: "Agents that understands your business, improves over time and drives growth 24/7",
    icon: "🚀",
  },
  {
    title: "Audience Builder",
    description: "Automatically identify and engage with potential customers across platforms",
    icon: "🎯",
  },
  {
    title: "Personalized Outreach",
    description: "Create tailored messaging with human in the loop that resonates with your target audience",
    icon: "✉️",
  },
  {
    title: "Live Analytics",
    description: "View your growth performance in real-time and act on them while it matters",
    icon: "📊",
  },
  {
    title: "Multi-Channel Presence",
    description: "Maintain consistent engagement across all your social platforms",
    icon: "🌐",
  },
];

export const Features = () => {
  return (
    <div className="py-20 bg-black relative">
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-2 font-bold text-4xl text-white md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50"
          >
            Features that drive growth
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-gray-400"
          >
            Everything you need to scale your business with AI-powered automation
          </motion.p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div
                className={cn(
                  "relative h-full p-6 bg-gradient-to-br rounded-3xl border border-gray-800",
                  "from-gray-900/50 to-gray-900/30 backdrop-blur-sm",
                  "hover:border-gray-700 transition-colors duration-300"
                )}
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
