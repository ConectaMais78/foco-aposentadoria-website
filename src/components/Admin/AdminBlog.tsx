
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  PenTool, 
  Edit, 
  Save, 
  Eye, 
  Plus,
  Search,
  Calendar,
  Tag,
  User,
  Image as ImageIcon,
  Trash2
} from 'lucide-react';
import { BlogPost } from '@/types/admin';

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Como requerer aposentadoria por idade no INSS',
      slug: 'como-requerer-aposentadoria-por-idade',
      content: 'Conteúdo completo do artigo...',
      excerpt: 'Aprenda o passo a passo para solicitar sua aposentadoria por idade.',
      author: 'Dr. João Silva',
      publishDate: '2024-01-15T10:00:00Z',
      status: 'published',
      category: 'Aposentadoria',
      tags: ['INSS', 'aposentadoria', 'idade'],
      metaTitle: 'Como requerer aposentadoria por idade - Guia completo',
      metaDescription: 'Guia completo sobre como requerer aposentadoria por idade no INSS.',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    }
  ]);

  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'scheduled'>('all');

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (post: BlogPost) => {
    setEditingPost({ ...post });
  };

  const handleSave = () => {
    if (editingPost) {
      const isNew = !posts.find(p => p.id === editingPost.id);
      if (isNew) {
        const newPost = {
          ...editingPost,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setPosts([newPost, ...posts]);
      } else {
        setPosts(posts.map(post => 
          post.id === editingPost.id 
            ? { ...editingPost, updatedAt: new Date().toISOString() }
            : post
        ));
      }
      setEditingPost(null);
    }
  };

  const handleNewPost = () => {
    setEditingPost({
      id: '',
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      author: 'Dr. João Silva',
      publishDate: new Date().toISOString(),
      status: 'draft',
      category: '',
      tags: [],
      metaTitle: '',
      metaDescription: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  };

  const handleDelete = (postId: string) => {
    if (confirm('Tem certeza que deseja excluir este post?')) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white font-playfair">Gerenciamento de Blog</h1>
          <p className="text-gray-300 mt-2">Crie e gerencie as postagens do blog</p>
        </div>
        <Button 
          onClick={handleNewPost}
          className="bg-gradient-to-r from-orange to-orangeLight hover:from-orangeLight hover:to-orange text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Post
        </Button>
      </div>

      {!editingPost ? (
        <>
          {/* Filtros */}
          <Card className="bg-gradient-to-r from-navy/50 to-darkNavy/50 border-white/10 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Pesquisar posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-darkNavy/50 border-gray-600 text-white placeholder-gray-400 focus:ring-orange focus:border-orange"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-3 py-2 bg-darkNavy/50 border border-gray-600 rounded-md text-white focus:ring-orange focus:border-orange"
                >
                  <option value="all">Todos os status</option>
                  <option value="published">Publicados</option>
                  <option value="draft">Rascunhos</option>
                  <option value="scheduled">Programados</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Lista de posts */}
          <div className="grid gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="bg-gradient-to-r from-navy/50 to-darkNavy/50 border-white/10 backdrop-blur-sm hover-lift">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange/20 to-orangeLight/20 rounded-lg flex items-center justify-center">
                        <PenTool className="h-6 w-6 text-orange" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg">{post.title}</CardTitle>
                        <p className="text-gray-400 text-sm mt-1">{post.excerpt}</p>
                        <div className="flex items-center space-x-4 mt-3 text-sm text-gray-400">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(post.publishDate).toLocaleDateString('pt-BR')}
                          </div>
                          <div className="flex items-center">
                            <Tag className="h-4 w-4 mr-1" />
                            {post.category}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        post.status === 'published' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : post.status === 'scheduled'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {post.status === 'published' ? 'Publicado' : 
                         post.status === 'scheduled' ? 'Programado' : 'Rascunho'}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-gray-600/30 text-gray-300 text-xs rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white hover:bg-white/10"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(post)}
                        className="text-orange hover:text-orangeLight hover:bg-orange/10"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        /* Editor de post */
        <Card className="bg-gradient-to-r from-navy/50 to-darkNavy/50 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <PenTool className="h-5 w-5 mr-2 text-orange" />
              {editingPost.id ? 'Editando Post' : 'Novo Post'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Título
                </label>
                <Input
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                  className="bg-darkNavy/50 border-gray-600 text-white focus:ring-orange focus:border-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Slug (URL)
                </label>
                <Input
                  value={editingPost.slug}
                  onChange={(e) => setEditingPost({...editingPost, slug: e.target.value})}
                  className="bg-darkNavy/50 border-gray-600 text-white focus:ring-orange focus:border-orange"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Resumo
              </label>
              <Textarea
                value={editingPost.excerpt}
                onChange={(e) => setEditingPost({...editingPost, excerpt: e.target.value})}
                rows={3}
                className="bg-darkNavy/50 border-gray-600 text-white focus:ring-orange focus:border-orange"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Conteúdo
              </label>
              <Textarea
                value={editingPost.content}
                onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                rows={12}
                className="bg-darkNavy/50 border-gray-600 text-white focus:ring-orange focus:border-orange"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Autor
                </label>
                <Input
                  value={editingPost.author}
                  onChange={(e) => setEditingPost({...editingPost, author: e.target.value})}
                  className="bg-darkNavy/50 border-gray-600 text-white focus:ring-orange focus:border-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Categoria
                </label>
                <Input
                  value={editingPost.category}
                  onChange={(e) => setEditingPost({...editingPost, category: e.target.value})}
                  className="bg-darkNavy/50 border-gray-600 text-white focus:ring-orange focus:border-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Status
                </label>
                <select
                  value={editingPost.status}
                  onChange={(e) => setEditingPost({...editingPost, status: e.target.value as any})}
                  className="w-full px-3 py-2 bg-darkNavy/50 border border-gray-600 rounded-md text-white focus:ring-orange focus:border-orange"
                >
                  <option value="draft">Rascunho</option>
                  <option value="published">Publicado</option>
                  <option value="scheduled">Programado</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Tags (separadas por vírgula)
              </label>
              <Input
                value={editingPost.tags.join(', ')}
                onChange={(e) => setEditingPost({
                  ...editingPost, 
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                })}
                className="bg-darkNavy/50 border-gray-600 text-white focus:ring-orange focus:border-orange"
                placeholder="INSS, aposentadoria, benefícios"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Meta Título (SEO)
                </label>
                <Input
                  value={editingPost.metaTitle}
                  onChange={(e) => setEditingPost({...editingPost, metaTitle: e.target.value})}
                  className="bg-darkNavy/50 border-gray-600 text-white focus:ring-orange focus:border-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Data de Publicação
                </label>
                <Input
                  type="datetime-local"
                  value={editingPost.publishDate.slice(0, 16)}
                  onChange={(e) => setEditingPost({...editingPost, publishDate: e.target.value + ':00.000Z'})}
                  className="bg-darkNavy/50 border-gray-600 text-white focus:ring-orange focus:border-orange"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Meta Descrição (SEO)
              </label>
              <Textarea
                value={editingPost.metaDescription}
                onChange={(e) => setEditingPost({...editingPost, metaDescription: e.target.value})}
                rows={3}
                className="bg-darkNavy/50 border-gray-600 text-white focus:ring-orange focus:border-orange"
              />
            </div>

            <div className="flex space-x-4">
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Save className="h-4 w-4 mr-2" />
                Salvar Post
              </Button>
              <Button
                variant="ghost"
                onClick={() => setEditingPost(null)}
                className="text-gray-400 hover:text-white hover:bg-white/10"
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminBlog;
