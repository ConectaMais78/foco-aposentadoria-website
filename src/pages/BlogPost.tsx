
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Clock, Tag, Share2, Facebook, Twitter, Linkedin, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any | null>(null);
  const [suggestedPosts, setSuggestedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Scroll to top when component mounts or id changes
    window.scrollTo(0, 0);
    
    // In a real app, this would fetch the blog post from a database
    // Here we'll load posts from localStorage and find the requested one
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
      const posts = JSON.parse(storedPosts);
      const foundPost = posts.find((p: any) => p.id.toString() === id);
      
      if (foundPost) {
        setPost(foundPost);
        // Get 3 random posts excluding the current one for suggestions
        const otherPosts = posts.filter((p: any) => p.id.toString() !== id);
        const shuffled = otherPosts.sort(() => 0.5 - Math.random());
        setSuggestedPosts(shuffled.slice(0, 3));
      }
    }
    
    setLoading(false);
  }, [id]);
  
  const renderContentWithImages = (content: string) => {
    return { __html: content };
  };
  
  const shareUrl = window.location.href;
  const shareTitle = post?.title || '';
  
  const handleContactClick = () => {
    navigate("/#contato");
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-deepNavy text-xl animate-pulse">Carregando...</div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <h2 className="text-2xl font-bold text-deepNavy mb-4">Artigo não encontrado</h2>
            <Button 
              onClick={() => navigate("/blog")}
              className="bg-gradient-to-r from-orange to-orangeLight hover:from-orangeLight hover:to-orange text-white transition-all duration-300 hover:scale-105"
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
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-12 bg-gradient-to-b from-deepNavy via-navy to-deepNavy">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-5xl mx-auto animate-fade-in">
            <Button 
              variant="ghost"
              onClick={() => navigate("/blog")}
              className="mb-8 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Voltar para o Blog
            </Button>
            
            {/* Category Badge */}
            {post.category && (
              <span className="inline-block bg-gradient-to-r from-orange to-orangeLight text-white text-sm font-medium px-4 py-2 rounded-full mb-6 animate-slide-in-left shadow-lg">
                {post.category}
              </span>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight animate-slide-in-right">{post.title}</h1>
            
            {/* Article Meta */}
            <div className="flex flex-wrap gap-6 text-gray-300 mb-8 animate-fade-in [&>div]:hover:text-orange [&>div]:transition-colors [&>div]:duration-300">
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

      {/* Featured Image - Increased margin-bottom for separation */}
      <div className="container mx-auto px-6 md:px-8 mt-16 mb-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-scale-in group">
            <img 
              src={post.image || '/placeholder.svg'} 
              alt={post.title}
              className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
      
      {/* Article Content - Wider structure */}
      <div className="container mx-auto px-6 md:px-8 pb-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
            
            {/* Main Content - Wider column span */}
            <article className="lg:col-span-3 animate-fade-in">
              
              {/* Article Content - Improved spacing and width */}
              <div className="prose prose-xl max-w-none">
                <div className="text-gray-800 leading-relaxed text-lg space-y-8">
                  <div 
                    dangerouslySetInnerHTML={renderContentWithImages(post.content)}
                    className="blog-content [&>p]:mb-8 [&>p]:text-lg [&>p]:leading-loose [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-deepNavy [&>h2]:mt-12 [&>h2]:mb-6 [&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:text-deepNavy [&>h3]:mt-10 [&>h3]:mb-5 [&>ul]:space-y-3 [&>li]:text-lg [&>li]:text-gray-700 [&>li]:leading-relaxed [&>strong]:text-deepNavy [&>em]:text-orange/80 [&>blockquote]:my-8 [&>blockquote]:text-xl [&>blockquote]:leading-loose"
                  />
                </div>
              </div>
              
              {/* Sharing Section */}
              <div className="mt-20 pt-8 border-t border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 animate-fade-in">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600 font-medium flex items-center">
                      <Share2 className="mr-2 h-4 w-4 text-orange" />
                      Compartilhar:
                    </span>
                    <div className="flex gap-3">
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      >
                        <Facebook className="h-4 w-4" />
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-sky-500 hover:bg-sky-600 text-white rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-blue-700 hover:bg-blue-800 text-white rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Publicado em {post.date}
                  </div>
                </div>
              </div>
            </article>
            
            {/* Sidebar - Narrower column */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8 animate-slide-in-right">
                
                {/* Contact CTA */}
                <div className="bg-gradient-to-br from-orange/20 to-orangeLight/20 border border-orange/30 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:border-orange/50 group">
                  <h3 className="text-deepNavy font-bold text-lg mb-3 group-hover:text-orange transition-colors">Precisa de ajuda?</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    Nossa equipe está pronta para ajudar você com seus direitos previdenciários.
                  </p>
                  <Button 
                    onClick={handleContactClick}
                    className="w-full bg-gradient-to-r from-orange to-orangeLight hover:from-orangeLight hover:to-orange text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Entre em Contato
                  </Button>
                </div>
                
                {/* Article Info */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 backdrop-blur-sm transition-all duration-300 hover:bg-gray-100 hover:border-gray-300">
                  <h3 className="text-deepNavy font-bold text-lg mb-6 text-center">Informações do Artigo</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-500 text-sm">Autor:</span>
                      <span className="text-deepNavy font-medium">{post.author}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-500 text-sm">Categoria:</span>
                      <span className="text-orange font-medium">{post.category}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-500 text-sm">Tempo de leitura:</span>
                      <span className="text-deepNavy font-medium">{post.readTime}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-500 text-sm">Data:</span>
                      <span className="text-deepNavy font-medium">{post.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Suggested Articles Section */}
      {suggestedPosts.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-6 md:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-deepNavy mb-4 flex items-center justify-center">
                  <BookOpen className="mr-3 h-8 w-8 text-orange" />
                  Continue Lendo
                </h2>
                <p className="text-gray-600 text-lg">Outros artigos que podem interessar você</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {suggestedPosts.map((suggestedPost) => (
                  <div
                    key={suggestedPost.id}
                    onClick={() => {
                      navigate(`/blog/${suggestedPost.id}`);
                    }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={suggestedPost.image || '/placeholder.svg'}
                        alt={suggestedPost.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {suggestedPost.category && (
                        <span className="absolute top-4 left-4 bg-gradient-to-r from-orange to-orangeLight text-white text-xs font-medium px-3 py-1 rounded-full">
                          {suggestedPost.category}
                        </span>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-deepNavy mb-3 line-clamp-2 group-hover:text-orange transition-colors duration-300">
                        {suggestedPost.title}
                      </h3>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {suggestedPost.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {suggestedPost.date}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-orange font-medium text-sm">Ler artigo</span>
                        <ArrowLeft className="h-4 w-4 text-orange rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default BlogPost;
