import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
  consent: z.boolean().refine(val => val === true, {
    message: "You must give consent to proceed with background checks",
  }),
  checks: z.array(z.string()).min(1, "Please select at least one background check"),
});

type FormData = z.infer<typeof formSchema>;

const backgroundChecks = [
  { id: "social_media", label: "Social Media Check", description: "Search across major social platforms", price: 25 },
  { id: "sanctions", label: "Sanctions & Watchlists", description: "OFAC, Interpol, and other government lists", price: 15 },
  { id: "sex_offender", label: "Sex Offender Registry", description: "National and state registry search", price: 10 },
  { id: "education", label: "Education Verification", description: "Verify degrees and certifications", price: 30 },
  { id: "employment", label: "Employment History", description: "Verify previous employment", price: 35 },
  { id: "criminal", label: "Criminal Background Check", description: "County and federal criminal records", price: 20 },
];

export const CandidateSubmission = () => {
  const { toast } = useToast();
  const [selectedChecks, setSelectedChecks] = useState<string[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      consent: false,
      checks: [],
    },
  });

  const onSubmit = (data: FormData) => {
    // Mockup - show what would happen
    toast({
      title: "Background Check Submitted",
      description: `Processing ${selectedChecks.length} checks for ${data.firstName} ${data.lastName}`,
    });
    
    // In real implementation, this would:
    // 1. Save candidate data to database
    // 2. Redirect to Stripe checkout
    console.log("Form submitted:", data);
    console.log("Selected checks:", selectedChecks);
  };

  const handleCheckChange = (checkId: string, checked: boolean) => {
    const newChecks = checked 
      ? [...selectedChecks, checkId]
      : selectedChecks.filter(id => id !== checkId);
    
    setSelectedChecks(newChecks);
    form.setValue("checks", newChecks);
  };

  const totalPrice = selectedChecks.reduce((sum, checkId) => {
    const check = backgroundChecks.find(c => c.id === checkId);
    return sum + (check?.price || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Submit Background Check Request</h1>
          <p className="text-muted-foreground mt-2">
            Provide candidate information and select the checks you'd like to perform
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Form Section */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Candidate Information
                </CardTitle>
                <CardDescription>
                  Enter the candidate's details for background verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john.doe@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Date of Birth */}
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of Birth</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Required for age verification and criminal record searches
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Background Checks Selection */}
                    <div className="space-y-4">
                      <FormLabel className="text-base font-medium">Select Background Checks</FormLabel>
                      <FormField
                        control={form.control}
                        name="checks"
                        render={() => (
                          <FormItem>
                            <div className="grid gap-3">
                              {backgroundChecks.map((check) => (
                                <div key={check.id} className="flex items-center space-x-3 rounded-lg border p-4">
                                  <Checkbox
                                    id={check.id}
                                    checked={selectedChecks.includes(check.id)}
                                    onCheckedChange={(checked) => 
                                      handleCheckChange(check.id, checked as boolean)
                                    }
                                  />
                                  <div className="flex-1 space-y-1">
                                    <Label
                                      htmlFor={check.id}
                                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      {check.label}
                                    </Label>
                                    <p className="text-xs text-muted-foreground">
                                      {check.description}
                                    </p>
                                  </div>
                                  <div className="text-sm font-medium">
                                    ${check.price}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Consent */}
                    <FormField
                      control={form.control}
                      name="consent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-medium">
                              Consent to Background Check
                            </FormLabel>
                            <FormDescription className="text-xs">
                              I consent to the background checks selected above and understand that this information will be used for employment verification purposes.
                            </FormDescription>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Summary & Payment Section */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedChecks.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No checks selected
                  </p>
                ) : (
                  <>
                    {selectedChecks.map((checkId) => {
                      const check = backgroundChecks.find(c => c.id === checkId);
                      return check ? (
                        <div key={checkId} className="flex justify-between text-sm">
                          <span>{check.label}</span>
                          <span>${check.price}</span>
                        </div>
                      ) : null;
                    })}
                    <hr />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${totalPrice}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={form.handleSubmit(onSubmit)}
                className="w-full"
                disabled={selectedChecks.length === 0 || !form.formState.isValid}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Proceed to Payment
              </Button>
              
              <Button variant="outline" asChild className="w-full">
                <Link to="/dashboard">
                  Skip to Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};