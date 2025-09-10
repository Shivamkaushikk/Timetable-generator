import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useState, createContext, useContext, ReactNode, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UploadData from "./pages/UploadData";
import GenerateTimetable from "./pages/GenerateTimetable";
import ViewTimetable from "./pages/ViewTimetable";
import MainLayout from "./components/layout/MainLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Auth context for simple authentication state
const AuthContext = createContext<{
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem("auth") === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isAuthenticated) {
        localStorage.setItem("auth", "1");
      } else {
        localStorage.removeItem("auth");
      }
    } catch {
      // ignore storage errors
    }
  }, [isAuthenticated]);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Index />} />
              <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />

              {/* Protected routes under main layout */}
              <Route
                element={
                  <RequireAuth>
                    <MainLayout>
                      <Outlet />
                    </MainLayout>
                  </RequireAuth>
                }
              >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/upload" element={<UploadData />} />
                <Route path="/generate" element={<GenerateTimetable />} />
                <Route path="/timetable" element={<ViewTimetable />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
