import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/Logo";
import { initialCandidates, getReportData } from "@/data/candidates";
import { ArrowLeft, Briefcase, CheckCircle, AlertTriangle, Building, Calendar } from "lucide-react";

export const EmploymentHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const candidate = initialCandidates.find(c => c.id === id);
  const reportData = getReportData(id!);

  if (!candidate) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Candidate Not Found</h1>
          <Button onClick={() => navigate("/dashboard")}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    if (status === 'verified') {
      return 'bg-status-success-light text-status-success border-status-success/20';
    } else if (status === 'partial') {
      return 'bg-brand-accent/10 text-brand-accent border-brand-accent/20';
    } else {
      return 'bg-status-pending-light text-status-pending border-status-pending/20';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-card-border bg-black">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(`/report/${id}`)}
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Report
              </Button>
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="w-8 h-8 text-brand-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Employment History</h1>
              <p className="text-muted-foreground">Employment verification results for {candidate.name}</p>
            </div>
          </div>
          <Badge className={getStatusColor(reportData.employment)}>
            {reportData.employment === 'partial' ? 'Partial' : 
             reportData.employment === 'pending' ? 'Pending' : 'Verified'}
          </Badge>
        </div>

        <div className="space-y-6">
          {/* Employment 1 - TechWorks Inc */}
          <Card className="border-card-border">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Building className="w-6 h-6 text-brand-primary" />
                  <div>
                    <CardTitle>TechWorks Inc.</CardTitle>
                    <CardDescription>Software Engineer</CardDescription>
                  </div>
                </div>
                <Badge className="bg-status-success-light text-status-success">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm"><strong>Duration:</strong> 2022 - 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-status-success" />
                  <span className="text-sm"><strong>Status:</strong> Confirmed</span>
                </div>
              </div>
              
              <div className="p-4 bg-status-success-light/30 rounded-lg border border-status-success/20">
                <h4 className="font-medium mb-2">Verification Details</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Employment dates confirmed: January 2022 - August 2024</li>
                  <li>• Job title verified: Software Engineer</li>
                  <li>• Salary range confirmed: $85,000 - $95,000</li>
                  <li>• Reason for leaving: Career advancement</li>
                  <li>• Eligible for rehire: Yes</li>
                </ul>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium mb-2">Contact Information</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>HR Contact:</strong> Sarah Johnson</p>
                  <p><strong>Phone:</strong> (404) 555-0123</p>
                  <p><strong>Email:</strong> hr@techworks.com</p>
                  <p><strong>Verification Date:</strong> August 25, 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employment 2 - QuickByte LLC */}
          <Card className="border-card-border">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Building className="w-6 h-6 text-brand-primary" />
                  <div>
                    <CardTitle>QuickByte LLC</CardTitle>
                    <CardDescription>Position Title Unconfirmed</CardDescription>
                  </div>
                </div>
                <Badge className="bg-brand-accent/10 text-brand-accent">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Partial
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm"><strong>Duration:</strong> 2020 - 2022</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-brand-accent" />
                  <span className="text-sm"><strong>Status:</strong> Partially Verified</span>
                </div>
              </div>
              
              <div className="p-4 bg-brand-accent/5 rounded-lg border border-brand-accent/30">
                <h4 className="font-medium mb-2">Verification Issues</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Employment dates verified: March 2020 - December 2022</li>
                  <li>• Job title could not be confirmed (records incomplete)</li>
                  <li>• Candidate claims: "Junior Developer"</li>
                  <li>• Company confirmed employment but lacks detailed records</li>
                  <li>• Multiple follow-up attempts made</li>
                </ul>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium mb-2">Contact Information</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>Contact:</strong> Michael Chen (Former Manager)</p>
                  <p><strong>Phone:</strong> (678) 555-0456</p>
                  <p><strong>Email:</strong> mchen@quickbyte.com</p>
                  <p><strong>Verification Date:</strong> August 24, 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle>Employment Verification Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3 p-4 bg-brand-accent/5 rounded-lg border border-brand-accent/30">
                <AlertTriangle className="w-5 h-5 text-brand-accent mt-0.5" />
                <div>
                  <p className="font-medium text-brand-accent">Employment History Partially Verified</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Most recent employment at TechWorks Inc. is fully verified with excellent standing. 
                    Previous employment at QuickByte LLC shows verified dates but incomplete job title records. 
                    This is a minor discrepancy and does not indicate falsification.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};