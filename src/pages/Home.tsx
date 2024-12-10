import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light') return false;
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <ThemeButton onClick={() => setIsDark(!isDark)} aria-label="Toggle theme">
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </ThemeButton>
  );
};

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { session } = useAuth();

  return (
    <Container>
      <Header>
        <Logo>Robynn</Logo>
        <NavActions>
          <ThemeToggle />
          {!session ? (
            <LoginButton onClick={() => navigate('/login')}>
              Login
            </LoginButton>
          ) : (
            <LoginButton onClick={() => navigate('/dashboard')}>
              Dashboard
            </LoginButton>
          )}
        </NavActions>
      </Header>

      <MainContent>
        <Shapes>
          <OrangeCircle />
          <BlueCircle />
          <GreenCircle />
          <PurpleSemiCircle />
          <GreenSemiCircle />
          <OrangeTriangle />
          <BlueTriangle />
        </Shapes>

        <HeroText>
          <span style={{ position: 'relative' }}>
            <BuildArrowShape>
              <svg width="200" height="80" viewBox="0 0 200 80">
                <g>
                  <circle cx="20" cy="40" r="18" fill="none" stroke="black" strokeWidth="3"/>
                  <line x1="40" y1="40" x2="120" y2="40" stroke="black" strokeWidth="3"/>
                  <circle cx="160" cy="40" r="40" fill="#ff6b35"/>
                  <path d="M140 40 L180 40 L160 20" stroke="black" strokeWidth="3" fill="none"/>
                </g>
              </svg>
            </BuildArrowShape>
            growth.
          </span>
          <span>engineered.</span>
          <span>your very own personal </span>
          <UnderlinedSpan>
            agentic CMO <GearIcon>⚙️</GearIcon>
            <Underline />
          </UnderlinedSpan>
        </HeroText>

        <Description>
          Robynn is a marketing platform built by marketers for marketers.
        </Description>

        <ActionButton onClick={() => navigate('/login')}>
          Get Started ↓
        </ActionButton>

        <YellowSliderShape>
          <svg width="300" height="100" viewBox="0 0 300 100">
            <g>
              <rect width="300" height="80" rx="40" fill="#fbbc05"/>
              <circle cx="100" cy="40" r="25" fill="#ff6b35"/>
              <circle cx="250" cy="40" r="30" fill="white"/>
              <line x1="40" y1="40" x2="80" y2="40" stroke="black" strokeWidth="3" strokeDasharray="6 6"/>
            </g>
          </svg>
        </YellowSliderShape>
      </MainContent>
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #fff5f2 0%, #fff7f7 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }

  &.dark {
    background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
    color: #f3f4f6;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  position: relative;
  z-index: 10;
  
  @media (min-width: 768px) {
    padding: 1rem 2rem;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  
  .dark & {
    color: #f3f4f6;
  }
`;

const NavActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ThemeButton = styled.button`
  padding: 0.5rem;
  background: #f0f0f0;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: #e0e0e0;
  }

  .dark & {
    background: #374151;
    color: #f3f4f6;

    &:hover {
      background: #4b5563;
    }
  }
`;

const LoginButton = styled.button`
  padding: 0.5rem 1rem;
  background: #1a1a1a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: #333;
  }

  .dark & {
    background: #f3f4f6;
    color: #111827;

    &:hover {
      background: #e5e7eb;
    }
  }
`;

const ActionButton = styled.button`
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background: #1a1a1a;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  font-weight: 500;
  position: relative;
  z-index: 3;
  
  @media (min-width: 768px) {
    font-size: 1rem;
  }
  
  &:hover {
    background: #333;
  }

  .dark & {
    background: #f3f4f6;
    color: #111827;

    &:hover {
      background: #e5e7eb;
    }
  }
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  position: relative;
  z-index: 2;
  
  @media (min-width: 768px) {
    padding: 4rem 2rem;
  }
`;

const HeroText = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  color: #1a1a1a;
  margin: 0;
  position: relative;
  z-index: 3;
  padding-left: 180px;
  
  span {
    display: block;
  }
  
  @media (min-width: 768px) {
    font-size: 5rem;
    padding-left: 220px;
  }
  
  @media (min-width: 1024px) {
    font-size: 7rem;
    padding-left: 260px;
  }

  .dark & {
    color: #f3f4f6;
  }
`;

const Description = styled.p`
  margin-top: 2rem;
  font-size: 1rem;
  max-width: 400px;
  color: #4a4a4a;
  position: relative;
  z-index: 3;
  
  @media (min-width: 768px) {
    font-size: 1.1rem;
  }

  .dark & {
    color: #d1d5db;
  }
`;

const Shapes = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.5;
  
  @media (min-width: 768px) {
    opacity: 0.7;
  }

  .dark & {
    opacity: 0.3;
    
    @media (min-width: 768px) {
      opacity: 0.4;
    }
  }
`;

const OrangeCircle = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background: #ff6b35;
  border-radius: 50%;
  right: 15%;
  top: 10%;
  
  @media (min-width: 768px) {
    width: 50px;
    height: 50px;
    right: 20%;
    top: 12%;
  }
  
  @media (min-width: 1024px) {
    width: 60px;
    height: 60px;
    right: 25%;
    top: 15%;
  }
`;

const BlueCircle = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background: #4285f4;
  border-radius: 50%;
  right: 25%;
  top: 20%;
  
  @media (min-width: 768px) {
    width: 35px;
    height: 35px;
    right: 30%;
    top: 22%;
  }
  
  @media (min-width: 1024px) {
    width: 40px;
    height: 40px;
    right: 35%;
    top: 25%;
  }
`;

const GreenCircle = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background: #34a853;
  border-radius: 50%;
  right: 20%;
  top: 35%;
`;

const PurpleSemiCircle = styled.div`
  position: absolute;
  width: 80px;
  height: 40px;
  background: #a142f4;
  border-radius: 40px 40px 0 0;
  right: 15%;
  top: 45%;
  transform: rotate(-15deg);
`;

const GreenSemiCircle = styled.div`
  position: absolute;
  width: 80px;
  height: 40px;
  background: #34a853;
  border-radius: 40px 40px 0 0;
  right: 40%;
  top: 55%;
  transform: rotate(15deg);
`;

const OrangeTriangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 52px solid #ff6b35;
  right: 30%;
  bottom: 25%;
`;

const BlueTriangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 52px solid #4285f4;
  right: 15%;
  bottom: 35%;
  transform: rotate(-15deg);
`;

const YellowSliderShape = styled.div`
  position: absolute;
  right: 20px;
  top: 200px;
  z-index: 1;
  width: 200px;
  height: 67px;
  
  @media (min-width: 768px) {
    right: 60px;
    top: 250px;
    width: 250px;
    height: 84px;
    z-index: 10;
  }
  
  @media (min-width: 1024px) {
    right: 100px;
    top: 300px;
    width: 300px;
    height: 100px;
  }
`;

const UnderlinedSpan = styled.span`
  position: relative;
  display: inline-block;
`;

const Underline = styled.div`
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100px;
  height: 3px;
  background-color: #000;

  .dark & {
    background-color: #f3f4f6;
  }
`;

const BuildArrowShape = styled.div`
  position: absolute;
  left: -180px;
  top: 80px;
  z-index: 1;
  width: 120px;
  height: 48px;
  
  @media (min-width: 768px) {
    width: 160px;
    height: 64px;
    left: -220px;
    top: 100px;
  }
  
  @media (min-width: 1024px) {
    width: 200px;
    height: 80px;
    left: -260px;
    top: 120px;
  }

  .dark & {
    svg {
      stroke: #f3f4f6;
      
      circle, line, path {
        stroke: #f3f4f6;
      }
      
      circle[fill="#ff6b35"] {
        fill: #ff6b35;
      }
    }
  }
`;

const GearIcon = styled.span`
  display: inline-block;
  margin-left: 1rem;
`;