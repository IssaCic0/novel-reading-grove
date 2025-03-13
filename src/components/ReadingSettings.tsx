
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Settings, Type, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/ThemeProvider';
import { toast } from 'sonner';

interface ReadingSettingsProps {
  onFontSizeChange: (size: number) => void;
  fontSize: number;
}

const ReadingSettings: React.FC<ReadingSettingsProps> = ({ 
  onFontSizeChange,
  fontSize
}) => {
  const { theme, toggleTheme } = useTheme();
  const [tempFontSize, setTempFontSize] = useState(fontSize);

  const handleFontSizeChange = (value: number[]) => {
    setTempFontSize(value[0]);
  };

  const applyFontSize = () => {
    onFontSizeChange(tempFontSize);
    toast.success('阅读设置已更新');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Settings className="h-5 w-5" />
          <span className="sr-only">阅读设置</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium">阅读设置</h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="font-size" className="text-sm font-medium flex items-center">
                <Type className="h-4 w-4 mr-2" />
                字体大小
              </label>
              <span className="text-sm text-muted-foreground">{tempFontSize}px</span>
            </div>
            <Slider
              id="font-size"
              min={12}
              max={24}
              step={1}
              value={[tempFontSize]}
              onValueChange={handleFontSizeChange}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              {theme === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              主题模式
            </div>
            <Button variant="outline" size="sm" onClick={toggleTheme}>
              {theme === 'light' ? '深色模式' : '浅色模式'}
            </Button>
          </div>
          
          <Button className="w-full" onClick={applyFontSize}>
            应用设置
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ReadingSettings;
