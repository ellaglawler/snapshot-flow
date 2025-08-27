import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Clock, Eye, XCircle } from "lucide-react";
import type { CandidateStatus } from "@/data/candidates";

interface StatusBadgeProps {
  status: CandidateStatus;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const statusConfig = {
    pending: {
      label: "Pending",
      variant: "pending" as const,
      icon: Clock,
      className: "bg-status-pending-light text-status-pending border-status-pending/20"
    },
    "in-progress": {
      label: "In Progress",
      variant: "secondary" as const,
      icon: Eye,
      className: "bg-blue-50 text-blue-700 border-blue-200"
    },
    clear: {
      label: "Clear",
      variant: "success" as const,
      icon: CheckCircle,
      className: "bg-status-success-light text-status-success border-status-success/20"
    },
    review: {
      label: "Review",
      variant: "warning" as const,
      icon: AlertTriangle,
      className: "bg-status-warning-light text-orange-700 border-orange-200"
    },
    rejected: {
      label: "Rejected",
      variant: "destructive" as const,
      icon: XCircle,
      className: "bg-status-danger-light text-status-danger border-status-danger/20"
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div 
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className} ${className}`}
    >
      <Icon size={14} />
      {config.label}
    </div>
  );
};