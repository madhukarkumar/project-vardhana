interface BirdLogoProps {
  className?: string;
  collapsed?: boolean;
}

export const BirdLogo = ({ className = "h-6 w-6", collapsed = false }: BirdLogoProps) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <svg 
      className="h-full w-auto"
      viewBox="0 0 22 22" 
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M23 6.066C22.214 6.45 21.364 6.708 20.47 6.824C21.384 6.276 22.086 5.404 22.416 4.366C21.564 4.874 20.62 5.234 19.616 5.432C18.812 4.57 17.664 4.036 16.396 4.036C13.96 4.036 11.986 6.01 11.986 8.444C11.986 8.822 12.028 9.188 12.11 9.538C8.436 9.338 5.202 7.574 3.002 4.894C2.592 5.604 2.358 6.428 2.358 7.308C2.358 8.972 3.18 10.432 4.454 11.274C3.728 11.25 3.044 11.046 2.45 10.704V10.764C2.45 12.888 3.966 14.674 5.986 15.118C5.584 15.228 5.164 15.286 4.73 15.286C4.426 15.286 4.13 15.256 3.842 15.2C4.442 16.954 6.068 18.214 7.98 18.252C6.47 19.414 4.582 20.124 2.536 20.124C2.15 20.124 1.77 20.1 1.396 20.054C3.332 21.294 5.628 22.034 8.096 22.034C16.384 22.034 20.908 15.366 20.908 9.562L20.892 8.954C21.754 8.334 22.498 7.546 23 6.066Z"/>
    </svg>
    <span 
      className={`text-xl font-semibold transition-all duration-300 ${
        collapsed ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100'
      }`}
    >
      Robynn
    </span>
  </div>
);
