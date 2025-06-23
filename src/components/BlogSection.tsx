
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Book, Clock } from "lucide-react";

const BlogSection = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  
  // Dados padrão garantidos
  const defaultPosts = [
    {
      id: '1',
      title: "Novidades na Aposentadoria em 2025",
      excerpt: "Confira as principais mudanças nas regras de aposentadoria para 2025 e como isso pode afetar seus direitos.",
      image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      date: "10 Mai 2025",
      author: "Dr. Carlos Silva",
      category: "Aposentadoria",
      readTime: "2 min",
      content: "As mudanças nas regras de aposentadoria continuam sendo um tema de grande interesse para os trabalhadores brasileiros. Em 2025, algumas alterações importantes entraram em vigor, afetando diretamente os direitos previdenciários. É fundamental estar atualizado sobre essas mudanças para tomar as melhores decisões sobre sua aposentadoria.",
      slug: "novidades-aposentadoria-2025",
      publishDate: new Date().toISOString(),
      status: "published",
      tags: ["aposentadoria", "INSS", "2025"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewCount: 1234
    },
    {
      id: '2',
      title: "Aposentadoria Especial: Quem tem direito?",
      excerpt: "Entenda os critérios para concessão da aposentadoria especial e como comprovar o direito a este benefício.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      date: "02 Mai 2025",
      author: "Dra. Mariana Costa",
      category: "INSS",
      readTime: "3 min",
      content: "A aposentadoria especial é um benefício destinado aos trabalhadores que exercem atividades em condições prejudiciais à saúde ou à integridade física. Para ter direito a esse benefício, é necessário comprovar a exposição a agentes nocivos durante o período de trabalho. Este artigo explica todos os critérios e requisitos necessários.",
      slug: "aposentadoria-especial-direito",
      publishDate: new Date().toISOString(),
      status: "published",
      tags: ["aposentadoria especial", "direitos"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewCount: 987
    },
    {
      id: '3',
      title: "Revisão da Vida Toda: O que você precisa saber",
      excerpt: "Descubra o que é a revisão da vida toda e como ela pode aumentar o valor da sua aposentadoria.",
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      date: "28 Abr 2025",
      author: "Dr. Rafael Mendes",
      category: "Revisões",
      readTime: "4 min",
      content: "A revisão da vida toda é uma tese jurídica que permite incluir salários anteriores a julho de 1994 no cálculo da aposentadoria. Esta revisão pode resultar em um aumento significativo no valor do benefício. Entenda como funciona este processo e se você tem direito a solicitá-la.",
      slug: "revisao-vida-toda",
      publishDate: new Date().toISOString(),
      status: "published",
      tags: ["revisão", "aposentadoria", "benefício"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewCount: 654
    }
  ];
  
  useEffect(() => {
    try {
      // Tentar carregar posts do localStorage primeiro
      const storedPosts = localStorage.getItem('blogPosts');
      
      if (storedPosts) {
        const parsedPosts = JSON.parse(storedPosts);
        
        if (Array.isArray(parsedPosts) && parsedPosts.length > 0) {
          // Ordenar por data e pegar os 3 mais recentes
          const sortedPosts = [...parsedPosts].sort((a, b) => {
            return new Date(b.date || b.publishDate).getTime() - new Date(a.date || a.publishDate).getTime();
          });
          
          setBlogPosts(sortedPosts.slice(0, 3));
        } else {
          // Se não há posts válidos, usar dados padrão
          setBlogPosts(defaultPosts);
          // Salvar dados padrão no localStorage para próximas visitas
          localStorage.setItem('blogPosts', JSON.stringify(defaultPosts));
        }
      } else {
        // Se não há dados no localStorage, usar dados padrão
        setBlogPosts(defaultPosts);
        // Salvar dados padrão no localStorage
        localStorage.setItem('blogPosts', JSON.stringify(defaultPosts));
      }
    } catch (error) {
      console.error('Erro ao carregar posts do blog:', error);
      // Em caso de erro, usar dados padrão
      setBlogPosts(defaultPosts);
      try {
        localStorage.setItem('blogPosts', JSON.stringify(defaultPosts));
      } catch (storageError) {
        console.warn('Não foi possível salvar no localStorage:', storageError);
      }
    }
  }, []);
  
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
              className="card-gradient rounded-lg overflow-hidden shadow-lg border border-white/10 hover:border-orange/30 transition-all duration-300 cursor-pointer group"
              onClick={() => navigate(`/blog/${post.id}`)}
            >
              <div className="relative h-48">
                <img
                  src={post.image || '/placeholder.svg'}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-orange" />
                    {post.readTime || '5 min'}
                  </div>
                  <span className="text-orange">{post.date || new Date(post.publishDate).toLocaleDateString('pt-BR')}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange transition-colors duration-300">{post.title}</h3>
                <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">{post.author}</span>
                  <div className="flex items-center text-orange group-hover:translate-x-1 transition-transform duration-300">
                    <span className="text-sm mr-2">Leia mais</span>
                    <Book className="h-4 w-4" />
                  </div>
                </div>
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
