
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
  DialogTrigger,
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
  BookOpen, 
  Search, 
  Plus, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  RotateCw 
} from 'lucide-react';
import { toast } from 'sonner';

// Mock data for novels
const novelsData = [
  { id: 1, title: '斗破苍穹', author: '天蚕土豆', category: '玄幻', createTime: '2025-03-04', updateTime: '2025-03-04', chapterCount: 2 },
  { id: 2, title: '盗墓笔记', author: '南派三叔', category: '悬疑', createTime: '2025-03-04', updateTime: '2025-03-04', chapterCount: 2 },
  { id: 3, title: '何以笙箫默', author: '顾漫', category: '言情', createTime: '2025-03-04', updateTime: '2025-03-04', chapterCount: 2 },
  { id: 5, title: '文章444', author: '未知', category: '未分类', createTime: '2024-03-08', updateTime: '2025-03-09', chapterCount: 0 },
  { id: 6, title: '文章2', author: '未知', category: '未分类', createTime: '2024-03-08', updateTime: '2025-03-09', chapterCount: 0 },
  { id: 7, title: '文章3', author: '未知', category: '未分类', createTime: '2024-03-08', updateTime: '2025-03-09', chapterCount: 0 },
  { id: 8, title: '文章5', author: '未知', category: '未分类', createTime: '2025-03-08', updateTime: '2025-03-09', chapterCount: 0 },
  { id: 9, title: '文章6', author: '未知', category: '未分类', createTime: '2024-06-08', updateTime: '2025-03-09', chapterCount: 0 },
  { id: 10, title: '文章7', author: '未知', category: '未分类', createTime: '2024-07-08', updateTime: '2025-03-09', chapterCount: 0 },
];

// Category options
const categories = [
  '玄幻', '修真', '都市', '历史', '言情', '科幻', '悬疑', '游戏', '军事', '其他'
];

const Novels: React.FC = () => {
  const [novels, setNovels] = useState(novelsData);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNovel, setEditingNovel] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Handle search function
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setNovels(novelsData);
      return;
    }
    
    const filtered = novelsData.filter(novel => 
      novel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      novel.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setNovels(filtered);
  };
  
  // Handle add/edit novel
  const handleSaveNovel = () => {
    if (!editingNovel.title || !editingNovel.author) {
      toast.error('标题和作者不能为空');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (editingNovel.id) {
        // Update existing novel
        setNovels(novels.map(novel => 
          novel.id === editingNovel.id ? editingNovel : novel
        ));
        toast.success('小说信息已更新');
      } else {
        // Add new novel
        const newNovel = {
          ...editingNovel,
          id: Math.max(...novels.map(n => n.id)) + 1,
          createTime: new Date().toISOString().split('T')[0],
          updateTime: new Date().toISOString().split('T')[0],
          chapterCount: 0
        };
        setNovels([...novels, newNovel]);
        toast.success('小说已添加成功');
      }
      
      setIsLoading(false);
      setIsDialogOpen(false);
      setEditingNovel(null);
    }, 800);
  };
  
  // Handle delete novel
  const handleDeleteNovel = (id: number) => {
    if (confirm('确定要删除这部小说吗？此操作不可撤销，相关章节将一并删除。')) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setNovels(novels.filter(novel => novel.id !== id));
        setIsLoading(false);
        toast.success('小说已删除');
      }, 800);
    }
  };
  
  // Handle open add/edit dialog
  const openNovelDialog = (novel = null) => {
    setEditingNovel(novel || { 
      title: '', 
      author: '', 
      description: '', 
      category: '其他',
      cover_image: ''
    });
    setIsDialogOpen(true);
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            小说管理
          </h1>
          
          <Button onClick={() => openNovelDialog()} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            添加小说
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>小说列表</CardTitle>
            <CardDescription>管理系统中的所有小说</CardDescription>
            
            <div className="flex mt-4 gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="搜索小说名称或作者..."
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
                      <TableHead>小说名称</TableHead>
                      <TableHead>作者</TableHead>
                      <TableHead>分类</TableHead>
                      <TableHead>章节数</TableHead>
                      <TableHead>创建时间</TableHead>
                      <TableHead>更新时间</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {novels.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                          暂无小说数据
                        </TableCell>
                      </TableRow>
                    ) : (
                      novels.map((novel) => (
                        <TableRow key={novel.id}>
                          <TableCell>{novel.id}</TableCell>
                          <TableCell className="font-medium">{novel.title}</TableCell>
                          <TableCell>{novel.author || '未知'}</TableCell>
                          <TableCell>{novel.category || '未分类'}</TableCell>
                          <TableCell>{novel.chapterCount}</TableCell>
                          <TableCell>{novel.createTime}</TableCell>
                          <TableCell>{novel.updateTime}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">操作菜单</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openNovelDialog(novel)}>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  编辑
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => handleDeleteNovel(novel.id)}
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
        
        {/* Add/Edit Novel Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingNovel?.id ? '编辑小说' : '添加小说'}</DialogTitle>
              <DialogDescription>
                {editingNovel?.id 
                  ? '修改小说信息，点击保存提交更改。'
                  : '添加新的小说到系统，填写以下信息。'
                }
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  小说标题
                </Label>
                <Input
                  id="title"
                  placeholder="请输入小说标题"
                  className="col-span-3"
                  value={editingNovel?.title || ''}
                  onChange={(e) => setEditingNovel({...editingNovel, title: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="author" className="text-right">
                  作者
                </Label>
                <Input
                  id="author"
                  placeholder="请输入作者名"
                  className="col-span-3"
                  value={editingNovel?.author || ''}
                  onChange={(e) => setEditingNovel({...editingNovel, author: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  分类
                </Label>
                <Select
                  value={editingNovel?.category || '其他'}
                  onValueChange={(value) => setEditingNovel({...editingNovel, category: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right pt-2">
                  简介
                </Label>
                <Textarea
                  id="description"
                  placeholder="请输入小说简介"
                  className="col-span-3"
                  rows={4}
                  value={editingNovel?.description || ''}
                  onChange={(e) => setEditingNovel({...editingNovel, description: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cover" className="text-right">
                  封面图片
                </Label>
                <Input
                  id="cover"
                  placeholder="请输入封面图片URL"
                  className="col-span-3"
                  value={editingNovel?.cover_image || ''}
                  onChange={(e) => setEditingNovel({...editingNovel, cover_image: e.target.value})}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                取消
              </Button>
              <Button type="submit" onClick={handleSaveNovel} disabled={isLoading}>
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

export default Novels;
