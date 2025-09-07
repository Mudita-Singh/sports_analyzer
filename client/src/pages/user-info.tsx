import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { userInfoSchema } from "@shared/schema";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

type UserInfoFormData = {
  height: number;
  weight: number;
  age: number;
  sport: string;
};

const sportOptions = [
  { value: "basketball", label: "Basketball" },
  { value: "football", label: "Football" },
  { value: "soccer", label: "Soccer" },
  { value: "tennis", label: "Tennis" },
  { value: "swimming", label: "Swimming" },
  { value: "running", label: "Running" },
  { value: "other", label: "Other" },
];

export default function UserInfo() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm<UserInfoFormData>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      height: 0,
      weight: 0,
      age: 0,
      sport: "",
    },
  });

  const saveProfileMutation = useMutation({
    mutationFn: async (data: UserInfoFormData) => {
      const response = await apiRequest("POST", "/api/profile", {
        userId: user?.id,
        ...data,
      });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        navigate("/");
        toast({
          title: "Profile Saved",
          description: "Your information has been saved successfully!",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to save profile information",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: UserInfoFormData) => {
    saveProfileMutation.mutate(data);
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-foreground">Tell Us About Yourself</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Help us personalize your experience
          </p>
        </div>

        <Card className="bg-card rounded-lg shadow-xl">
          <CardContent className="p-8 space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Height (cm)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="175"
                          min={120}
                          max={250}
                          className="form-input bg-input border-border text-foreground placeholder-muted-foreground"
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          data-testid="input-height"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Weight (kg)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="70"
                          min={30}
                          max={200}
                          className="form-input bg-input border-border text-foreground placeholder-muted-foreground"
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          data-testid="input-weight"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Age</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="25"
                          min={10}
                          max={100}
                          className="form-input bg-input border-border text-foreground placeholder-muted-foreground"
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          data-testid="input-age"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sport"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Primary Sport</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="form-input bg-input border-border text-foreground" data-testid="select-sport">
                            <SelectValue placeholder="Select your sport" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-card border-border">
                          {sportOptions.map((sport) => (
                            <SelectItem key={sport.value} value={sport.value} className="text-foreground">
                              {sport.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={saveProfileMutation.isPending}
                  data-testid="button-continue"
                >
                  {saveProfileMutation.isPending ? "Saving..." : "Continue to Dashboard"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
