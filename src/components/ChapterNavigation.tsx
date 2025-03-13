
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ListOrdered, Home } from 'lucide-react';
import { toast } from 'sonner';

interface ChapterNavigationProps {
  novelId: number;
  currentChapterId: number;
  prevChapterId?: number;
  nextChapterId?: number;
  totalChapters: number;
  currentChapterIndex: number;
}

const ChapterNavigation: React.FC<ChapterNavigationProps> = ({
  novelId,
  currentChapterId,
  prevChapterId,
  nextChapterId,
  totalChapters,
  currentChapterIndex,
}) => {
  const handleSaveProgress = () => {
    // In a real app, this would save to backend/localStorage
    toast.success('阅读进度已保存');
  };
  
  return (
    <div className="flex items-center justify-between p-4 bg-card border-t">
      <div className="flex items-center gap-2">
        <Link to={`/novel/${novelId}`}>
          <Button variant="ghost" size="sm">
            <Home className="h-4 w-4 mr-2" />
            返回详情
          </Button>
        </Link>
        
        <Button variant="ghost" size="sm" onClick={handleSaveProgress}>
          <ListOrdered className="h-4 w-4 mr-2" />
          保存进度
        </Button>
      </div>
      
      <div className="text-sm text-muted-foreground">
        {currentChapterIndex + 1} / {totalChapters}
      </div>
      
      <div className="flex items-center gap-2">
        {prevChapterId ? (
          <Link to={`/novel/${novelId}/chapter/${prevChapterId}`}>
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4 mr-2" />
              上一章
            </Button>
          </Link>
        ) : (
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4 mr-2" />
            上一章
          </Button>
        )}
        
        {nextChapterId ? (
          <Link to={`/novel/${novelId}/chapter/${nextChapterId}`}>
            <Button size="sm">
              下一章
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        ) : (
          <Button size="sm" disabled>
            下一章
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChapterNavigation;
