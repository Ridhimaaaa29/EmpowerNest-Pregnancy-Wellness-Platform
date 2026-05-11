import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setError('No verification token provided');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/api/users/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage('Email verified successfully! Redirecting to login...');
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setError(data.error || 'Verification failed');
        }
      } catch (err) {
        console.error('Verification error:', err);
        setError('An error occurred during verification');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Email Verification
          </h2>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Verifying your email...</p>
            </div>
          ) : message ? (
            <div className="bg-green-50 border border-green-200 rounded p-4">
              <p className="text-green-700">{message}</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded p-4">
              <p className="text-red-700">{error}</p>
              <button
                onClick={() => navigate('/signup')}
                className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
              >
                Back to Signup
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
