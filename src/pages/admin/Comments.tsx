
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  MessageSquare, 
  Search, 
  MoreHorizontal, 
  Eye, 
  Trash2, 
  RotateCw,
  BookOpen,
  User,
  ThumbsUp,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from "@/components/ui/badge";

// Mock data for comments
const commentsData = [
  { id: 6, userId: 1, username: 'user1', novelId: 1, novelTitle: '斗破苍穹', chapterId: 1, chapterTitle: '第一章 萧炎的逆袭', content: '这章真是太精彩了，萧炎的逆袭让我热血沸腾！', createTime: '2025-03-05 12:00:00', likeCount: 15 },
  { id: 7, userId: 1, username: 'user1', novelId: 2, novelTitle: '盗墓笔记', chapterId: 1, chapterTitle: '第一章 吴邪的探险', content: '吴邪的探险故事很吸引人，期待后面的情节！', createTime: '2025-03-05 12:30:00', likeCount: 10 },
  { id: 8, userId: 2, username: 'user2', novelId: 3, novelTitle: '何以笙箫默', chapterId: 1, chapterTitle: '第一章 大学时光', content: '何以笙箫默的情感描写很细腻，感动得我流泪。', createTime: '2025-03-05 13:00:00', likeCount: 20 },
  { id: 9, userId: 2, username: 'user2', novelId: 1, novelTitle: '斗破苍穹', chapterId: 2, chapterTitle: '第二章 幽魂的出现', content: '第二章的幽魂出现让我充满期待，真想知道接下来会发生什么！', createTime: '2025-03-05 13:15:00', likeCount: 8 },
  { id: 10, userId: 3, username: 'user3', novelId: 2, novelTitle: '盗墓笔记', chapterId: 2, chapterTitle: '第二章 古墓的秘密', content: '张起灵的角色设定太酷了，希望他能有更多的戏份！', createTime: '2025-03-05 13:45:00', likeCount: 12 },
  { id: 11, userId: 1, username: 'user1', novelId: 3, novelTitle: '何以笙箫默', chapterId: 2, chapterTitle: '第二章 爱情的纠葛', content: '赵默笙和何以琛的感情真是让人心疼，期待他们的结局。', createTime: '2025-03-05 14:00:00', likeCount: 25 },
];

// Mock data for novels
const novelsData = [
  { id: 1, title: '斗破苍穹' },
  { id: 2, title: '盗墓笔记' },
  { id: 3, title: '何以笙箫默' },
];

const Comments: React.FC = () => {
  const [comments, setComments] = useState(commentsData);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [novelFilter, setNovelFilter] = useState('all');
  
  // Handle search function
  const handleSearch = () => {
    let filtered = commentsData;
    
    // Filter by novel
    if (novelFilter !== 'all') {
      filtered = filtered.filter(comment => 
        comment.novelId === parseInt(novelFilter)
      );
    }
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(comment => 
        comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setComments(filtered);
  };
  
  // Handle view comment details (not implemented in this demo)
  const handleViewComment = (id: number) => {
    toast.info(`查看评论ID: ${id}的详情`);
  };
  
  // Handle delete comment
  const handleDeleteComment = (id: number) => {
    if (confirm('确定要删除这条评论吗？此操作不可撤销。')) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setComments(comments.filter(comment => comment.id !== id));
        setIsLoading(false);
        toast.success('评论已删除');
      }, 800);
    }
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            评论管理
          </h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>评论列表</CardTitle>
            <CardDescription>管理用户对小说和章节的评论</CardDescription>
            
            <div className="flex mt-4 gap-2">
              <Select
                value={novelFilter}
                onValueChange={setNovelFilter}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="按小说筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有小说</SelectItem>
                  {novelsData.map((novel) => (
                    <SelectItem key={novel.id} value={novel.id.toString()}>
                      {novel.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="搜索评论内容或用户名..."
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
                      <TableHead>用户</TableHead>
                      <TableHead>小说</TableHead>
                      <TableHead>章节</TableHead>
                      <TableHead>评论内容</TableHead>
                      <TableHead>点赞</TableHead>
                      <TableHead>时间</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                          暂无评论数据
                        </TableCell>
                      </TableRow>
                    ) : (
                      comments.map((comment) => (
                        <TableRow key={comment.id}>
                          <TableCell>{comment.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4 text-muted-foreground" />
                              {comment.username}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4 text-muted-foreground" />
                              {comment.novelTitle}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {comment.chapterTitle}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <p className="max-w-xs truncate">{comment.content}</p>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <ThumbsUp className="h-3.5 w-3.5" />
                              {comment.likeCount}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3.5 w-3.5" />
                              {comment.createTime}
                            </div>
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
                                <DropdownMenuItem onClick={() => handleViewComment(comment.id)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  查看
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => handleDeleteComment(comment.id)}
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
      </div>
    </AdminLayout>
  );
};

export default Comments;
