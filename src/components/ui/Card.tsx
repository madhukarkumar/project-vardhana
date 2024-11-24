import React from 'react';
import { cn } from '../../utils/cn';
import { DotPattern } from './DotPattern';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div 
      className={cn(
        "relative rounded-xl border border-border-card-light dark:border-border-card-dark",
        "bg-background-card-light dark:bg-background-card-dark",
        "backdrop-blur-xs",
        "shadow-lg dark:shadow-none",
        "transition-all duration-200",
        "overflow-hidden",
        className
      )}
      {...props}
    >
      <DotPattern className="opacity-50" />
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, className, ...props }: CardProps) {
  return (
    <div 
      className={cn(
        "relative z-10",
        "flex items-center justify-between p-6",
        "border-b border-border-card-light dark:border-border-card-dark",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Body = function CardBody({ children, className, ...props }: CardProps) {
  return (
    <div 
      className={cn(
        "relative z-10",
        "p-6",
        "bg-transparent",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};