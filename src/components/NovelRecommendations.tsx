import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

interface Novel {
  id: number;
  title: string;
  author: string;
  cover_image: string;
  category: string;
  rating: number;
  match_score: number;
}

interface NovelRecommendationsProps {
  novels: Novel[];
  title?: string;
  description?: string;
}

const NovelRecommendations: React.FC<NovelRecommendationsProps> = ({
  novels,
  title = '为您推荐',
  description = '根据您的阅读喜好，为您精选以下小说',
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-yellow-500" />
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {novels.map((novel, index) => (
          <motion.div
            key={novel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link to={`/novel/${novel.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-[3/4]">
                  <img
                    src={novel.cover_image}
                    alt={novel.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-black/50 text-white">
                      匹配度 {Math.round(novel.match_score * 100)}%
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium truncate" title={novel.title}>
                    {novel.title}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-muted-foreground truncate">
                      {novel.author}
                    </span>
                    <Badge variant="outline">{novel.category}</Badge>
                  </div>
                  <div className="mt-2 text-sm text-yellow-500">
                    {'★'.repeat(Math.round(novel.rating))}
                    {'☆'.repeat(5 - Math.round(novel.rating))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NovelRecommendations; 