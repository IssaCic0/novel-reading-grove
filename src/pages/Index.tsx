import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import NovelCard from '@/components/NovelCard';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import NovelRecommendations from '@/components/NovelRecommendations';

// 假设这是从API中获取的数据
const featuredNovels = [
  {
    id: 1,
    title: '斗破苍穹',
    author: '天蚕土豆',
    description: '讲述了天才少年萧炎在创造了家族空前绝后的修炼纪录后突然成了废人，整整三年时间，家族冷遇，旁人轻视，被未婚妻退婚……种种打击接踵而至。就在他即将绝望的时候，一缕幽魂从他手上的戒指里浮现，一扇全新的大门在面前开启！',
    category: '玄幻',
    coverImage: '/placeholder.svg',
  },
  {
    id: 2,
    title: '盗墓笔记',
    author: '南派三叔',
    description: '出身于盗墓世家的吴邪偶然得到了一份神秘的战国帛书，为了揭开帛书的秘密，他踏上了探寻古墓的惊险之旅。在这个过程中，他结识了张起灵、王胖子等伙伴，一起经历了无数的生死考验，揭开了一个又一个惊人的谜团。',
    category: '悬疑',
    coverImage: '/placeholder.svg',
  },
  {
    id: 3,
    title: '何以笙箫默',
    author: '顾漫',
    description: '一段年少时的爱恋，牵出一生的纠缠。大学时代的赵默笙阳光灿烂，对法学系大才子何以琛一见倾心，开朗直率的她拔足倒追，终于使才气出众的他为她停留驻足。然而，不善表达的他终于使她在一次伤心之下远走他乡……',
    category: '言情',
    coverImage: '/placeholder.svg',
  },
];

const categories = [
  { id: 1, name: '玄幻', count: 1243 },
  { id: 2, name: '悬疑', count: 857 },
  { id: 3, name: '言情', count: 1560 },
  { id: 4, name: '历史', count: 675 },
  { id: 5, name: '科幻', count: 422 },
  { id: 6, name: '武侠', count: 943 },
];

const recentUpdates = [
  {
    id: 1,
    novelId: 1,
    title: '斗破苍穹',
    chapterTitle: '第二章 幽魂的出现',
    updateTime: '2025-03-04 20:10:00',
  },
  {
    id: 2,
    novelId: 2,
    title: '盗墓笔记',
    chapterTitle: '第二章 古墓的秘密',
    updateTime: '2025-03-04 20:20:00',
  },
  {
    id: 3,
    novelId: 3,
    title: '何以笙箫默',
    chapterTitle: '第二章 爱情的纠葛',
    updateTime: '2025-03-04 20:30:00',
  },
];

// 模拟推荐数据
const recommendedNovels = [
  {
    id: 1,
    title: '斗破苍穹',
    author: '天蚕土豆',
    cover_image: '/covers/1.jpg',
    category: '玄幻',
    rating: 4.5,
    match_score: 0.95,
  },
  {
    id: 2,
    title: '盗墓笔记',
    author: '南派三叔',
    cover_image: '/covers/2.jpg',
    category: '悬疑',
    rating: 4.8,
    match_score: 0.92,
  },
  // ... 更多推荐小说
];

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟数据加载
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        {/* 英雄区域 */}
        <div className="relative bg-gradient-to-b from-novel-primary/10 via-transparent to-transparent py-16 md:py-24">
          <div className="container">
            <motion.div 
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-novel-title">
                发现你的下一段<br />阅读冒险
              </h1>
              <p className="mt-4 text-lg text-novel-content">
                数千本精选小说等你品读，从玄幻武侠到言情悬疑，总有一本适合你
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button size="lg">开始探索</Button>
                <Button variant="outline" size="lg">
                  查看排行榜
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 推荐小说 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <NovelRecommendations
            novels={recommendedNovels}
            title="专属推荐"
            description="根据您的阅读历史，为您精选以下小说"
          />
        </motion.div>

        {/* 热门推荐 */}
        <div className="py-12 md:py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-novel-title">热门推荐</h2>
              <Button variant="ghost" size="sm" className="gap-1">
                更多
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {featuredNovels.map((novel) => (
                <NovelCard key={novel.id} {...novel} />
              ))}
            </div>
          </div>
        </div>

        {/* 分类浏览 */}
        <div className="py-12 md:py-16 bg-novel-tertiary">
          <div className="container">
            <h2 className="text-2xl font-bold text-novel-title mb-8">小说分类</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <motion.div 
                  key={category.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-all duration-300 hover-scale"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={`/category/${category.id}`} className="block focus-ring">
                    <h3 className="text-lg font-serif font-semibold text-novel-title">{category.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{category.count} 本</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* 最近更新 */}
        <div className="py-12 md:py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-novel-title">最近更新</h2>
              <Button variant="ghost" size="sm" className="gap-1">
                查看全部
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="divide-y">
                {recentUpdates.map((update) => (
                  <motion.div 
                    key={update.id}
                    className="flex items-center p-4 hover:bg-novel-secondary/50 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-novel-title">
                        <Link to={`/novel/${update.novelId}`} className="hover:text-novel-primary focus-ring">
                          {update.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-novel-content mt-1">
                        <Link to={`/novel/${update.novelId}/chapter/${update.id}`} className="hover:text-novel-primary focus-ring">
                          {update.chapterTitle}
                        </Link>
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(update.updateTime).toLocaleDateString('zh-CN')}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;
