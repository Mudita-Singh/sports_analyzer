import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { 
  Video, 
  Play, 
  Pause, 
  Square, 
  Activity,
  Heart,
  Dumbbell,
  Timer
} from "lucide-react";

interface PerformanceMetrics {
  speed: string;
  accuracy: string;
  consistency: string;
  score: string;
}

export default function Features() {
  const [, navigate] = useLocation();
  const { isAuthenticated } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedTest, setSelectedTest] = useState<string>("");
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    speed: "--",
    accuracy: "--",
    consistency: "--",
    score: "--"
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRecord = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      // Simulate processing results
      setTimeout(() => {
        setMetrics({
          speed: "24.5",
          accuracy: "92",
          consistency: "8.7",
          score: "87"
        });
      }, 1000);
    } else {
      // Start recording
      setIsRecording(true);
      setRecordingTime(0);
      setMetrics({
        speed: "--",
        accuracy: "--",
        consistency: "--",
        score: "--"
      });
    }
  };

  const testTypes = [
    {
      id: "sprint",
      name: "Sprint Test",
      description: "Speed and acceleration",
      icon: Activity,
    },
    {
      id: "agility",
      name: "Agility Test", 
      description: "Movement patterns",
      icon: Heart,
    },
    {
      id: "strength",
      name: "Strength Test",
      description: "Power and technique", 
      icon: Dumbbell,
    },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen pt-16">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              <span className="gradient-text">Record & Analyze</span><br />
              Your Performance
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use our advanced video recording tools to capture and analyze your athletic performance
            </p>
          </div>

          {/* Video Recording Interface */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card rounded-2xl shadow-2xl">
              <CardContent className="p-8">
                <div className="aspect-video bg-secondary rounded-xl flex items-center justify-center mb-8 relative overflow-hidden">
                  <div className="text-center" data-testid="video-placeholder">
                    {!isRecording ? (
                      <>
                        <div className="text-6xl text-muted-foreground mb-4">
                          <Video className="mx-auto" size={64} />
                        </div>
                        <p className="text-muted-foreground">Camera view will appear here</p>
                      </>
                    ) : (
                      <>
                        <div className="text-6xl text-red-500 mb-4 animate-pulse">
                          <Video className="mx-auto" size={64} />
                        </div>
                        <p className="text-red-500 font-semibold">Recording in progress...</p>
                      </>
                    )}
                  </div>

                  {/* Video controls overlay */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                    <Button
                      onClick={handleRecord}
                      className={`rounded-full w-16 h-16 ${
                        isRecording 
                          ? 'bg-gray-500 hover:bg-gray-600' 
                          : 'bg-red-500 hover:bg-red-600'
                      } text-white`}
                      data-testid="button-record"
                    >
                      {isRecording ? (
                        <Square className="text-2xl" size={24} />
                      ) : (
                        <div className="w-6 h-6 bg-white rounded-full" />
                      )}
                    </Button>
                    <Button
                      className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-12 h-12"
                      data-testid="button-pause"
                    >
                      <Pause size={16} />
                    </Button>
                  </div>
                </div>

                {/* Recording Status */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                    <span className="text-muted-foreground" data-testid="text-status">
                      {isRecording ? 'Recording...' : 'Ready to Record'}
                    </span>
                  </div>
                  <div className="text-muted-foreground" data-testid="text-recording-time">
                    {formatTime(recordingTime)}
                  </div>
                </div>

                {/* Test Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {testTypes.map((test) => {
                    const IconComponent = test.icon;
                    return (
                      <Button
                        key={test.id}
                        onClick={() => setSelectedTest(test.id)}
                        variant="secondary"
                        className={`bg-secondary hover:bg-secondary/80 rounded-lg p-4 h-auto text-center transition-all duration-200 border-2 ${
                          selectedTest === test.id ? 'border-accent' : 'border-transparent'
                        }`}
                        data-testid={`button-test-${test.id}`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <div className="text-3xl text-accent">
                            <IconComponent size={32} />
                          </div>
                          <h3 className="font-semibold text-foreground">{test.name}</h3>
                          <p className="text-sm text-muted-foreground">{test.description}</p>
                        </div>
                      </Button>
                    );
                  })}
                </div>

                {/* Analysis Results */}
                <div className="bg-secondary/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Performance Metrics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent" data-testid="metric-speed">
                        {metrics.speed}
                      </div>
                      <div className="text-sm text-muted-foreground">Speed (km/h)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent" data-testid="metric-accuracy">
                        {metrics.accuracy}
                      </div>
                      <div className="text-sm text-muted-foreground">Accuracy (%)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent" data-testid="metric-consistency">
                        {metrics.consistency}
                      </div>
                      <div className="text-sm text-muted-foreground">Consistency</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent" data-testid="metric-score">
                        {metrics.score}
                      </div>
                      <div className="text-sm text-muted-foreground">Overall Score</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
