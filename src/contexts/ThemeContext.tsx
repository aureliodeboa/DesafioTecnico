import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light'); // Valor inicial padrão

  useEffect(() => {
    // Verifica se há um tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Verifica a preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialTheme = (savedTheme as Theme) || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);

    // Atualiza a classe no documento HTML
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(initialTheme);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Salva o tema no localStorage
      localStorage.setItem('theme', theme);
      // Atualiza a classe no documento HTML
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};