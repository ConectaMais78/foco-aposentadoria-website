
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Book, Edit, Trash2, Plus, Save } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
}

const AdminBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  const emptyPost: BlogPost = {
    id: Date.now(),
    title: "",
    excerpt: "",
    content: "",
    image: "",
    date: new Date().toLocaleDateString('pt-BR', {day: '2-digit', month: 'short', year: 'numeric'})
      .replace('.', ''),
    author: ""
  };
  
  useEffect(() => {
    // In a real app, this would fetch blog posts from a database
    // Here we'll load posts from localStorage if they exist
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      // Sample initial posts
      const initialPosts = [
        {
          id: 1,
          title: "Novidades na Aposentadoria em 2025",
          excerpt: "Confira as principais mudanças nas regras de aposentadoria para 2025 e como isso pode afetar seus direitos.",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
          date: "10 Mai 2025",
          author: "Dr. Carlos Silva"
        },
        {
          id: 2,
          title: "Aposentadoria Especial: Quem tem direito?",
          excerpt: "Entenda os critérios para concessão da aposentadoria especial e como comprovar o direito a este benefício.",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
          date: "02 Mai 2025",
          author: "Dra. Mariana Costa"
        },
        {
          id: 3,
          title: "Revisão da Vida Toda: O que você precisa saber",
          excerpt: "Descubra o que é a revisão da vida toda e como ela pode aumentar o valor da sua aposentadoria.",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
          date: "28 Abr 2025",
          author: "Dr. Rafael Mendes"
        }
      ];
      
      setPosts(initialPosts);
      localStorage.setItem('blogPosts', JSON.stringify(initialPosts));
    }
  }, []);
  
  const handleSave = () => {
    if (!editing) return;
    
    if (!editing.title || !editing.content || !editing.author) {
      alert('Por favor, preencha todos os campos obrigatórios: título, conteúdo e autor.');
      return;
    }
    
    let updatedPosts;
    if (editing.id === emptyPost.id) {
      // New post
      updatedPosts = [...posts, editing];
    } else {
      // Editing existing post
      updatedPosts = posts.map(post => 
        post.id === editing.id ? editing : post
      );
    }
    
    setPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    setEditing(null);
    setShowForm(false);
  };
  
  const handleDelete = (id: number) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    
    if (editing && editing.id === id) {
      setEditing(null);
      setShowForm(false);
    }
  };
  
  const handleCreateNew = () => {
    setEditing({...emptyPost, id: Date.now()});
    setShowForm(true);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editing) return;
    
    setEditing({
      ...editing,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Book className="mr-2 h-5 w-5 text-orange" />
          Gerenciar Artigos do Blog
        </h3>
        
        <Button 
          onClick={handleCreateNew}
          className="bg-gradient-to-r from-orange to-orangeLight hover:from-orangeLight hover:to-orange text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo Artigo
        </Button>
      </div>
      
      {showForm ? (
        <div className="bg-navy/30 rounded-lg border border-white/10 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-gray-200 font-medium">
                Título*
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={editing?.title || ''}
                onChange={handleChange}
                className="w-full bg-navy/50 border border-gray-700 rounded px-4 py-2 text-white"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="author" className="text-gray-200 font-medium">
                Autor*
              </label>
              <input
                id="author"
                name="author"
                type="text"
                value={editing?.author || ''}
                onChange={handleChange}
                className="w-full bg-navy/50 border border-gray-700 rounded px-4 py-2 text-white"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            <label htmlFor="image" className="text-gray-200 font-medium">
              URL da Imagem
            </label>
            <input
              id="image"
              name="image"
              type="text"
              value={editing?.image || ''}
              onChange={handleChange}
              placeholder="https://exemplo.com/imagem.jpg"
              className="w-full bg-navy/50 border border-gray-700 rounded px-4 py-2 text-white"
            />
            {editing?.image && (
              <div className="mt-2 h-40 w-full">
                <img 
                  src={editing.image} 
                  alt="Preview" 
                  className="h-full w-64 object-cover rounded border border-gray-700"
                />
              </div>
            )}
          </div>
          
          <div className="space-y-2 mb-6">
            <label htmlFor="excerpt" className="text-gray-200 font-medium">
              Resumo
            </label>
            <Textarea
              id="excerpt"
              name="excerpt"
              value={editing?.excerpt || ''}
              onChange={handleChange}
              placeholder="Um breve resumo do artigo (será exibido na listagem)"
              className="bg-navy/50 border border-gray-700 rounded px-4 py-2 text-white h-20"
            />
          </div>
          
          <div className="space-y-2 mb-6">
            <label htmlFor="content" className="text-gray-200 font-medium">
              Conteúdo*
            </label>
            <Textarea
              id="content"
              name="content"
              value={editing?.content || ''}
              onChange={handleChange}
              placeholder="Conteúdo completo do artigo"
              className="bg-navy/50 border border-gray-700 rounded px-4 py-2 text-white h-60"
              required
            />
          </div>
          
          <div className="flex justify-end gap-4">
            <Button 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10"
              onClick={() => {
                setEditing(null);
                setShowForm(false);
              }}
            >
              Cancelar
            </Button>
            <Button 
              className="bg-gradient-to-r from-orange to-orangeLight hover:from-orangeLight hover:to-orange text-white"
              onClick={handleSave}
            >
              <Save className="mr-2 h-4 w-4" />
              Salvar Artigo
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="bg-navy/30 rounded-lg border border-white/10 p-4 flex justify-between items-center"
            >
              <div className="flex items-center">
                <div 
                  className="w-16 h-16 rounded overflow-hidden flex-shrink-0 mr-4 border border-white/10"
                >
                  <img 
                    src={post.image || '/placeholder.svg'} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-white">{post.title}</h4>
                  <div className="flex text-sm text-gray-400 gap-3">
                    <span>{post.date}</span>
                    <span className="text-orange">{post.author}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost" 
                  size="sm"
                  className="h-9 w-9 p-0 text-gray-400 hover:text-orange"
                  onClick={() => {
                    setEditing(post);
                    setShowForm(true);
                  }}
                >
                  <Edit className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost" 
                  size="sm"
                  className="h-9 w-9 p-0 text-gray-400 hover:text-red-500"
                  onClick={() => handleDelete(post.id)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
          
          {posts.length === 0 && (
            <div className="text-center py-10 text-gray-400 bg-navy/30 rounded-lg border border-white/10">
              Nenhum artigo publicado
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminBlogPosts;
