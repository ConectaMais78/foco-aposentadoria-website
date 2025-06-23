import { 
  BlogPost, 
  BlogCategory, 
  ContactMessage, 
  TeamMember, 
  MediaFile, 
  SiteSettings, 
  AnalyticsData, 
  ActivityLog,
  User
} from '@/types/admin';

class DataService {
  private getStorageKey(key: string): string {
    return `focoAposentadoria_${key}`;
  }

  private saveToStorage<T>(key: string, data: T): void {
    try {
      localStorage.setItem(this.getStorageKey(key), JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }

  private getFromStorage<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(this.getStorageKey(key));
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return defaultValue;
    }
  }

  // Blog Posts Management com dados padrão garantidos
  getBlogPosts(): BlogPost[] {
    const defaultPosts: BlogPost[] = [
      {
        id: '1',
        title: 'Novidades na Aposentadoria em 2025',
        slug: 'novidades-aposentadoria-2025',
        content: `
          <h2>Principais Mudanças em 2025</h2>
          <p>As mudanças nas regras de aposentadoria continuam sendo um tema de grande interesse para os trabalhadores brasileiros. Em 2025, algumas alterações importantes entraram em vigor, afetando diretamente os direitos previdenciários.</p>
          
          <h3>Idade Mínima</h3>
          <p>A idade mínima para aposentadoria continua seguindo a regra de transição estabelecida pela Emenda Constitucional 103/2019. Para 2025:</p>
          <ul>
            <li>Mulheres: 62 anos</li>
            <li>Homens: 65 anos</li>
          </ul>
          
          <h3>Tempo de Contribuição</h3>
          <p>O tempo mínimo de contribuição permanece:</p>
          <ul>
            <li>Mulheres: 15 anos</li>
            <li>Homens: 20 anos</li>
          </ul>
          
          <h3>Regras de Transição</h3>
          <p>As regras de transição continuam valendo para quem já contribuía antes da reforma. É fundamental entender qual regra é mais vantajosa para seu caso específico.</p>
          
          <p>Para uma análise completa do seu caso, entre em contato conosco através do WhatsApp. Nossa equipe está pronta para orientá-lo sobre a melhor estratégia para sua aposentadoria.</p>
        `,
        excerpt: 'Conheça as principais mudanças nas regras de aposentadoria para 2025 e como elas podem afetar seus direitos previdenciários.',
        author: 'Dr. Carlos Silva',
        publishDate: new Date('2025-05-10').toISOString(),
        status: 'published',
        category: 'Aposentadoria',
        tags: ['aposentadoria', 'INSS', '2025', 'reforma'],
        createdAt: new Date('2025-05-10').toISOString(),
        updatedAt: new Date('2025-05-10').toISOString(),
        viewCount: 1234,
        readTime: '5 min',
        image: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
      },
      {
        id: '2',
        title: 'Aposentadoria Especial: Quem tem direito?',
        slug: 'aposentadoria-especial-direito',
        content: `
          <h2>O que é Aposentadoria Especial?</h2>
          <p>A aposentadoria especial é um benefício destinado aos trabalhadores que exercem atividades em condições prejudiciais à saúde ou à integridade física. Este tipo de aposentadoria permite que o trabalhador se aposente com menos tempo de contribuição.</p>
          
          <h3>Quem tem direito?</h3>
          <p>Têm direito à aposentadoria especial os trabalhadores expostos a:</p>
          <ul>
            <li>Agentes químicos (como amianto, benzeno, chumbo)</li>
            <li>Agentes físicos (ruído, calor, frio, radiação)</li>
            <li>Agentes biológicos (vírus, bactérias, fungos)</li>
            <li>Associação de agentes prejudiciais</li>
          </ul>
          
          <h3>Tempo de Contribuição Necessário</h3>
          <p>O tempo varia conforme o grau de exposição:</p>
          <ul>
            <li>15 anos: atividades de alto risco</li>
            <li>20 anos: atividades de médio risco</li>
            <li>25 anos: atividades de baixo risco</li>
          </ul>
          
          <h3>Como Comprovar?</h3>
          <p>A comprovação é feita através do PPP (Perfil Profissiográfico Previdenciário) e LTCAT (Laudo Técnico das Condições Ambientais do Trabalho), documentos que devem ser fornecidos pela empresa.</p>
          
          <p>Se você trabalha ou trabalhou em atividades insalubres, entre em contato conosco para verificar seus direitos.</p>
        `,
        excerpt: 'Entenda quem tem direito à aposentadoria especial e como comprovar a exposição a agentes prejudiciais à saúde.',
        author: 'Dra. Mariana Costa',
        publishDate: new Date('2025-05-02').toISOString(),
        status: 'published',
        category: 'Aposentadoria',
        tags: ['aposentadoria especial', 'direitos', 'INSS'],
        createdAt: new Date('2025-05-02').toISOString(),
        updatedAt: new Date('2025-05-02').toISOString(),
        viewCount: 987,
        readTime: '7 min',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
      },
      {
        id: '3',
        title: 'Revisão da Vida Toda: O que você precisa saber',
        slug: 'revisao-vida-toda',
        content: `
          <h2>O que é a Revisão da Vida Toda?</h2>
          <p>A Revisão da Vida Toda é uma tese jurídica que permite incluir no cálculo da aposentadoria as contribuições anteriores a julho de 1994, quando foi criado o Plano Real. Esta revisão pode resultar em um aumento significativo no valor do benefício.</p>
          
          <h3>Como Funciona?</h3>
          <p>Atualmente, o INSS considera apenas as contribuições a partir de julho de 1994 para calcular a Renda Mensal Inicial (RMI) da aposentadoria. Com a Revisão da Vida Toda, é possível incluir todo o período contributivo.</p>
          
          <h3>Quem pode solicitar?</h3>
          <p>Podem solicitar a revisão:</p>
          <ul>
            <li>Aposentados que contribuíram antes de julho de 1994</li>
            <li>Beneficiários que tiveram salários altos no período anterior a 1994</li>
            <li>Quem se aposentou a partir de 29/11/1999</li>
          </ul>
          
          <h3>Requisitos</h3>
          <ul>
            <li>Ter contribuições anteriores a julho de 1994</li>
            <li>O cálculo incluindo todo o período deve ser mais vantajoso</li>
            <li>Respeitar o prazo decadencial de 10 anos</li>
          </ul>
          
          <h3>Vantagens e Riscos</h3>
          <p><strong>Vantagens:</strong></p>
          <ul>
            <li>Possibilidade de aumento no valor da aposentadoria</li>
            <li>Reconhecimento de todo o período contributivo</li>
          </ul>
          
          <p><strong>Riscos:</strong></p>
          <ul>
            <li>O novo cálculo pode resultar em valor menor</li>
            <li>Custos processuais em caso de derrota</li>
          </ul>
          
          <p>É fundamental fazer uma análise prévia para verificar se a revisão será vantajosa. Nossa equipe pode fazer essa avaliação gratuitamente.</p>
        `,
        excerpt: 'Descubra o que é a revisão da vida toda e como ela pode aumentar o valor da sua aposentadoria.',
        author: 'Dr. Rafael Mendes',
        publishDate: new Date('2025-04-28').toISOString(),
        status: 'published',
        category: 'Revisões',
        tags: ['revisão', 'aposentadoria', 'benefício', 'vida toda'],
        createdAt: new Date('2025-04-28').toISOString(),
        updatedAt: new Date('2025-04-28').toISOString(),
        viewCount: 654,
        readTime: '6 min',
        image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
      }
    ];
    
    try {
      const storedPosts = this.getFromStorage('blogPosts', defaultPosts);
      
      // Se não há posts armazenados ou array está vazio, usar posts padrão
      if (!Array.isArray(storedPosts) || storedPosts.length === 0) {
        this.saveToStorage('blogPosts', defaultPosts);
        return defaultPosts;
      }
      
      return storedPosts;
    } catch (error) {
      console.error('Erro ao carregar posts do blog:', error);
      this.saveToStorage('blogPosts', defaultPosts);
      return defaultPosts;
    }
  }

  saveBlogPosts(posts: BlogPost[]): void {
    this.saveToStorage('blogPosts', posts);
  }

  getBlogPost(id: string): BlogPost | undefined {
    return this.getBlogPosts().find(post => post.id === id);
  }

  createBlogPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): BlogPost {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewCount: 0
    };
    
    const posts = this.getBlogPosts();
    posts.push(newPost);
    this.saveBlogPosts(posts);
    
    this.logActivity('blog_post_created', `Criou o post "${newPost.title}"`);
    return newPost;
  }

  updateBlogPost(id: string, updates: Partial<BlogPost>): BlogPost | null {
    const posts = this.getBlogPosts();
    const index = posts.findIndex(post => post.id === id);
    
    if (index === -1) return null;
    
    posts[index] = {
      ...posts[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    this.saveBlogPosts(posts);
    this.logActivity('blog_post_updated', `Atualizou o post "${posts[index].title}"`);
    return posts[index];
  }

  deleteBlogPost(id: string): boolean {
    const posts = this.getBlogPosts();
    const index = posts.findIndex(post => post.id === id);
    
    if (index === -1) return false;
    
    const deletedPost = posts[index];
    posts.splice(index, 1);
    this.saveBlogPosts(posts);
    
    this.logActivity('blog_post_deleted', `Deletou o post "${deletedPost.title}"`);
    return true;
  }

  // Blog Categories Management
  getBlogCategories(): BlogCategory[] {
    return this.getFromStorage('blogCategories', [
      { id: '1', name: 'Aposentadoria', slug: 'aposentadoria', description: 'Artigos sobre aposentadoria', color: '#f97316', postCount: 15 },
      { id: '2', name: 'INSS', slug: 'inss', description: 'Informações sobre INSS', color: '#3b82f6', postCount: 8 },
      { id: '3', name: 'Revisões', slug: 'revisoes', description: 'Revisões de benefícios', color: '#10b981', postCount: 5 },
      { id: '4', name: 'Dicas', slug: 'dicas', description: 'Dicas e orientações', color: '#8b5cf6', postCount: 12 }
    ]);
  }

  saveBlogCategories(categories: BlogCategory[]): void {
    this.saveToStorage('blogCategories', categories);
  }

  // Messages Management
  getMessages(): ContactMessage[] {
    const defaultMessages: ContactMessage[] = [
      {
        id: '1',
        name: 'Maria Silva',
        email: 'maria.silva@email.com',
        phone: '(11) 99999-0001',
        subject: 'Dúvida sobre aposentadoria',
        message: 'Olá, gostaria de saber mais sobre as novas regras de aposentadoria. Trabalho há 25 anos e tenho 52 anos. Quando posso me aposentar?',
        date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 horas atrás
        status: 'unread',
        priority: 'medium',
        category: 'aposentadoria',
        tags: ['aposentadoria', 'consulta'],
        source: 'website'
      },
      {
        id: '2',
        name: 'João Santos',
        email: 'joao.santos@email.com',
        phone: '(11) 99999-0002',
        subject: 'Revisão de benefício',
        message: 'Preciso fazer uma revisão do meu benefício. Acredito que há erro no cálculo. Podem me ajudar?',
        date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 horas atrás
        status: 'read',
        priority: 'high',
        category: 'revisao',
        tags: ['revisão', 'benefício'],
        source: 'website'
      },
      {
        id: '3',
        name: 'Ana Costa',
        email: 'ana.costa@email.com',
        phone: '(11) 99999-0003',
        subject: 'Agendamento de consulta',
        message: 'Gostaria de agendar uma consulta para avaliar meu caso. Estou com dúvidas sobre aposentadoria por invalidez.',
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 dia atrás
        status: 'replied',
        priority: 'medium',
        category: 'consulta',
        reply: 'Olá Ana, obrigado pelo contato. Entraremos em contato para agendar sua consulta.',
        repliedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
        repliedBy: 'admin',
        tags: ['consulta', 'agendamento'],
        source: 'website'
      }
    ];
    
    return this.getFromStorage('messages', defaultMessages);
  }

  saveMessages(messages: ContactMessage[]): void {
    this.saveToStorage('messages', messages);
  }

  createMessage(message: Omit<ContactMessage, 'id' | 'date' | 'status'>): ContactMessage {
    const newMessage: ContactMessage = {
      ...message,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'unread',
      priority: 'medium',
      tags: [],
      source: 'website'
    };
    
    const messages = this.getMessages();
    messages.unshift(newMessage);
    this.saveMessages(messages);
    
    return newMessage;
  }

  updateMessage(id: string, updates: Partial<ContactMessage>): ContactMessage | null {
    const messages = this.getMessages();
    const index = messages.findIndex(msg => msg.id === id);
    
    if (index === -1) return null;
    
    messages[index] = { ...messages[index], ...updates };
    this.saveMessages(messages);
    
    this.logActivity('message_updated', `Atualizou mensagem de ${messages[index].name}`);
    return messages[index];
  }

  // Team Members Management
  getTeamMembers(): TeamMember[] {
    const defaultTeam: TeamMember[] = [
      {
        id: '1',
        name: 'Dr. João Silva',
        position: 'Advogado Sênior - Direito Previdenciário',
        bio: 'Especialista em direito previdenciário com mais de 15 anos de experiência.',
        email: 'joao.silva@foconaaposentadoria.com',
        phone: '(11) 99999-1001',
        specializations: ['Aposentadoria', 'Revisão de Benefícios', 'INSS'],
        socialLinks: {
          linkedin: 'https://linkedin.com/in/joaosilva',
          whatsapp: '5511999991001'
        },
        order: 1,
        status: 'active',
        joinDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        name: 'Dra. Maria Santos',
        position: 'Advogada - Direito Previdenciário',
        bio: 'Especializada em aposentadoria especial e benefícios por incapacidade.',
        email: 'maria.santos@foconaaposentadoria.com',
        phone: '(11) 99999-1002',
        specializations: ['Aposentadoria Especial', 'Auxílio-Doença', 'Perícia Médica'],
        socialLinks: {
          linkedin: 'https://linkedin.com/in/mariasantos',
          whatsapp: '5511999991002'
        },
        order: 2,
        status: 'active',
        joinDate: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
    
    return this.getFromStorage('teamMembers', defaultTeam);
  }

  saveTeamMembers(members: TeamMember[]): void {
    this.saveToStorage('teamMembers', members);
  }

  createTeamMember(member: Omit<TeamMember, 'id' | 'joinDate'>): TeamMember {
    const newMember: TeamMember = {
      ...member,
      id: Date.now().toString(),
      joinDate: new Date().toISOString(),
      status: 'active'
    };
    
    const members = this.getTeamMembers();
    members.push(newMember);
    this.saveTeamMembers(members);
    
    this.logActivity('team_member_created', `Adicionou membro da equipe: ${newMember.name}`);
    return newMember;
  }

  // Media Files Management
  getMediaFiles(): MediaFile[] {
    return this.getFromStorage('mediaFiles', []);
  }

  saveMediaFiles(files: MediaFile[]): void {
    this.saveToStorage('mediaFiles', files);
  }

  // Site Settings Management
  getSiteSettings(): SiteSettings {
    return this.getFromStorage('siteSettings', {
      siteName: 'Foco na Aposentadoria',
      siteDescription: 'Especialistas em direito previdenciário',
      email: 'contato@foconaaposentadoria.com',
      phone: '(11) 99999-9999',
      address: 'São Paulo, SP',
      businessHours: {
        monday: { open: '08:00', close: '18:00', closed: false },
        tuesday: { open: '08:00', close: '18:00', closed: false },
        wednesday: { open: '08:00', close: '18:00', closed: false },
        thursday: { open: '08:00', close: '18:00', closed: false },
        friday: { open: '08:00', close: '18:00', closed: false },
        saturday: { open: '09:00', close: '13:00', closed: false },
        sunday: { open: '00:00', close: '00:00', closed: true }
      },
      socialMedia: {},
      maintenanceMode: false,
      seoSettings: {
        defaultMetaTitle: 'Foco na Aposentadoria - Especialistas em Direito Previdenciário',
        defaultMetaDescription: 'Especialistas em aposentadoria e direito previdenciário. Consultoria completa para seu benefício.',
        keywords: ['aposentadoria', 'previdência', 'INSS', 'direito previdenciário']
      },
      emailSettings: {
        fromEmail: 'contato@foconaaposentadoria.com',
        fromName: 'Foco na Aposentadoria',
        replyTo: 'contato@foconaaposentadoria.com',
        autoReply: false
      },
      theme: {
        primaryColor: '#f97316',
        secondaryColor: '#1e293b',
        accentColor: '#fb923c',
        darkMode: true
      }
    });
  }

  saveSiteSettings(settings: SiteSettings): void {
    this.saveToStorage('siteSettings', settings);
    this.logActivity('site_settings_updated', 'Configurações do site atualizadas');
  }

  // Analytics Data
  getAnalyticsData(): AnalyticsData {
    // Simulate analytics data - in a real app this would come from a real analytics service
    return {
      pageViews: {
        total: 15420,
        thisMonth: 2847,
        lastMonth: 2156,
        growth: 32.1
      },
      visitors: {
        total: 8934,
        unique: 6521,
        returning: 2413,
        growth: 15.7
      },
      topPages: [
        { path: '/', title: 'Página Inicial', views: 5234 },
        { path: '/blog', title: 'Blog', views: 2891 },
        { path: '/servicos', title: 'Serviços', views: 1456 },
        { path: '/sobre', title: 'Sobre', views: 987 }
      ],
      topPosts: [
        { id: '1', title: 'Novidades na Aposentadoria em 2025', views: 1234, engagement: 78 },
        { id: '2', title: 'Aposentadoria Especial: Quem tem direito?', views: 987, engagement: 65 },
        { id: '3', title: 'Revisão da Vida Toda', views: 654, engagement: 72 }
      ],
      contactForms: {
        total: 245,
        thisMonth: 42,
        conversionRate: 12.5
      },
      deviceStats: {
        desktop: 45,
        mobile: 48,
        tablet: 7
      },
      trafficSources: [
        { source: 'Busca Orgânica', visitors: 3421, percentage: 45.2 },
        { source: 'Direto', visitors: 2103, percentage: 27.8 },
        { source: 'Redes Sociais', visitors: 1234, percentage: 16.3 },
        { source: 'Referências', visitors: 812, percentage: 10.7 }
      ]
    };
  }

  // Activity Logging
  getActivityLogs(): ActivityLog[] {
    return this.getFromStorage('activityLogs', []);
  }

  logActivity(action: string, details: string, targetId?: string): void {
    const user = JSON.parse(localStorage.getItem('adminUser') || '{}');
    const logs = this.getActivityLogs();
    
    const newLog: ActivityLog = {
      id: Date.now().toString(),
      userId: user.id || 'unknown',
      userName: user.name || 'Unknown User',
      action,
      target: action.split('_')[0],
      targetId,
      details,
      timestamp: new Date().toISOString(),
      ip: 'localhost', // In a real app, this would be the actual IP
      userAgent: navigator.userAgent
    };
    
    logs.unshift(newLog);
    // Keep only last 1000 logs
    if (logs.length > 1000) {
      logs.splice(1000);
    }
    
    this.saveToStorage('activityLogs', logs);
  }

  // Search functionality
  searchContent(query: string, types: string[] = ['posts', 'messages', 'team']): any[] {
    const results: any[] = [];
    const searchTerm = query.toLowerCase();

    if (types.includes('posts')) {
      const posts = this.getBlogPosts().filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm)
      );
      results.push(...posts.map(post => ({ ...post, type: 'post' })));
    }

    if (types.includes('messages')) {
      const messages = this.getMessages().filter(msg => 
        msg.name.toLowerCase().includes(searchTerm) ||
        msg.email.toLowerCase().includes(searchTerm) ||
        msg.subject.toLowerCase().includes(searchTerm) ||
        msg.message.toLowerCase().includes(searchTerm)
      );
      results.push(...messages.map(msg => ({ ...msg, type: 'message' })));
    }

    if (types.includes('team')) {
      const team = this.getTeamMembers().filter(member => 
        member.name.toLowerCase().includes(searchTerm) ||
        member.position.toLowerCase().includes(searchTerm) ||
        member.bio.toLowerCase().includes(searchTerm)
      );
      results.push(...team.map(member => ({ ...member, type: 'team' })));
    }

    return results;
  }

  // Export/Import functionality
  exportData(): string {
    const data = {
      blogPosts: this.getBlogPosts(),
      blogCategories: this.getBlogCategories(),
      messages: this.getMessages(),
      teamMembers: this.getTeamMembers(),
      mediaFiles: this.getMediaFiles(),
      siteSettings: this.getSiteSettings(),
      activityLogs: this.getActivityLogs(),
      exportDate: new Date().toISOString()
    };
    
    this.logActivity('data_exported', 'Dados exportados');
    return JSON.stringify(data, null, 2);
  }

  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.blogPosts) this.saveBlogPosts(data.blogPosts);
      if (data.blogCategories) this.saveBlogCategories(data.blogCategories);
      if (data.messages) this.saveMessages(data.messages);
      if (data.teamMembers) this.saveTeamMembers(data.teamMembers);
      if (data.mediaFiles) this.saveMediaFiles(data.mediaFiles);
      if (data.siteSettings) this.saveSiteSettings(data.siteSettings);
      
      this.logActivity('data_imported', 'Dados importados');
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }
}

export const dataService = new DataService();
