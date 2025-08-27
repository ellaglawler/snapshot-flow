import { CheckCircle, AlertTriangle, Clock, Eye, XCircle, Loader2 } from "lucide-react";
import type { CandidateStatus } from "@/data/candidates";

interface StatusBadgeProps {
  status: CandidateStatus;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const statusConfig = {
    pending: {
      label: "Pending",
      icon: Clock,
      className: "bg-status-pending-light text-status-pending border-status-pending/30 shadow-sm"
    },
    "in-progress": {
      label: "In Progress",
      icon: Loader2,
      className: "bg-blue-50 text-blue-700 border-blue-200 shadow-sm animate-pulse"
    },
    clear: {
      label: "Clear",
      icon: CheckCircle,
      className: "bg-gradient-to-r from-status-success-light to-status-success-light/70 text-status-success border-status-success/30 shadow-sm"
    },
    review: {
      label: "Review",
      icon: AlertTriangle,
      className: "bg-gradient-to-r from-status-warning-light to-status-warning-light/70 text-status-warning border-status-warning/30 shadow-sm"
    },
    rejected: {
      label: "Rejected",
      icon: XCircle,
      className: "bg-gradient-to-r from-status-danger-light to-status-danger-light/70 text-status-danger border-status-danger/30 shadow-sm"
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div 
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 hover:scale-105 ${config.className} ${className}`}
    >
      <Icon 
        size={12} 
        className={status === "in-progress" ? "animate-spin" : ""} 
      />
      <span>{config.label}</span>
    </div>
  );
};