import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/App";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.header 
      className="h-16 bg-background border-b border-border px-6 flex items-center justify-between"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold text-foreground">
          NEP 2020 Timetable Generator
        </h2>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <User className="w-4 h-4" />
          <span className="text-sm">Admin User</span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleLogout}
          className="flex items-center space-x-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </Button>
      </div>
    </motion.header>
  );
};

export default Navbar;