'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '@/src/lib/api/auth-api';
import { useRouter } from 'next/navigation';

// Define User interface based on what backend returns
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  phone?: string;
  birthDate?: string;
  profile_picture_url?: string;
  // add other fields if likely returned
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await authApi.getMe();
        // Result structure: { message: "OK", data: user }
        if (result && result.data) {
          setUser(result.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        // 401 or fail
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (data: { email: string; password: string }) => {
    // Setup: backend sets cookie. We just need user data.
    const res = await authApi.login(data);
    // res structure: { message: "Login successful", data: { user, token } }
    if (res.data && res.data.user) {
      setUser(res.data.user);
      setIsAuthenticated(true);
      window.location.assign('/'); // User requirement
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.error('Logout failed', err);
    }
    setUser(null);
    setIsAuthenticated(false);
    // User requirement: Navbar re-renders public. If on protected route, redirects.
    // For now we just clear state. Protected routes should handle redirect.
    router.refresh();
    // Usually redirect to login or home. User flow 4.4 mentions "kembali ke navbar publik".
    // If they were on dashboard, they should be redirected.
    // Ideally we redirect to /login or /
    router.push('/auth/login');
  };

  const updateUser = (userData: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...userData } : null));
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
