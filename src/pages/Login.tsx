import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await signInWithGoogle();
    } catch (err) {
      setError('Failed to sign in with Google');
    }
  };

  return (
    <Container>
      <LoginCard>
        <Title>Sign in to your account</Title>
        
        <GoogleButton onClick={handleGoogleSignIn} disabled={isLoading}>
          <GoogleIcon src="/google-icon.svg" alt="Google" />
          Continue with Google
        </GoogleButton>

        <Divider>Or continue with email</Divider>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </SubmitButton>
        </Form>

        <SignUpText>
          Don't have an account?{' '}
          <SignUpLink onClick={() => navigate('/signup')}>
            Sign up
          </SignUpLink>
        </SignUpText>
      </LoginCard>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(135deg, #fff5f2 0%, #fff7f7 100%);
`;

const LoginCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
`;

const SubmitButton = styled.button`
  background: #1a1a1a;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #333;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

const GoogleButton = styled(SubmitButton)`
  background: white;
  color: #1a1a1a;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  &:hover {
    background: #f9fafb;
  }
`;

const GoogleIcon = styled.img`
  width: 18px;
  height: 18px;
`;

const Divider = styled.div`
  text-align: center;
  margin: 1rem 0;
  font-size: 0.875rem;
  color: #6b7280;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background: #e5e7eb;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const SignUpText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: #4b5563;
`;

const SignUpLink = styled.span`
  color: #3b82f6;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`; 