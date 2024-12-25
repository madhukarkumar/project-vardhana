import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";
import { BackgroundPattern } from "../components/ui/BackgroundPattern";
import { AnimatedText } from "../components/ui/AnimatedText";
import { Meteors } from "../components/ui/Meteors";
import { useAuth } from "../hooks/useAuth";

export const Home = () => {
  const navigate = useNavigate();
  const { session } = useAuth();

  return (
    <div className="min-h-screen w-full bg-black antialiased bg-grid-white/[0.02] relative overflow-hidden">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      {/* Ambient light effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/30 via-purple-500/30 to-pink-500/30 opacity-0 transition duration-500 group-hover:opacity-100" />
      
      {/* Header */}
      <header className="relative z-50 flex justify-between items-center px-4 py-3 md:px-6 md:py-4">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">Robynn</h1>
        <div>
          {!session ? (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-md text-sm font-medium bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 rounded-md text-sm font-medium bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              Dashboard
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <BackgroundPattern />
        </div>

        {/* Meteors Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <Meteors number={40} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex flex-col items-center gap-4 text-center">
            <AnimatedText
              text="Your Personal CMO Agent"
              className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50"
              delay={0.2}
            />
            <AnimatedText
              text="driving 24/7 growth for your Business"
              className="text-3xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50"
              delay={0.4}
            />

            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-4 text-2xl text-neutral-300 max-w-xl mx-auto text-center text-lg"
            >
              No CRM. No funnel. Just growth.
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-8"
            >
              <button
                onClick={() => navigate("/login")}
                className="group relative inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full hover:opacity-90 transition-all duration-300"
              >
                Get Started
                <IconArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute -inset-1 -z-10 blur-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
              </button>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
