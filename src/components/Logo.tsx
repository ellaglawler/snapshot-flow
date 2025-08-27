interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo = ({ className, showText = true }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <img 
          src="/lovable-uploads/bfd78908-aa30-49ad-908c-423d090f1051.png" 
          alt="Snapshot Logo" 
          className="w-8 h-8 object-contain"
        />
      </div>
      {showText && (
        <span className="text-xl font-bold text-foreground">Snapshot</span>
      )}
    </div>
  );
};