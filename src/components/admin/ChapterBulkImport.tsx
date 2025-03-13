import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ChapterBulkImportProps {
  novelId: number;
  onImportSuccess: () => void;
}

const ChapterBulkImport: React.FC<ChapterBulkImportProps> = ({
  novelId,
  onImportSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const handleImport = async () => {
    if (!content.trim()) {
      toast.error('请输入要导入的内容');
      return;
    }

    setIsImporting(true);

    try {
      // 解析章节内容
      const chapters = parseChapters(content);
      
      if (chapters.length === 0) {
        toast.error('未能识别出任何章节，请检查格式是否正确');
        return;
      }

      // TODO: 在实际项目中，这里应该调用API保存章节
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast.success(`成功导入 ${chapters.length} 个章节`);
      setIsOpen(false);
      setContent('');
      onImportSuccess();
    } catch (error) {
      toast.error('导入失败，请重试');
    } finally {
      setIsImporting(false);
    }
  };

  // 解析章节内容
  const parseChapters = (text: string) => {
    const chapters: { title: string; content: string }[] = [];
    const lines = text.split('\n');
    let currentTitle = '';
    let currentContent: string[] = [];

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;

      // 假设以"第x章"或"第x节"开头的是章节标题
      if (
        trimmedLine.match(/^第[零一二三四五六七八九十百千万\d]+[章节]/) ||
        trimmedLine.match(/^Chapter\s*\d+/)
      ) {
        // 保存上一章节
        if (currentTitle && currentContent.length > 0) {
          chapters.push({
            title: currentTitle,
            content: currentContent.join('\n'),
          });
        }
        currentTitle = trimmedLine;
        currentContent = [];
      } else {
        currentContent.push(trimmedLine);
      }
    });

    // 保存最后一章
    if (currentTitle && currentContent.length > 0) {
      chapters.push({
        title: currentTitle,
        content: currentContent.join('\n'),
      });
    }

    return chapters;
  };

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        <Upload className="h-4 w-4 mr-2" />
        批量导入章节
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>批量导入章节</DialogTitle>
            <DialogDescription>
              请将章节内容粘贴到下面的文本框中，系统会自动识别章节
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>格式说明</AlertTitle>
              <AlertDescription>
                1. 每个章节必须以"第x章"或"Chapter x"开头
                <br />
                2. 章节标题和内容之间请用换行分隔
                <br />
                3. 不同章节之间可以用空行分隔（可选）
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="chapters">章节内容</Label>
              <Textarea
                id="chapters"
                placeholder="请粘贴章节内容..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              取消
            </Button>
            <Button onClick={handleImport} disabled={isImporting}>
              {isImporting ? '导入中...' : '开始导入'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChapterBulkImport; 