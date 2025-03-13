
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  BarChart, 
  BookOpen, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Eye, 
  RotateCw,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for admin dashboard
const dashboardData = {
  totalNovels: 156,
  totalChapters: 2840,
  totalUsers: 1284,
  totalComments: 5647,
  
  recentNovels: [
    { id: 11, title: '玉剑神魔', author: '云深不知处', category: '仙侠', createTime: '2025-03-12' },
    { id: 12, title: '星际流浪', author: '黑洞之眼', category: '科幻', createTime: '2025-03-10' },
    { id: 13, title: '青春如歌', author: '夏日晴天', category: '青春', createTime: '2025-03-08' },
    { id: 14, title: '都市神医', author: '白大褂', category: '都市', createTime: '2025-03-07' },
    { id: 15, title: '魔法学院', author: '魔幻之眼', category: '奇幻', createTime: '2025-03-05' },
  ],
  
  recentUsers: [
    { id: 6, username: 'user6', email: 'user6@example.com', registerTime: '2025-03-14' },
    { id: 7, username: 'user7', email: 'user7@example.com', registerTime: '2025-03-13' },
    { id: 8, username: 'reader123', email: 'reader@example.com', registerTime: '2025-03-12' },
    { id: 9, username: 'bookworm', email: 'bookworm@example.com', registerTime: '2025-03-11' },
    { id: 10, username: 'novelFan', email: 'fan@example.com', registerTime: '2025-03-10' },
  ],

  recentComments: [
    { id: 12, username: 'user3', novelTitle: '斗破苍穹', content: '这本小说太精彩了！期待更新！', createTime: '2025-03-14' },
    { id: 13, username: 'user7', novelTitle: '盗墓笔记', content: '情节扣人心弦，欲罢不能。', createTime: '2025-03-13' },
    { id: 14, username: 'reader123', novelTitle: '何以笙箫默', content: '细腻的情感描写让人感动。', createTime: '2025-03-12' },
    { id: 15, username: 'bookworm', novelTitle: '斗破苍穹', content: '萧炎的成长很有代入感。', createTime: '2025-03-11' },
    { id: 16, username: 'novelFan', novelTitle: '三体', content: '科幻巨作，开阔视野。', createTime: '2025-03-10' },
  ],
  
  viewsData: [
    { date: '03-09', count: 2560 },
    { date: '03-10', count: 2780 },
    { date: '03-11', count: 3120 },
    { date: '03-12', count: 2980 },
    { date: '03-13', count: 3240 },
    { date: '03-14', count: 3580 },
    { date: '03-15', count: 4120 },
  ]
};

const AdminDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // 模拟数据加载
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">管理员仪表盘</h1>
          <p className="text-sm text-muted-foreground">
            最后更新: {new Date().toLocaleString('zh-CN')}
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <RotateCw className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            {/* 统计卡片 */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard 
                title="小说总数" 
                value={dashboardData.totalNovels} 
                icon={BookOpen} 
                description="所有已添加小说" 
                colorClass="bg-blue-50 text-blue-600"
              />
              <StatCard 
                title="章节总数" 
                value={dashboardData.totalChapters} 
                icon={FileIcon} 
                description="所有小说章节" 
                colorClass="bg-purple-50 text-purple-600"
              />
              <StatCard 
                title="用户总数" 
                value={dashboardData.totalUsers} 
                icon={Users} 
                description="注册用户数量" 
                colorClass="bg-green-50 text-green-600"
              />
              <StatCard 
                title="评论总数" 
                value={dashboardData.totalComments} 
                icon={MessageSquare} 
                description="用户评论互动" 
                colorClass="bg-amber-50 text-amber-600"
              />
            </div>
            
            {/* 图表和最近活动 */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">数据概览</TabsTrigger>
                <TabsTrigger value="novels">小说数据</TabsTrigger>
                <TabsTrigger value="users">用户数据</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  {/* 浏览量趋势图 */}
                  <Card className="lg:col-span-4">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        浏览量趋势
                      </CardTitle>
                      <CardDescription>最近7天网站访问量</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] flex items-end justify-between gap-2">
                        {dashboardData.viewsData.map((item, index) => (
                          <div key={index} className="relative flex flex-col items-center group">
                            <div className="absolute -top-7 text-xs opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white px-2 py-1 rounded">
                              {item.count}
                            </div>
                            <div 
                              className="w-8 bg-blue-500 rounded-t transition-all group-hover:bg-blue-600"
                              style={{ 
                                height: `${(item.count / 5000) * 200}px`,
                              }}
                            ></div>
                            <span className="text-xs mt-1">{item.date}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* 最近活动 */}
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        最近活动
                      </CardTitle>
                      <CardDescription>最新动态和更新</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { text: '新增小说《玉剑神魔》', time: '2小时前', icon: BookOpen },
                          { text: '用户"reader123"注册', time: '3小时前', icon: Users },
                          { text: '新增45条评论', time: '昨天', icon: MessageSquare },
                          { text: '更新了10个章节', time: '昨天', icon: FileIcon },
                          { text: '系统维护完成', time: '2天前', icon: Settings },
                        ].map((item, index) => (
                          <div key={index} className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              index === 0 ? 'bg-blue-100 text-blue-600' :
                              index === 1 ? 'bg-green-100 text-green-600' :
                              index === 2 ? 'bg-amber-100 text-amber-600' :
                              index === 3 ? 'bg-purple-100 text-purple-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              <item.icon className="h-4 w-4" />
                            </div>
                            <div className="ml-4 flex-1">
                              <p className="text-sm">{item.text}</p>
                              <p className="text-xs text-muted-foreground">{item.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="novels" className="grid gap-4 md:grid-cols-2">
                {/* 最近添加的小说 */}
                <Card>
                  <CardHeader>
                    <CardTitle>最近添加的小说</CardTitle>
                    <CardDescription>新添加的作品</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData.recentNovels.map((novel) => (
                        <div key={novel.id} className="flex items-center">
                          <div className="w-10 h-14 bg-gray-100 rounded flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <p className="font-medium">{novel.title}</p>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <span>{novel.author}</span>
                              <span className="mx-1">·</span>
                              <span>{novel.category}</span>
                              <span className="mx-1">·</span>
                              <span>{novel.createTime}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* 分类小说统计 */}
                <Card>
                  <CardHeader>
                    <CardTitle>小说分类统计</CardTitle>
                    <CardDescription>各类型小说分布</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { category: '玄幻', count: 42, percentage: 26 },
                        { category: '言情', count: 38, percentage: 24 },
                        { category: '悬疑', count: 25, percentage: 16 },
                        { category: '科幻', count: 20, percentage: 13 },
                        { category: '古代', count: 18, percentage: 12 },
                        { category: '其他', count: 13, percentage: 9 },
                      ].map((item, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{item.category}</span>
                            <span className="text-sm text-muted-foreground">{item.count}本 ({item.percentage}%)</span>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="users" className="grid gap-4 md:grid-cols-2">
                {/* 最近注册用户 */}
                <Card>
                  <CardHeader>
                    <CardTitle>最近注册用户</CardTitle>
                    <CardDescription>新注册的账号</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData.recentUsers.map((user) => (
                        <div key={user.id} className="flex items-center">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {user.username.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <p className="font-medium">{user.username}</p>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <span>{user.email || '未设置邮箱'}</span>
                              <span className="mx-1">·</span>
                              <span>{user.registerTime}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* 最近评论 */}
                <Card>
                  <CardHeader>
                    <CardTitle>最近评论</CardTitle>
                    <CardDescription>用户的最新评论</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData.recentComments.map((comment) => (
                        <div key={comment.id} className="space-y-1">
                          <div className="flex items-center">
                            <span className="font-medium">{comment.username}</span>
                            <span className="mx-1 text-muted-foreground">在</span>
                            <span className="font-medium">{comment.novelTitle}</span>
                          </div>
                          <p className="text-sm">{comment.content}</p>
                          <p className="text-xs text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {comment.createTime}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

// Missing FileIcon component
const FileIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

// Stat card component for dashboard
const StatCard: React.FC<{
  title: string;
  value: number;
  icon: React.FC<{ className?: string }>;
  description: string;
  colorClass: string;
}> = ({ title, value, icon: Icon, description, colorClass }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center">
          <div className={`p-2 rounded-lg ${colorClass}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-end gap-1">
              <h3 className="text-2xl font-bold">{value.toLocaleString()}</h3>
              <p className="text-xs text-muted-foreground mb-1">{description}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

// Missing Settings icon component
const Settings: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default AdminDashboard;
