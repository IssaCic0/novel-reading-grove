
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  ChevronRight, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  File
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if the user is authenticated as admin
  useEffect(() => {
    const isAdmin = localStorage.getItem('adminAuth') === 'true';
    if (!isAdmin) {
      toast.error('请先登录管理员账号');
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast.success('已退出管理员登录');
    navigate('/admin/login');
  };
  
  const menuItems = [
    { path: '/admin/dashboard', label: '仪表盘', icon: LayoutDashboard },
    { path: '/admin/novels', label: '小说管理', icon: BookOpen },
    { path: '/admin/chapters', label: '章节管理', icon: File },
    { path: '/admin/users', label: '用户管理', icon: Users },
    { path: '/admin/comments', label: '评论管理', icon: MessageSquare },
    { path: '/admin/settings', label: '系统设置', icon: Settings },
  ];
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile Sidebar Toggle */}
      <div className="bg-white p-4 flex items-center justify-between md:hidden">
        <Link to="/admin/dashboard" className="font-bold text-lg text-novel-primary flex items-center">
          <ShieldCheck className="h-6 w-6 mr-2" />
          悦读小说管理后台
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden"
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Sidebar */}
      <motion.div 
        className={`${
          isSidebarOpen ? 'block' : 'hidden'
        } md:block bg-white w-full md:w-64 shadow-sm flex-shrink-0 h-screen md:sticky top-0`}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 border-b hidden md:flex items-center">
          <Link to="/admin/dashboard" className="font-bold text-lg text-novel-primary flex items-center">
            <ShieldCheck className="h-6 w-6 mr-2" />
            悦读小说管理后台
          </Link>
        </div>
        
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="p-4">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                  {location.pathname === item.path && (
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  )}
                </Link>
              ))}
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-sm rounded-md text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-3" />
                退出登录
              </button>
            </nav>
          </div>
        </ScrollArea>
      </motion.div>
      
      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        <div className="p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

// Missing ShieldCheck icon component
const ShieldCheck: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default AdminLayout;
