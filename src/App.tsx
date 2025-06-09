
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { AdminProvider } from "@/contexts/AdminContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminBlogPosts from "./components/Admin/AdminBlogPosts";
import AdminMessages from "./components/Admin/AdminMessages";

const queryClient = new QueryClient();

// Componente para proteger rotas administrativas
const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/admin/login" replace />;
};

// Componente para redirecionar /admin para login
const AdminRedirect = () => {
  const { user } = useAuth();
  return <Navigate to="/admin/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AdminProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/admin" element={<AdminRedirect />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/blog" element={
                <ProtectedAdminRoute>
                  <AdminLayout><AdminBlogPosts /></AdminLayout>
                </ProtectedAdminRoute>
              } />
              <Route path="/admin/messages" element={
                <ProtectedAdminRoute>
                  <AdminLayout><AdminMessages /></AdminLayout>
                </ProtectedAdminRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AdminProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
