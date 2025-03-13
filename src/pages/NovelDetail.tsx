import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { 
  Bookmark, 
  Star, 
  MessageSquare, 
  Clock, 
  User, 
  BookOpen, 
  Calendar,
  Send,
  BookmarkPlus,
  ArrowDownAZ,
  ArrowUpAZ,
  ChevronRight,
  ThumbsUp
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import ShareButton from '@/components/ShareButton';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import NovelRating from '@/components/NovelRating';
import NovelRecommendations from '@/components/NovelRecommendations';

const novelsData = {
  1: {
    id: 1,
    title: '斗破苍穹',
    author: '天蚕土豆',
    description: '讲述了天才少年萧炎在创造了家族空前绝后的修炼纪录后突然成了废人，整整三年时间，家族冷遇，旁人轻视，被未婚妻退婚……种种打击接踵而至。就在他即将绝望的时候，一缕幽魂从他手上的戒指里浮现，一扇全新的大门在面前开启！',
    category: '玄幻',
    coverImage: '/placeholder.svg',
    updateTime: '2025-03-04 20:10:00',
    totalChapters: 2,
    commentCount: 2,
    views: 12567,
    collections: 3456,
    createTime: '2025-03-04 20:03:47',
  },
  2: {
    id: 2,
    title: '盗墓笔记',
    author: '南派三叔',
    description: '出身于盗墓世家的吴邪偶然得到了一份神秘的战国帛书，为了揭开帛书的秘密，他踏上了探寻古墓的惊险之旅。在这个过程中，他结识了张起灵、王胖子等伙伴，一起经历了无数的生死考验，揭开了一个又一个惊人的谜团。',
    category: '悬疑',
    coverImage: '/placeholder.svg',
    updateTime: '2025-03-04 20:20:00',
    totalChapters: 2,
    commentCount: 2,
    views: 9876,
    collections: 2345,
    createTime: '2025-03-04 20:03:47',
  },
  3: {
    id: 3,
    title: '何以笙箫默',
    author: '顾漫',
    description: '一段年少时的爱恋，牵出一生的纠缠。大学时代的赵默笙阳光灿烂，对法学系大才子何以琛一见倾心，开朗直率的她拔足倒追，终于使才气出众的他为她停留驻足。然而，不善表达的他终于使她在一次伤心之下远走他乡……',
    category: '言情',
    coverImage: '/placeholder.svg',
    updateTime: '2025-03-04 20:30:00',
    totalChapters: 2,
    commentCount: 2,
    views: 7654,
    collections: 1987,
    createTime: '2025-03-04 20:03:47',
  },
};

const chaptersData = {
  1: [
    { id: 1, title: '第一章 萧炎的逆袭', order: 1, createTime: '2025-03-04 20:05:00' },
    { id: 2, title: '第二章 幽魂的出现', order: 2, createTime: '2025-03-04 20:10:00' },
  ],
  2: [
    { id: 3, title: '第一章 吴邪的探险', order: 1, createTime: '2025-03-04 20:15:00' },
    { id: 4, title: '第二章 古墓的秘密', order: 2, createTime: '2025-03-04 20:20:00' },
  ],
  3: [
    { id: 5, title: '第一章 大学时光', order: 1, createTime: '2025-03-04 20:25:00' },
    { id: 6, title: '第二章 爱情的纠葛', order: 2, createTime: '2025-03-04 20:30:00' },
  ],
};

const commentsData = {
  1: [
    { id: 6, username: 'user1', content: '这章真是太精彩了，萧炎的逆袭让我热血沸腾！', createTime: '2025-03-05 12:00:00', likeCount: 15 },
    { id: 9, username: 'user2', content: '第二章的幽魂出现让我充满期待，真想知道接下来会发生什么！', createTime: '2025-03-05 13:15:00', likeCount: 8 },
  ],
  2: [
    { id: 7, username: 'user1', content: '吴邪的探险故事很吸引人，期待后面的情节！', createTime: '2025-03-05 12:30:00', likeCount: 10 },
    { id: 10, username: 'user3', content: '张起灵的角色设定太酷了，希望他能有更多的戏份！', createTime: '2025-03-05 13:45:00', likeCount: 12 },
  ],
  3: [
    { id: 8, username: 'user2', content: '何以笙箫默的情感描写很细腻，感动得我流泪。', createTime: '2025-03-05 13:00:00', likeCount: 20 },
    { id: 11, username: 'user1', content: '赵默笙和何以琛的感情真是让人心疼，期待他们的结局。', createTime: '2025-03-05 14:00:00', likeCount: 25 },
  ],
};

// 模拟相似小说数据
const similarNovels = [
  {
    id: 2,
    title: '武动乾坤',
    author: '天蚕土豆',
    cover_image: '/covers/2.jpg',
    category: '玄幻',
    rating: 4.6,
    match_score: 0.92,
  },
  {
    id: 3,
    title: '大主宰',
    author: '天蚕土豆',
    cover_image: '/covers/3.jpg',
    category: '玄幻',
    rating: 4.5,
    match_score: 0.90,
  },
  {
    id: 4,
    title: '元尊',
    author: '天蚕土豆',
    cover_image: '/covers/4.jpg',
    category: '玄幻',
    rating: 4.4,
    match_score: 0.88,
  },
  {
    id: 5,
    title: '神墓',
    author: '辰东',
    cover_image: '/covers/5.jpg',
    category: '玄幻',
    rating: 4.7,
    match_score: 0.85,
  },
  {
    id: 6,
    title: '完美世界',
    author: '辰东',
    cover_image: '/covers/6.jpg',
    category: '玄幻',
    rating: 4.8,
    match_score: 0.83,
  }
];

const NovelDetail: React.FC = () => {
  const { id } = useParams();
  const novelId = parseInt(id || '1');
  const [novel, setNovel] = useState<any>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [collected, setCollected] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentPage, setCommentPage] = useState(1);
  const commentsPerPage = 5;

  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      setNovel(novelsData[novelId as keyof typeof novelsData]);
      setChapters(chaptersData[novelId as keyof typeof chaptersData] || []);
      setComments(commentsData[novelId as keyof typeof commentsData] || []);
      setIsLoading(false);
    }, 800);
  }, [novelId]);

  if (isLoading || !novel) {
    return (
      <PageLayout>
        <div className="container py-16 min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-novel-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-muted-foreground">加载中...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  const toggleCollection = () => {
    setCollected(!collected);
    toast.success(collected ? '已取消收藏' : '已加入书架');
  };
  
  const handleSubmitComment = () => {
    if (!newComment.trim()) {
      toast.error('评论内容不能为空');
      return;
    }
    
    const newCommentObj = {
      id: Date.now(),
      username: '当前用户',
      content: newComment,
      createTime: new Date().toISOString(),
      likeCount: 0
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment('');
    toast.success('评论已发布');
  };
  
  const paginatedComments = comments.slice(
    (commentPage - 1) * commentsPerPage,
    commentPage * commentsPerPage
  );
  
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-48 lg:w-56 flex-shrink-0">
              <div className="relative aspect-[3/4] overflow-hidden rounded-md shadow-sm">
                <img 
                  src={novel.coverImage || '/placeholder.svg'} 
                  alt={novel.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 left-2 bg-background/80 text-foreground backdrop-blur-sm">
                  {novel.category}
                </Badge>
              </div>
              
              <div className="mt-4 flex flex-col gap-2">
                <NovelRating
                  novelId={novel.id}
                  initialRating={0}
                  totalRatings={novel.total_ratings || 0}
                  averageRating={novel.average_rating || 0}
                  onRatingSubmit={(rating) => {
                    // TODO: 在实际项目中，这里应该更新小说的评分数据
                    console.log('Rating submitted:', rating);
                  }}
                />
                <Button 
                  className="w-full gap-2"
                  onClick={toggleCollection}
                >
                  <Bookmark className={`h-4 w-4 ${collected ? 'fill-current' : ''}`} />
                  {collected ? '已收藏' : '加入书架'}
                </Button>
                <ShareButton title={novel.title} variant="outline" />
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-novel-title">{novel.title}</h1>
              
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="mr-1 h-4 w-4" />
                  {novel.author}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <BookOpen className="mr-1 h-4 w-4" />
                  {novel.totalChapters} 章
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  {new Date(novel.updateTime).toLocaleDateString('zh-CN')} 更新
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Star className="mr-1 h-4 w-4" />
                  {novel.collections} 收藏
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MessageSquare className="mr-1 h-4 w-4" />
                  {novel.commentCount} 评论
                </div>
              </div>
              
              <div className="flex items-center gap-3 mt-6">
                <Link to={`/novel/${novel.id}/chapter/${chapters[0]?.id}`}>
                  <Button size="lg">开始阅读</Button>
                </Link>
                <Link to={chapters.length > 0 ? `/novel/${novel.id}/chapter/${chapters[chapters.length - 1]?.id}` : '#'}>
                  <Button variant="outline">最新章节</Button>
                </Link>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">简介</h3>
                <p className="text-novel-content leading-relaxed">{novel.description}</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-novel-secondary/60 dark:bg-gray-700/60 rounded-md p-3 text-center">
                  <div className="text-sm text-muted-foreground">总字数</div>
                  <div className="text-xl font-semibold mt-1">54,321</div>
                </div>
                <div className="bg-novel-secondary/60 dark:bg-gray-700/60 rounded-md p-3 text-center">
                  <div className="text-sm text-muted-foreground">创建时间</div>
                  <div className="text-base font-medium mt-1">
                    {new Date(novel.createTime).toLocaleDateString('zh-CN')}
                  </div>
                </div>
                <div className="bg-novel-secondary/60 dark:bg-gray-700/60 rounded-md p-3 text-center">
                  <div className="text-sm text-muted-foreground">阅读量</div>
                  <div className="text-xl font-semibold mt-1">{novel.views.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="p-6">
            <Tabs defaultValue="chapters">
              <TabsList className="w-full md:w-auto">
                <TabsTrigger value="chapters" className="flex-1 md:flex-initial">目录</TabsTrigger>
                <TabsTrigger value="comments" className="flex-1 md:flex-initial">评论({comments.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="chapters" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {chapters.map((chapter) => (
                    <Link 
                      key={chapter.id}
                      to={`/novel/${novel.id}/chapter/${chapter.id}`}
                      className="flex items-center justify-between p-3 rounded-md hover:bg-novel-secondary/60 dark:hover:bg-gray-700/60 transition-colors"
                    >
                      <span className="font-medium">{chapter.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(chapter.createTime).toLocaleDateString('zh-CN')}
                      </span>
                    </Link>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="comments" className="mt-6">
                <div className="mb-6 p-4 bg-novel-secondary/30 dark:bg-gray-700/30 rounded-lg">
                  <h3 className="font-medium mb-3">发表评论</h3>
                  <Textarea 
                    placeholder="分享你的想法..." 
                    className="mb-3" 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleSubmitComment}>
                      <Send className="mr-2 h-4 w-4" />
                      发布评论
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4">
                  {paginatedComments.length > 0 ? (
                    paginatedComments.map((comment) => (
                      <motion.div 
                        key={comment.id}
                        className="bg-novel-secondary/30 dark:bg-gray-700/30 rounded-lg p-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-novel-primary/20 flex items-center justify-center text-novel-primary">
                              {comment.username[0].toUpperCase()}
                            </div>
                            <span className="font-medium">{comment.username}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(comment.createTime).toLocaleDateString('zh-CN')}
                          </div>
                        </div>
                        <p className="mt-3 text-novel-content">{comment.content}</p>
                        <div className="mt-2 flex items-center justify-end gap-4">
                          <button className="text-sm text-muted-foreground flex items-center gap-1 hover:text-novel-primary">
                            <Star className="h-4 w-4" />
                            {comment.likeCount}
                          </button>
                          <button className="text-sm text-muted-foreground flex items-center gap-1 hover:text-novel-primary">
                            <MessageSquare className="h-4 w-4" />
                            回复
                          </button>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      暂无评论，来发表第一条评论吧！
                    </div>
                  )}
                  
                  {totalPages > 1 && (
                    <Pagination className="mt-6">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              if (commentPage > 1) setCommentPage(commentPage - 1);
                            }}
                            className={commentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: totalPages }).map((_, index) => (
                          <PaginationItem key={index}>
                            <PaginationLink 
                              href="#" 
                              isActive={commentPage === index + 1}
                              onClick={(e) => {
                                e.preventDefault();
                                setCommentPage(index + 1);
                              }}
                            >
                              {index + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        <PaginationItem>
                          <PaginationNext 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              if (commentPage < totalPages) setCommentPage(commentPage + 1);
                            }}
                            className={commentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* 相似小说推荐 */}
          <div className="mt-12">
            <NovelRecommendations
              novels={similarNovels}
              title="相似推荐"
              description="喜欢这本书的读者也在看"
            />
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default NovelDetail;
