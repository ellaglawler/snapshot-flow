interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo = ({ className, showText = true }: LogoProps) => {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      <div className="relative">
        <img 
          src="/lovable-uploads/bfd78908-aa30-49ad-908c-423d090f1051.png" 
          alt="Snapshot Logo" 
          className="w-10 h-10 object-contain brightness-0 invert"
        />
      </div>
      {showText && (
        <span className="text-xl font-bold text-black">Snapshot</span>
      )}
    </div>
  );
};