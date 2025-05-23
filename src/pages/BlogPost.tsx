
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Clock, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
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
  
  // Function to render HTML content safely
  const renderContentWithImages = (content: string) => {
    // The content might already have HTML or it might have our custom image tags
    // We're using dangerouslySetInnerHTML since we need to render HTML content
    return { __html: content };
  };
  
  const shareUrl = window.location.href;
  const shareTitle = post?.title || '';
  
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
        {/* Hero Section with Featured Image */}
        <div className="relative h-[50vh] w-full">
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
                className="mb-6 bg-navy/50 border-white/20 text-white hover:bg-navy"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para o Blog
              </Button>
              
              {/* Category Badge */}
              {post.category && (
                <span className="inline-block bg-orange text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
                  {post.category}
                </span>
              )}
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">{post.title}</h1>
              
              {/* Article Meta */}
              <div className="flex flex-wrap gap-6 text-gray-300">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-orange" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-orange" />
                  {post.date}
                </div>
                {post.readTime && (
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-orange" />
                    {post.readTime}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Article Content */}
        <div className="container mx-auto py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <article className="lg:w-3/4">
                <div className="bg-navy/30 border border-white/10 rounded-lg p-8 md:p-12">
                  {/* Article Summary */}
                  <div className="text-lg text-gray-300 italic mb-8 border-l-4 border-orange pl-6 py-4 bg-orange/5 rounded-r-lg">
                    <p className="font-medium text-orange mb-2">Resumo do artigo:</p>
                    {post.excerpt}
                  </div>
                  
                  {/* Article Content */}
                  <div className="prose prose-invert prose-lg max-w-none">
                    <div className="text-white blog-content leading-relaxed">
                      <div dangerouslySetInnerHTML={renderContentWithImages(post.content)} />
                    </div>
                  </div>
                  
                  {/* Article Footer */}
                  <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex items-center gap-4">
                        <span className="text-gray-300 font-medium">Compartilhar:</span>
                        <div className="flex gap-2">
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
                          >
                            <Facebook className="h-4 w-4" />
                          </a>
                          <a
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-sky-500 hover:bg-sky-600 text-white rounded-full transition-colors"
                          >
                            <Twitter className="h-4 w-4" />
                          </a>
                          <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-blue-700 hover:bg-blue-800 text-white rounded-full transition-colors"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-400">
                        Publicado em {post.date}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
              
              {/* Sidebar */}
              <aside className="lg:w-1/4">
                <div className="sticky top-8 space-y-6">
                  {/* Contact CTA */}
                  <div className="bg-gradient-to-br from-orange/20 to-orangeLight/20 border border-orange/30 rounded-lg p-6">
                    <h3 className="text-white font-bold text-lg mb-3">Precisa de ajuda?</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Nossa equipe está pronta para ajudar você com seus direitos previdenciários.
                    </p>
                    <Button 
                      onClick={() => navigate("/#contato")}
                      className="w-full bg-gradient-to-r from-orange to-orangeLight hover:from-orangeLight hover:to-orange text-white"
                    >
                      Entre em Contato
                    </Button>
                  </div>
                  
                  {/* Article Info */}
                  <div className="bg-navy/30 border border-white/10 rounded-lg p-6">
                    <h3 className="text-white font-bold text-lg mb-4">Informações do Artigo</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Autor:</span>
                        <span className="text-white">{post.author}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Categoria:</span>
                        <span className="text-orange">{post.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tempo de leitura:</span>
                        <span className="text-white">{post.readTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Data:</span>
                        <span className="text-white">{post.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
