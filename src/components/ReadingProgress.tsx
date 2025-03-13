
import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

const ReadingProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      setProgress(scrollPercent * 100);
    };

    // Update on mount
    updateProgress();

    // Add scroll listener
    window.addEventListener('scroll', updateProgress);
    
    // Clean up
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1">
      <Progress value={progress} className="h-full rounded-none" />
    </div>
  );
};

export default ReadingProgress;
