import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Book, Edit, Trash2, Plus, Save, ImagePlus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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

const categories = [
  "Aposentadoria",
  "INSS",
  "Benefícios",
  "Revisões",
  "Direitos",
  "Notícias",
  "Dicas"
];

const AdminBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  
  const FormSchema = z.object({
    title: z.string().min(1, "Título é obrigatório"),
    excerpt: z.string().optional(),
    content: z.string().min(1, "Conteúdo é obrigatório"),
    image: z.string().optional(),
    author: z.string().min(1, "Autor é obrigatório"),
    category: z.string().optional(),
  });
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      image: "",
      author: "",
      category: "",
    },
  });
  
  const emptyPost: BlogPost = {
    id: Date.now(),
    title: "",
    excerpt: "",
    content: "",
    image: "",
    date: new Date().toLocaleDateString('pt-BR', {day: '2-digit', month: 'short', year: 'numeric'})
      .replace('.', ''),
    author: "",
    category: "",
    readTime: "0 min",
  };
  
  useEffect(() => {
    loadPosts();
  }, []);
  
  const loadPosts = () => {
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
      const parsedPosts = JSON.parse(storedPosts);
      setPosts(parsedPosts);
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
          author: "Dr. Carlos Silva",
          category: "Aposentadoria",
          readTime: "2 min",
          isFeatured: true
        },
        {
          id: 2,
          title: "Aposentadoria Especial: Quem tem direito?",
          excerpt: "Entenda os critérios para concessão da aposentadoria especial e como comprovar o direito a este benefício.",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
          date: "02 Mai 2025",
          author: "Dra. Mariana Costa",
          category: "INSS",
          readTime: "3 min"
        },
        {
          id: 3,
          title: "Revisão da Vida Toda: O que você precisa saber",
          excerpt: "Descubra o que é a revisão da vida toda e como ela pode aumentar o valor da sua aposentadoria.",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
          date: "28 Abr 2025",
          author: "Dr. Rafael Mendes",
          category: "Revisões",
          readTime: "4 min"
        }
      ];
      
      setPosts(initialPosts);
      localStorage.setItem('blogPosts', JSON.stringify(initialPosts));
    }
  };
  
  const calculateReadTime = (content: string): string => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min`;
  };
  
  const processContent = (content: string): string => {
    // Process content to replace image placeholders with actual HTML
    // Format: [img:URL]
    const processedContent = content.replace(/\[img:(.*?)\]/g, '<img src="$1" alt="Imagem do artigo" class="my-4 rounded-lg w-full" />');
    return processedContent;
  };
  
  const stripHtml = (html: string): string => {
    // Remove HTML tags for word count calculation
    return html.replace(/<[^>]*>?/gm, '');
  };
  
  const handleSave = (data: z.infer<typeof FormSchema>) => {
    if (!editing) return;
    
    // Process content to handle images
    const processedContent = processContent(data.content);
    
    // Calculate reading time
    const readTime = calculateReadTime(stripHtml(processedContent));
    
    const currentDate = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit', 
      month: 'short', 
      year: 'numeric'
    }).replace('.', '');
    
    const updatedPost = {
      ...editing,
      title: data.title,
      excerpt: data.excerpt || "",
      content: processedContent,
      image: data.image || "",
      author: data.author,
      date: editing.id === emptyPost.id ? currentDate : editing.date,
      category: data.category || "",
      readTime
    };
    
    let updatedPosts: BlogPost[];
    
    if (editing.id === emptyPost.id) {
      // New post - mark it as featured and remove feature from other posts if needed
      updatedPosts = posts.map(post => ({
        ...post,
        isFeatured: false // Remove feature flag from all existing posts
      }));
      
      // Add the new post with featured flag
      updatedPosts.push({
        ...updatedPost,
        isFeatured: true
      });
    } else {
      // Updating existing post - keep current featured status
      updatedPosts = posts.map(post => 
        post.id === editing.id ? updatedPost : post
      );
    }
    
    setPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    setEditing(null);
    setShowForm(false);
    toast.success("Artigo salvo com sucesso!");
    form.reset();
  };
  
  const handleDelete = (id: number) => {
    const postToDelete = posts.find(post => post.id === id);
    const isFeaturedPost = postToDelete?.isFeatured;
    
    const updatedPosts = posts.filter(post => post.id !== id);
    
    // If we're deleting the featured post, set the most recent post as featured
    if (isFeaturedPost && updatedPosts.length > 0) {
      // Sort by date and take the most recent
      const sortedPosts = [...updatedPosts].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      
      updatedPosts.forEach(post => post.isFeatured = false);
      sortedPosts[0].isFeatured = true;
    }
    
    setPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    
    if (editing && editing.id === id) {
      setEditing(null);
      setShowForm(false);
      form.reset();
    }
    
    toast.success("Artigo excluído com sucesso!");
  };
  
  const handleCreateNew = () => {
    const newPost = {
      ...emptyPost,
      id: Date.now(),
    };
    setEditing(newPost);
    setShowForm(true);
    
    form.reset({
      title: "",
      excerpt: "",
      content: "",
      image: "",
      author: "",
      category: "",
    });
  };
  
  const handleEdit = (post: BlogPost) => {
    setEditing(post);
    setShowForm(true);
    
    form.reset({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      author: post.author,
      category: post.category || "",
    });
  };
  
  const insertImage = () => {
    if (!selectedImage || !editing) return;
    
    const imageTag = `[img:${selectedImage}]`;
    const currentContent = form.getValues("content");
    const newContent = currentContent + "\n\n" + imageTag;
    
    form.setValue("content", newContent);
    setSelectedImage("");
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Título*</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          className="w-full bg-navy/50 border border-gray-700 rounded px-4 py-2 text-white"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Autor*</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          className="w-full bg-navy/50 border border-gray-700 rounded px-4 py-2 text-white"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Categoria</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full bg-navy/50 border border-gray-700 rounded px-4 py-2 text-white"
                        >
                          <option value="">Selecione uma categoria</option>
                          {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">URL da Imagem de Capa</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          type="text"
                          placeholder="https://exemplo.com/imagem.jpg"
                          className="w-full bg-navy/50 border border-gray-700 rounded px-4 py-2 text-white"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
              
              {form.watch("image") && (
                <div className="mt-2 h-40 w-full">
                  <img 
                    src={form.getValues("image")} 
                    alt="Preview" 
                    className="h-full w-64 object-cover rounded border border-gray-700"
                  />
                </div>
              )}
              
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Resumo</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Um breve resumo do artigo (será exibido na listagem)"
                        className="bg-navy/50 border border-gray-700 rounded px-4 py-2 text-white h-20"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              
              <div className="space-y-2">
                <FormLabel className="text-gray-200">Inserir Imagem no Conteúdo</FormLabel>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={selectedImage}
                    onChange={(e) => setSelectedImage(e.target.value)}
                    placeholder="Cole a URL da imagem aqui"
                    className="flex-1 bg-navy/50 border border-gray-700 rounded px-4 py-2 text-white"
                  />
                  <Button 
                    type="button"
                    onClick={insertImage}
                    className="bg-navy/80 border border-white/20 text-white hover:bg-navy"
                  >
                    <ImagePlus className="mr-2 h-4 w-4" />
                    Inserir
                  </Button>
                </div>
                <p className="text-xs text-gray-400">
                  Dica: Primeiro posicione o cursor no local onde deseja inserir a imagem, depois clique em "Inserir"
                </p>
              </div>
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Conteúdo*</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Conteúdo completo do artigo. Para inserir imagens, posicione o cursor e use o botão 'Inserir' acima."
                        className="bg-navy/50 border border-gray-700 rounded px-4 py-2 text-white h-60 font-mono"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end gap-4">
                <Button 
                  type="button"
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => {
                    setEditing(null);
                    setShowForm(false);
                    form.reset();
                  }}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-orange to-orangeLight hover:from-orangeLight hover:to-orange text-white"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Artigo
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className={`bg-navy/30 rounded-lg border ${post.isFeatured ? 'border-orange' : 'border-white/10'} p-4 flex justify-between items-center`}
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
                  <div className="flex items-center">
                    <h4 className="font-medium text-white">{post.title}</h4>
                    {post.isFeatured && (
                      <span className="ml-2 text-xs font-semibold bg-orange text-white px-1.5 py-0.5 rounded">
                        Destaque
                      </span>
                    )}
                  </div>
                  <div className="flex text-sm text-gray-400 gap-3">
                    <span>{post.date}</span>
                    <span className="text-orange">{post.author}</span>
                    {post.category && (
                      <span className="text-gray-300">{post.category}</span>
                    )}
                    <span className="text-gray-400">{post.readTime}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost" 
                  size="sm"
                  className="h-9 w-9 p-0 text-gray-400 hover:text-orange"
                  onClick={() => handleEdit(post)}
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
