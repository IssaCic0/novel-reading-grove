
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, BookOpen, Users, Star, TrendingUp, RotateCw } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for rankings
const popularNovels = [
  {
    id: 1,
    title: '斗破苍穹',
    author: '天蚕土豆',
    category: '玄幻',
    readCount: 1245678,
    rating: 4.9,
  },
  {
    id: 2,
    title: '盗墓笔记',
    author: '南派三叔',
    category: '悬疑',
    readCount: 987543,
    rating: 4.8,
  },
  {
    id: 3,
    title: '何以笙箫默',
    author: '顾漫',
    category: '言情',
    readCount: 876512,
    rating: 4.7,
  },
  // Add more novels for a more complete list
  {
    id: 4,
    title: '诛仙',
    author: '萧鼎',
    category: '仙侠',
    readCount: 754123,
    rating: 4.6,
  },
  {
    id: 5,
    title: '庆余年',
    author: '猫腻',
    category: '古代',
    readCount: 698745,
    rating: 4.8,
  },
  {
    id: 6,
    title: '三体',
    author: '刘慈欣',
    category: '科幻',
    readCount: 645982,
    rating: 4.9,
  },
  {
    id: 7,
    title: '琅琊榜',
    author: '海宴',
    category: '古代',
    readCount: 587412,
    rating: 4.8,
  },
  {
    id: 8,
    title: '鬼吹灯',
    author: '天下霸唱',
    category: '悬疑',
    readCount: 534126,
    rating: 4.7,
  },
  {
    id: 9,
    title: '完美世界',
    author: '辰东',
    category: '玄幻',
    readCount: 486532,
    rating: 4.6,
  },
  {
    id: 10,
    title: '全职高手',
    author: '蝴蝶蓝',
    category: '竞技',
    readCount: 423568,
    rating: 4.8,
  },
];

const collectedNovels = [
  {
    id: 3,
    title: '何以笙箫默',
    author: '顾漫',
    category: '言情',
    collectionCount: 85421,
    rating: 4.7,
  },
  {
    id: 1,
    title: '斗破苍穹',
    author: '天蚕土豆',
    category: '玄幻',
    collectionCount: 78965,
    rating: 4.9,
  },
  // More novels
  {
    id: 2,
    title: '盗墓笔记',
    author: '南派三叔',
    category: '悬疑',
    collectionCount: 76234,
    rating: 4.8,
  },
  {
    id: 6,
    title: '三体',
    author: '刘慈欣',
    category: '科幻',
    collectionCount: 65478,
    rating: 4.9,
  },
  {
    id: 5,
    title: '庆余年',
    author: '猫腻',
    category: '古代',
    collectionCount: 58741,
    rating: 4.8,
  },
  {
    id: 7,
    title: '琅琊榜',
    author: '海宴',
    category: '古代',
    collectionCount: 51423,
    rating: 4.8,
  },
  {
    id: 4,
    title: '诛仙',
    author: '萧鼎',
    category: '仙侠',
    collectionCount: 48963,
    rating: 4.6,
  },
  {
    id: 10,
    title: '全职高手',
    author: '蝴蝶蓝',
    category: '竞技',
    collectionCount: 47821,
    rating: 4.8,
  },
  {
    id: 8,
    title: '鬼吹灯',
    author: '天下霸唱',
    category: '悬疑',
    collectionCount: 42156,
    rating: 4.7,
  },
  {
    id: 9,
    title: '完美世界',
    author: '辰东',
    category: '玄幻',
    collectionCount: 38971,
    rating: 4.6,
  },
];

const ratedNovels = [
  {
    id: 1,
    title: '斗破苍穹',
    author: '天蚕土豆',
    category: '玄幻',
    rating: 4.9,
    ratingCount: 25478,
  },
  {
    id: 6,
    title: '三体',
    author: '刘慈欣',
    category: '科幻',
    rating: 4.9,
    ratingCount: 18742,
  },
  // More novels
  {
    id: 2,
    title: '盗墓笔记',
    author: '南派三叔',
    category: '悬疑',
    rating: 4.8,
    ratingCount: 19562,
  },
  {
    id: 5,
    title: '庆余年',
    author: '猫腻',
    category: '古代',
    rating: 4.8,
    ratingCount: 16874,
  },
  {
    id: 7,
    title: '琅琊榜',
    author: '海宴',
    category: '古代',
    rating: 4.8,
    ratingCount: 15623,
  },
  {
    id: 10,
    title: '全职高手',
    author: '蝴蝶蓝',
    category: '竞技',
    rating: 4.8,
    ratingCount: 14256,
  },
  {
    id: 3,
    title: '何以笙箫默',
    author: '顾漫',
    category: '言情',
    rating: 4.7,
    ratingCount: 17845,
  },
  {
    id: 8,
    title: '鬼吹灯',
    author: '天下霸唱',
    category: '悬疑',
    rating: 4.7,
    ratingCount: 13589,
  },
  {
    id: 4,
    title: '诛仙',
    author: '萧鼎',
    category: '仙侠',
    rating: 4.6,
    ratingCount: 12478,
  },
  {
    id: 9,
    title: '完美世界',
    author: '辰东',
    category: '玄幻',
    rating: 4.6,
    ratingCount: 11256,
  },
];

const Ranking: React.FC = () => {
  const [activeTab, setActiveTab] = useState('popular');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getRankData = () => {
    switch(activeTab) {
      case 'popular':
        return popularNovels;
      case 'collected':
        return collectedNovels;
      case 'rated':
        return ratedNovels;
      default:
        return popularNovels;
    }
  };
  
  const getValueText = (novel: any) => {
    switch(activeTab) {
      case 'popular':
        return `${(novel.readCount / 10000).toFixed(1)}万人气`;
      case 'collected':
        return `${(novel.collectionCount / 10000).toFixed(1)}万收藏`;
      case 'rated':
        return `${novel.rating}分 (${novel.ratingCount}人评)`;
      default:
        return '';
    }
  };
  
  const getIcon = (index: number) => {
    if (index === 0) return <Award className="h-5 w-5 text-yellow-500" />;
    if (index === 1) return <Award className="h-5 w-5 text-gray-400" />;
    if (index === 2) return <Award className="h-5 w-5 text-amber-600" />;
    return <span className="text-sm font-bold text-gray-500">{index + 1}</span>;
  };
  
  return (
    <PageLayout>
      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h1 className="text-3xl font-bold">小说排行榜</h1>
          
          <Tabs defaultValue="popular" onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="popular" className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                人气榜
              </TabsTrigger>
              <TabsTrigger value="collected" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                收藏榜
              </TabsTrigger>
              <TabsTrigger value="rated" className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                评分榜
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="popular" className="space-y-0">
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <RotateCw className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                  {getRankData().map((novel, index) => (
                    <motion.div
                      key={novel.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`flex items-center p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors ${index < 3 ? 'bg-gray-50/50' : ''}`}
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 mr-4">
                        {getIcon(index)}
                      </div>
                      
                      <div className="flex-grow">
                        <Link to={`/novel/${novel.id}`} className="font-medium text-lg hover:text-novel-primary transition-colors">
                          {novel.title}
                        </Link>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <span>{novel.author}</span>
                          <span className="mx-2">·</span>
                          <span>{novel.category}</span>
                        </div>
                      </div>
                      
                      <div className="text-sm font-medium text-novel-primary">
                        {getValueText(novel)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="collected" className="space-y-0">
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <RotateCw className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                  {getRankData().map((novel, index) => (
                    <motion.div
                      key={novel.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`flex items-center p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors ${index < 3 ? 'bg-gray-50/50' : ''}`}
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 mr-4">
                        {getIcon(index)}
                      </div>
                      
                      <div className="flex-grow">
                        <Link to={`/novel/${novel.id}`} className="font-medium text-lg hover:text-novel-primary transition-colors">
                          {novel.title}
                        </Link>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <span>{novel.author}</span>
                          <span className="mx-2">·</span>
                          <span>{novel.category}</span>
                        </div>
                      </div>
                      
                      <div className="text-sm font-medium text-novel-primary">
                        {getValueText(novel)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="rated" className="space-y-0">
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <RotateCw className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                  {getRankData().map((novel, index) => (
                    <motion.div
                      key={novel.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`flex items-center p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors ${index < 3 ? 'bg-gray-50/50' : ''}`}
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 mr-4">
                        {getIcon(index)}
                      </div>
                      
                      <div className="flex-grow">
                        <Link to={`/novel/${novel.id}`} className="font-medium text-lg hover:text-novel-primary transition-colors">
                          {novel.title}
                        </Link>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <span>{novel.author}</span>
                          <span className="mx-2">·</span>
                          <span>{novel.category}</span>
                        </div>
                      </div>
                      
                      <div className="text-sm font-medium text-novel-primary">
                        {getValueText(novel)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Ranking;
