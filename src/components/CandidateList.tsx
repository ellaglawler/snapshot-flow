import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { Eye, Mail, Calendar } from "lucide-react";
import type { Candidate } from "@/data/candidates";
import { useNavigate } from "react-router-dom";

interface CandidateListProps {
  candidates: Candidate[];
}

export const CandidateList = ({ candidates }: CandidateListProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-3">
      {candidates.map((candidate) => (
        <Card 
          key={candidate.id} 
          className="p-4 hover:shadow-md transition-all duration-200 cursor-pointer border-card-border"
          onClick={() => navigate(`/report/${candidate.id}`)}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-card-foreground">{candidate.name}</h3>
                <StatusBadge status={candidate.status} />
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail size={14} />
                  {candidate.email}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  Added {formatDate(candidate.dateAdded)}
                </div>
                {candidate.dateCompleted && (
                  <div className="text-status-success">
                    Completed {formatDate(candidate.dateCompleted)}
                  </div>
                )}
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-4"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/report/${candidate.id}`);
              }}
            >
              <Eye size={16} className="mr-2" />
              View Report
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};