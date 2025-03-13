
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface NovelCardProps {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  category: string;
  description?: string;
}

const NovelCard: React.FC<NovelCardProps> = ({
  id,
  title,
  author,
  coverImage,
  category,
  description
}) => {
  // 使用默认封面图，如果没有提供的话
  const coverSrc = coverImage || '/placeholder.svg';

  return (
    <motion.div 
      className="novel-card hover-scale"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link to={`/novel/${id}`} className="focus-ring">
        <div className="novel-card-image">
          <img 
            src={coverSrc} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          
          {category && (
            <Badge 
              className="absolute top-2 left-2 bg-background/80 text-foreground backdrop-blur-sm"
            >
              {category}
            </Badge>
          )}
        </div>
        
        <div className="novel-card-content">
          <h3 className="line-clamp-1 text-lg font-bold leading-tight text-novel-title mb-1">
            {title}
          </h3>
          
          <p className="line-clamp-1 text-sm text-muted-foreground">
            {author || '佚名'}
          </p>
          
          {description && (
            <p className="mt-2 line-clamp-2 text-sm text-novel-content">
              {description}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default NovelCard;
