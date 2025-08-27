import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/Logo";
import { StatusBadge } from "@/components/StatusBadge";
import { initialCandidates, getReportData } from "@/data/candidates";
import { 
  CheckCircle, 
  Clock, 
  User,
  Shield,
  GraduationCap,
  Briefcase,
  AlertCircle,
  Phone,
  Mail
} from "lucide-react";

export const CandidatePortal = () => {
  const { id } = useParams();
  const candidate = initialCandidates.find(c => c.id === id);
  const reportData = getReportData(id!);

  if (!candidate) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Not Found</h1>
          <p className="text-muted-foreground">Please check your invitation link.</p>
        </div>
      </div>
    );
  }

  const getProgressValue = () => {
    switch (candidate.status) {
      case 'pending': return 25;
      case 'in-progress': return 75;
      case 'clear':
      case 'review':
      case 'rejected': return 100;
      default: return 0;
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'verified' || status === 'clear') {
      return <CheckCircle className="w-5 h-5 text-status-success" />;
    } else {
      return <Clock className="w-5 h-5 text-status-pending" />;
    }
  };

  const getStatusColor = (status: string) => {
    if (status === 'verified' || status === 'clear') {
      return 'bg-status-success-light text-status-success border-status-success/20';
    } else if (status === 'unverified' || status === 'review' || status === 'partial') {
      return 'bg-orange-50 text-orange-700 border-orange-200';
    } else {
      return 'bg-status-pending-light text-status-pending border-status-pending/20';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-card-border bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="text-right">
              <p className="text-sm font-medium">Candidate Portal</p>
              <p className="text-xs text-muted-foreground">{candidate.name}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Background Check Status</h1>
          <div className="flex items-center gap-4">
            <p className="text-muted-foreground">Hello {candidate.name}</p>
            <StatusBadge status={candidate.status} />
          </div>
        </div>

        {/* Progress */}
        <Card className="border-card-border mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-primary" />
              Progress Overview
            </CardTitle>
            <CardDescription>
              Track the status of your background verification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Background Check Progress</span>
                <span>{getProgressValue()}% Complete</span>
              </div>
              <Progress value={getProgressValue()} className="w-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${candidate.status !== 'pending' ? 'bg-status-success text-white' : 'bg-muted text-muted-foreground'}`}>
                  {candidate.status !== 'pending' ? <CheckCircle size={16} /> : <span className="text-sm">1</span>}
                </div>
                <p className="text-sm font-medium">Consent</p>
                <p className="text-xs text-muted-foreground">Received</p>
              </div>

              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${candidate.status === 'in-progress' || candidate.status === 'clear' || candidate.status === 'review' ? 'bg-status-success text-white' : 'bg-muted text-muted-foreground'}`}>
                  {candidate.status === 'in-progress' || candidate.status === 'clear' || candidate.status === 'review' ? <CheckCircle size={16} /> : <span className="text-sm">2</span>}
                </div>
                <p className="text-sm font-medium">Processing</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>

              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${candidate.status === 'clear' || candidate.status === 'review' ? 'bg-status-success text-white' : 'bg-muted text-muted-foreground'}`}>
                  {candidate.status === 'clear' || candidate.status === 'review' ? <CheckCircle size={16} /> : <span className="text-sm">3</span>}
                </div>
                <p className="text-sm font-medium">Review</p>
                <p className="text-xs text-muted-foreground">Complete</p>
              </div>

              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${candidate.status === 'clear' ? 'bg-status-success text-white' : 'bg-muted text-muted-foreground'}`}>
                  {candidate.status === 'clear' ? <CheckCircle size={16} /> : <span className="text-sm">4</span>}
                </div>
                <p className="text-sm font-medium">Final</p>
                <p className="text-xs text-muted-foreground">{candidate.status === 'clear' ? 'Clear' : 'Pending'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {candidate.status !== 'pending' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Verification Results */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-semibold">Verification Results</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-card-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <User className="w-5 h-5 text-brand-primary" />
                      Identity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(reportData.identity)}
                        <Badge className={getStatusColor(reportData.identity)}>
                          {reportData.identity === 'verified' ? 'Verified' : 'Pending'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-card-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Shield className="w-5 h-5 text-brand-primary" />
                      Criminal Record
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(reportData.criminal)}
                        <Badge className={getStatusColor(reportData.criminal)}>
                          {reportData.criminal === 'clear' ? 'Clear' : 'Pending'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-card-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <GraduationCap className="w-5 h-5 text-brand-primary" />
                      Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(reportData.education)}
                          <Badge className={getStatusColor(reportData.education)}>
                            {reportData.education === 'unverified' ? 'In Review' : 
                             reportData.education === 'pending' ? 'Pending' : 'Verified'}
                          </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-card-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Briefcase className="w-5 h-5 text-brand-primary" />
                      Employment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(reportData.employment)}
                          <Badge className={getStatusColor(reportData.employment)}>
                            {reportData.employment === 'partial' ? 'Partial' : 
                             reportData.employment === 'pending' ? 'Pending' : 'Verified'}
                          </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Summary */}
              {(candidate.status === 'clear' || candidate.status === 'review') && (
                <Card className="border-card-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-brand-primary" />
                      Summary
                    </CardTitle>
                    <CardDescription>
                      Overview of your background check results
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm leading-relaxed">{reportData.summary}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-card-border">
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    If you have questions about your background check or need to dispute any findings, 
                    please contact the employer's HR department.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone size={14} />
                      <span className="text-muted-foreground">(555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail size={14} />
                      <span className="text-muted-foreground">hr@acmecorp.com</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-card-border">
                <CardHeader>
                  <CardTitle>Your Rights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>You have the right to:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• Request a copy of your report</li>
                      <li>• Dispute inaccurate information</li>
                      <li>• Know if information was used against you</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};