import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/Logo";
import { StatusBadge } from "@/components/StatusBadge";
import { initialCandidates, getReportData } from "@/data/candidates";
import { 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  XCircle,
  User,
  Shield,
  GraduationCap,
  Briefcase,
  AlertCircle,
  Download,
  Mail,
  Globe,
  Users
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const Report = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAdverseModal, setShowAdverseModal] = useState(false);

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

  const getStatusIcon = (status: string) => {
    if (status === 'verified' || status === 'clear') {
      return <CheckCircle className="w-5 h-5 text-status-success" />;
    } else if (status === 'unverified' || status === 'review' || status === 'partial') {
      return <AlertTriangle className="w-5 h-5 text-brand-accent" />;
    } else if (status === 'failed') {
      return <XCircle className="w-5 h-5 text-status-danger" />;
    } else {
      return <Clock className="w-5 h-5 text-status-pending" />;
    }
  };

  const getStatusColor = (status: string) => {
    if (status === 'verified' || status === 'clear') {
      return 'bg-status-success-light text-status-success border-status-success/20';
    } else if (status === 'unverified' || status === 'review' || status === 'partial') {
      return 'bg-brand-accent/10 text-brand-accent border-brand-accent/20';
    } else if (status === 'failed') {
      return 'bg-status-danger-light text-status-danger border-status-danger/20';
    } else {
      return 'bg-status-pending-light text-status-pending border-status-pending/20';
    }
  };

  const handleAdverseAction = () => {
    toast({
      title: "Pre-Adverse Notice Sent",
      description: `Email sent to ${candidate.email}. Candidate has 3 days to respond.`,
    });
    setShowAdverseModal(false);
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
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Dashboard
              </Button>
              <Logo />
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all duration-200">
                <Download size={16} className="mr-2" />
                Export PDF
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all duration-200">
                <Mail size={16} className="mr-2" />
                Share Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Report Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Background Check Report</h1>
              <div className="flex items-center gap-4">
                <p className="text-muted-foreground">Candidate: <span className="font-medium text-foreground">{candidate.name}</span></p>
                <StatusBadge status={candidate.status} />
              </div>
            </div>
            {candidate.status === 'review' && (
              <Button 
                variant="destructive"
                onClick={() => setShowAdverseModal(true)}
              >
                <XCircle size={16} className="mr-2" />
                Reject Candidate
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Report */}
          <div className="lg:col-span-2 space-y-6">
            {/* Verification Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card 
                className="border-card-border cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/report/${id}/identity`)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <User className="w-5 h-5 text-brand-primary" />
                    Identity Verification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(reportData.identity)}
                       <Badge className={getStatusColor(reportData.identity)}>
                         {reportData.identity === 'verified' ? 'Verified' : 
                          reportData.identity === 'pending' ? 'Pending' : 'Failed'}
                       </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="border-card-border cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/report/${id}/employment`)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Briefcase className="w-5 h-5 text-brand-primary" />
                    Employment History
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

              <Card 
                className="border-card-border cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/report/${id}/criminal`)}
              >
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
                         {reportData.criminal === 'clear' ? 'Clear' : 
                          reportData.criminal === 'pending' ? 'Pending' : 'Review'}
                       </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="border-card-border cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/report/${id}/education`)}
              >
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
                        {reportData.education === 'unverified' ? 'Unverified' : 
                         reportData.education === 'pending' ? 'Pending' : 'Verified'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="border-card-border cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/report/${id}/social-media`)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="w-5 h-5 text-brand-primary" />
                    Social Media
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(reportData.socialMedia)}
                      <Badge className={getStatusColor(reportData.socialMedia)}>
                        {reportData.socialMedia === 'review' ? 'Review' : 
                         reportData.socialMedia === 'pending' ? 'Pending' : 'Clear'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="border-card-border cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/report/${id}/online-presence`)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Globe className="w-5 h-5 text-brand-primary" />
                    Online Presence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(reportData.onlinePresence)}
                      <Badge className={getStatusColor(reportData.onlinePresence)}>
                        {reportData.onlinePresence === 'clear' ? 'Clear' : 
                         reportData.onlinePresence === 'pending' ? 'Pending' : 'Review'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Summary */}
            <Card className="border-card-border">
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-brand-accent" />
                  AI Summary
                </CardTitle>
                <CardDescription>
                  Automated analysis of background check results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gradient-to-r from-brand-accent/5 to-muted/50 rounded-lg border-l-4 border-brand-accent/30">
                  <div className="space-y-4 text-sm leading-relaxed">
                    <div className="border-b border-orange-100 pb-3">
                      <div className="font-semibold text-foreground mb-1">Candidate: John Doe</div>
                      <div className="text-muted-foreground">Position Applied: Software Engineer</div>
                      <div className="text-muted-foreground">Date of Report: August 27, 2025</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-status-success mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-foreground">Identity Verification</div>
                          <ul className="text-muted-foreground mt-1 space-y-1 text-xs ml-2">
                            <li>• Full legal name confirmed: Jordan Alexander Mitchell</li>
                            <li>• Social Security Number: Valid and matched with provided DOB (07/14/1998)</li>
                            <li>• No red flags in identity validation</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-status-success mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-foreground">Criminal Record</div>
                          <ul className="text-muted-foreground mt-1 space-y-1 text-xs ml-2">
                            <li>• National criminal database search: Clear</li>
                            <li>• State-level record search (GA, FL, NC): Clear</li>
                            <li>• Sex offender registry: Not listed</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-brand-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-foreground">Employment Verification</div>
                          <ul className="text-muted-foreground mt-1 space-y-1 text-xs ml-2">
                            <li>• TechWorks Inc. (2022–2024): Confirmed title as Software Engineer</li>
                            <li>• QuickByte LLC (2020–2022): Employment dates verified, but job title could not be confirmed (records incomplete)</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-brand-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-foreground">Education Verification</div>
                          <ul className="text-muted-foreground mt-1 space-y-1 text-xs ml-2">
                            <li>• Georgia State University: Bachelor of Computer Science (2016–2020)</li>
                            <li>• Degree pending verification – registrar's office has not yet responded</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-status-success mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-foreground">Reference & Reputation</div>
                          <ul className="text-muted-foreground mt-1 space-y-1 text-xs ml-2">
                            <li>• 2 professional references provided; both responded positively regarding technical skills and teamwork</li>
                            <li>• No adverse findings from public professional profiles</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-brand-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-foreground">Social Media & Web Presence</div>
                          <ul className="text-muted-foreground mt-1 space-y-1 text-xs ml-2">
                            <li>• Professional accounts: Appropriate, no concerning activity</li>
                            <li>• Personal social media: Minor flagged posts (sarcastic humor; no discriminatory or violent content)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-card-border">
              <CardHeader>
                <CardTitle>Candidate Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Full Name</p>
                  <p className="text-sm text-muted-foreground">{candidate.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{candidate.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Date Added</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(candidate.dateAdded).toLocaleDateString()}
                  </p>
                </div>
                {candidate.dateCompleted && (
                  <div>
                    <p className="text-sm font-medium">Completed</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(candidate.dateCompleted).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-card-border">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Mail size={16} className="mr-2" />
                  Contact Candidate
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download size={16} className="mr-2" />
                  Download Report
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate(`/candidate-portal/${candidate.id}`)}
                >
                  <User size={16} className="mr-2" />
                  View Candidate Portal
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Adverse Action Modal */}
      {showAdverseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-brand-accent" />
                Adverse Action Notice
              </CardTitle>
              <CardDescription>
                This will send a pre-adverse action notice to the candidate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-2">Email Preview:</p>
                <p className="text-sm text-muted-foreground">
                  "Dear {candidate.name}, we have completed your background check and identified some concerns. 
                  You have 3 business days to review and dispute any findings. Please contact us if you have questions."
                </p>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAdverseModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  variant="destructive"
                  onClick={handleAdverseAction}
                  className="flex-1"
                >
                  Send Notice
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};