import React from 'react';
import { cn } from '../../utils/cn';

interface DotPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function DotPattern({ className, ...props }: DotPatternProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 -z-10 h-full w-full",
        "bg-transparent",
        "[background-image:radial-gradient(#e5e7eb_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]",
        "[background-size:16px_16px]",
        "[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]",
        className
      )}
      {...props}
    />
  );
}