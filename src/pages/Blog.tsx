
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);
  
  useEffect(() => {
    // In a real app, this would fetch blog posts from a database
    // Here we'll load posts from localStorage if they exist
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-deepNavy flex flex-col">
      <Header />
      
      <div className="flex-1">
        <div className="bg-gradient-to-b from-navy to-deepNavy py-16">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              Blog Foco na Aposentadoria
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-orange/50 to-orange mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Artigos e informações sobre aposentadoria, direitos previdenciários e dicas para planejar seu futuro.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div 
                key={post.id}
                className="card-gradient rounded-lg overflow-hidden shadow-lg border border-white/10 hover:border-orange/30 transition-all duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={post.image || '/placeholder.svg'}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deepNavy to-transparent"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center text-gray-400 text-sm mb-2">
                    <span>{post.date}</span>
                    <span className="text-orange">{post.author}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                  <Button 
                    variant="ghost" 
                    className="text-orange hover:text-orange hover:bg-white/10 p-0 h-auto"
                    onClick={() => navigate(`/blog/${post.id}`)}
                  >
                    <span className="flex items-center">
                      Leia mais 
                      <Book className="ml-2 h-4 w-4" />
                    </span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {posts.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-white mb-4">
                Nenhum artigo publicado
              </h3>
              <p className="text-gray-300 mb-8">
                Em breve teremos novos artigos sobre aposentadoria e direitos previdenciários.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;
