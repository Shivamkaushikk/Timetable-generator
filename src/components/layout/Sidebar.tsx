import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Upload, 
  Settings, 
  Calendar,
  GraduationCap 
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Upload Data",
    href: "/upload",
    icon: Upload,
  },
  {
    name: "Generate Timetable",
    href: "/generate",
    icon: Settings,
  },
  {
    name: "View Timetable",
    href: "/timetable",
    icon: Calendar,
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <motion.div 
      className="w-64 bg-card border-r border-border h-screen sticky top-0"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">NEP Timetable</h1>
            <p className="text-xs text-muted-foreground">Generator 2024</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <NavLink
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-elegant"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon 
                  className={cn(
                    "w-5 h-5 transition-transform duration-200",
                    "group-hover:scale-110"
                  )} 
                />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </motion.div>
          );
        })}
      </nav>
    </motion.div>
  );
};

export default Sidebar;