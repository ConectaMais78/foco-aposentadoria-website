
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { dataService } from '@/services/dataService';
import { BlogPost, ContactMessage, TeamMember, SiteSettings, AnalyticsData } from '@/types/admin';

interface AdminContextType {
  // Blog Management
  blogPosts: BlogPost[];
  setBlogPosts: (posts: BlogPost[]) => void;
  refreshBlogPosts: () => void;
  
  // Messages Management
  messages: ContactMessage[];
  setMessages: (messages: ContactMessage[]) => void;
  refreshMessages: () => void;
  unreadCount: number;
  
  // Team Management
  teamMembers: TeamMember[];
  setTeamMembers: (members: TeamMember[]) => void;
  refreshTeamMembers: () => void;
  
  // Site Settings
  siteSettings: SiteSettings;
  setSiteSettings: (settings: SiteSettings) => void;
  
  // Analytics
  analyticsData: AnalyticsData;
  refreshAnalytics: () => void;
  
  // Global state
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Utility functions
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [blogPosts, setBlogPostsState] = useState<BlogPost[]>([]);
  const [messages, setMessagesState] = useState<ContactMessage[]>([]);
  const [teamMembers, setTeamMembersState] = useState<TeamMember[]>([]);
  const [siteSettings, setSiteSettingsState] = useState<SiteSettings>({} as SiteSettings);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({} as AnalyticsData);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Calculate unread messages count
  const unreadCount = messages.filter(msg => msg.status === 'unread').length;

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        setBlogPostsState(dataService.getBlogPosts());
        setMessagesState(dataService.getMessages());
        setTeamMembersState(dataService.getTeamMembers());
        setSiteSettingsState(dataService.getSiteSettings());
        setAnalyticsData(dataService.getAnalyticsData());
      } catch (error) {
        console.error('Error loading admin data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Refresh functions
  const refreshBlogPosts = () => {
    setBlogPostsState(dataService.getBlogPosts());
  };

  const refreshMessages = () => {
    setMessagesState(dataService.getMessages());
  };

  const refreshTeamMembers = () => {
    setTeamMembersState(dataService.getTeamMembers());
  };

  const refreshAnalytics = () => {
    setAnalyticsData(dataService.getAnalyticsData());
  };

  // State setters that also save to storage
  const setBlogPosts = (posts: BlogPost[]) => {
    setBlogPostsState(posts);
    dataService.saveBlogPosts(posts);
  };

  const setMessages = (msgs: ContactMessage[]) => {
    setMessagesState(msgs);
    dataService.saveMessages(msgs);
  };

  const setTeamMembers = (members: TeamMember[]) => {
    setTeamMembersState(members);
    dataService.saveTeamMembers(members);
  };

  const setSiteSettings = (settings: SiteSettings) => {
    setSiteSettingsState(settings);
    dataService.saveSiteSettings(settings);
  };

  // Notification system (could be enhanced with a toast library)
  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    console.log(`[${type.toUpperCase()}] ${message}`);
    // In a real app, this would show a toast notification
  };

  const value: AdminContextType = {
    blogPosts,
    setBlogPosts,
    refreshBlogPosts,
    messages,
    setMessages,
    refreshMessages,
    unreadCount,
    teamMembers,
    setTeamMembers,
    refreshTeamMembers,
    siteSettings,
    setSiteSettings,
    analyticsData,
    refreshAnalytics,
    isLoading,
    searchQuery,
    setSearchQuery,
    showNotification
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};
