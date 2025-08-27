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
      {/* Header */}
      <header className="border-b border-card-border bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">Acme Corp HR</p>
                <p className="text-xs text-muted-foreground">hr@acmecorp.com</p>
              </div>
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Background Check Dashboard</h1>
          <p className="text-muted-foreground">Manage candidate screenings and view reports</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-card-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{candidates.length}</p>
                  <p className="text-sm text-muted-foreground">Total Candidates</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-card-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-status-success-light rounded-lg">
                  <CheckCircle className="w-5 h-5 text-status-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{statusCounts.clear || 0}</p>
                  <p className="text-sm text-muted-foreground">Cleared</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-card-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-status-warning-light rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{statusCounts.review || 0}</p>
                  <p className="text-sm text-muted-foreground">Need Review</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-card-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-status-pending-light rounded-lg">
                  <Clock className="w-5 h-5 text-status-pending" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{(statusCounts.pending || 0) + (statusCounts['in-progress'] || 0)}</p>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Candidates</h2>
              <Button 
                onClick={() => setShowForm(!showForm)}
                className="bg-brand-primary hover:bg-brand-primary-dark"
              >
                <UserPlus size={16} className="mr-2" />
                Run Background Check
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

            <Card className="border-card-border">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users size={16} className="mr-2" />
                  Bulk Import Candidates
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CheckCircle size={16} className="mr-2" />
                  View All Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle size={16} className="mr-2" />
                  Pending Reviews ({statusCounts.review || 0})
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};