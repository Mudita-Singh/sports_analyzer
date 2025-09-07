import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { 
  Trophy, 
  Shield, 
  Wifi, 
  BarChart3, 
  Star, 
  Video, 
  Gauge,
  Volleyball,
  Dumbbell,
  Activity
} from "lucide-react";

export default function Home() {
  const [, navigate] = useLocation();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/features");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                <span className="gradient-text">AI-Powered</span><br />
                Sports Talent Assessment
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl">
                Unlock the potential of athletes with our innovative AI-driven platform
              </p>
              <div className="mt-8">
                <Button
                  onClick={handleGetStarted}
                  className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-all duration-200 hover:scale-105"
                  data-testid="button-get-started"
                >
                  Get Started
                </Button>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="mt-16 lg:mt-0 relative">
              <div className="phone-mockup mx-auto w-64 h-auto">
                <div className="bg-secondary rounded-3xl p-2 shadow-2xl">
                  <div className="bg-card rounded-2xl p-8 text-center relative overflow-hidden">
                    {/* Running figure icon */}
                    <div className="text-6xl text-primary mb-4">
                      <Activity className="mx-auto" size={64} />
                    </div>

                    {/* Floating sport icons */}
                    <div className="floating-elements">
                      <div className="absolute top-4 right-4 text-primary text-2xl">
                        <Volleyball size={32} />
                      </div>
                      <div className="absolute top-20 left-4 text-accent text-xl">
                        <Activity size={24} />
                      </div>
                      <div className="absolute bottom-8 right-6 text-primary text-2xl">
                        <Trophy size={32} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Innovative Features</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Advanced tools for comprehensive athlete assessment
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI-based Cheat Detection */}
            <div className="feature-card bg-card rounded-xl p-6 text-center hover:bg-card/80">
              <div className="text-4xl text-accent mb-4 flex justify-center">
                <Shield size={48} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">AI-based Cheat Detection</h3>
              <p className="text-muted-foreground">
                Identify anomalies or manipulations to ensure fair assessment
              </p>
            </div>

            {/* Offline Video Analysis */}
            <div className="feature-card bg-card rounded-xl p-6 text-center hover:bg-card/80">
              <div className="text-4xl text-accent mb-4 flex justify-center">
                <Wifi size={48} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Offline Video Analysis</h3>
              <p className="text-muted-foreground">
                Perform preliminary performance analysis directly on the device
              </p>
            </div>

            {/* Performance Benchmarking */}
            <div className="feature-card bg-card rounded-xl p-6 text-center hover:bg-card/80">
              <div className="text-4xl text-accent mb-4 flex justify-center">
                <BarChart3 size={48} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Performance Benchmarking</h3>
              <p className="text-muted-foreground">
                Compare athlete performance against benchmarks
              </p>
            </div>

            {/* Gamified User Interface */}
            <div className="feature-card bg-card rounded-xl p-6 text-center hover:bg-card/80">
              <div className="text-4xl text-accent mb-4 flex justify-center">
                <Star size={48} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Gamified User Interface</h3>
              <p className="text-muted-foreground">
                Engage athletes with progress badges and leaderboards
              </p>
            </div>

            {/* Auto-Test Segmentation */}
            <div className="feature-card bg-card rounded-xl p-6 text-center hover:bg-card/80">
              <div className="text-4xl text-accent mb-4 flex justify-center">
                <Video size={48} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Auto-Test Segmentation</h3>
              <p className="text-muted-foreground">
                Automatically detect and segment performance clips
              </p>
            </div>

            {/* Real-time Analytics */}
            <div className="feature-card bg-card rounded-xl p-6 text-center hover:bg-card/80">
              <div className="text-4xl text-accent mb-4 flex justify-center">
                <Gauge size={48} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Real-time Analytics</h3>
              <p className="text-muted-foreground">
                Get instant feedback and performance metrics
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
