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

    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          const account: UserAccount = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || 'Showroom Staff',
            role: firebaseUser.email?.includes('admin') ? 'admin' : 'shop_manager',
            createdAt: new Date().toISOString(),
          };
          setUser(account);
          localStorage.setItem('sharma_admin_session', JSON.stringify(account));
          setSessionCookie(account);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string, demoRole?: UserRole): Promise<boolean> => {
    setLoading(true);
    try {
      if (isFirebaseConfigured && auth) {
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        const fbUser = userCredential.user;
        const account: UserAccount = {
          uid: fbUser.uid,
          email: fbUser.email || email,
          name: fbUser.displayName || 'Showroom Staff',
          role: email.toLowerCase().includes('admin') ? 'admin' : 'shop_manager',
          createdAt: new Date().toISOString(),
        };
        setUser(account);
        localStorage.setItem('sharma_admin_session', JSON.stringify(account));
        setSessionCookie(account);
        setLoading(false);
        return true;
      } else {
        const role: UserRole =
          demoRole || (email.toLowerCase().includes('manager') ? 'shop_manager' : 'admin');
        const account: UserAccount = {
          uid: `staff-${Date.now()}`,
          email: email || (role === 'admin' ? 'adityaenterprises.work24@gmail.com' : 'manager@sharmabazaar.com'),
          name: role === 'admin' ? 'Aditya Enterprises (Administrator)' : 'Showroom Manager',
          role,
          createdAt: new Date().toISOString(),
          isEmailVerified: true,
        };
        setUser(account);
        localStorage.setItem('sharma_admin_session', JSON.stringify(account));
        setSessionCookie(account);
        setLoading(false);
        return true;
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setLoading(false);
      return false;
    }
  };

  const logout = async () => {
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
