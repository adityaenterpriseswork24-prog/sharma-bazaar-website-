'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, UserAccount } from '@/types';
import { auth, isFirebaseConfigured } from './firebase/client';
import { onAuthStateChanged, signOut as firebaseSignOut, signInWithEmailAndPassword } from 'firebase/auth';

interface AuthContextType {
  user: UserAccount | null;
  loading: boolean;
  login: (email: string, pass: string, demoRole?: UserRole) => Promise<boolean>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  isShopManager: boolean;
  isFirebaseActive: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => false,
  logout: async () => {},
  isAdmin: false,
  isShopManager: false,
  isFirebaseActive: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper to set cookie
  const setSessionCookie = (account: UserAccount | null) => {
    if (typeof document === 'undefined') return;
    if (account) {
      document.cookie = `sharma_admin_session=${encodeURIComponent(
        JSON.stringify(account)
      )}; path=/; max-age=604800; SameSite=Lax`;
    } else {
      document.cookie = 'sharma_admin_session=; path=/; max-age=0; SameSite=Lax';
    }
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sharma_admin_session');
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        setSessionCookie(parsed);
      }
    } catch {
      localStorage.removeItem('sharma_admin_session');
      setSessionCookie(null);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string, demoRole?: UserRole): Promise<boolean> => {
    setLoading(true);
    try {
      // Authenticate directly via authoritative server endpoint with rate limiting & password verification
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password: pass.trim(),
          role: demoRole,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.user) {
        setUser(data.user);
        localStorage.setItem('sharma_admin_session', JSON.stringify(data.user));
        setSessionCookie(data.user);
        setLoading(false);
        return true;
      } else {
        console.warn('Authentication rejected:', data.error || 'Invalid credentials');
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
    } catch {
      // ignore
    }
    if (isFirebaseConfigured && auth) {
      try {
        await firebaseSignOut(auth);
      } catch (e) {
        console.error('Sign out error:', e);
      }
    }
    setUser(null);
    localStorage.removeItem('sharma_admin_session');
    setSessionCookie(null);
  };

  const isAdmin = user?.role === 'admin';
  const isShopManager = user?.role === 'shop_manager';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAdmin,
        isShopManager,
        isFirebaseActive: isFirebaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
