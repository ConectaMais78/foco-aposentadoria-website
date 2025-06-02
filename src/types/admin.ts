
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
  createdAt: string;
  lastLogin?: string;
  avatar?: string;
  permissions?: string[];
  status: 'active' | 'inactive' | 'pending';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  publishDate: string;
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  featuredImage?: string;
  category: string;
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
  viewCount?: number;
  readTime?: string;
  seoScore?: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  postCount: number;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  profileImage?: string;
  email?: string;
  phone?: string;
  specializations: string[];
  socialLinks: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
  order: number;
  status: 'active' | 'inactive';
  joinDate: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  assignedTo?: string;
  reply?: string;
  repliedAt?: string;
  repliedBy?: string;
  tags: string[];
  source: 'website' | 'email' | 'whatsapp' | 'phone';
}

export interface MediaFile {
  id: string;
  name: string;
  originalName: string;
  url: string;
  type: 'image' | 'video' | 'document' | 'audio';
  mimeType: string;
  size: number;
  altText?: string;
  caption?: string;
  uploadDate: string;
  uploadedBy: string;
  folder?: string;
  tags: string[];
  dimensions?: {
    width: number;
    height: number;
  };
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logo?: string;
  favicon?: string;
  email: string;
  phone: string;
  whatsapp?: string;
  address: string;
  businessHours: {
    [key: string]: {
      open: string;
      close: string;
      closed: boolean;
    };
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    twitter?: string;
  };
  maintenanceMode: boolean;
  seoSettings: {
    defaultMetaTitle: string;
    defaultMetaDescription: string;
    keywords: string[];
    googleAnalyticsId?: string;
    googleTagManagerId?: string;
    facebookPixelId?: string;
  };
  emailSettings: {
    fromEmail: string;
    fromName: string;
    replyTo: string;
    autoReply: boolean;
    autoReplyMessage?: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    darkMode: boolean;
  };
}

export interface AnalyticsData {
  pageViews: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    growth: number;
  };
  visitors: {
    total: number;
    unique: number;
    returning: number;
    growth: number;
  };
  topPages: Array<{
    path: string;
    views: number;
    title: string;
  }>;
  topPosts: Array<{
    id: string;
    title: string;
    views: number;
    engagement: number;
  }>;
  contactForms: {
    total: number;
    thisMonth: number;
    conversionRate: number;
  };
  deviceStats: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  trafficSources: Array<{
    source: string;
    visitors: number;
    percentage: number;
  }>;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  target: string;
  targetId?: string;
  details: string;
  timestamp: string;
  ip?: string;
  userAgent?: string;
}

export interface SystemStatus {
  status: 'healthy' | 'warning' | 'error';
  uptime: number;
  lastBackup?: string;
  storage: {
    used: number;
    total: number;
    percentage: number;
  };
  performance: {
    loadTime: number;
    responseTime: number;
  };
  security: {
    lastSecurityScan?: string;
    vulnerabilities: number;
    firewall: boolean;
  };
}
