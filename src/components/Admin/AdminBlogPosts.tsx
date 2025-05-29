
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus, Save, Star, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

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
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gerenciar Blog</h1>
        <Button onClick={handleCreateNew} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Novo Artigo
        </Button>
      </div>
      
      {showForm && editing ? (
        <Card>
          <CardHeader>
            <CardTitle>{editing.id === 0 ? 'Criar Novo Artigo' : 'Editar Artigo'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Título</label>
                <Input
                  value={editing.title}
                  onChange={(e) => setEditing({...editing, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Autor</label>
                  <Input
                    value={editing.author}
                    onChange={(e) => setEditing({...editing, author: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Categoria</label>
                  <select
                    value={editing.category}
                    onChange={(e) => setEditing({...editing, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="Aposentadoria">Aposentadoria</option>
                    <option value="INSS">INSS</option>
                    <option value="Benefícios">Benefícios</option>
                    <option value="Revisões">Revisões</option>
                    <option value="Direitos">Direitos</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">URL da Imagem</label>
                <div className="flex gap-2">
                  <Input
                    value={editing.image}
                    onChange={(e) => setEditing({...editing, image: e.target.value})}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                  <Button type="button" variant="outline">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
                {editing.image && (
                  <img 
                    src={editing.image} 
                    alt="Preview" 
                    className="mt-2 h-32 w-48 object-cover rounded border"
                  />
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Resumo</label>
                <Textarea
                  value={editing.excerpt}
                  onChange={(e) => setEditing({...editing, excerpt: e.target.value})}
                  rows={2}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Conteúdo</label>
                <Textarea
                  value={editing.content}
                  onChange={(e) => setEditing({...editing, content: e.target.value})}
                  rows={8}
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={editing.isFeatured}
                  onChange={(e) => setEditing({...editing, isFeatured: e.target.checked})}
                  className="rounded"
                />
                <label htmlFor="featured" className="text-sm font-medium">Artigo em destaque</label>
              </div>
              
              <div className="flex space-x-2">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  <Save className="mr-2 h-4 w-4" />
                  Salvar
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setEditing(null);
                    setShowForm(false);
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex space-x-4 flex-1">
                    <img 
                      src={post.image || '/placeholder.svg'} 
                      alt={post.title} 
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-lg">{post.title}</h3>
                        {post.isFeatured && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            <Star className="w-3 h-3 mr-1" />
                            Destaque
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{post.excerpt}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>{post.author}</span>
                        <span>{post.date}</span>
                        <span>{post.category}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleFeatured(post.id)}
                      className={post.isFeatured ? "bg-yellow-50" : ""}
                    >
                      <Star className={`h-4 w-4 ${post.isFeatured ? 'text-yellow-600' : ''}`} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(post)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {posts.length === 0 && (
            <Card>
              <CardContent className="text-center py-10">
                <p className="text-gray-500">Nenhum artigo encontrado</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminBlogPosts;
