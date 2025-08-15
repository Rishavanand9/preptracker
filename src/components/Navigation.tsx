import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Home, Info, Settings, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const NavContainer = styled.nav`
  background-color: var(--card);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(8px);
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;
`;

const NavItem = styled.li``;

const NavLinkStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.25rem;
  color: var(--muted-foreground);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  border-bottom: 2px solid transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:hover {
    color: var(--foreground);
    background-color: var(--muted);
  }

  &.active {
    color: var(--blue-600);
    border-bottom-color: var(--blue-600);
    background-color: var(--blue-50);
  }

  svg {
    width: 1.125rem;
    height: 1.125rem;
  }
`;

const ThemeToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--input);
  background-color: var(--card);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-left: auto;

  &:hover {
    background-color: var(--muted);
    border-color: var(--blue-400);
    transform: translateY(-1px);
  }
`;

const NavHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
`;

const NavTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--blue-600);
  margin: 0;
`;

function Navigation() {
  const { theme, toggleTheme } = useTheme();

  return (
    <NavContainer>
      <NavContent>
        <NavHeader>
          <NavTitle>Google Prep Tracker</NavTitle>
          <ThemeToggleButton onClick={toggleTheme}>
            {theme === 'light' ? (
              <Moon size={16} />
            ) : (
              <Sun size={16} />
            )}
          </ThemeToggleButton>
        </NavHeader>
        
        <NavList>
          <NavItem>
            <NavLinkStyled to="/home" end>
              <Home size={16} />
              Home
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/about">
              <Info size={16} />
              About
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/settings">
              <Settings size={16} />
              Settings
            </NavLinkStyled>
          </NavItem>
        </NavList>
      </NavContent>
    </NavContainer>
  );
}

export default Navigation;
