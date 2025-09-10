import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Settings, Calendar, ArrowRight } from "lucide-react";

const dashboardCards = [
  {
    title: "Upload Data",
    description: "Add faculty, courses, and room information",
    icon: Upload,
    href: "/upload",
    gradient: "from-blue-500 to-blue-600",
    iconBg: "bg-blue-500",
  },
  {
    title: "Generate Timetable",
    description: "Automatically create optimized schedules",
    icon: Settings,
    href: "/generate",
    gradient: "from-green-500 to-green-600",
    iconBg: "bg-green-500",
  },
  {
    title: "View Timetable",
    description: "Browse and export generated timetables",
    icon: Calendar,
    href: "/timetable",
    gradient: "from-purple-500 to-purple-600",
    iconBg: "bg-purple-500",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Welcome to NEP 2020 Timetable Generator
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Streamline your college timetable management with our automated scheduling system
        </p>
      </motion.div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {dashboardCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card
              className="cursor-pointer card-hover border-border/50 group"
              onClick={() => navigate(card.href)}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 ${card.iconBg} rounded-lg flex items-center justify-center shadow-card`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-200" />
                </div>
                <div>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-200">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {card.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${card.gradient}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ delay: (index * 0.1) + 0.3, duration: 0.8 }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="text-xl sm:text-2xl font-bold text-primary">24</div>
            <p className="text-sm sm:text-base text-muted-foreground">Total Faculty Members</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="text-xl sm:text-2xl font-bold text-success">156</div>
            <p className="text-sm sm:text-base text-muted-foreground">Courses Available</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="text-xl sm:text-2xl font-bold text-warning">42</div>
            <p className="text-sm sm:text-base text-muted-foreground">Classrooms</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;