
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminMessages from "@/components/Admin/AdminMessages";
import AdminBlogPosts from "@/components/Admin/AdminBlogPosts";

const Admin = () => {
  // In a real app, we would check if the user is authenticated and has admin privileges
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a simple mock authentication
    // In a real app, you would validate credentials against a backend
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
    } else {
      alert("Credenciais inválidas");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-deepNavy flex items-center justify-center p-4">
        <div className="card-gradient rounded-lg p-8 w-full max-w-md border border-white/10 shadow-xl">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">Painel Administrativo</h1>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="text-gray-200 font-medium">
                Usuário
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-navy/50 border border-gray-700 rounded px-4 py-2 text-white"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-gray-200 font-medium">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-navy/50 border border-gray-700 rounded px-4 py-2 text-white"
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange to-orangeLight hover:from-orangeLight hover:to-orange text-white font-medium"
            >
              Entrar
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deepNavy">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Painel Administrativo</h1>
          <Button 
            onClick={() => setIsAuthenticated(false)}
            variant="outline"
            className="text-white border-white/30 hover:bg-white/10"
          >
            Sair
          </Button>
        </div>

        <Tabs defaultValue="messages" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-navy/50 border border-white/10 rounded-lg mb-8">
            <TabsTrigger value="messages" className="text-lg">Mensagens</TabsTrigger>
            <TabsTrigger value="blog" className="text-lg">Blog</TabsTrigger>
          </TabsList>
          <TabsContent value="messages">
            <AdminMessages />
          </TabsContent>
          <TabsContent value="blog">
            <AdminBlogPosts />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
