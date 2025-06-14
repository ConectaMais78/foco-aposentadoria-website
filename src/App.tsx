
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

// Componente de loading para verificação de autenticação
const AuthLoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-deepNavy via-navy to-darkNavy flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange mx-auto mb-4"></div>
      <p className="text-white">Verificando autenticação...</p>
    </div>
  </div>
);

// Componente para proteger rotas administrativas
const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  // Aguardar verificação de autenticação ser concluída
  if (isLoading) {
    return <AuthLoadingSpinner />;
  }
  
  // Se não há usuário após verificação, redirecionar para login
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

// Componente para redirecionar /admin baseado no estado de autenticação
const AdminRedirect = () => {
  const { user, isLoading } = useAuth();
  
  // Aguardar verificação de autenticação ser concluída
  if (isLoading) {
    return <AuthLoadingSpinner />;
  }
  
  // Após verificação, redirecionar conforme o estado
  return user ? 
    <Navigate to="/admin/blog" replace /> : 
    <Navigate to="/admin/login" replace />;
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
