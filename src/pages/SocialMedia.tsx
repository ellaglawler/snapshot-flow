import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/Logo";
import { initialCandidates, getReportData } from "@/data/candidates";
import { ArrowLeft, Users, AlertTriangle, CheckCircle, MessageCircle, Camera, Share2, Flag } from "lucide-react";

export const SocialMedia = () => {
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
    if (status === 'clear') {
      return 'bg-status-success-light text-status-success border-status-success/20';
    } else if (status === 'review') {
      return 'bg-orange-50 text-orange-700 border-orange-200';
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
            <Users className="w-8 h-8 text-brand-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Social Media Analysis</h1>
              <p className="text-muted-foreground">Social media presence review for {candidate.name}</p>
            </div>
          </div>
          <Badge className={getStatusColor(reportData.socialMedia)}>
            {reportData.socialMedia === 'review' ? 'Review' : 
             reportData.socialMedia === 'pending' ? 'Pending' : 'Clear'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Professional Accounts */}
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-status-success" />
                Professional Accounts
              </CardTitle>
              <CardDescription>
                LinkedIn and professional platform analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-status-success-light/30 rounded-lg border border-status-success/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-600 rounded text-white flex items-center justify-center text-xs font-bold">in</div>
                  <div>
                    <p className="font-medium">LinkedIn Profile</p>
                    <p className="text-sm text-muted-foreground">linkedin.com/in/jordanmitchell</p>
                  </div>
                  <Badge className="bg-status-success-light text-status-success ml-auto">Clear</Badge>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 ml-11">
                  <li>• Professional headshot and complete profile</li>
                  <li>• Work history matches application</li>
                  <li>• Appropriate professional connections</li>
                  <li>• Regular industry-related posts</li>
                </ul>
              </div>

              <div className="p-4 bg-status-success-light/30 rounded-lg border border-status-success/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-black rounded text-white flex items-center justify-center text-xs font-bold">GH</div>
                  <div>
                    <p className="font-medium">GitHub Profile</p>
                    <p className="text-sm text-muted-foreground">github.com/jmitchell-dev</p>
                  </div>
                  <Badge className="bg-status-success-light text-status-success ml-auto">Clear</Badge>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 ml-11">
                  <li>• Active code contributions</li>
                  <li>• Professional project portfolio</li>
                  <li>• No concerning content in repositories</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Personal Social Media */}
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Personal Social Media
              </CardTitle>
              <CardDescription>
                Personal social media platform analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-500 rounded text-white flex items-center justify-center text-xs font-bold">f</div>
                  <div>
                    <p className="font-medium">Facebook Profile</p>
                    <p className="text-sm text-muted-foreground">Limited public visibility</p>
                  </div>
                  <Badge className="bg-orange-50 text-orange-700 ml-auto">Minor Flags</Badge>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 ml-11">
                  <li>• Most content is private/friends-only</li>
                  <li>• 3 posts with sarcastic humor flagged by AI</li>
                  <li>• No discriminatory or violent content</li>
                  <li>• Posts are within acceptable workplace standards</li>
                </ul>
              </div>

              <div className="p-4 bg-status-success-light/30 rounded-lg border border-status-success/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded text-white flex items-center justify-center text-xs font-bold">IG</div>
                  <div>
                    <p className="font-medium">Instagram Profile</p>
                    <p className="text-sm text-muted-foreground">@jordan.codes</p>
                  </div>
                  <Badge className="bg-status-success-light text-status-success ml-auto">Clear</Badge>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 ml-11">
                  <li>• Technology and lifestyle content</li>
                  <li>• Professional development posts</li>
                  <li>• No concerning content identified</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Content Analysis */}
          <Card className="border-card-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-brand-primary" />
                Content Analysis Details
              </CardTitle>
              <CardDescription>
                Detailed review of flagged social media content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-orange-50/30 rounded-lg border border-orange-200">
                  <div className="flex items-start gap-3">
                    <Flag className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium mb-2">Flagged Content Summary</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-white rounded border">
                          <p className="text-sm font-medium mb-1">Post 1 - Sarcastic Comment</p>
                          <p className="text-sm text-muted-foreground italic">
                            "Another Monday, another existential crisis about debugging CSS. 
                            At least the coffee machine still works... for now."
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            <strong>Analysis:</strong> Workplace humor, no policy violations
                          </p>
                        </div>
                        
                        <div className="p-3 bg-white rounded border">
                          <p className="text-sm font-medium mb-1">Post 2 - Technology Joke</p>
                          <p className="text-sm text-muted-foreground italic">
                            "If debugging is the process of removing bugs, then programming 
                            must be the process of putting them in. Thanks, Dijkstra."
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            <strong>Analysis:</strong> Programming humor, educational reference
                          </p>
                        </div>
                        
                        <div className="p-3 bg-white rounded border">
                          <p className="text-sm font-medium mb-1">Post 3 - Work-Life Balance</p>
                          <p className="text-sm text-muted-foreground italic">
                            "Work-life balance: The mythical creature software developers 
                            hunt but never find. Like unicorns, but less colorful."
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            <strong>Analysis:</strong> Industry commentary, relatable content
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="font-medium">Content Types</p>
                    <p className="text-sm text-muted-foreground">Photos, Text, Links</p>
                  </div>
                  
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <Share2 className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="font-medium">Sharing Activity</p>
                    <p className="text-sm text-muted-foreground">Moderate, Professional</p>
                  </div>
                  
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="font-medium">Network Quality</p>
                    <p className="text-sm text-muted-foreground">Professional Connections</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Methodology */}
        <Card className="border-card-border mt-6">
          <CardHeader>
            <CardTitle>Analysis Methodology</CardTitle>
            <CardDescription>
              How social media content is evaluated
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Content Categories Reviewed</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Discriminatory language or behavior</li>
                  <li>• Violent or threatening content</li>
                  <li>• Drug and alcohol references</li>
                  <li>• Inappropriate workplace behavior</li>
                  <li>• Criminal activity indicators</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Analysis Scope</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 7-year lookback period</li>
                  <li>• Public and semi-public content</li>
                  <li>• AI-powered content analysis</li>
                  <li>• Human review of flagged items</li>
                  <li>• Context-aware interpretation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="border-card-border mt-6">
          <CardHeader>
            <CardTitle>Social Media Analysis Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-3 p-4 bg-orange-50/50 rounded-lg border border-orange-200">
              <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <p className="font-medium text-orange-700">Minor Flags Identified - No Policy Violations</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Professional social media presence is excellent with appropriate content and connections. 
                  Personal accounts show minimal activity with only minor sarcastic humor posts flagged by AI screening. 
                  All flagged content falls within acceptable workplace standards and shows no discriminatory, 
                  violent, or inappropriate material. The candidate maintains a professional online presence.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};