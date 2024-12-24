import { motion } from "framer-motion";

export const BackgroundPattern = () => {
  const rows = new Array(100).fill(1);
  const cols = new Array(100).fill(1);
  
  return (
    <div
      style={{
        transform: `translate(-40%, -60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className="absolute left-1/2 top-1/2 ml-[-12px] h-[800px] w-[800px]"
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row-${i}`}
          className="absolute h-[1px] w-full"
          style={{
            top: `${i * 8}px`,
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
          }}
          initial={{
            opacity: 0,
            x: -100,
          }}
          animate={{
            opacity: [0, 1, 0],
            x: [-100, 100, 300],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.02,
            ease: "linear",
          }}
        >
          {cols.map((_, j) => (
            <div
              key={`col-${j}`}
              className="absolute h-full w-[1px]"
              style={{
                left: `${j * 8}px`,
                background: "linear-gradient(0deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
};
