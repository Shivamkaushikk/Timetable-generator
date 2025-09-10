import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, CheckCircle, Loader2, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const GenerateTimetable = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setIsGenerated(false);

    // Simulate timetable generation
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      
      // Store dummy timetable data in localStorage (simulating global state)
      const dummyTimetable = {
        events: [
          {
            id: '1',
            title: 'MATH101 - Dr. John Smith',
            start: '2024-01-15T09:00:00',
            end: '2024-01-15T10:30:00',
            backgroundColor: '#3B82F6',
            room: 'Room A-101'
          },
          {
            id: '2',
            title: 'PHYS201 - Prof. Sarah Johnson',
            start: '2024-01-15T11:00:00',
            end: '2024-01-15T12:30:00',
            backgroundColor: '#10B981',
            room: 'Lab B-201'
          },
          {
            id: '3',
            title: 'CHEM301 - Dr. Emily Brown',
            start: '2024-01-16T09:00:00',
            end: '2024-01-16T10:30:00',
            backgroundColor: '#8B5CF6',
            room: 'Chemistry Lab C-301'
          },
          {
            id: '4',
            title: 'CS401 - Prof. Michael Davis',
            start: '2024-01-16T14:00:00',
            end: '2024-01-16T15:30:00',
            backgroundColor: '#F59E0B',
            room: 'Computer Lab D-401'
          },
          {
            id: '5',
            title: 'MATH101 - Dr. John Smith',
            start: '2024-01-17T10:00:00',
            end: '2024-01-17T11:30:00',
            backgroundColor: '#3B82F6',
            room: 'Room A-101'
          }
        ],
        stats: {
          totalClasses: 45,
          facultyUtilization: 85,
          roomUtilization: 78,
          conflicts: 0
        }
      };
      
      localStorage.setItem('generatedTimetable', JSON.stringify(dummyTimetable));
      
      toast({
        title: "Timetable Generated Successfully!",
        description: "Your optimized timetable is ready to view.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Generate Timetable
        </h1>
        <p className="text-muted-foreground">
          Create an optimized schedule using AI-powered algorithms
        </p>
      </motion.div>

      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <Card className="text-center">
            <CardHeader className="space-y-6">
              <motion.div
                className="mx-auto w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center"
                animate={{ 
                  rotate: isGenerating ? 360 : 0,
                  scale: isGenerating ? [1, 1.1, 1] : 1
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: isGenerating ? Infinity : 0, ease: "linear" },
                  scale: { duration: 1, repeat: isGenerating ? Infinity : 0 }
                }}
              >
                <AnimatePresence mode="wait">
                  {!isGenerating && !isGenerated && (
                    <motion.div
                      key="settings"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                    >
                      <Settings className="w-10 h-10 text-white" />
                    </motion.div>
                  )}
                  {isGenerating && (
                    <motion.div
                      key="loader"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                    >
                      <Loader2 className="w-10 h-10 text-white animate-spin" />
                    </motion.div>
                  )}
                  {isGenerated && (
                    <motion.div
                      key="check"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              <div>
                <CardTitle className="text-2xl text-foreground mb-2">
                  <AnimatePresence mode="wait">
                    {!isGenerating && !isGenerated && (
                      <motion.span
                        key="ready"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        Ready to Generate Timetable
                      </motion.span>
                    )}
                    {isGenerating && (
                      <motion.span
                        key="generating"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        Optimizing Schedule with Solver...
                      </motion.span>
                    )}
                    {isGenerated && (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-success"
                      >
                        ✅ Timetable Generated Successfully!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </CardTitle>
                
                <CardDescription>
                  <AnimatePresence mode="wait">
                    {!isGenerating && !isGenerated && (
                      <motion.span
                        key="ready-desc"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Click the button below to start the automated timetable generation process
                      </motion.span>
                    )}
                    {isGenerating && (
                      <motion.span
                        key="generating-desc"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        AI algorithms are analyzing constraints and optimizing schedules...
                      </motion.span>
                    )}
                    {isGenerated && (
                      <motion.span
                        key="success-desc"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Your optimized timetable is ready! Go to the View Timetable page to see the results.
                      </motion.span>
                    )}
                  </AnimatePresence>
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <AnimatePresence>
                {!isGenerated && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      size="lg"
                      className="bg-gradient-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105 px-8 py-3"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5 mr-2" />
                          Generate Timetable
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {isGenerated && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
                >
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">45</div>
                    <div className="text-sm text-muted-foreground">Total Classes</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-success">85%</div>
                    <div className="text-sm text-muted-foreground">Faculty Utilization</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-warning">78%</div>
                    <div className="text-sm text-muted-foreground">Room Utilization</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-success">0</div>
                    <div className="text-sm text-muted-foreground">Conflicts</div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default GenerateTimetable;