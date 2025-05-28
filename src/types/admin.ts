
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
  createdAt: string;
  lastLogin?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  publishDate: string;
  status: 'draft' | 'published' | 'scheduled';
  featuredImage?: string;
  category: string;
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  profileImage?: string;
  socialLinks: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
  };
  order: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'unread' | 'read' | 'archived';
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: number;
  altText?: string;
  uploadDate: string;
}

export interface SiteSettings {
  siteName: string;
  logo?: string;
  favicon?: string;
  email: string;
  phone: string;
  address: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  maintenanceMode: boolean;
  seoSettings: {
    defaultMetaTitle: string;
    defaultMetaDescription: string;
    keywords: string[];
  };
}
