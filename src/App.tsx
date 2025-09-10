import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext, useContext } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UploadData from "./pages/UploadData";
import GenerateTimetable from "./pages/GenerateTimetable";
import ViewTimetable from "./pages/ViewTimetable";
import MainLayout from "./components/layout/MainLayout";

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

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
              } />
              <Route path="/dashboard" element={
                isAuthenticated ? <MainLayout><Dashboard /></MainLayout> : <Navigate to="/login" replace />
              } />
              <Route path="/upload" element={
                isAuthenticated ? <MainLayout><UploadData /></MainLayout> : <Navigate to="/login" replace />
              } />
              <Route path="/generate" element={
                isAuthenticated ? <MainLayout><GenerateTimetable /></MainLayout> : <Navigate to="/login" replace />
              } />
              <Route path="/timetable" element={
                isAuthenticated ? <MainLayout><ViewTimetable /></MainLayout> : <Navigate to="/login" replace />
              } />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
