
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, BookOpen, Home, BarChart2, Clock, Sun, Moon } from "lucide-react";
import { useTheme } from "@/ThemeProvider";

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl font-serif font-bold text-novel-primary transition-colors hover:text-novel-primary/80"
          >
            <BookOpen className="h-6 w-6" />
            <span className="hidden sm:inline-block">悦读小说</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm mx-6">
            <Link to="/" className="font-medium text-muted-foreground transition-colors hover:text-foreground flex items-center gap-1">
              <Home className="h-4 w-4" />
              首页
            </Link>
            <Link to="/categories" className="font-medium text-muted-foreground transition-colors hover:text-foreground">
              分类
            </Link>
            <Link to="/ranking" className="font-medium text-muted-foreground transition-colors hover:text-foreground flex items-center gap-1">
              <BarChart2 className="h-4 w-4" />
              排行榜
            </Link>
            <Link to="/latest" className="font-medium text-muted-foreground transition-colors hover:text-foreground flex items-center gap-1">
              <Clock className="h-4 w-4" />
              最新更新
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative hidden sm:flex items-center">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索小说..."
              className="w-56 rounded-full bg-background pl-8 md:w-80 lg:w-96"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground" 
              onClick={toggleTheme}
              aria-label={theme === 'light' ? '切换到暗色模式' : '切换到亮色模式'}
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            
            <Button variant="ghost" size="icon" className="text-muted-foreground md:hidden" aria-label="搜索">
              <Search className="h-5 w-5" />
            </Button>
            
            <Link to="/profile">
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline-block">我的账户</span>
              </Button>
            </Link>
            
            <Link to="/login">
              <Button variant="ghost" size="sm" className="gap-2">
                <span className="hidden sm:inline-block">登录</span>
              </Button>
            </Link>
            
            <Link to="/register">
              <Button size="sm" className="hidden sm:flex">注册</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
