import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Example Component Test
 * Tests a login form component with user interactions
 */

// Mock component for demonstration
const LoginForm = ({ onLogin }: { onLogin: (email: string, password: string) => Promise<void> }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await onLogin(email, password);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        data-testid="email-input"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        data-testid="password-input"
      />
      <button type="submit" disabled={loading} data-testid="submit-btn">
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <div data-testid="error-msg">{error}</div>}
    </form>
  );
};

describe('LoginForm Component', () => {
  it('should render login form with email and password inputs', () => {
    const mockLogin = vi.fn();
    render(<LoginForm onLogin={mockLogin} />);
    
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
  });

  it('should call onLogin with email and password on form submission', async () => {
    const user = userEvent.setup();
    const mockLogin = vi.fn().mockResolvedValue(undefined);
    
    render(<LoginForm onLogin={mockLogin} />);
    
    await user.type(screen.getByTestId('email-input'), 'test@example.com');
    await user.type(screen.getByTestId('password-input'), 'password123');
    await user.click(screen.getByTestId('submit-btn'));
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('should show loading state during submission', async () => {
    const user = userEvent.setup();
    const mockLogin = vi.fn(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    render(<LoginForm onLogin={mockLogin} />);
    
    await user.type(screen.getByTestId('email-input'), 'test@example.com');
    await user.type(screen.getByTestId('password-input'), 'password123');
    await user.click(screen.getByTestId('submit-btn'));
    
    expect(screen.getByTestId('submit-btn')).toHaveTextContent('Logging in...');
    expect(screen.getByTestId('submit-btn')).toBeDisabled();
  });

  it('should display error message on login failure', async () => {
    const user = userEvent.setup();
    const mockLogin = vi.fn().mockRejectedValue(new Error('Invalid credentials'));
    
    render(<LoginForm onLogin={mockLogin} />);
    
    await user.type(screen.getByTestId('email-input'), 'test@example.com');
    await user.type(screen.getByTestId('password-input'), 'wrongpassword');
    await user.click(screen.getByTestId('submit-btn'));
    
    await waitFor(() => {
      expect(screen.getByTestId('error-msg')).toHaveTextContent('Invalid credentials');
    });
  });
});
