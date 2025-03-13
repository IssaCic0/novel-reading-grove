import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, Clock, User, Settings, History, Heart, Eye, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import ImageUpload from '@/components/ImageUpload';

// Mock reading history data
const readingHistory = [
  { id: 1, novel: { id: 1, title: '斗破苍穹', chapter: '第二章 幽魂的出现' }, progress: '75%', lastRead: '2025-03-05 20:10:00' },
  { id: 2, novel: { id: 2, title: '盗墓笔记', chapter: '第一章 吴邪的探险' }, progress: '30%', lastRead: '2025-03-04 15:30:00' },
  { id: 3, novel: { id: 3, title: '何以笙箫默', chapter: '第二章 爱情的纠葛' }, progress: '100%', lastRead: '2025-03-03 18:20:00' },
];

// Mock collections data
const collections = [
  { id: 1, title: '斗破苍穹', author: '天蚕土豆', coverImage: '/placeholder.svg' },
  { id: 2, title: '盗墓笔记', author: '南派三叔', coverImage: '/placeholder.svg' },
];

const UserProfile: React.FC = () => {
  const [user, setUser] = useState({
    username: '读者一号',
    email: 'reader@example.com',
    avatar: '/placeholder.svg',
    joinDate: '2025-01-15',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleAvatarUpload = (imageUrl: string) => {
    setUser({ ...user, avatar: imageUrl });
    // TODO: 在实际项目中，这里应该调用API保存头像URL
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 模拟API调用
    setTimeout(() => {
      toast.success('个人信息已更新');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <PageLayout>
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <Avatar className="h-24 w-24 border-2 border-primary/20">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  <AvatarFallback className="text-2xl">{user.username[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-2xl font-bold">{user.username}</h1>
                  <p className="text-muted-foreground">
                    加入于 {new Date(user.joinDate).toLocaleDateString('zh-CN')}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>收藏 {collections.length}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <History className="h-4 w-4 text-muted-foreground" />
                      <span>历史 {readingHistory.length}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4 text-muted-foreground" />
                      <span>评论 12</span>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  设置
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="history">
            <TabsList className="w-full grid grid-cols-3 mb-8">
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                阅读历史
              </TabsTrigger>
              <TabsTrigger value="collections" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                我的收藏
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                账户信息
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>阅读历史</CardTitle>
                  <CardDescription>您最近阅读的小说</CardDescription>
                </CardHeader>
                <CardContent>
                  {readingHistory.length > 0 ? (
                    <div className="space-y-4">
                      {readingHistory.map((item) => (
                        <div key={item.id} className="flex items-center justify-between border-b pb-4">
                          <div className="flex-1">
                            <Link to={`/novel/${item.novel.id}`} className="font-medium hover:text-primary">
                              {item.novel.title}
                            </Link>
                            <div className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                              <span>{item.novel.chapter}</span>
                              <Badge variant="outline" className="ml-2">{item.progress}</Badge>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(item.lastRead).toLocaleDateString('zh-CN')}
                          </div>
                          <Button variant="ghost" size="sm" className="ml-4">
                            <Eye className="h-4 w-4 mr-2" />
                            继续阅读
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      您还没有阅读历史
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="collections">
              <Card>
                <CardHeader>
                  <CardTitle>收藏的小说</CardTitle>
                  <CardDescription>您收藏的小说列表</CardDescription>
                </CardHeader>
                <CardContent>
                  {collections.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {collections.map((novel) => (
                        <Link 
                          key={novel.id} 
                          to={`/novel/${novel.id}`}
                          className="flex items-center gap-4 p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                        >
                          <div className="w-12 h-16 bg-muted overflow-hidden rounded">
                            <img src={novel.coverImage} alt={novel.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{novel.title}</h3>
                            <p className="text-sm text-muted-foreground">{novel.author}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      您还没有收藏小说
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>账户信息</CardTitle>
                  <CardDescription>更新您的个人信息</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveChanges} className="space-y-6">
                    <div className="flex justify-center mb-6">
                      <ImageUpload
                        onImageUpload={handleAvatarUpload}
                        currentImage={user.avatar}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">用户名</Label>
                      <Input
                        id="username"
                        value={user.username}
                        onChange={(e) =>
                          setUser({ ...user, username: e.target.value })
                        }
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">电子邮箱</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
                      />
                    </div>
                    
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? '保存中...' : '保存更改'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default UserProfile;
