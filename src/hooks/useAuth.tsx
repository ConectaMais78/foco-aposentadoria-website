
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
    // Função para verificar autenticação com timeout de segurança
    const checkAuth = async () => {
      try {
        console.log('Iniciando verificação de autenticação...');
        
        // Verificar se há um usuário logado no localStorage
        const savedUser = localStorage.getItem('adminUser');
        
        if (savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser);
            console.log('Usuário encontrado no localStorage:', parsedUser.email);
            
            // Verificar se o usuário é válido (simples validação)
            if (parsedUser.id && parsedUser.email && parsedUser.role) {
              setUser(parsedUser);
              console.log('Usuário autenticado com sucesso');
            } else {
              console.log('Dados de usuário inválidos, removendo do localStorage');
              localStorage.removeItem('adminUser');
            }
          } catch (error) {
            console.error('Erro ao parsear dados do usuário:', error);
            localStorage.removeItem('adminUser');
          }
        } else {
          console.log('Nenhum usuário encontrado no localStorage');
        }
      } catch (error) {
        console.error('Erro durante verificação de autenticação:', error);
      } finally {
        // Garantir que o loading seja finalizado após a verificação
        setTimeout(() => {
          setIsLoading(false);
          console.log('Verificação de autenticação concluída');
        }, 500); // Pequeno delay para evitar flash
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('Tentativa de login para:', email);
    
    // Simulação de autenticação - em produção, usar API real
    const mockUsers: User[] = [
      {
        id: '1',
        email: 'pnilson93@gmail.com',
        name: 'Administrador',
        role: 'admin',
        createdAt: new Date().toISOString(),
        status: 'active'
      },
      {
        id: '2',
        email: 'editor@foconaaposentadoria.com',
        name: 'Editor',
        role: 'editor',
        createdAt: new Date().toISOString(),
        status: 'active'
      }
    ];

    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'Sevilla2018') {
      const userWithLogin = { ...foundUser, lastLogin: new Date().toISOString() };
      setUser(userWithLogin);
      localStorage.setItem('adminUser', JSON.stringify(userWithLogin));
      console.log('Login realizado com sucesso para:', email);
      return true;
    }
    
    console.log('Falha no login para:', email);
    return false;
  };

  const logout = () => {
    console.log('Logout realizado');
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
