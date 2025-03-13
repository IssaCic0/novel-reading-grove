
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Users as UsersIcon, 
  Search, 
  Plus, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Shield,
  RotateCw, 
  Mail,
  Phone,
  Clock,
  User
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from "@/components/ui/badge";

// Mock data for users
const usersData = [
  { id: 1, username: 'user1', email: 'user1@example.com', phone: '1234567890', registerTime: '2025-03-11 19:56:32', lastLoginTime: '2025-03-10 15:30:00' },
  { id: 2, username: 'user2', email: 'user2@example.com', phone: '0987654321', registerTime: '2025-03-11 19:56:32', lastLoginTime: null },
  { id: 3, username: 'user3', email: 'user3@example.com', phone: null, registerTime: '2025-03-11 19:56:32', lastLoginTime: '2025-03-10 16:00:00' },
  { id: 4, username: 'user4', email: null, phone: '1122334455', registerTime: '2025-03-11 19:56:32', lastLoginTime: null },
  { id: 5, username: 'user5', email: 'user5@example.com', phone: '2233445566', registerTime: '2025-03-11 19:56:32', lastLoginTime: '2025-03-10 17:00:00' },
];

const Users: React.FC = () => {
  const [users, setUsers] = useState(usersData);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Handle search function
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setUsers(usersData);
      return;
    }
    
    const filtered = usersData.filter(user => 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.phone && user.phone.includes(searchTerm))
    );
    setUsers(filtered);
  };
  
  // Handle add/edit user
  const handleSaveUser = () => {
    if (!editingUser.username) {
      toast.error('用户名不能为空');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (editingUser.id) {
        // Update existing user
        setUsers(users.map(user => 
          user.id === editingUser.id ? editingUser : user
        ));
        toast.success('用户信息已更新');
      } else {
        // Add new user
        const newUser = {
          ...editingUser,
          id: Math.max(...users.map(u => u.id)) + 1,
          registerTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
          lastLoginTime: null
        };
        setUsers([...users, newUser]);
        toast.success('用户已添加成功');
      }
      
      setIsLoading(false);
      setIsDialogOpen(false);
      setEditingUser(null);
    }, 800);
  };
  
  // Handle delete user
  const handleDeleteUser = (id: number) => {
    if (confirm('确定要删除这个用户吗？此操作不可撤销，用户的所有数据将一并删除。')) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setUsers(users.filter(user => user.id !== id));
        setIsLoading(false);
        toast.success('用户已删除');
      }, 800);
    }
  };
  
  // Handle open add/edit dialog
  const openUserDialog = (user = null) => {
    setEditingUser(user || { 
      username: '', 
      password: '', 
      email: '', 
      phone: ''
    });
    setIsDialogOpen(true);
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <UsersIcon className="h-6 w-6" />
            用户管理
          </h1>
          
          <Button onClick={() => openUserDialog()} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            添加用户
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>用户列表</CardTitle>
            <CardDescription>管理系统中的所有注册用户</CardDescription>
            
            <div className="flex mt-4 gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="搜索用户名、邮箱或手机..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button variant="outline" onClick={handleSearch}>搜索</Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-10">
                <RotateCw className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">ID</TableHead>
                      <TableHead>用户名</TableHead>
                      <TableHead>邮箱</TableHead>
                      <TableHead>手机</TableHead>
                      <TableHead>注册时间</TableHead>
                      <TableHead>上次登录</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                          暂无用户数据
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                                {user.username.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-medium">{user.username}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {user.email ? (
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Mail className="h-3.5 w-3.5" />
                                {user.email}
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-sm">未设置</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {user.phone ? (
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Phone className="h-3.5 w-3.5" />
                                {user.phone}
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-sm">未设置</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-3.5 w-3.5" />
                              {user.registerTime}
                            </div>
                          </TableCell>
                          <TableCell>
                            {user.lastLoginTime ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                {user.lastLoginTime}
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-gray-50 text-gray-500 hover:bg-gray-50">
                                未登录
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">操作菜单</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openUserDialog(user)}>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  编辑
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => handleDeleteUser(user.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  删除
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Add/Edit User Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingUser?.id ? '编辑用户' : '添加用户'}</DialogTitle>
              <DialogDescription>
                {editingUser?.id 
                  ? '修改用户信息，点击保存提交更改。'
                  : '添加新的用户到系统，填写以下信息。'
                }
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  用户名
                </Label>
                <Input
                  id="username"
                  placeholder="请输入用户名"
                  className="col-span-3"
                  value={editingUser?.username || ''}
                  onChange={(e) => setEditingUser({...editingUser, username: e.target.value})}
                />
              </div>
              
              {!editingUser?.id && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    密码
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="请输入密码"
                    className="col-span-3"
                    value={editingUser?.password || ''}
                    onChange={(e) => setEditingUser({...editingUser, password: e.target.value})}
                  />
                </div>
              )}
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  邮箱
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="请输入邮箱"
                  className="col-span-3"
                  value={editingUser?.email || ''}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  手机
                </Label>
                <Input
                  id="phone"
                  placeholder="请输入手机号"
                  className="col-span-3"
                  value={editingUser?.phone || ''}
                  onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                取消
              </Button>
              <Button type="submit" onClick={handleSaveUser} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                    保存中...
                  </>
                ) : (
                  '保存'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default Users;
