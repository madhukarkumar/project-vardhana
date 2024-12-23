import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { session } = useAuth();

  return (
    <Container>
      <Header>
        <Logo>Robynn</Logo>
        <NavActions>
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

        <ButtonWrapper>
          <ShimmerButton onClick={() => navigate('/login')}>
            Get Started
          </ShimmerButton>
        </ButtonWrapper>

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
  padding: 0.5rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #fff5f2 0%, #fff7f7 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
  
  @media (min-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  position: relative;
  z-index: 10;
  
  @media (min-width: 768px) {
    padding: 0.75rem 1.5rem;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
`;

const NavActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const BaseShimmerButton = styled.button`
  position: relative;
  padding: 0.75rem 2rem;
  background: linear-gradient(
    to right,
    #1a1a1a,
    #333
  );
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  overflow: hidden;
  transform: translateZ(0);
  transition: all 0.2s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0.2) 80%,
      transparent
    );
    opacity: 0;
    transition: opacity 0.2s ease;
    transform: translateX(-100%) skewX(-15deg);
  }

  &:hover {
    background: linear-gradient(
      to right,
      #333,
      #404040
    );
  }

  &:hover::before {
    opacity: 1;
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%) skewX(-15deg);
    }
    100% {
      transform: translateX(200%) skewX(-15deg);
    }
  }
`;

const LoginButton = styled(BaseShimmerButton)`
  font-size: 0.875rem;
  padding: 0.5rem 1.5rem;
  z-index: 10;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const ShimmerButton = styled(BaseShimmerButton)`
  font-size: 0.875rem;
  z-index: 10;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  
  @media (min-width: 480px) {
    font-size: 1rem;
  }
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  position: relative;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (min-width: 768px) {
    padding: 2rem;
    min-height: calc(100vh - 100px);
  }
`;

const HeroText = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.1;
  color: #1a1a1a;
  margin: 0;
  position: relative;
  z-index: 10;
  padding-left: 20px;
  
  span {
    display: block;
  }
  
  @media (min-width: 480px) {
    font-size: 3rem;
    padding-left: 100px;
  }
  
  @media (min-width: 768px) {
    font-size: 5rem;
    padding-left: 180px;
  }
  
  @media (min-width: 1024px) {
    font-size: 6.5rem;
    padding-left: 220px;
  }
`;

const Description = styled.p`
  margin-top: 1.5rem;
  font-size: 0.875rem;
  max-width: 300px;
  color: #4a4a4a;
  position: relative;
  z-index: 10;
  padding-left: 20px;
  
  @media (min-width: 480px) {
    padding-left: 100px;
    font-size: 1rem;
    max-width: 350px;
  }
  
  @media (min-width: 768px) {
    padding-left: 180px;
    font-size: 1.1rem;
    max-width: 400px;
    margin-top: 2rem;
  }
`;

const Shapes = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.5;
  
  @media (min-width: 768px) {
    opacity: 0.7;
  }
`;

const OrangeCircle = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background: #ff6b35;
  border-radius: 50%;
  right: 10%;
  top: 10%;
  
  @media (min-width: 768px) {
    width: 50px;
    height: 50px;
    right: 25%;
    top: 10%;
  }
  
  @media (min-width: 1024px) {
    width: 60px;
    height: 60px;
    right: 30%;
    top: 10%;
  }
`;

const BlueCircle = styled.div`
  position: absolute;
  width: 25px;
  height: 25px;
  background: #4285f4;
  border-radius: 50%;
  right: 80%;
  top: 25%;
  
  @media (min-width: 768px) {
    width: 35px;
    height: 35px;
    right: 45%;
    top: 30%;
  }
  
  @media (min-width: 1024px) {
    width: 40px;
    height: 40px;
    right: 90%;
    top: 35%;
  }
`;

const GreenCircle = styled.div`
  position: absolute;
  width: 35px;
  height: 35px;
  background: #34a853;
  border-radius: 50%;
  right: 15%;
  top: 40%;
  
  @media (min-width: 768px) {
    width: 45px;
    height: 45px;
    right: 20%;
    top: 45%;
  }
`;

const PurpleSemiCircle = styled.div`
  position: absolute;
  width: 60px;
  height: 30px;
  background: #a142f4;
  border-radius: 30px 30px 0 0;
  right: 20%;
  top: 50%;
  transform: rotate(-15deg);
  
  @media (min-width: 768px) {
    width: 80px;
    height: 40px;
    right: 10%;
    top: 55%;
  }
`;

const GreenSemiCircle = styled.div`
  position: absolute;
  width: 60px;
  height: 30px;
  background: #34a853;
  border-radius: 30px 30px 0 0;
  right: 5%;
  top: 60%;
  transform: rotate(15deg);
  
  @media (min-width: 768px) {
    width: 80px;
    height: 40px;
    right: 10%;
    top: 65%;
  }
`;

const OrangeTriangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 35px solid #ff6b35;
  right: 40%;
  bottom: 30%;
  
  @media (min-width: 768px) {
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 52px solid #ff6b35;
    right: 35%;
    bottom: 25%;
  }
`;

const BlueTriangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 35px solid #4285f4;
  right: 1%;
  bottom: 40%;
  transform: rotate(-15deg);
  
  @media (min-width: 768px) {
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 52px solid #4285f4;
    right: 1%;
    bottom: 35%;
  }
`;

const YellowSliderShape = styled.div`
  position: absolute;
  right: 5%;
  top: 70%;
  z-index: 1;
  width: 150px;
  height: 50px;
  transform: scale(0.8);
  
  @media (min-width: 768px) {
    right: 10%;
    top: 75%;
    width: 250px;
    height: 84px;
    transform: scale(0.9);
  }
  
  @media (min-width: 1024px) {
    right: 15%;
    top: 80%;
    width: 300px;
    height: 100px;
    transform: scale(1);
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
`;

const BuildArrowShape = styled.div`
  position: absolute;
  left: -10px;
  top: 60px;
  z-index: 10;
  width: 80px;
  height: 32px;
  transform: scale(0.7);
  
  @media (min-width: 480px) {
    left: -80px;
    width: 120px;
    height: 48px;
    transform: scale(0.8);
  }
  
  @media (min-width: 768px) {
    width: 160px;
    height: 64px;
    left: -160px;
    top: 80px;
    transform: scale(0.9);
  }
  
  @media (min-width: 1024px) {
    width: 200px;
    height: 80px;
    left: -200px;
    top: 100px;
    transform: scale(1);
  }
`;

const GearIcon = styled.span`
  display: inline-block;
  margin-left: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  padding-left: 20px;
  margin-top: 2rem;
  
  @media (min-width: 480px) {
    padding-left: 100px;
  }
  
  @media (min-width: 768px) {
    padding-left: 180px;
  }
`;