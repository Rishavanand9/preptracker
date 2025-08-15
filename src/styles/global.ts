import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    /* Light theme variables */
    --background: #ffffff;
    --foreground: #0f172a;
    --card: #ffffff;
    --card-foreground: #0f172a;
    --popover: #ffffff;
    --popover-foreground: #0f172a;
    --primary: #3b82f6;
    --primary-foreground: #ffffff;
    --secondary: #f1f5f9;
    --secondary-foreground: #0f172a;
    --muted: #f8fafc;
    --muted-foreground: #64748b;
    --accent: #f1f5f9;
    --accent-foreground: #0f172a;
    --destructive: #ef4444;
    --destructive-foreground: #ffffff;
    --border: #e2e8f0;
    --input: #e2e8f0;
    --ring: #3b82f6;
    --radius: 0.5rem;
    
    /* Color palette */
    --blue-50: #eff6ff;
    --blue-100: #dbeafe;
    --blue-200: #bfdbfe;
    --blue-400: #60a5fa;
    --blue-600: #2563eb;
    --blue-700: #1d4ed8;
    
    --green-50: #f0fdf4;
    --green-100: #dcfce7;
    --green-200: #bbf7d0;
    --green-600: #16a34a;
    
    --red-50: #fef2f2;
    --red-100: #fee2e2;
    --red-200: #fecaca;
    --red-600: #dc2626;
    --red-700: #b91c1c;
    
    --gray-50: #f8fafc;
    --gray-100: #f1f5f9;
    --gray-200: #e2e8f0;
    --gray-400: #94a3b8;
    --gray-600: #475569;
    --gray-700: #334155;
    --gray-800: #1e293b;
    --gray-900: #0f172a;
  }

  [data-theme="dark"] {
    --background: #0f172a;
    --foreground: #f8fafc;
    --card: #1e293b;
    --card-foreground: #f8fafc;
    --popover: #1e293b;
    --popover-foreground: #f8fafc;
    --primary: #3b82f6;
    --primary-foreground: #ffffff;
    --secondary: #1e293b;
    --secondary-foreground: #f8fafc;
    --muted: #1e293b;
    --muted-foreground: #64748b;
    --accent: #1e293b;
    --accent-foreground: #f8fafc;
    --destructive: #ef4444;
    --destructive-foreground: #ffffff;
    --border: #334155;
    --input: #334155;
    --ring: #3b82f6;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--background);
    color: var(--foreground);
    transition: all 0.2s ease;
  }

  /* Animations */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes shimmer {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
`;

export const commonStyles = {
  container: `
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  `,
  
  button: `
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 600;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    border: 2px solid;
    border-radius: 0.75rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    position: relative;
    overflow: hidden;
  `,
  
  card: `
    background-color: var(--card);
    border: 1px solid var(--border);
    border-radius: 1rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  `,
  
  input: `
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid var(--input);
    border-radius: 0.75rem;
    background-color: var(--card);
    color: var(--foreground);
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px var(--ring);
      border-color: var(--blue-600);
    }
    
    &:hover {
      border-color: var(--blue-400);
    }
  `
};
