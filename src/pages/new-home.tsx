import React from 'react';
import styled from 'styled-components';

const NewHome = () => {
  return (
    <Container>
      <Header>
        <Logo>DSM.</Logo>
        <NavIcons>
          <SearchIcon aria-label="Search">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </SearchIcon>
          <MenuIcon aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </MenuIcon>
        </NavIcons>
      </Header>

      <MainContent>
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
          <span>build</span>
          <span>beautiful</span>
          <span>product</span>
          <UnderlinedSpan>
            faster <GearIcon>⚙️</GearIcon>
            <Underline />
          </UnderlinedSpan>
        </HeroText>

        <Description>
          DSM is an <OpenSourceLink>[ open source ]</OpenSourceLink> project that celebrates internal and external contributions *
        </Description>

        <DownloadButton>
          Download ↓
        </DownloadButton>

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
`;

const NavIcons = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const SearchIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #1a1a1a;
`;

const MenuIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #1a1a1a;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  position: relative;
  
  @media (min-width: 768px) {
    padding: 4rem 2rem;
  }
`;

const HeroSection = styled.div`
  position: relative;
  z-index: 2;
`;

const BuildArrowShape = styled.div`
  position: absolute;
  left: 0;
  top: 50px;
  z-index: 1;
  width: 120px;
  height: 48px;
  
  @media (min-width: 768px) {
    width: 160px;
    height: 64px;
    z-index: 10;
  }
  
  @media (min-width: 1024px) {
    width: 200px;
    height: 80px;
  }
`;

const HeroText = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  color: #1a1a1a;
  margin: 0;
  position: relative;
  z-index: 2;
  
  span {
    display: block;
  }
  
  @media (min-width: 768px) {
    font-size: 5rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 7rem;
  }
`;

const WordWithIcon = styled.span`
  display: flex !important;
  align-items: center;
  gap: 1rem;
`;

const ArrowIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #ff6b35;
  border-radius: 50%;
`;

const GearIcon = styled.span`
  display: inline-block;
  margin-left: 1rem;
`;

const Description = styled.p`
  margin-top: 2rem;
  font-size: 1rem;
  max-width: 400px;
  color: #4a4a4a;
  position: relative;
  z-index: 2;
  
  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const OpenSourceLink = styled.span`
  color: #4CAF50;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const DownloadButton = styled.button`
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
  z-index: 2;
  
  @media (min-width: 768px) {
    font-size: 1rem;
  }
  
  &:hover {
    background: #333;
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
    opacity: 1;
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
  width: 100px;  // Adjust width as needed
  height: 3px;
  background-color: #000;
`;

export default NewHome; 