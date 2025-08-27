import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "./StatusBadge";
import { BackgroundCheckProgress } from "./BackgroundCheckProgress";
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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getProgressPercentage = (status: string) => {
    switch (status) {
      case 'pending': return 25;
      case 'in-progress': return 60;
      case 'review': return 85;
      case 'clear': return 100;
      case 'rejected': return 100;
      default: return 0;
    }
  };

  if (candidates.length === 0) {
    return (
      <Card className="p-12 text-center border-dashed border-2 border-muted">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No candidates yet</h3>
          <p className="text-muted-foreground mb-4">Get started by running your first background check</p>
          <Button className="bg-brand-primary hover:bg-brand-primary-dark">
            Run Background Check
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {candidates.map((candidate) => (
        <Card 
          key={candidate.id} 
          className="p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer border-card-border bg-gradient-to-r from-card to-card/50 group"
          onClick={() => navigate(`/report/${candidate.id}`)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <Avatar className="h-12 w-12 border-2 border-brand-primary/20">
                <AvatarFallback className="bg-gradient-to-br from-brand-primary to-brand-accent text-white font-semibold">
                  {getInitials(candidate.name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-card-foreground group-hover:text-brand-primary transition-colors">
                    {candidate.name}
                  </h3>
                  <StatusBadge status={candidate.status} />
                </div>
                
                <BackgroundCheckProgress candidate={candidate} className="mb-2" />
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-1.5">
                    <Mail size={14} className="text-brand-primary/60" />
                    <span className="font-medium">{candidate.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-brand-primary/60" />
                    <span>Added {formatDate(candidate.dateAdded)}</span>
                  </div>
                  {candidate.dateCompleted && (
                    <div className="text-status-success font-medium">
                      ✅ Completed {formatDate(candidate.dateCompleted)}
                    </div>
                  )}
                </div>

                {candidate.status === 'in-progress' && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-muted-foreground">Progress</span>
                      <span className="text-xs text-brand-primary font-bold">{getProgressPercentage(candidate.status)}%</span>
                    </div>
                    <Progress 
                      value={getProgressPercentage(candidate.status)} 
                      className="h-2 bg-muted"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-4 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-200 group-hover:shadow-md"
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