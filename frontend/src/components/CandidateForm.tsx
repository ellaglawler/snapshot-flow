import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Mail, User } from "lucide-react";

interface CandidateFormProps {
  onSubmit: (name: string, email: string) => void;
  isLoading?: boolean;
}

export const CandidateForm = ({ onSubmit, isLoading }: CandidateFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      onSubmit(name.trim(), email.trim());
      setName("");
      setEmail("");
    }
  };

  return (
    <Card className="border-card-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus size={20} className="text-brand-primary" />
          Run Background Check
        </CardTitle>
        <CardDescription>
          Add a new candidate to start their background verification process.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="candidate-name" className="flex items-center gap-2">
              <User size={16} />
              Candidate Name
            </Label>
            <Input
              id="candidate-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="candidate-email" className="flex items-center gap-2">
              <Mail size={16} />
              Email Address
            </Label>
            <Input
              id="candidate-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              required
              className="w-full"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading || !name.trim() || !email.trim()}
          >
            {isLoading ? "Processing..." : "Start Background Check"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};