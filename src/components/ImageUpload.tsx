import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, currentImage }) => {
  const [previewUrl, setPreviewUrl] = useState<string>(currentImage || '');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      toast.error('请上传图片文件');
      return;
    }

    // 验证文件大小（2MB）
    if (file.size > 2 * 1024 * 1024) {
      toast.error('图片大小不能超过2MB');
      return;
    }

    setIsUploading(true);

    try {
      // 创建预览URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      // TODO: 实际项目中，这里应该调用后端API上传图片
      // 模拟上传延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 假设服务器返回的图片URL
      const imageUrl = URL.createObjectURL(file);
      onImageUpload(imageUrl);
      toast.success('图片上传成功');
    } catch (error) {
      toast.error('图片上传失败，请重试');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl('');
    onImageUpload('');
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {previewUrl ? (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-32 h-32 rounded-full object-cover"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="w-32 h-32 border-2 border-dashed rounded-full flex items-center justify-center bg-gray-50">
          <ImageIcon className="h-8 w-8 text-gray-400" />
        </div>
      )}

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => document.getElementById('image-upload')?.click()}
          disabled={isUploading}
        >
          <Upload className="h-4 w-4 mr-2" />
          {isUploading ? '上传中...' : '上传图片'}
        </Button>
      </div>

      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload; 