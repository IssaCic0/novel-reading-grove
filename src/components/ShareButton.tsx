
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Share2, Copy, MessageCircle, Send } from 'lucide-react';
import { toast } from 'sonner';

interface ShareButtonProps {
  title: string;
  url?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  url = window.location.href,
  variant = 'outline',
  size = 'default',
}) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url).then(
      () => toast.success('链接已复制到剪贴板'),
      () => toast.error('复制失败，请手动复制')
    );
  };
  
  const handleShare = (platform: string) => {
    let shareUrl = '';
    
    switch (platform) {
      case 'weibo':
        shareUrl = `http://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        break;
      case 'qq':
        shareUrl = `http://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        break;
      case 'wechat':
        // Normally would show a QR code
        toast.info('请使用微信扫一扫，扫描二维码');
        return;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className="gap-2">
          <Share2 className="h-4 w-4" />
          {size !== 'icon' && '分享'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleShare('weibo')}>
          <MessageCircle className="mr-2 h-4 w-4 text-red-500" />
          分享到微博
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('qq')}>
          <MessageCircle className="mr-2 h-4 w-4 text-blue-500" />
          分享到QQ
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('wechat')}>
          <MessageCircle className="mr-2 h-4 w-4 text-green-500" />
          分享到微信
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink}>
          <Copy className="mr-2 h-4 w-4" />
          复制链接
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareButton;
