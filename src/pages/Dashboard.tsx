import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { CandidateList } from "@/components/CandidateList";
import { CandidateForm } from "@/components/CandidateForm";
import { initialCandidates, type Candidate } from "@/data/candidates";
import { Users, UserPlus, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Dashboard = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const handleAddCandidate = (name: string, email: string) => {
    const newCandidate: Candidate = {
      id: Date.now().toString(),
      name,
      email,
      status: 'pending',
      dateAdded: new Date().toISOString().split('T')[0],
    };

    setCandidates(prev => [newCandidate, ...prev]);
    setShowForm(false);
    
    toast({
      title: "Background Check Initiated",
      description: `Candidate invitation sent to ${email}`,
    });
  };

  const getStatusCounts = () => {
    return candidates.reduce((acc, candidate) => {
      acc[candidate.status] = (acc[candidate.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Security Theme */}
      <header className="bg-black shadow-2xl border-b-2 border-brand-accent/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo className="text-white [&_span]:text-white" />
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">Orien Careers Security</p>
                <p className="text-xs text-white/70">security@acmecorp.com</p>
              </div>
              <Button variant="outline" size="sm" className="border-brand-accent/50 text-brand-accent hover:bg-brand-accent hover:text-black font-semibold">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header with Security Theme */}
        <div className="mb-8 relative">
          <div className="absolute -left-4 top-0 w-1 h-full bg-brand-accent rounded-full"></div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-primary to-brand-primary bg-clip-text text-transparent mb-2">
            Security Background Checks
          </h1>
          <p className="text-muted-foreground text-lg">Advanced candidate screening and threat assessment</p>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-card-border hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-brand-primary to-brand-primary-dark border-brand-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-accent/10 rounded-xl border border-brand-accent/30">
                  <Users className="w-6 h-6 text-brand-accent" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">{candidates.length}</p>
                  <p className="text-sm font-medium text-white/70">Total Candidates</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-card-border hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-status-success-light to-status-success-light/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-status-success/10 rounded-xl border border-status-success/20">
                  <CheckCircle className="w-6 h-6 text-status-success" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-status-success">{statusCounts.clear || 0}</p>
                  <p className="text-sm font-medium text-status-success/80">Cleared</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-card-border hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-status-warning-light to-status-warning-light/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-status-warning/10 rounded-xl border border-status-warning/20">
                  <AlertTriangle className="w-6 h-6 text-status-warning" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-status-warning">{statusCounts.review || 0}</p>
                  <p className="text-sm font-medium text-status-warning/80">Need Review</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-card-border hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-status-pending-light to-status-pending-light/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-status-pending/10 rounded-xl border border-status-pending/20">
                  <Clock className="w-6 h-6 text-status-pending" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-status-pending">{(statusCounts.pending || 0) + (statusCounts['in-progress'] || 0)}</p>
                  <p className="text-sm font-medium text-status-pending/80">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-brand-primary">Recent Security Screenings</h2>
              <Button 
                onClick={() => setShowForm(!showForm)}
                className="bg-brand-primary hover:bg-brand-primary-dark text-white border border-brand-accent/20 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <UserPlus size={16} className="mr-2" />
                Run Security Check
              </Button>
            </div>

            <CandidateList candidates={candidates} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {showForm && (
              <CandidateForm 
                onSubmit={handleAddCandidate}
              />
            )}

            <Card className="border-card-border hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-brand-primary/5 border-brand-primary/10">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-brand-primary">Security Operations</CardTitle>
                <CardDescription>Critical security tasks and monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-12 hover:bg-brand-primary/10 hover:border-brand-primary/50 transition-all duration-200 border-brand-primary/20"
                >
                  <div className="p-1.5 bg-brand-primary/10 rounded-md mr-3">
                    <Users size={16} className="text-brand-primary" />
                  </div>
                  <span className="font-medium text-brand-primary">Bulk Security Import</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-12 hover:bg-status-success/10 hover:border-status-success/50 transition-all duration-200 border-status-success/20"
                >
                  <div className="p-1.5 bg-status-success/10 rounded-md mr-3">
                    <CheckCircle size={16} className="text-status-success" />
                  </div>
                  <span className="font-medium text-status-success">Security Reports</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-12 hover:bg-brand-accent/10 hover:border-brand-accent/50 transition-all duration-200 border-brand-accent/20"
                >
                  <div className="p-1.5 bg-brand-accent/10 rounded-md mr-3">
                    <AlertTriangle size={16} className="text-brand-accent" />
                  </div>
                  <span className="font-medium text-brand-accent">Critical Reviews ({statusCounts.review || 0})</span>
                </Button>
                <Button 
                  onClick={() => setShowForm(true)}
                  className="w-full justify-start h-12 bg-gradient-to-r from-brand-primary to-brand-primary-dark hover:from-brand-primary-dark hover:to-brand-primary transition-all duration-200 shadow-lg hover:shadow-xl border border-brand-accent/20"
                >
                  <div className="p-1.5 bg-brand-accent/20 rounded-md mr-3">
                    <UserPlus size={16} className="text-brand-accent" />
                  </div>
                  <span className="font-medium text-white">New Security Screening</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};