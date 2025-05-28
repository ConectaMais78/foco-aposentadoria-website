
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/admin';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  hasPermission: (action: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um usuário logado no localStorage
    const savedUser = localStorage.getItem('adminUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulação de autenticação - em produção, usar API real
    const mockUsers: User[] = [
      {
        id: '1',
        email: 'admin@foconaaposentadoria.com',
        name: 'Administrador',
        role: 'admin',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        email: 'editor@foconaaposentadoria.com',
        name: 'Editor',
        role: 'editor',
        createdAt: new Date().toISOString(),
      }
    ];

    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'admin123') {
      const userWithLogin = { ...foundUser, lastLogin: new Date().toISOString() };
      setUser(userWithLogin);
      localStorage.setItem('adminUser', JSON.stringify(userWithLogin));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
  };

  const hasPermission = (action: string): boolean => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    
    // Permissões específicas para editores
    const editorPermissions = ['blog:read', 'blog:write', 'media:read', 'media:write'];
    return editorPermissions.includes(action);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
