
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would fetch the blog post from a database
    // Here we'll load posts from localStorage and find the requested one
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
      const posts = JSON.parse(storedPosts);
      const foundPost = posts.find((p: any) => p.id.toString() === id);
      
      if (foundPost) {
        setPost(foundPost);
      }
    }
    
    setLoading(false);
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-deepNavy flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="min-h-screen bg-deepNavy flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Artigo não encontrado</h2>
            <Button 
              onClick={() => navigate("/blog")}
              className="bg-gradient-to-r from-orange to-orangeLight hover:from-orangeLight hover:to-orange text-white"
            >
              Voltar para o Blog
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-deepNavy flex flex-col">
      <Header />
      
      <div className="flex-1">
        <div className="relative h-[40vh] w-full">
          <img 
            src={post.image || '/placeholder.svg'} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deepNavy/60 via-deepNavy/40 to-deepNavy"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-8">
            <div className="container mx-auto">
              <Button 
                variant="outline"
                onClick={() => navigate("/blog")}
                className="mb-4 bg-navy/50 border-white/20 text-white hover:bg-navy"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para o Blog
              </Button>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{post.title}</h1>
              
              <div className="flex flex-wrap gap-4 text-gray-300">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-orange" />
                  {post.date}
                </div>
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-orange" />
                  {post.author}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto py-12">
          <div className="bg-navy/30 border border-white/10 rounded-lg p-6 md:p-10 max-w-4xl mx-auto">
            <div className="prose prose-invert">
              <div className="text-lg text-gray-300 italic mb-8 border-l-4 border-orange pl-4 py-2">
                {post.excerpt}
              </div>
              
              <div className="text-white whitespace-pre-line">
                {post.content.split('\n').map((paragraph: string, i: number) => (
                  <p key={i} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
