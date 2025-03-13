
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('请输入用户名和密码');
      return;
    }
    
    setIsLoading(true);
    
    // 模拟登录请求
    setTimeout(() => {
      // 假设登录成功
      toast.success('登录成功');
      navigate('/');
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-novel-primary">
            <BookOpen className="h-8 w-8" />
            <h1 className="text-2xl font-serif font-bold">悦读小说</h1>
          </Link>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">登录您的账户</h2>
          <p className="mt-2 text-sm text-gray-600">
            或{' '}
            <Link to="/register" className="text-novel-primary hover:underline">
              注册新账户
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="username">用户名</Label>
              <Input
                id="username"
                type="text"
                placeholder="请输入用户名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center">
                <Label htmlFor="password">密码</Label>
                <Link to="/forgot-password" className="text-sm text-novel-primary hover:underline">
                  忘记密码?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                required
              />
            </div>
            
            <div className="flex items-center">
              <Checkbox
                id="remember-me"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                记住我
              </label>
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="mr-2 h-4 w-4 border-2 border-t-transparent border-white border-solid rounded-full animate-spin"></div>
                登录中...
              </>
            ) : (
              '登录'
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
