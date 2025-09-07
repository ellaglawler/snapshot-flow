import type { Candidate } from "@/data/candidates";

interface BackgroundCheckProgressProps {
  candidate: Candidate;
  className?: string;
}

const getSectionStatus = (value: string | undefined) => {
  if (!value || value === 'pending') {
    return { color: 'bg-muted', label: 'Pending' };
  }
  
  if (value === 'verified' || value === 'clear') {
    return { color: 'bg-status-success', label: 'Clear' };
  }
  
  if (value === 'review' || value === 'unverified' || value === 'partial' || value === 'failed') {
    return { color: 'bg-status-warning', label: 'Review' };
  }
  
  return { color: 'bg-muted', label: 'Pending' };
};

export const BackgroundCheckProgress = ({ candidate, className }: BackgroundCheckProgressProps) => {
  const sections = [
    { key: 'identity', label: 'ID' },
    { key: 'employment', label: 'EMP' },
    { key: 'criminal', label: 'CRIM' },
    { key: 'education', label: 'EDU' },
    { key: 'socialMedia', label: 'SOC' },
    { key: 'onlinePresence', label: 'WEB' }
  ];

  return (
    <div className={`flex gap-1 ${className}`}>
      {sections.map((section) => {
        const sectionValue = candidate.reportData?.[section.key as keyof typeof candidate.reportData];
        const status = getSectionStatus(sectionValue as string);
        
        return (
          <div
            key={section.key}
            className={`h-2 w-6 rounded-sm ${status.color} transition-colors duration-200`}
            title={`${section.label}: ${status.label}`}
          />
        );
      })}
    </div>
  );
};