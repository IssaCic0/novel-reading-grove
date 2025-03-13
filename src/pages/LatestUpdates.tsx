
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Filter, BookOpen, RotateCw } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for latest updates
const latestUpdates = [
  {
    id: 1,
    novelId: 1,
    novelTitle: '斗破苍穹',
    author: '天蚕土豆',
    chapterId: 24,
    chapterTitle: '第二十四章 突飞猛进',
    category: '玄幻',
    updateTime: '2025-03-15 09:30:00'
  },
  {
    id: 2,
    novelId: 2,
    novelTitle: '盗墓笔记',
    author: '南派三叔',
    chapterId: 18,
    chapterTitle: '第十八章 古墓深处',
    category: '悬疑',
    updateTime: '2025-03-15 08:45:00'
  },
  {
    id: 3,
    novelId: 3,
    novelTitle: '何以笙箫默',
    author: '顾漫',
    chapterId: 15,
    chapterTitle: '第十五章 重逢',
    category: '言情',
    updateTime: '2025-03-15 07:20:00'
  },
  {
    id: 4,
    novelId: 6,
    novelTitle: '三体',
    author: '刘慈欣',
    chapterId: 12,
    chapterTitle: '第十二章 宇宙文明',
    category: '科幻',
    updateTime: '2025-03-14 23:15:00'
  },
  {
    id: 5,
    novelId: 5,
    novelTitle: '庆余年',
    author: '猫腻',
    chapterId: 20,
    chapterTitle: '第二十章 北齐之行',
    category: '古代',
    updateTime: '2025-03-14 22:40:00'
  },
  {
    id: 6,
    novelId: 7,
    novelTitle: '琅琊榜',
    author: '海宴',
    chapterId: 16,
    chapterTitle: '第十六章 金殿对峙',
    category: '古代',
    updateTime: '2025-03-14 20:10:00'
  },
  {
    id: 7,
    novelId: 4,
    novelTitle: '诛仙',
    author: '萧鼎',
    chapterId: 14,
    chapterTitle: '第十四章 青云门',
    category: '仙侠',
    updateTime: '2025-03-14 18:30:00'
  },
  {
    id: 8,
    novelId: 8,
    novelTitle: '鬼吹灯',
    author: '天下霸唱',
    chapterId: 10,
    chapterTitle: '第十章 粽子洞',
    category: '悬疑',
    updateTime: '2025-03-14 16:45:00'
  },
  {
    id: 9,
    novelId: 10,
    novelTitle: '全职高手',
    author: '蝴蝶蓝',
    chapterId: 22,
    chapterTitle: '第二十二章 荣耀之战',
    category: '竞技',
    updateTime: '2025-03-14 15:20:00'
  },
  {
    id: 10,
    novelId: 9,
    novelTitle: '完美世界',
    author: '辰东',
    chapterId: 19,
    chapterTitle: '第十九章 石村奇遇',
    category: '玄幻',
    updateTime: '2025-03-14 14:10:00'
  },
  {
    id: 11,
    novelId: 1,
    novelTitle: '斗破苍穹',
    author: '天蚕土豆',
    chapterId: 23,
    chapterTitle: '第二十三章 修炼突破',
    category: '玄幻',
    updateTime: '2025-03-14 12:30:00'
  },
  {
    id: 12,
    novelId: 2,
    novelTitle: '盗墓笔记',
    author: '南派三叔',
    chapterId: 17,
    chapterTitle: '第十七章 诡异纸条',
    category: '悬疑',
    updateTime: '2025-03-14 10:45:00'
  },
];

const categories = ['全部', '玄幻', '悬疑', '言情', '古代', '科幻', '仙侠', '竞技'];

const timeRanges = [
  { value: 'all', label: '全部时间' },
  { value: 'today', label: '今天' },
  { value: '3days', label: '三天内' },
  { value: 'week', label: '一周内' },
  { value: 'month', label: '一个月内' },
];

const LatestUpdates: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredUpdates, setFilteredUpdates] = useState(latestUpdates);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedTime, setSelectedTime] = useState('all');
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    let filtered = [...latestUpdates];
    
    // Filter by category
    if (selectedCategory !== '全部') {
      filtered = filtered.filter(update => update.category === selectedCategory);
    }
    
    // Filter by time
    const now = new Date();
    
    if (selectedTime !== 'all') {
      let cutoffDate = new Date();
      
      switch(selectedTime) {
        case 'today':
          cutoffDate.setHours(0, 0, 0, 0);
          break;
        case '3days':
          cutoffDate.setDate(now.getDate() - 3);
          break;
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
      }
      
      filtered = filtered.filter(update => new Date(update.updateTime) >= cutoffDate);
    }
    
    setFilteredUpdates(filtered);
  }, [selectedCategory, selectedTime]);
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 60) {
      return `${diffMins}分钟前`;
    } else if (diffHours < 24) {
      return `${diffHours}小时前`;
    } else if (diffDays < 3) {
      return `${diffDays}天前`;
    } else {
      return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    }
  };
  
  return (
    <PageLayout>
      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">最新更新</h1>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                <Select 
                  value={selectedCategory} 
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-28 md:w-32">
                    <SelectValue placeholder="分类" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <Select 
                  value={selectedTime} 
                  onValueChange={setSelectedTime}
                >
                  <SelectTrigger className="w-32 md:w-36">
                    <SelectValue placeholder="时间范围" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeRanges.map(range => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <RotateCw className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
              {filteredUpdates.length > 0 ? (
                filteredUpdates.map((update, index) => (
                  <motion.div
                    key={update.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-grow">
                      <div className="flex items-center">
                        <Link 
                          to={`/novel/${update.novelId}`}
                          className="text-lg font-medium hover:text-novel-primary transition-colors"
                        >
                          {update.novelTitle}
                        </Link>
                        <span className="mx-2 text-muted-foreground">·</span>
                        <Link 
                          to={`/novel/${update.novelId}/chapter/${update.chapterId}`}
                          className="text-lg hover:text-novel-primary transition-colors"
                        >
                          {update.chapterTitle}
                        </Link>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground mt-2">
                        <span>{update.author}</span>
                        <span className="mx-2">·</span>
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{update.category}</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      {formatTime(update.updateTime)}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="py-20 text-center text-muted-foreground">
                  <Filter className="mx-auto h-10 w-10 mb-4 text-gray-300" />
                  <p>没有符合筛选条件的更新</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSelectedCategory('全部');
                      setSelectedTime('all');
                    }}
                  >
                    重置筛选
                  </Button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default LatestUpdates;
