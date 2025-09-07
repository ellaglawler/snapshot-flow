import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/Logo";
import { initialCandidates, getReportData } from "@/data/candidates";
import { ArrowLeft, User, CheckCircle, FileText, Shield } from "lucide-react";

export const IdentityVerification = () => {
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
    } else if (status === 'pending') {
      return 'bg-status-pending-light text-status-pending border-status-pending/20';
    } else {
      return 'bg-status-danger-light text-status-danger border-status-danger/20';
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
            <User className="w-8 h-8 text-brand-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Identity Verification</h1>
              <p className="text-muted-foreground">Detailed identity verification results for {candidate.name}</p>
            </div>
          </div>
          <Badge className={getStatusColor(reportData.identity)}>
            {reportData.identity === 'verified' ? 'Verified' : 
             reportData.identity === 'pending' ? 'Pending' : 'Failed'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Verification Details */}
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-status-success" />
                Legal Name Verification
              </CardTitle>
              <CardDescription>
                Full legal name confirmation and validation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-card-border">
                <span className="font-medium">Provided Name:</span>
                <span className="text-muted-foreground">John Doe</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-card-border">
                <span className="font-medium">Legal Name:</span>
                <span className="text-muted-foreground">Jordan Alexander Mitchell</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium">Status:</span>
                <Badge className="bg-status-success-light text-status-success">Confirmed</Badge>
              </div>
            </CardContent>
          </Card>

          {/* SSN Verification */}
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-status-success" />
                Social Security Verification
              </CardTitle>
              <CardDescription>
                Social Security Number validation and matching
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-card-border">
                <span className="font-medium">SSN Format:</span>
                <Badge className="bg-status-success-light text-status-success">Valid</Badge>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-card-border">
                <span className="font-medium">Date of Birth Match:</span>
                <span className="text-muted-foreground">07/14/1998 ✓</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium">Issuing State:</span>
                <span className="text-muted-foreground">Georgia</span>
              </div>
            </CardContent>
          </Card>

          {/* Address Verification */}
          <Card className="border-card-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-status-success" />
                Address History
              </CardTitle>
              <CardDescription>
                Residential address verification and history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">Current Address</p>
                      <p className="text-sm text-muted-foreground">1234 Tech Street, Atlanta, GA 30309</p>
                    </div>
                    <Badge className="bg-status-success-light text-status-success">Verified</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Residence: 2022 - Present</p>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">Previous Address</p>
                      <p className="text-sm text-muted-foreground">567 College Ave, Athens, GA 30601</p>
                    </div>
                    <Badge className="bg-status-success-light text-status-success">Verified</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Residence: 2016 - 2022</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <Card className="border-card-border mt-6">
          <CardHeader>
            <CardTitle>Verification Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-3 p-4 bg-status-success-light/30 rounded-lg border border-status-success/20">
              <CheckCircle className="w-5 h-5 text-status-success mt-0.5" />
              <div>
                <p className="font-medium text-status-success">Identity Successfully Verified</p>
                <p className="text-sm text-muted-foreground mt-1">
                  All identity verification checks have passed. The candidate's legal name, Social Security Number, 
                  and address history have been successfully validated with no red flags identified.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};