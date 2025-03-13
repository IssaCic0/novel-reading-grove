
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NovelCard from '@/components/NovelCard';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

// 假数据
const categories = [
  { id: 'all', name: '全部', count: 6 },
  { id: 'xuanhuan', name: '玄幻', count: 1 },
  { id: 'xuanyi', name: '悬疑', count: 1 },
  { id: 'yanqing', name: '言情', count: 1 },
  { id: 'lishi', name: '历史', count: 1 },
  { id: 'kehuan', name: '科幻', count: 1 },
  { id: 'wuxia', name: '武侠', count: 1 },
];

const novels = [
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

const Categories: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredNovels, setFilteredNovels] = useState(novels);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      if (selectedCategory === 'all') {
        setFilteredNovels(novels);
      } else {
        const filtered = novels.filter(novel => 
          novel.category === categories.find(c => c.id === selectedCategory)?.name
        );
        setFilteredNovels(filtered);
      }
      setIsLoading(false);
    }, 300);
  }, [selectedCategory]);
  
  return (
    <PageLayout>
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8">小说分类</h1>
          
          <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
            <div className="overflow-x-auto pb-4">
              <TabsList className="flex">
                {categories.map(category => (
                  <TabsTrigger key={category.id} value={category.id} className="flex-shrink-0">
                    {category.name}
                    <Badge variant="outline" className="ml-2">{category.count}</Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <div className="mt-6">
              {categories.map(category => (
                <TabsContent key={category.id} value={category.id} className="pt-2">
                  {isLoading ? (
                    <div className="flex justify-center py-12">
                      <div className="w-10 h-10 border-4 border-t-novel-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : filteredNovels.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                      {filteredNovels.map(novel => (
                        <NovelCard key={novel.id} {...novel} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">暂无小说</p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Categories;
