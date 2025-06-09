
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus, Save, Star, ArrowLeft, Eye } from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "./ImageUpload";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  isFeatured?: boolean;
}

const AdminBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  useEffect(() => {
    loadPosts();
  }, []);
  
  const loadPosts = () => {
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      const initialPosts = [
        {
          id: 1,
          title: "Como requerer aposentadoria por idade no INSS",
          excerpt: "Aprenda o passo a passo para solicitar sua aposentadoria por idade.",
          content: "Conteúdo completo do artigo sobre aposentadoria por idade...",
          image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
          date: "10 Mai 2025",
          author: "Dr. Carlos Silva",
          category: "Aposentadoria",
          readTime: "3 min",
          isFeatured: true
        }
      ];
      setPosts(initialPosts);
      localStorage.setItem('blogPosts', JSON.stringify(initialPosts));
    }
  };
  
  const calculateReadTime = (content: string): string => {
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min`;
  };
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    
    const readTime = calculateReadTime(editing.content);
    const currentDate = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit', 
      month: 'short', 
      year: 'numeric'
    }).replace('.', '');
    
    let updatedPosts: BlogPost[];
    
    if (editing.id === 0) {
      // Novo post
      const newPost = {
        ...editing,
        id: Date.now(),
        date: currentDate,
        readTime
      };
      updatedPosts = [newPost, ...posts];
    } else {
      // Editando post existente
      updatedPosts = posts.map(post => 
        post.id === editing.id ? { ...editing, readTime } : post
      );
    }
    
    setPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    
    setEditing(null);
    setShowForm(false);
    toast.success("Artigo salvo com sucesso!");
  };
  
  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este post?')) {
      const updatedPosts = posts.filter(post => post.id !== id);
      setPosts(updatedPosts);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      toast.success("Artigo excluído com sucesso!");
    }
  };
  
  const handleCreateNew = () => {
    setEditing({
      id: 0,
      title: "",
      excerpt: "",
      content: "",
      image: "",
      author: "Dr. Carlos Silva",
      category: "Aposentadoria",
      date: "",
      readTime: "",
      isFeatured: false
    });
    setShowForm(true);
  };
  
  const handleEdit = (post: BlogPost) => {
    setEditing({ ...post });
    setShowForm(true);
  };
  
  const toggleFeatured = (id: number) => {
    const updatedPosts = posts.map(post => 
      post.id === id 
        ? { ...post, isFeatured: !post.isFeatured }
        : { ...post, isFeatured: false } // Remove destaque dos outros
    );
    setPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    toast.success("Artigo em destaque atualizado!");
  };

  const handleBackToList = () => {
    setEditing(null);
    setShowForm(false);
  };
  
  return (
    <div className="space-y-6">
      {!showForm ? (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white font-playfair">Gerenciar Blog</h1>
              <p className="text-gray-300 mt-1">{posts.length} artigos publicados</p>
            </div>
            <Button 
              onClick={handleCreateNew} 
              className="bg-gradient-to-r from-orange to-orangeLight hover:from-orangeLight hover:to-orange text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="mr-2 h-4 w-4" />
              Novo Artigo
            </Button>
          </div>
          
          <div className="grid gap-4">
            {posts.map((post) => (
              <Card key={post.id} className="bg-gradient-to-br from-navy/80 to-darkNavy/80 backdrop-blur-sm border-white/10 hover:border-orange/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex space-x-4 flex-1">
                      <div className="relative group">
                        <img 
                          src={post.image || '/placeholder.svg'} 
                          alt={post.title} 
                          className="w-24 h-24 object-cover rounded-lg border border-white/10"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Eye className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-lg text-white">{post.title}</h3>
                          {post.isFeatured && (
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange text-black font-medium">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              Destaque
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-400">
                          <span className="bg-white/10 px-2 py-1 rounded">{post.author}</span>
                          <span className="bg-white/10 px-2 py-1 rounded">{post.date}</span>
                          <span className="bg-orange/20 text-orange px-2 py-1 rounded font-medium">{post.category}</span>
                          <span className="bg-white/10 px-2 py-1 rounded">{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleFeatured(post.id)}
                        className={`border-white/20 hover:bg-white/10 transition-all duration-200 ${
                          post.isFeatured ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        <Star className={`h-4 w-4 ${post.isFeatured ? 'fill-current' : ''}`} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(post)}
                        className="border-blue-500/40 text-blue-400 hover:bg-blue-500/10 transition-all duration-200"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                        className="border-red-500/40 text-red-400 hover:bg-red-500/10 transition-all duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {posts.length === 0 && (
              <Card className="bg-gradient-to-br from-navy/80 to-darkNavy/80 backdrop-blur-sm border-white/10">
                <CardContent className="text-center py-12">
                  <div className="text-gray-400 space-y-3">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                      <Plus className="w-8 h-8" />
                    </div>
                    <p className="text-lg font-medium">Nenhum artigo encontrado</p>
                    <p className="text-sm">Crie seu primeiro artigo para começar</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </>
      ) : (
        <Card className="bg-gradient-to-br from-navy/80 to-darkNavy/80 backdrop-blur-sm border-white/10">
          <CardHeader className="border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBackToList}
                  className="border-white/20 text-gray-300 hover:bg-white/10"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Voltar
                </Button>
                <CardTitle className="text-white">
                  {editing?.id === 0 ? 'Criar Novo Artigo' : 'Editar Artigo'}
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-200">Título</label>
                    <Input
                      value={editing?.title || ''}
                      onChange={(e) => setEditing({...editing!, title: e.target.value})}
                      placeholder="Digite o título do artigo..."
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-200">Autor</label>
                      <Input
                        value={editing?.author || ''}
                        onChange={(e) => setEditing({...editing!, author: e.target.value})}
                        className="bg-white/5 border-white/10 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-200">Categoria</label>
                      <select
                        value={editing?.category || ''}
                        onChange={(e) => setEditing({...editing!, category: e.target.value})}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                        required
                      >
                        <option value="Aposentadoria" className="bg-darkNavy">Aposentadoria</option>
                        <option value="INSS" className="bg-darkNavy">INSS</option>
                        <option value="Benefícios" className="bg-darkNavy">Benefícios</option>
                        <option value="Revisões" className="bg-darkNavy">Revisões</option>
                        <option value="Direitos" className="bg-darkNavy">Direitos</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-200">Resumo</label>
                    <Textarea
                      value={editing?.excerpt || ''}
                      onChange={(e) => setEditing({...editing!, excerpt: e.target.value})}
                      rows={3}
                      placeholder="Escreva um resumo atrativo do artigo..."
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 resize-none"
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg border border-white/10">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={editing?.isFeatured || false}
                      onChange={(e) => setEditing({...editing!, isFeatured: e.target.checked})}
                      className="w-4 h-4 text-orange bg-white/10 border-white/20 rounded focus:ring-orange focus:ring-2"
                    />
                    <label htmlFor="featured" className="text-sm font-medium text-gray-200 cursor-pointer">
                      <Star className="w-4 h-4 inline mr-1" />
                      Artigo em destaque
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-200">Imagem do Artigo</label>
                  <ImageUpload
                    value={editing?.image || ''}
                    onChange={(url) => setEditing({...editing!, image: url})}
                    onRemove={() => setEditing({...editing!, image: ''})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">Conteúdo do Artigo</label>
                <Textarea
                  value={editing?.content || ''}
                  onChange={(e) => setEditing({...editing!, content: e.target.value})}
                  rows={12}
                  placeholder="Escreva o conteúdo completo do artigo..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 resize-none"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  Tempo de leitura estimado: {editing?.content ? calculateReadTime(editing.content) : '0 min'}
                </p>
              </div>
              
              <div className="flex space-x-3 pt-4 border-t border-white/10">
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {editing?.id === 0 ? 'Publicar Artigo' : 'Salvar Alterações'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleBackToList}
                  className="border-white/20 text-gray-300 hover:bg-white/10"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminBlogPosts;
