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

  useEffect(() => {
    const stored = localStorage.getItem('sharma_admin_session');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('sharma_admin_session');
      }
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
        setLoading(false);
        return true;
      } else {
        const role: UserRole = demoRole || (email.toLowerCase().includes('manager') ? 'shop_manager' : 'admin');
        const account: UserAccount = {
          uid: `staff-${Date.now()}`,
          email,
          name: role === 'admin' ? 'Senior Administrator' : 'Showroom Manager',
          role,
          createdAt: new Date().toISOString(),
        };
        setUser(account);
        localStorage.setItem('sharma_admin_session', JSON.stringify(account));
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
