import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/Logo";
import { initialCandidates, getReportData } from "@/data/candidates";
import { ArrowLeft, Shield, CheckCircle, MapPin, Database, AlertOctagon } from "lucide-react";

export const CriminalRecord = () => {
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
            <Shield className="w-8 h-8 text-brand-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Criminal Record Check</h1>
              <p className="text-muted-foreground">Criminal background verification for {candidate.name}</p>
            </div>
          </div>
          <Badge className={getStatusColor(reportData.criminal)}>
            {reportData.criminal === 'clear' ? 'Clear' : 
             reportData.criminal === 'pending' ? 'Pending' : 'Review'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* National Database Search */}
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-status-success" />
                National Criminal Database
              </CardTitle>
              <CardDescription>
                Comprehensive national criminal record search
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-card-border">
                <span className="font-medium">Search Status:</span>
                <Badge className="bg-status-success-light text-status-success">Complete</Badge>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-card-border">
                <span className="font-medium">Records Found:</span>
                <span className="text-muted-foreground">None</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-card-border">
                <span className="font-medium">Search Date:</span>
                <span className="text-muted-foreground">August 27, 2025</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium">Coverage:</span>
                <span className="text-muted-foreground">All 50 States + DC</span>
              </div>
            </CardContent>
          </Card>

          {/* State-Level Searches */}
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-status-success" />
                State-Level Record Search
              </CardTitle>
              <CardDescription>
                Targeted state criminal record searches
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-status-success-light/30 rounded-lg border border-status-success/20">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Georgia (Current)</span>
                    <Badge className="bg-status-success-light text-status-success">Clear</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">7-year search completed</p>
                </div>
                
                <div className="p-3 bg-status-success-light/30 rounded-lg border border-status-success/20">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Florida (Previous)</span>
                    <Badge className="bg-status-success-light text-status-success">Clear</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">7-year search completed</p>
                </div>
                
                <div className="p-3 bg-status-success-light/30 rounded-lg border border-status-success/20">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">North Carolina (Previous)</span>
                    <Badge className="bg-status-success-light text-status-success">Clear</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">7-year search completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sex Offender Registry */}
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-status-success" />
                Sex Offender Registry
              </CardTitle>
              <CardDescription>
                National and state sex offender registry search
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-card-border">
                <span className="font-medium">National Registry:</span>
                <Badge className="bg-status-success-light text-status-success">Not Listed</Badge>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-card-border">
                <span className="font-medium">State Registries:</span>
                <Badge className="bg-status-success-light text-status-success">Not Listed</Badge>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium">Last Updated:</span>
                <span className="text-muted-foreground">August 27, 2025</span>
              </div>
            </CardContent>
          </Card>

          {/* Additional Searches */}
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle>Additional Searches</CardTitle>
              <CardDescription>
                Supplementary criminal record searches
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-card-border">
                <span className="font-medium">Federal Records:</span>
                <Badge className="bg-status-success-light text-status-success">Clear</Badge>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-card-border">
                <span className="font-medium">County Records:</span>
                <Badge className="bg-status-success-light text-status-success">Clear</Badge>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-card-border">
                <span className="font-medium">Terrorist Watch List:</span>
                <Badge className="bg-status-success-light text-status-success">Clear</Badge>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium">OFAC Sanctions:</span>
                <Badge className="bg-status-success-light text-status-success">Clear</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Details */}
        <Card className="border-card-border mt-6">
          <CardHeader>
            <CardTitle>Search Methodology</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Search Criteria</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Full name and known aliases</li>
                  <li>• Date of birth verification</li>
                  <li>• Social Security Number cross-reference</li>
                  <li>• Address history correlation</li>
                  <li>• Phonetic name matching</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Coverage Period</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 7-year comprehensive search</li>
                  <li>• All jurisdictions of residence</li>
                  <li>• Federal and state databases</li>
                  <li>• County and municipal records</li>
                  <li>• Real-time registry updates</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="border-card-border mt-6">
          <CardHeader>
            <CardTitle>Criminal Record Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-3 p-4 bg-status-success-light/30 rounded-lg border border-status-success/20">
              <CheckCircle className="w-5 h-5 text-status-success mt-0.5" />
              <div>
                <p className="font-medium text-status-success">No Criminal Records Found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Comprehensive criminal background check completed with no records found in national databases, 
                  state-level searches across all jurisdictions of residence (GA, FL, NC), sex offender registries, 
                  or federal watch lists. The candidate has a clean criminal background.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};