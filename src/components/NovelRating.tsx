import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface NovelRatingProps {
  novelId: number;
  initialRating?: number;
  totalRatings?: number;
  averageRating?: number;
  onRatingSubmit?: (rating: number) => void;
  readonly?: boolean;
}

const NovelRating: React.FC<NovelRatingProps> = ({
  novelId,
  initialRating = 0,
  totalRatings = 0,
  averageRating = 0,
  onRatingSubmit,
  readonly = false,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingClick = async (value: number) => {
    if (readonly) return;
    
    setIsSubmitting(true);
    
    try {
      // TODO: 在实际项目中，这里应该调用API提交评分
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setRating(value);
      onRatingSubmit?.(value);
      toast.success('评分提交成功');
    } catch (error) {
      toast.error('评分提交失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <Button
            key={value}
            variant="ghost"
            size="icon"
            className={cn(
              'p-0 h-8 w-8',
              readonly && 'cursor-default'
            )}
            disabled={isSubmitting}
            onMouseEnter={() => !readonly && setHoveredRating(value)}
            onMouseLeave={() => !readonly && setHoveredRating(0)}
            onClick={() => handleRatingClick(value)}
          >
            <Star
              className={cn(
                'h-6 w-6',
                (hoveredRating ? value <= hoveredRating : value <= rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              )}
            />
          </Button>
        ))}
      </div>
      
      {!readonly && (
        <p className="text-sm text-muted-foreground">
          点击星星进行评分
        </p>
      )}
      
      {readonly && totalRatings > 0 && (
        <div className="text-sm text-muted-foreground">
          {averageRating.toFixed(1)} 分 ({totalRatings} 人评分)
        </div>
      )}
    </div>
  );
};

export default NovelRating; 