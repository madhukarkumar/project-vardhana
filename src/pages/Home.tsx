import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { HeroChat } from '../components/HeroChat';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light') return false;
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

const ShimmerBorder = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-lg blur opacity-25 dark:opacity-50 group-hover:opacity-50 dark:group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
      <div className="relative px-12 py-8 bg-white dark:bg-black rounded-lg leading-none flex items-center">
        {children}
      </div>
    </div>
  );
};

const GlowingBorder = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-full max-w-4xl">
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-orange-500 to-purple-600 rounded-lg blur-md opacity-75"></div>
      {/* Main container */}
      <div className="relative p-8 bg-gray-900/90 rounded-lg border border-gray-800">
        {children}
      </div>
    </div>
  );
};

export const Home = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-black dark:to-gray-900 text-gray-900 dark:text-white snap-y snap-mandatory overflow-y-scroll"
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/50 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-600">
          Robynn 🐦‍⬛ 
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button 
              onClick={() => navigate('/login')}
              className="px-6 py-2 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="h-screen snap-start flex items-center justify-center relative overflow-hidden px-4">
          {/* Background gradient */}
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]),
              y: useTransform(scrollYProgress, [0, 0.2], [0, 100])
            }}
            className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-transparent dark:from-purple-500/10 dark:via-blue-500/5 dark:to-transparent"
          />

          {/* Main content */}
          <div className="relative z-10 w-full max-w-4xl mx-auto space-y-8">
            {/* Headline and Subhead */}
            <div className="text-center space-y-4">
              <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 pb-4">
                Growth. Engineered.
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 pb-20">
                Product-led growth without the mindless marketing mechanics with
                <br />
                your very own growth engine that builds pipeline and revenue not just MQLs.
              </p>
            </div>

            {/* Hero Chat Component */}
            <HeroChat scrollYProgress={useTransform(scrollYProgress, [0, 0.2], [1, 0])} />
          </div>
        </section>

        {/* Features Grid */}
        <section className="min-h-screen snap-start py-20 px-4">
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [0, 1, 1, 0]),
              y: useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [100, 0, 0, -100])
            }}
            className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-6 rounded-lg bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg"
              >
                <div className="h-12 w-12 mb-4 text-blue-600 dark:text-blue-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Interactive Demo Section */}
        <section className="min-h-screen snap-start py-20 relative">
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [0, 1, 1, 0]),
              y: useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [100, 0, 0, -100])
            }}
            className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20 dark:from-blue-900/20 dark:to-purple-900/20" 
          />
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              style={{
                opacity: useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [0, 1, 1, 0]),
                y: useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [100, 0, 0, -100])
              }}
              className="aspect-video rounded-lg overflow-hidden bg-gray-900 border border-gray-700"
            >
              {/* Add your demo content here */}
              <div className="h-full w-full flex items-center justify-center">
                <span className="text-gray-400">Interactive Demo</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="min-h-screen snap-start py-20 px-4">
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.8, 0.9], [0, 1]),
              y: useTransform(scrollYProgress, [0.8, 0.9], [100, 0])
            }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Ready to get started?
            </h2>
            <p className="text-gray-400 mb-8">
              Join us in shaping the future of AI interaction
            </p>
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
              Get Started
            </button>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

const features = [
  {
    title: 'Agent',
    description: 'Your very own CMO co-Agent that gets betters over time',
    icon: '🤖',
  },
  {
    title: 'Knowledge',
    description: 'A self-correcting, evolving company knowledge to drive your product-led marketing and growth efforts.',
    icon: '📚',
  },
  {
    title: 'Playbooks',
    description: 'Battle-tested, product-led marketing and sales playbooks to run your growth engine.',
    icon: '📈',
  },
];