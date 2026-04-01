import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useAuthStore } from "./store/AuthStore";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/LandingPageComponents/Navbar";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import AuthListener from "./hooks/AuthListener";
import Overview from "./pages/Dashboard/Overview";
import Resume from "./pages/Dashboard/Resume";
import Analyze from "./pages/Dashboard/Analyze";
import Insights from "./pages/Dashboard/Insights";

interface RouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null; // Wait for Clerk to initialize

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const PublicRoute: React.FC<RouteProps> = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

function App() {
  const { isLoaded, isSignedIn } = useUser();
  const loading = useAuthStore((s) => s.loading);

  useEffect(() => {
    if (isLoaded && !loading && !isSignedIn) {
      // Logic for showing a toast if they try to hit a private URL
    }
  }, [isLoaded, loading, isSignedIn]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader className="size-10 animate-spin text-[#9D174D]" />
        </div>
      </div>
    );
  }

  if ( loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader className="size-10 animate-spin text-[#9D174D]" />
          <p className="text-sm text-gray-500 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <AuthListener />
      <Routes>
        {/* Public Route Group */}
        <Route path="/" element={ <PublicRoute> <Navbar /> <LandingPage />  </PublicRoute> } />

        {/* Protected Route Group */}
        <Route path="/dashboard" element={ <ProtectedRoute> <Overview /> </ProtectedRoute> } />
        <Route path="/dashboard/resumes" element={ <ProtectedRoute> <Resume /> </ProtectedRoute> } />
        <Route path="/dashboard/analyze" element={ <ProtectedRoute> <Analyze /> </ProtectedRoute> } />
        <Route path="/dashboard/insights" element={ <ProtectedRoute> <Insights /> </ProtectedRoute> } />
        
        {/* Catch-all: Redirect unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1f2937",
            color: "#fff",
            borderRadius: "10px",
          },
        }}
      />
    </>
  );
}

export default App;