import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { User, Mail, Phone, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface AuthModalProps {
  trigger: React.ReactNode;
}

const GoogleButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div className="space-y-3">
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">or</span>
      </div>
    </div>
    <Button type="button" variant="outline" className="w-full" onClick={onClick}>
      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M21.35 11.1H12v2.98h5.35c-.23 1.4-1.66 4.1-5.35 4.1-3.22 0-5.85-2.67-5.85-5.96S8.78 6.26 12 6.26c1.83 0 3.06.78 3.76 1.45l2.57-2.47C16.7 3.72 14.56 2.8 12 2.8 6.92 2.8 2.8 6.92 2.8 12s4.12 9.2 9.2 9.2c5.31 0 8.83-3.73 8.83-8.99 0-.6-.07-1.06-.15-1.51z" />
      </svg>
      Continue with Google
    </Button>
  </div>
);

export const AuthModal: React.FC<AuthModalProps> = ({ trigger }) => {
  const { login, signup, signInWithGoogle, resetPassword, isLoading } = useAuth();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginData.email, loginData.password);
    if (success) {
      setOpen(false);
      setLoginData({ email: '', password: '' });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signup(
      signupData.name,
      signupData.email,
      signupData.password,
      signupData.phone
    );
    if (success) {
      setOpen(false);
      setSignupData({ name: '', email: '', password: '', phone: '' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to ShopSmart</DialogTitle>
          <DialogDescription>
            Sign in to your account or create a new one to start shopping.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="text-center">
              <button
                type="button"
                className="text-sm text-primary hover:underline"
                onClick={async () => {
                  if (!loginData.email) {
                    toast({ title: 'Enter your email', description: 'Type your email above, then tap "Forgot password?" again.' });
                    return;
                  }
                  await resetPassword(loginData.email);
                }}
              >
                Forgot password?
              </button>
            </div>
            <GoogleButton onClick={signInWithGoogle} />
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-phone"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={signupData.phone}
                    onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password (min 6 chars)"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
            <GoogleButton onClick={signInWithGoogle} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};