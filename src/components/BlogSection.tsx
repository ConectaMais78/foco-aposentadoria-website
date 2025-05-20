
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";

const BlogSection = () => {
  const navigate = useNavigate();
  
  // This would typically come from an API or local storage
  const blogPosts = [
    {
      id: 1,
      title: "Novidades na Aposentadoria em 2025",
      excerpt: "Confira as principais mudanças nas regras de aposentadoria para 2025 e como isso pode afetar seus direitos.",
      image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      date: "10 Mai 2025",
      author: "Dr. Carlos Silva"
    },
    {
      id: 2,
      title: "Aposentadoria Especial: Quem tem direito?",
      excerpt: "Entenda os critérios para concessão da aposentadoria especial e como comprovar o direito a este benefício.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      date: "02 Mai 2025",
      author: "Dra. Mariana Costa"
    },
    {
      id: 3,
      title: "Revisão da Vida Toda: O que você precisa saber",
      excerpt: "Descubra o que é a revisão da vida toda e como ela pode aumentar o valor da sua aposentadoria.",
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      date: "28 Abr 2025",
      author: "Dr. Rafael Mendes"
    }
  ];
  
  return (
    <section id="blog" className="section-padding bg-darkNavy">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Nosso Blog
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-orange/50 to-orange mx-auto"></div>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg mt-4">
            Fique por dentro das últimas novidades e informações sobre aposentadoria e direitos previdenciários.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div 
              key={post.id}
              className="card-gradient rounded-lg overflow-hidden shadow-lg border border-white/10 hover:border-orange/30 transition-all duration-300"
            >
              <div className="relative h-48">
                <img
                  src={post.image}
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

        <div className="text-center mt-12">
          <Button 
            onClick={() => navigate("/blog")}
            className="bg-gradient-to-r from-orange to-orangeLight hover:from-orangeLight hover:to-orange text-white font-medium text-lg transition-all duration-300"
          >
            Ver todos os artigos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
