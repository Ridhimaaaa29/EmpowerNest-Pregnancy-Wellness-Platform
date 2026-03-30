import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import Navigation from '@/components/Navigation';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
        <Navigation />
      <div className="max-w-md w-full space-y-8 p-10 bg-card rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-primary">Login</h2>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <Input id="email-address" name="email" type="email" autoComplete="email" required placeholder="Email address" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <Input id="password" name="password" type="password" autoComplete="current-password" required placeholder="Password" />
            </div>
          </div>
          <div>
            <Link to='/'>
            <Button type="submit" className="w-full">Login</Button>
            </Link>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;