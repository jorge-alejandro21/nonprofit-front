import { ReactNode } from 'react';
import { useAuth } from '@contexts/AuthContext';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="layout">
      <Header />
      <div className="layout-body">
        {isAuthenticated && <Sidebar />}
        <main className={`main-content ${isAuthenticated ? 'with-sidebar' : ''}`}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

