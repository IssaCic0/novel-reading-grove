
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password || !confirmPassword) {
      toast.error('请填写所有必填字段');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('两次输入的密码不一致');
      return;
    }
    
    setIsLoading(true);
    
    // 模拟注册请求
    setTimeout(() => {
      // 假设注册成功
      toast.success('注册成功');
      navigate('/login');
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
          <h2 className="mt-4 text-xl font-semibold text-gray-900">创建新账户</h2>
          <p className="mt-2 text-sm text-gray-600">
            已有账户?{' '}
            <Link to="/login" className="text-novel-primary hover:underline">
              登录
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
              <Label htmlFor="email">邮箱 (选填)</Label>
              <Input
                id="email"
                type="email"
                placeholder="请输入邮箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="password">密码</Label>
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
            
            <div>
              <Label htmlFor="confirm-password">确认密码</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="请再次输入密码"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1"
                required
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="mr-2 h-4 w-4 border-2 border-t-transparent border-white border-solid rounded-full animate-spin"></div>
                注册中...
              </>
            ) : (
              '注册'
            )}
          </Button>
          
          <p className="text-xs text-gray-500 text-center">
            注册即表示您同意我们的{' '}
            <a href="#" className="text-novel-primary hover:underline">使用条款</a>{' '}
            和{' '}
            <a href="#" className="text-novel-primary hover:underline">隐私政策</a>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
