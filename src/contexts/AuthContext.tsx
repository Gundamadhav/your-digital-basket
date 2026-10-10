import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';
import { toast } from '@/hooks/use-toast';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  joinDate: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  signInWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadUser = useCallback(async (session: Session | null) => {
    if (!session?.user) {
      setUser(null);
      return;
    }
    const authUser = session.user;
    const meta = authUser.user_metadata || {};
    const base: User = {
      id: authUser.id,
      email: authUser.email || '',
      name: meta.name || meta.full_name || (authUser.email || '').split('@')[0],
      phone: meta.phone,
      joinDate: authUser.created_at,
    };
    setUser(base);

    const { data } = await supabase
      .from('profiles')
      .select('name, phone, address')
      .eq('id', authUser.id)
      .maybeSingle();
    if (data) {
      setUser({
        ...base,
        name: data.name || base.name,
        phone: data.phone ?? base.phone,
        address: data.address ?? undefined,
      });
    }
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // Defer DB calls out of the auth callback
      setTimeout(() => loadUser(session), 0);
    });
    supabase.auth.getSession().then(({ data: { session } }) => loadUser(session));
    return () => subscription.unsubscribe();
  }, [loadUser]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setIsLoading(false);
    if (error) {
      toast({
        title: 'Login failed',
        description:
          error.message === 'Email not confirmed'
            ? 'Please confirm your email first — check your inbox for the link.'
            : error.message === 'Invalid login credentials'
            ? 'Wrong email or password. Please try again.'
            : error.message,
        variant: 'destructive',
      });
      return false;
    }
    toast({ title: 'Login successful', description: 'Welcome back to ShopSmart!' });
    return true;
  };

  const signup = async (name: string, email: string, password: string, phone?: string): Promise<boolean> => {
    if (password.length < 6) {
      toast({ title: 'Password too short', description: 'Use at least 6 characters.', variant: 'destructive' });
      return false;
    }
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { name, phone: phone || null },
      },
    });
    setIsLoading(false);
    if (error) {
      toast({ title: 'Sign up failed', description: error.message, variant: 'destructive' });
      return false;
    }
    if (!data.session) {
      toast({
        title: 'Check your email',
        description: `We sent a confirmation link to ${email}. Click it to activate your account.`,
      });
    } else {
      toast({ title: 'Account created', description: `Welcome to ShopSmart, ${name}!` });
    }
    return true;
  };

  const signInWithGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth('google', {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast({ title: 'Google sign-in failed', description: String(result.error.message || result.error), variant: 'destructive' });
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      toast({ title: 'Could not send reset link', description: error.message, variant: 'destructive' });
      return false;
    }
    toast({ title: 'Reset link sent', description: `Check ${email} for a link to set a new password.` });
    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    toast({ title: 'Logged out', description: 'You have been successfully logged out.' });
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        name: updates.name ?? user.name,
        phone: updates.phone ?? user.phone ?? null,
        address: updates.address ?? user.address ?? null,
      });
    if (error) {
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
      return;
    }
    setUser({ ...user, ...updates, email: user.email });
    toast({ title: 'Profile updated', description: 'Your profile has been saved.' });
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, signInWithGoogle, resetPassword, logout, updateProfile, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
