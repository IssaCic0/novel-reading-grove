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
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  File, 
  Search, 
  Plus, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  BookOpen,
  RotateCw 
} from 'lucide-react';
import { toast } from 'sonner';
import ChapterBulkImport from '@/components/admin/ChapterBulkImport';
import RichTextEditor from '@/components/RichTextEditor';

// Mock data for chapters
const chaptersData = [
  { id: 1, novelId: 1, novelTitle: '斗破苍穹', title: '第一章 萧炎的逆袭', order: 1, createTime: '2025-03-04 20:05:00', content: '在家族的冷遇下，萧炎努力修炼，终于迎来了自己的逆袭。' },
  { id: 2, novelId: 1, novelTitle: '斗破苍穹', title: '第二章 幽魂的出现', order: 2, createTime: '2025-03-04 20:10:00', content: '一缕幽魂从戒指中浮现，萧炎的命运开始改变。' },
  { id: 3, novelId: 2, novelTitle: '盗墓笔记', title: '第一章 吴邪的探险', order: 1, createTime: '2025-03-04 20:15:00', content: '吴邪在一次偶然的机会中得到了战国帛书，开始了他的探险之旅。' },
  { id: 4, novelId: 2, novelTitle: '盗墓笔记', title: '第二章 古墓的秘密', order: 2, createTime: '2025-03-04 20:20:00', content: '在古墓中，吴邪和他的伙伴们揭开了隐藏已久的秘密。' },
  { id: 5, novelId: 3, novelTitle: '何以笙箫默', title: '第一章 大学时光', order: 1, createTime: '2025-03-04 20:25:00', content: '赵默笙与何以琛的相遇，开启了一段美好的大学时光。' },
  { id: 6, novelId: 3, novelTitle: '何以笙箫默', title: '第二章 爱情的纠葛', order: 2, createTime: '2025-03-04 20:30:00', content: '两人之间的误会与爱恋交织，最终走向了不同的道路。' },
];

// Mock data for novels
const novelsData = [
  { id: 1, title: '斗破苍穹' },
  { id: 2, title: '盗墓笔记' },
  { id: 3, title: '何以笙箫默' },
  { id: 5, title: '文章444' },
  { id: 6, title: '文章2' },
  { id: 7, title: '文章3' },
  { id: 8, title: '文章5' },
  { id: 9, title: '文章6' },
  { id: 10, title: '文章7' },
];

const Chapters: React.FC = () => {
  const [chapters, setChapters] = useState(chaptersData);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [novelFilter, setNovelFilter] = useState('all');
  const [editingChapter, setEditingChapter] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Handle search function
  const handleSearch = () => {
    let filtered = chaptersData;
    
    // Filter by novel
    if (novelFilter !== 'all') {
      filtered = filtered.filter(chapter => 
        chapter.novelId === parseInt(novelFilter)
      );
    }
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(chapter => 
        chapter.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setChapters(filtered);
  };
  
  // Handle add/edit chapter
  const handleSaveChapter = () => {
    if (!editingChapter.title || !editingChapter.content || !editingChapter.novelId) {
      toast.error('小说、章节标题和内容不能为空');
      return;
    }
    
    setIsLoading(true);
    
    // Find novel title
    const novel = novelsData.find(novel => novel.id === parseInt(editingChapter.novelId));
    
    // Simulate API call
    setTimeout(() => {
      if (editingChapter.id) {
        // Update existing chapter
        setChapters(chapters.map(chapter => 
          chapter.id === editingChapter.id ? {
            ...editingChapter,
            novelTitle: novel?.title || 'Unknown'
          } : chapter
        ));
        toast.success('章节信息已更新');
      } else {
        // Add new chapter
        const lastChapter = chapters
          .filter(ch => ch.novelId === parseInt(editingChapter.novelId))
          .sort((a, b) => b.order - a.order)[0];
        
        const newOrder = lastChapter ? lastChapter.order + 1 : 1;
        
        const newChapter = {
          ...editingChapter,
          id: Math.max(...chapters.map(c => c.id)) + 1,
          order: newOrder,
          novelTitle: novel?.title || 'Unknown',
          createTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
        };
        
        setChapters([...chapters, newChapter]);
        toast.success('章节已添加成功');
      }
      
      setIsLoading(false);
      setIsDialogOpen(false);
      setEditingChapter(null);
    }, 800);
  };
  
  // Handle delete chapter
  const handleDeleteChapter = (id: number) => {
    if (confirm('确定要删除这个章节吗？此操作不可撤销。')) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setChapters(chapters.filter(chapter => chapter.id !== id));
        setIsLoading(false);
        toast.success('章节已删除');
      }, 800);
    }
  };
  
  // Handle open add/edit dialog
  const openChapterDialog = (chapter = null) => {
    setEditingChapter(chapter || { 
      title: '', 
      content: '', 
      novelId: '',
    });
    setIsDialogOpen(true);
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <File className="h-6 w-6" />
            章节管理
          </h1>
          
          <div className="flex gap-2">
            <ChapterBulkImport
              novelId={parseInt(novelFilter)}
              onImportSuccess={() => {
                // 刷新章节列表
                toast.success('章节列表已更新');
              }}
            />
            <Button onClick={() => openChapterDialog()} className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              添加章节
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>章节列表</CardTitle>
            <CardDescription>管理系统中的所有小说章节</CardDescription>
            
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
                  placeholder="搜索章节标题..."
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
                      <TableHead>小说</TableHead>
                      <TableHead>章节标题</TableHead>
                      <TableHead>顺序</TableHead>
                      <TableHead>创建时间</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {chapters.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                          暂无章节数据
                        </TableCell>
                      </TableRow>
                    ) : (
                      chapters.map((chapter) => (
                        <TableRow key={chapter.id}>
                          <TableCell>{chapter.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4 text-muted-foreground" />
                              {chapter.novelTitle}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{chapter.title}</TableCell>
                          <TableCell>{chapter.order}</TableCell>
                          <TableCell>{chapter.createTime}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">操作菜单</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openChapterDialog(chapter)}>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  编辑
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => handleDeleteChapter(chapter.id)}
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
        
        {/* Add/Edit Chapter Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>{editingChapter?.id ? '编辑章节' : '添加章节'}</DialogTitle>
              <DialogDescription>
                {editingChapter?.id 
                  ? '修改章节信息，点击保存提交更改。'
                  : '添加新的章节到系统，填写以下信息。'
                }
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="novel" className="text-right">
                  所属小说
                </Label>
                <Select
                  value={editingChapter?.novelId?.toString() || ''}
                  onValueChange={(value) => setEditingChapter({...editingChapter, novelId: parseInt(value)})}
                  disabled={editingChapter?.id ? true : false}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="选择小说" />
                  </SelectTrigger>
                  <SelectContent>
                    {novelsData.map((novel) => (
                      <SelectItem key={novel.id} value={novel.id.toString()}>
                        {novel.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  章节标题
                </Label>
                <Input
                  id="title"
                  placeholder="请输入章节标题"
                  className="col-span-3"
                  value={editingChapter?.title || ''}
                  onChange={(e) => setEditingChapter({...editingChapter, title: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="content" className="text-right pt-2">
                  章节内容
                </Label>
                <div className="col-span-3">
                  <RichTextEditor
                    value={editingChapter?.content || ''}
                    onChange={(content) => setEditingChapter({...editingChapter, content})}
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleSaveChapter} disabled={isLoading}>
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

export default Chapters;
