import * as React from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
  delay = 0,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: {},
        hidden: {},
      }}
      className="relative"
    >
      <motion.span
        variants={{
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 1,
              ease: [0.2, 0.65, 0.3, 0.9],
              delay,
            },
          },
          hidden: {
            opacity: 0,
            y: 40,
          },
        }}
        className={className}
      >
        {text}
      </motion.span>
    </motion.div>
  );
};
