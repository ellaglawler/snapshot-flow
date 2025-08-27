import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/Logo";
import { initialCandidates, getReportData } from "@/data/candidates";
import { ArrowLeft, GraduationCap, AlertTriangle, Calendar, Award, Phone, Clock } from "lucide-react";

export const Education = () => {
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
    } else if (status === 'unverified') {
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
            <GraduationCap className="w-8 h-8 text-brand-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Education Verification</h1>
              <p className="text-muted-foreground">Academic credentials verification for {candidate.name}</p>
            </div>
          </div>
          <Badge className={getStatusColor(reportData.education)}>
            {reportData.education === 'unverified' ? 'Unverified' : 
             reportData.education === 'pending' ? 'Pending' : 'Verified'}
          </Badge>
        </div>

        <div className="space-y-6">
          {/* Primary Education */}
          <Card className="border-card-border">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-brand-primary" />
                  <div>
                    <CardTitle>Georgia State University</CardTitle>
                    <CardDescription>Bachelor of Computer Science</CardDescription>
                  </div>
                </div>
                <Badge className="bg-brand-accent/10 text-brand-accent">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Pending Verification
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm"><strong>Attendance:</strong> 2016 - 2020</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm"><strong>Degree Type:</strong> Bachelor's</span>
                </div>
              </div>
              
              <div className="p-4 bg-brand-accent/5 rounded-lg border border-brand-accent/30">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Verification Status
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Degree verification request submitted to registrar</li>
                  <li>• Student ID and enrollment confirmed</li>
                  <li>• Graduation status pending final verification</li>
                  <li>• Registrar's office has not yet responded</li>
                  <li>• Follow-up request sent on August 26, 2025</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2">Academic Details</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong>Major:</strong> Computer Science</p>
                    <p><strong>Concentration:</strong> Software Engineering</p>
                    <p><strong>Claimed GPA:</strong> 3.7/4.0</p>
                    <p><strong>Graduation Date:</strong> May 2020</p>
                  </div>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2">Institution Contact</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong>Registrar:</strong> Georgia State University</p>
                    <p><strong>Phone:</strong> (404) 413-2600</p>
                    <p><strong>Email:</strong> registrar@gsu.edu</p>
                    <p><strong>Last Contact:</strong> August 26, 2025</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification Process */}
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-brand-primary" />
                Verification Process
              </CardTitle>
              <CardDescription>
                Steps taken to verify educational credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-status-success text-white flex items-center justify-center text-xs font-bold">1</div>
                  <div className="flex-1">
                    <p className="font-medium">Initial Verification Request</p>
                    <p className="text-sm text-muted-foreground">Submitted degree verification form to Georgia State University registrar</p>
                    <p className="text-xs text-muted-foreground">August 24, 2025</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-status-success text-white flex items-center justify-center text-xs font-bold">2</div>
                  <div className="flex-1">
                    <p className="font-medium">Student Record Lookup</p>
                    <p className="text-sm text-muted-foreground">Confirmed student ID and enrollment history in university system</p>
                    <p className="text-xs text-muted-foreground">August 25, 2025</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">3</div>
                  <div className="flex-1">
                    <p className="font-medium">Follow-up Contact</p>
                    <p className="text-sm text-muted-foreground">Additional request sent due to delayed response from registrar</p>
                    <p className="text-xs text-muted-foreground">August 26, 2025</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-bold">4</div>
                  <div className="flex-1">
                    <p className="font-medium text-muted-foreground">Awaiting Final Confirmation</p>
                    <p className="text-sm text-muted-foreground">Pending official degree verification from registrar's office</p>
                    <p className="text-xs text-muted-foreground">Expected: August 28-30, 2025</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alternative Verification */}
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle>Alternative Verification Methods</CardTitle>
              <CardDescription>
                Additional steps being taken to confirm degree
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2">National Student Clearinghouse</h4>
                  <p className="text-sm text-muted-foreground mb-2">Third-party degree verification service</p>
                  <Badge className="bg-status-pending-light text-status-pending">Requested</Badge>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2">Academic Transcript</h4>
                  <p className="text-sm text-muted-foreground mb-2">Official transcript review as backup verification</p>
                  <Badge className="bg-status-pending-light text-status-pending">Option Available</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle>Education Verification Summary</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="flex items-start gap-3 p-4 bg-brand-accent/5 rounded-lg border border-brand-accent/30">
              <AlertTriangle className="w-5 h-5 text-brand-accent mt-0.5" />
              <div>
                <p className="font-medium text-brand-accent">Degree Verification Pending</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Student enrollment and attendance at Georgia State University has been confirmed through university records. 
                    Final degree verification is pending response from the registrar's office. This is a common delay and does not 
                    indicate any issues with the candidate's credentials. Alternative verification methods are available if needed.
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