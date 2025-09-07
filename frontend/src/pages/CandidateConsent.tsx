import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/Logo";
import { Shield, User, Calendar, CreditCard, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const CandidateConsent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    ssn: "",
    consent: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      toast({
        variant: "destructive",
        title: "Consent Required",
        description: "You must provide consent to proceed with the background check.",
      });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing
    setIsSubmitted(true);
    setIsLoading(false);

    toast({
      title: "Consent Received",
      description: "Your background check has been initiated successfully.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-secondary via-white to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-card-border shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-status-success-light rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-status-success" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Consent Received!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for providing your consent. Your background check is now being processed. 
              You'll receive an email notification once it's complete.
            </p>
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">
                <p><strong>What happens next:</strong></p>
                <ul className="mt-2 space-y-1 text-left">
                  <li>• Identity verification (1-2 business days)</li>
                  <li>• Criminal record check (2-3 business days)</li>
                  <li>• Employment & education verification (3-5 business days)</li>
                </ul>
              </div>
              <Button 
                onClick={() => navigate(`/candidate-portal/${id}`)}
                className="w-full bg-brand-primary hover:bg-brand-primary-dark"
              >
                View Your Portal
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-secondary via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <Logo className="justify-center mb-4" />
          <h1 className="text-2xl font-bold text-foreground">Background Check Consent</h1>
          <p className="text-muted-foreground mt-2">
            Please provide your information and consent to begin the verification process
          </p>
        </div>

        <Card className="border-card-border shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-brand-primary" />
              Candidate Information & Consent
            </CardTitle>
            <CardDescription>
              All information is encrypted and handled in compliance with FCRA regulations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <User size={16} />
                    Full Legal Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Enter your full legal name"
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
                    <Calendar size={16} />
                    Date of Birth
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                    required
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ssn" className="flex items-center gap-2">
                  <CreditCard size={16} />
                  Social Security Number (Last 4 digits)
                </Label>
                <Input
                  id="ssn"
                  type="text"
                  value={formData.ssn}
                  onChange={(e) => setFormData(prev => ({ ...prev, ssn: e.target.value }))}
                  placeholder="XXXX"
                  maxLength={4}
                  required
                  className="w-full"
                />
              </div>

              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <h3 className="font-medium text-foreground">Background Check Authorization</h3>
                <p className="text-sm text-muted-foreground">
                  By checking the box below, I authorize the employer to conduct a comprehensive background check, 
                  which may include verification of identity, criminal history, employment history, and education credentials. 
                  I understand this check is for employment purposes and conducted in compliance with FCRA regulations.
                </p>
                
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, consent: !!checked }))
                    }
                  />
                  <Label htmlFor="consent" className="text-sm leading-relaxed">
                    I hereby authorize and consent to the background check described above.
                    <span className="text-destructive ml-1">*</span>
                  </Label>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-brand-primary hover:bg-brand-primary-dark"
                disabled={isLoading || !formData.consent}
              >
                {isLoading ? "Processing..." : "Submit Consent & Start Background Check"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Questions? Contact your employer's HR department for assistance.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};