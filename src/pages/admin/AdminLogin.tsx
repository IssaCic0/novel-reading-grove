
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('请输入管理员账号和密码');
      return;
    }
    
    setIsLoading(true);
    
    // 模拟登录请求 - 在实际应用中应连接到后端API
    setTimeout(() => {
      // 假设管理员账号为 admin，密码为 admin123
      if (username === 'admin' && password === 'admin123') {
        // 登录成功
        toast.success('管理员登录成功');
        // 设置管理员登录状态
        localStorage.setItem('adminAuth', 'true');
        // 跳转到管理后台
        navigate('/admin/dashboard');
      } else {
        // 登录失败
        toast.error('管理员账号或密码错误');
      }
      setIsLoading(false);
    }, 1000);
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
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full">
            <ShieldCheck className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">管理员登录</h2>
          <p className="mt-2 text-sm text-gray-600">
            请输入管理员账号和密码进入系统后台
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="admin-username">管理员账号</Label>
              <Input
                id="admin-username"
                type="text"
                placeholder="请输入管理员账号"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="admin-password">管理员密码</Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="请输入管理员密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                required
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="mr-2 h-4 w-4 border-2 border-t-transparent border-white border-solid rounded-full animate-spin"></div>
                登录中...
              </>
            ) : (
              '管理员登录'
            )}
          </Button>
          
          <div className="text-center">
            <p className="text-xs text-gray-500">
              提示: 管理员账号 admin, 密码 admin123
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
