
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import NovelCard from '@/components/NovelCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search, FilterX, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

// 假数据
const allNovels = [
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
  {
    id: 4,
    title: '三体',
    author: '刘慈欣',
    description: '文化大革命如火如荼进行的同时，军方探寻外星文明的绝秘计划"红岸工程"取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……',
    category: '科幻',
    coverImage: '/placeholder.svg',
  },
  {
    id: 5,
    title: '琅琊榜',
    author: '海宴',
    description: '雪上空留马行处，云中闻得燕归来。古时候有个地方叫做琅琊，在那里有一份罪恶的名单，名单上的人碰上了无数险恶波折，但是最后，有人在长街上放了一把火……',
    category: '历史',
    coverImage: '/placeholder.svg',
  },
  {
    id: 6,
    title: '鬼吹灯',
    author: '天下霸唱',
    description: '上世纪五十年代末，一位军方地质探险队队员在喜马拉雅山脉失踪，失踪前留下一段怪异的话，引出一个装满黄金和诡异的古墓。五十年后，其孙在一次考古旅行中意外发现这个神秘古墓的线索，于是他召集了经验丰富的盗墓团伙前去寻宝。',
    category: '悬疑',
    coverImage: '/placeholder.svg',
  },
];

// 所有分类
const categories = ['全部', '玄幻', '悬疑', '言情', '历史', '科幻', '武侠'];

const SearchResults: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [category, setCategory] = useState('全部');
  const [results, setResults] = useState<typeof allNovels>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // 执行搜索
  const handleSearch = () => {
    setSearchParams({ q: searchQuery });
  };
  
  // 重置筛选条件
  const resetFilters = () => {
    setCategory('全部');
    setSearchQuery(query);
    setSearchParams({ q: query });
  };
  
  useEffect(() => {
    setIsLoading(true);
    
    // 模拟 API 请求
    setTimeout(() => {
      let filtered = [...allNovels];
      
      // 按搜索词筛选
      if (query) {
        filtered = filtered.filter(novel => 
          novel.title.toLowerCase().includes(query.toLowerCase()) ||
          novel.author.toLowerCase().includes(query.toLowerCase()) ||
          novel.description.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      // 按分类筛选
      if (category !== '全部') {
        filtered = filtered.filter(novel => novel.category === category);
      }
      
      setResults(filtered);
      setIsLoading(false);
    }, 600);
  }, [query, category]);
  
  return (
    <PageLayout>
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold mb-2">搜索结果</h1>
          {query && <p className="text-muted-foreground mb-8">搜索 "{query}" 的结果</p>}
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索小说、作者..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="所有分类" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" />
              搜索
            </Button>
            
            <Button variant="outline" onClick={resetFilters}>
              <FilterX className="mr-2 h-4 w-4" />
              重置
            </Button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {results.map((novel) => (
                <NovelCard key={novel.id} {...novel} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-muted/30 rounded-lg border border-border">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">未找到结果</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                没有找到符合 "{query}" 的小说。尝试使用不同的关键词或浏览其他分类。
              </p>
              <Button onClick={resetFilters}>查看所有小说</Button>
            </div>
          )}
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default SearchResults;
