
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  FileText, 
  Edit, 
  Save, 
  Eye, 
  Plus,
  Search,
  Globe,
  Calendar
} from 'lucide-react';

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  status: 'published' | 'draft';
  lastModified: string;
}

const AdminPages = () => {
  const [pages, setPages] = useState<Page[]>([
    {
      id: '1',
      title: 'Home',
      slug: 'home',
      content: 'Conteúdo da página inicial...',
      metaTitle: 'Foco na Aposentadoria - Especialistas em Direito Previdenciário',
      metaDescription: 'Escritório especializado em aposentadoria e benefícios do INSS.',
      status: 'published',
      lastModified: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      title: 'Sobre Nós',
      slug: 'sobre',
      content: 'Nossa história e missão...',
      metaTitle: 'Sobre Nós - Foco na Aposentadoria',
      metaDescription: 'Conheça nossa equipe e nossa missão.',
      status: 'published',
      lastModified: '2024-01-14T15:45:00Z'
    }
  ]);

  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (page: Page) => {
    setEditingPage({ ...page });
  };

  const handleSave = () => {
    if (editingPage) {
      setPages(pages.map(page => 
        page.id === editingPage.id 
          ? { ...editingPage, lastModified: new Date().toISOString() }
          : page
      ));
      setEditingPage(null);
    }
  };

  const handleCancel = () => {
    setEditingPage(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white font-playfair">Gerenciamento de Páginas</h1>
          <p className="text-gray-300 mt-2">Gerencie o conteúdo das páginas do site</p>
        </div>
        <Button className="bg-gradient-to-r from-orange to-orangeLight hover:from-orangeLight hover:to-orange text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <Plus className="h-4 w-4 mr-2" />
          Nova Página
        </Button>
      </div>

      {!editingPage ? (
        <>
          {/* Barra de pesquisa */}
          <Card className="bg-gradient-to-r from-navy/50 to-darkNavy/50 border-white/10 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Pesquisar páginas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-darkNavy/50 border-gray-600 text-white placeholder-gray-400 focus:ring-orange focus:border-orange"
                />
              </div>
            </CardContent>
          </Card>

          {/* Lista de páginas */}
          <div className="grid gap-6">
            {filteredPages.map((page) => (
              <Card key={page.id} className="bg-gradient-to-r from-navy/50 to-darkNavy/50 border-white/10 backdrop-blur-sm hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange/20 to-orangeLight/20 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-orange" />
                      </div>
                      <div>
                        <CardTitle className="text-white">{page.title}</CardTitle>
                        <p className="text-sm text-gray-400">/{page.slug}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        page.status === 'published' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {page.status === 'published' ? 'Publicada' : 'Rascunho'}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      Última modificação: {new Date(page.lastModified).toLocaleDateString('pt-BR')}
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
                        onClick={() => handleEdit(page)}
                        className="text-orange hover:text-orangeLight hover:bg-orange/10"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        /* Editor de página */
        <Card className="bg-gradient-to-r from-navy/50 to-darkNavy/50 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Edit className="h-5 w-5 mr-2 text-orange" />
              Editando: {editingPage.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Título da Página
                </label>
                <Input
                  value={editingPage.title}
                  onChange={(e) => setEditingPage({...editingPage, title: e.target.value})}
                  className="bg-darkNavy/50 border-gray-600 text-white focus:ring-orange focus:border-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Slug (URL)
                </label>
                <Input
                  value={editingPage.slug}
                  onChange={(e) => setEditingPage({...editingPage, slug: e.target.value})}
                  className="bg-darkNavy/50 border-gray-600 text-white focus:ring-orange focus:border-orange"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Conteúdo
              </label>
              <Textarea
                value={editingPage.content}
                onChange={(e) => setEditingPage({...editingPage, content: e.target.value})}
                rows={10}
                className="bg-darkNavy/50 border-gray-600 text-white focus:ring-orange focus:border-orange"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Meta Título (SEO)
                </label>
                <Input
                  value={editingPage.metaTitle}
                  onChange={(e) => setEditingPage({...editingPage, metaTitle: e.target.value})}
                  className="bg-darkNavy/50 border-gray-600 text-white focus:ring-orange focus:border-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Status
                </label>
                <select
                  value={editingPage.status}
                  onChange={(e) => setEditingPage({...editingPage, status: e.target.value as 'published' | 'draft'})}
                  className="w-full px-3 py-2 bg-darkNavy/50 border border-gray-600 rounded-md text-white focus:ring-orange focus:border-orange"
                >
                  <option value="draft">Rascunho</option>
                  <option value="published">Publicada</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Meta Descrição (SEO)
              </label>
              <Textarea
                value={editingPage.metaDescription}
                onChange={(e) => setEditingPage({...editingPage, metaDescription: e.target.value})}
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
                Salvar Alterações
              </Button>
              <Button
                variant="ghost"
                onClick={handleCancel}
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

export default AdminPages;
