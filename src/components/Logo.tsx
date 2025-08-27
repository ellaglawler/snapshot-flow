interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo = ({ className, showText = true }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center p-1">
          <img 
            src="/lovable-uploads/bfd78908-aa30-49ad-908c-423d090f1051.png" 
            alt="Snapshot Logo" 
            className="w-full h-full object-contain filter invert"
          />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-accent rounded-full border-2 border-white"></div>
      </div>
      {showText && (
        <span className="text-xl font-bold text-foreground">Snapshot</span>
      )}
    </div>
  );
};