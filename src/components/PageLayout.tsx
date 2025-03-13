
import React from 'react';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  fullWidth?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  className = '',
  hideNavbar = false,
  hideFooter = false,
  fullWidth = false
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />}
      <motion.main 
        className={`flex-grow ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {fullWidth ? children : (
          <div className="container">
            {children}
          </div>
        )}
      </motion.main>
      {!hideFooter && (
        <footer className="border-t py-6 md:py-8">
          <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
            <p className="text-center text-sm leading-loose text-muted-foreground">
              © 2024 悦读小说. 所有权利保留.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:underline">关于我们</a>
              <a href="#" className="hover:underline">使用条款</a>
              <a href="#" className="hover:underline">隐私政策</a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default PageLayout;
