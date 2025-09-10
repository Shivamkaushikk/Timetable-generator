import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, BookOpen, Users, Clock, ChevronRight, Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <CalendarDays className="h-8 w-8" />,
      title: "Smart Scheduling",
      description: "AI-powered timetable generation with conflict resolution and optimization for NEP 2020 guidelines."
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "NEP 2020 Compliant",
      description: "Fully aligned with New Education Policy 2020 requirements and semester credit system."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Faculty Management",
      description: "Efficiently manage faculty availability, workload distribution, and teaching preferences."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Real-time Updates",
      description: "Dynamic schedule adjustments with instant notifications and automatic conflict detection."
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/30 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/20 rounded-full blur-xl animate-pulse delay-500" />
      </div>

      {/* Navigation Header */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 p-4 sm:p-6 flex justify-between items-center"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            NEP Timetable
          </h1>
        </div>
        <Button onClick={() => navigate('/login')} className="shadow-elegant text-sm sm:text-base">
          <span className="hidden sm:inline">Get Started</span>
          <span className="sm:hidden">Start</span>
          <ChevronRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Smart Timetable
            </span>
            <br />
            <span className="text-foreground">Generation System</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Professional automated scheduling solution for colleges under NEP 2020. 
            Streamline your academic planning with AI-powered optimization.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/login')}
              className="shadow-elegant text-base sm:text-lg px-6 sm:px-8 py-3"
            >
              Start Generating
              <CalendarDays className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/dashboard')}
              className="text-base sm:text-lg px-6 sm:px-8 py-3"
            >
              View Demo
            </Button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm shadow-card hover:shadow-elegant transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-lg w-fit text-primary">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 sm:mt-20"
        >
          <Card className="max-w-2xl mx-auto bg-gradient-primary text-primary-foreground shadow-glow border-0">
            <CardHeader className="pb-4 px-4 sm:px-6">
              <CardTitle className="text-xl sm:text-2xl">Ready to Optimize Your Schedule?</CardTitle>
              <CardDescription className="text-primary-foreground/80 text-base sm:text-lg">
                Join colleges across India using our NEP 2020 compliant timetable generation system.
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-6 sm:pb-8 px-4 sm:px-6">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate('/login')}
                className="text-base sm:text-lg px-6 sm:px-8 py-3 shadow-elegant"
              >
                Get Started Now
                <Sparkles className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
