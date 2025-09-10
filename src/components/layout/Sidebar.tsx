import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Upload, 
  Settings, 
  Calendar,
  GraduationCap,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation();

  return (
    <div className="w-full h-full bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-4 sm:p-6 border-b border-border flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">NEP Timetable</h1>
            <p className="text-xs text-muted-foreground">Generator 2024</p>
          </div>
        </div>
        {/* Mobile close button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="lg:hidden"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 flex-1">
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
                onClick={onClose}
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
    </div>
  );
};

export default Sidebar;