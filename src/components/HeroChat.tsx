import { motion } from 'framer-motion';

interface GlowingBorderProps {
  children: React.ReactNode;
}

const GlowingBorder = ({ children }: GlowingBorderProps) => {
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

interface HeroChatProps {
  scrollYProgress: any;
}

export const HeroChat = ({ scrollYProgress }: HeroChatProps) => {
  return (
    <motion.div
      style={{
        opacity: scrollYProgress.get(),
        y: scrollYProgress.get(),
      }}
      className="relative z-10 w-full max-w-4xl mx-auto"
    >
      <GlowingBorder>
        <div className="space-y-6">
          <h2 className="text-2xl text-gray-600 dark:text-gray-400 font-light">
            Tell your co-CMO what you want it to do...
          </h2>
          {/* <div className="relative">
            <input
              type="text"
              placeholder="What would you like me to do? Start typing or choose an example..."
              className="w-full bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300 p-4 rounded-lg border border-gray-300 dark:border-gray-800 focus:border-blue-500 dark:focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-orange-500 transition-colors"
            />
            <div className="absolute right-4 top-4">
              <button className="px-4 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
                Go
              </button>
            </div>
          </div> */}
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
              🌐 Optimze my website for SEO
            </button>
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
              🔎 Research my competitors
            </button>
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
              💰 Build stage 2 pipeline for my product
            </button>
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
              📕 Talk to my company knowledgebase
            </button>
          </div>
        </div>
      </GlowingBorder>
    </motion.div>
  );
};
