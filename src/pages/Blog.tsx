
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Book, Clock, Calendar, User, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);
  const [featuredPost, setFeaturedPost] = useState<any>(null);
  const [categories, setCategories] = useState<string[]>([
    "Aposentadoria", 
    "INSS", 
    "Benefícios", 
    "Revisões", 
    "Direitos"
  ]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  
  useEffect(() => {
    // In a real app, this would fetch blog posts from a database
    // Here we'll load posts from localStorage if they exist
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
      const parsedPosts = JSON.parse(storedPosts);
      
      // Get unique categories from posts
      const uniqueCategories = Array.from(
        new Set(parsedPosts.map((post: any) => post.category).filter(Boolean))
      );
      if (uniqueCategories.length > 0) {
        setCategories(uniqueCategories as string[]);
      }
      
      setPosts(parsedPosts);
      
      // Find featured post - this should be set in the admin panel
      const featured = parsedPosts.find((post: any) => post.isFeatured === true);
      
      if (featured) {
        setFeaturedPost(featured);
      } else if (parsedPosts.length > 0) {
        // If no post is marked as featured, use the most recent one
        const mostRecent = [...parsedPosts].sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        })[0];
        setFeaturedPost(mostRecent);
      }
    }
  }, []);
  
  // Filter posts by category
  const filteredPosts = selectedCategory === "Todos" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);
  
  // Get regular posts (excluding featured)
  const regularPosts = featuredPost 
    ? filteredPosts.filter(post => post.id !== featuredPost.id)
    : filteredPosts;
  
  return (
    <div className="min-h-screen bg-deepNavy flex flex-col">
      <Header />
      
      <div className="flex-1 pt-24">
        {/* Hero Banner */}
        <div className="bg-gradient-to-b from-navy to-deepNavy py-12">
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
        
        {/* Category Filter */}
        <div className="container mx-auto py-6">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Button
              variant={selectedCategory === "Todos" ? "default" : "outline"}
              className={`rounded-full ${
                selectedCategory === "Todos"
                  ? "bg-orange hover:bg-orange/90"
                  : "border-white/20 text-white hover:bg-white/10"
              }`}
              onClick={() => setSelectedCategory("Todos")}
            >
              Todos
            </Button>
            
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`rounded-full ${
                  selectedCategory === category
                    ? "bg-orange hover:bg-orange/90"
                    : "border-white/20 text-white hover:bg-white/10"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto py-6">
          {/* Featured Post Section */}
          {featuredPost && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-orange pl-3">
                Destaque
              </h2>
              <div className="card-gradient rounded-lg overflow-hidden shadow-lg border border-white/10 hover:border-orange/30 transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative h-72 md:h-full">
                    <img
                      src={featuredPost.image || '/placeholder.svg'}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deepNavy to-transparent"></div>
                    {featuredPost.category && (
                      <span className="absolute top-3 right-3 bg-orange text-white text-xs font-medium px-2 py-1 rounded">
                        {featuredPost.category}
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    <div className="flex justify-between items-center text-gray-400 text-sm mb-3">
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4 text-orange" />
                        {featuredPost.date}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center text-orange">
                          <User className="mr-1 h-4 w-4" />
                          {featuredPost.author}
                        </span>
                        {featuredPost.readTime && (
                          <span className="flex items-center">
                            <Clock className="mr-1 h-4 w-4 text-orange" />
                            {featuredPost.readTime}
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{featuredPost.title}</h3>
                    <p className="text-gray-300 mb-6 line-clamp-3">{featuredPost.excerpt}</p>
                    <Button 
                      className="bg-gradient-to-r from-orange to-orangeLight hover:from-orangeLight hover:to-orange text-white w-fit"
                      onClick={() => navigate(`/blog/${featuredPost.id}`)}
                    >
                      <span className="flex items-center">
                        Leia o artigo completo
                        <Book className="ml-2 h-4 w-4" />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Regular Posts */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-orange pl-3">
              Últimos Artigos
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <div 
                  key={post.id}
                  className="card-gradient rounded-lg overflow-hidden shadow-lg border border-white/10 hover:border-orange/30 transition-all duration-300"
                  onClick={() => navigate(`/blog/${post.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="relative h-48">
                    <img
                      src={post.image || '/placeholder.svg'}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deepNavy to-transparent"></div>
                    {post.category && (
                      <span className="absolute top-3 right-3 bg-orange text-white text-xs font-medium px-2 py-1 rounded">
                        {post.category}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center text-gray-400 text-sm mb-2">
                      <span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-orange" />
                        {post.readTime || '5 min'}
                      </span>
                      <span className="text-orange">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">{post.author}</span>
                      <Button 
                        variant="ghost" 
                        className="text-orange hover:text-orange hover:bg-white/10 p-0 h-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/blog/${post.id}`);
                        }}
                      >
                        <span className="flex items-center">
                          Leia mais 
                          <Book className="ml-2 h-4 w-4" />
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
