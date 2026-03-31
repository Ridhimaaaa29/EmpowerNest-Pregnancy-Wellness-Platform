import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Alert, AlertDescription } from '../components/ui/alert';
import Navigation from '@/components/Navigation';
import { authService } from '@/services/api';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    dateOfBirth: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validate inputs
      if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim() || 
          !formData.confirmPassword.trim() || !formData.phoneNumber.trim() || !formData.dateOfBirth.trim()) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      // Validate password match
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }

      // Validate password strength (at least 6 characters)
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        setLoading(false);
        return;
      }

      // Call signup API
      const response = await authService.signup(
        formData.email,
        formData.password,
        formData.confirmPassword,
        formData.name,
        formData.phoneNumber,
        formData.dateOfBirth
      );
      
      setSuccess('Signup successful! Redirecting...');
      
      // Redirect to tracker page after 1.5 seconds
      setTimeout(() => {
        navigate('/tracker');
      }, 1500);
      
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Navigation />
      <div className="max-w-md w-full space-y-8 p-10 bg-card rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-center text-3xl font-extrabold text-primary">Sign Up</h2>
        
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert>
            <AlertDescription className="text-green-600">{success}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="name" className="sr-only">Full Name</label>
            <Input 
              id="name" 
              name="name" 
              type="text" 
              autoComplete="name" 
              required 
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          
          <div>
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <Input 
              id="email-address" 
              name="email" 
              type="email" 
              autoComplete="email" 
              required 
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="phone" className="sr-only">Phone Number</label>
            <Input 
              id="phone" 
              name="phoneNumber" 
              type="tel" 
              autoComplete="tel" 
              required 
              placeholder="Phone Number (e.g., +1234567890)"
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="dob" className="sr-only">Date of Birth</label>
            <Input 
              id="dob" 
              name="dateOfBirth" 
              type="date" 
              required 
              placeholder="Date of Birth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              autoComplete="new-password" 
              required 
              placeholder="Password (min 6 characters)"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
            <Input 
              id="confirm-password" 
              name="confirmPassword" 
              type="password" 
              autoComplete="new-password" 
              required 
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;