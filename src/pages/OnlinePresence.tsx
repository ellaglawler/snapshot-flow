import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/Logo";
import { initialCandidates, getReportData } from "@/data/candidates";
import { ArrowLeft, Globe, CheckCircle, Search, Link, FileText, Award, ExternalLink } from "lucide-react";

export const OnlinePresence = () => {
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
            <Globe className="w-8 h-8 text-brand-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Online Presence Analysis</h1>
              <p className="text-muted-foreground">Digital footprint and web presence review for {candidate.name}</p>
            </div>
          </div>
          <Badge className={getStatusColor(reportData.onlinePresence)}>
            {reportData.onlinePresence === 'clear' ? 'Clear' : 
             reportData.onlinePresence === 'pending' ? 'Pending' : 'Review'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Professional Websites */}
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-status-success" />
                Professional Web Presence
              </CardTitle>
              <CardDescription>
                Personal websites, portfolios, and professional profiles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-status-success-light/30 rounded-lg border border-status-success/20">
                <div className="flex items-center gap-3 mb-2">
                  <Globe className="w-5 h-5 text-brand-primary" />
                  <div className="flex-1">
                    <p className="font-medium">Personal Portfolio</p>
                    <p className="text-sm text-muted-foreground">jordanmitchell.dev</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Clean, professional design</li>
                  <li>• Showcases software development projects</li>
                  <li>• Up-to-date contact information</li>
                  <li>• Professional headshot and bio</li>
                </ul>
              </div>

              <div className="p-4 bg-status-success-light/30 rounded-lg border border-status-success/20">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-5 h-5 text-brand-primary" />
                  <div className="flex-1">
                    <p className="font-medium">Technical Blog</p>
                    <p className="text-sm text-muted-foreground">blog.jordanmitchell.dev</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Regular posts about software development</li>
                  <li>• Professional tone and content</li>
                  <li>• Demonstrates technical expertise</li>
                  <li>• Positive community engagement</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Search Engine Results */}
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-status-success" />
                Search Engine Analysis
              </CardTitle>
              <CardDescription>
                Google and other search engine result analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-status-success-light/30 rounded-lg border border-status-success/20">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">Google Search Results</span>
                    <Badge className="bg-status-success-light text-status-success">Clear</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">First 3 pages reviewed for negative content</p>
                </div>
                
                <div className="p-3 bg-status-success-light/30 rounded-lg border border-status-success/20">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">Bing Search Results</span>
                    <Badge className="bg-status-success-light text-status-success">Clear</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Cross-reference search completed</p>
                </div>
                
                <div className="p-3 bg-status-success-light/30 rounded-lg border border-status-success/20">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">DuckDuckGo Results</span>
                    <Badge className="bg-status-success-light text-status-success">Clear</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Privacy-focused search engine check</p>
                </div>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium mb-2">Search Summary</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Professional profiles appear in top results</li>
                  <li>• No negative news articles found</li>
                  <li>• No legal issues or controversies</li>
                  <li>• Consistent professional image across results</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Professional Platforms */}
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="w-5 h-5 text-status-success" />
                Professional Platform Presence
              </CardTitle>
              <CardDescription>
                Industry-specific and professional platform profiles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between p-3 bg-status-success-light/30 rounded-lg border border-status-success/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded text-white flex items-center justify-center text-xs font-bold">SO</div>
                    <div>
                      <p className="font-medium text-sm">Stack Overflow</p>
                      <p className="text-xs text-muted-foreground">Active contributor</p>
                    </div>
                  </div>
                  <Badge className="bg-status-success-light text-status-success">Clear</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-status-success-light/30 rounded-lg border border-status-success/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-600 rounded text-white flex items-center justify-center text-xs font-bold">R</div>
                    <div>
                      <p className="font-medium text-sm">Reddit</p>
                      <p className="text-xs text-muted-foreground">Programming communities</p>
                    </div>
                  </div>
                  <Badge className="bg-status-success-light text-status-success">Clear</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-status-success-light/30 rounded-lg border border-status-success/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-600 rounded text-white flex items-center justify-center text-xs font-bold">D</div>
                    <div>
                      <p className="font-medium text-sm">Dev.to</p>
                      <p className="text-xs text-muted-foreground">Technical articles</p>
                    </div>
                  </div>
                  <Badge className="bg-status-success-light text-status-success">Clear</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Digital Footprint Analysis */}
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-status-success" />
                Digital Footprint Quality
              </CardTitle>
              <CardDescription>
                Overall assessment of online professional presence
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-status-success-light/30 rounded-lg">
                  <div className="text-2xl font-bold text-status-success mb-1">85%</div>
                  <div className="text-xs text-muted-foreground">Professional Score</div>
                </div>
                
                <div className="text-center p-3 bg-status-success-light/30 rounded-lg">
                  <div className="text-2xl font-bold text-status-success mb-1">12</div>
                  <div className="text-xs text-muted-foreground">Active Profiles</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Content Quality</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-muted rounded-full">
                      <div className="w-14 h-2 bg-status-success rounded-full"></div>
                    </div>
                    <span className="text-xs text-muted-foreground">High</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Consistency</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-muted rounded-full">
                      <div className="w-15 h-2 bg-status-success rounded-full"></div>
                    </div>
                    <span className="text-xs text-muted-foreground">Excellent</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Professional Tone</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-muted rounded-full">
                      <div className="w-16 h-2 bg-status-success rounded-full"></div>
                    </div>
                    <span className="text-xs text-muted-foreground">Excellent</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis */}
        <Card className="border-card-border mt-6">
          <CardHeader>
            <CardTitle>Comprehensive Online Analysis</CardTitle>
            <CardDescription>
              Detailed breakdown of digital presence findings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-3">Positive Indicators</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Strong professional portfolio website</li>
                  <li>• Regular technical blog contributions</li>
                  <li>• Active in developer communities</li>
                  <li>• Consistent professional image</li>
                  <li>• Up-to-date contact information</li>
                  <li>• No negative search results</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Search Methodology</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Multiple search engine queries</li>
                  <li>• Name variations and combinations</li>
                  <li>• Professional platform searches</li>
                  <li>• Social media cross-referencing</li>
                  <li>• News and media archive searches</li>
                  <li>• Deep web professional databases</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Content Categories</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Professional achievements</li>
                  <li>• Technical contributions</li>
                  <li>• Industry thought leadership</li>
                  <li>• Community involvement</li>
                  <li>• Educational content</li>
                  <li>• Open source contributions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="border-card-border mt-6">
          <CardHeader>
            <CardTitle>Online Presence Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-3 p-4 bg-status-success-light/30 rounded-lg border border-status-success/20">
              <CheckCircle className="w-5 h-5 text-status-success mt-0.5" />
              <div>
                <p className="font-medium text-status-success">Excellent Professional Online Presence</p>
                <p className="text-sm text-muted-foreground mt-1">
                  The candidate maintains an exemplary professional online presence with a high-quality portfolio website, 
                  active technical blog, and meaningful contributions to developer communities. Search engine results show 
                  consistent professional branding with no negative content. The digital footprint demonstrates technical 
                  expertise, professional growth, and positive community engagement across multiple platforms.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};