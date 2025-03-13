
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Settings, Home, Menu, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

// 假数据
const novelsData = {
  1: { id: 1, title: '斗破苍穹', author: '天蚕土豆' },
  2: { id: 2, title: '盗墓笔记', author: '南派三叔' },
  3: { id: 3, title: '何以笙箫默', author: '顾漫' },
};

const chaptersData = {
  1: [
    { id: 1, title: '第一章 萧炎的逆袭', novelId: 1, content: '在家族的冷遇下，萧炎努力修炼，终于迎来了自己的逆袭。\n\n萧炎站在山巅，感受着体内澎湃的斗气。他曾经被称为天才，却在十二岁那年突然成为了废物。三年的冷遇和嘲笑，他默默承受，从未放弃。\n\n今天，他将向所有人证明，他萧炎，从未真正堕落！\n\n"三段斗之气，这就是我的力量！"萧炎握紧拳头，眼中闪烁着坚定的光芒。\n\n风萧萧兮易水寒，壮士一去兮不复还。萧炎知道，自己的修炼之路才刚刚开始，前方还有无数荆棘与挑战，但他已做好准备，迎接一切。', order: 1 },
    { id: 2, title: '第二章 幽魂的出现', novelId: 1, content: '一缕幽魂从戒指中浮现，萧炎的命运开始改变。\n\n"小家伙，区区三段斗之气就得意成这样？真是井底之蛙啊！"一个慵懒而充满磁性的声音突然在萧炎耳边响起。\n\n萧炎大惊，环顾四周却没有发现任何人影。"谁？"他警惕地问道。\n\n"看看你手上的戒指。"那声音再次响起。\n\n萧炎低头，只见手上那枚从小戴着的黑色戒指上，正冒出一缕淡淡的紫色烟雾，随后逐渐凝聚成一个虚幻的老者形象。\n\n"我乃药尘，斗气大陆曾经赫赫有名的炼药师。"紫色虚影自我介绍道，"小家伙，你的天赋不错，要不要做我的徒弟？"\n\n萧炎眼中闪过震惊，随后是狂喜。他知道，自己的命运，从此改变！', order: 2 },
  ],
  2: [
    { id: 3, title: '第一章 吴邪的探险', novelId: 2, content: '吴邪在一次偶然的机会中得到了战国帛书，开始了他的探险之旅。\n\n吴邪翻看着祖父留下的笔记，上面记载着无数神秘的墓葬和宝藏。作为一个古董店老板，他对这些早已司空见惯，但这一次，不知为何，他感到一阵莫名的悸动。\n\n"三叔，我决定去了。"吴邪对电话那头的三叔说道。\n\n"小邪，你确定吗？那地方可不简单。"三叔的声音充满担忧。\n\n"我想知道爷爷到底在寻找什么，为什么会突然失踪。"吴邪坚定地说。\n\n挂断电话，吴邪将那张据说是战国时期的帛书小心翼翼地收好。帛书上绘制的地图将引领他前往一个未知的世界，一个充满危险但也可能蕴藏着真相的世界。', order: 1 },
    { id: 4, title: '第二章 古墓的秘密', novelId: 2, content: '在古墓中，吴邪和他的伙伴们揭开了隐藏已久的秘密。\n\n"这里就是帛书上标记的位置了。"吴邪站在一片荒芜的山地前，对身旁的胖子说道。\n\n"看不出有什么特别的啊，老吴。"胖子挠了挠头。\n\n就在这时，一个冷峻的声音从身后传来："墓道入口在那块石头下面。"\n\n吴邪和胖子转身，看到一个身穿黑衣，面容冷峻的年轻人站在不远处。\n\n"你是谁？"吴邪警惕地问道。\n\n"张起灵。"黑衣人简短地回答，然后径直走向那块看似普通的大石头。\n\n在张起灵的带领下，三人找到了墓道入口，开始了地下探险。洞内钟乳石密布，空气阴冷潮湿，墙壁上刻满了奇怪的符号和壁画。\n\n"这些...好像是记载某种仪式的。"吴邪仔细研究着壁画，脸色逐渐变得凝重，"不对劲，这墓里可能有我们想象不到的东西..."', order: 2 },
  ],
  3: [
    { id: 5, title: '第一章 大学时光', novelId: 3, content: '赵默笙与何以琛的相遇，开启了一段美好的大学时光。\n\n北京城的秋天，金桂飘香。C大校园里，法学院的新生赵默笙正匆匆赶往教室，不料在拐角处与一个男生撞了个满怀。\n\n"对不起！"赵默笙连忙道歉，抬头却见到了一张令她瞬间失神的面容。\n\n男生淡淡点头，拾起散落的书本递给她，然后转身离去。赵默笙站在原地，心跳莫名加速。\n\n后来她才知道，那个男生名叫何以琛，是法学院公认的才子，冷静自持，成绩优异，是多少女生心中的白马王子。\n\n"默笙，你不会也对何以琛有意思吧？"室友打趣道。\n\n赵默笙笑而不答，但心中早已种下了一颗悸动的种子。她开始有意无意地出现在何以琛可能出现的地方，图书馆、自习室、法学讲座...\n\n她不知道的是，命运已经悄悄为他们编织了一张网，将两颗年轻的心紧紧相连。', order: 1 },
    { id: 6, title: '第二章 爱情的纠葛', novelId: 3, content: '两人之间的误会与爱恋交织，最终走向了不同的道路。\n\n"何以琛，你真的要去美国了吗？"赵默笙站在何以琛的宿舍门口，声音微微发颤。\n\n何以琛整理着行李，头也不抬："嗯，下周出发。"\n\n"那...我们怎么办？"赵默笙咬着嘴唇。\n\n"什么怎么办？"何以琛停下手中的动作，转身看向她，"默笙，我们之间..."他顿了顿，"我从未承诺过什么。"\n\n赵默笙如遭雷击，泪水在眼眶中打转："你的意思是，这两年来，我们之间的一切都是我一厢情愿？"\n\n何以琛沉默，这沉默比任何回答都更伤人。\n\n"好，我明白了。"赵默笙擦去眼泪，挺直腰背，"何以琛，祝你在美国一切顺利。再见。"\n\n说完，她转身离去，决定将这段感情永远埋藏在心底。她不知道的是，何以琛望着她离去的背影，眼中满是痛苦和不舍，但他有不得不离开的理由，有不能说出口的苦衷...', order: 2 },
  ],
};

const ChapterDetail: React.FC = () => {
  const { novelId, chapterId } = useParams();
  const nId = parseInt(novelId || '1');
  const cId = parseInt(chapterId || '1');
  
  const [novel, setNovel] = useState<any>(null);
  const [chapter, setChapter] = useState<any>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fontSize, setFontSize] = useState(18);
  const [theme, setTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const navigate = useNavigate();
  
  // 获取当前章节的索引和前后章节
  const currentIndex = chapters.findIndex(c => c.id === cId);
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;
  
  useEffect(() => {
    // 模拟API请求
    setIsLoading(true);
    
    setTimeout(() => {
      setNovel(novelsData[nId as keyof typeof novelsData]);
      setChapters(chaptersData[nId as keyof typeof chaptersData] || []);
      
      const currentChapter = chaptersData[nId as keyof typeof chaptersData]?.find(c => c.id === cId);
      setChapter(currentChapter);
      
      setIsLoading(false);
      
      // 自动保存阅读记录
      if (currentChapter) {
        console.log(`保存阅读记录: 小说ID=${nId}, 章节ID=${cId}`);
        // 这里假设是进行API调用保存阅读记录
      }
    }, 800);
    
    // 监听滚动以显示/隐藏回到顶部按钮
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [nId, cId]);
  
  const changeChapter = (targetChapterId: number) => {
    navigate(`/novel/${nId}/chapter/${targetChapterId}`);
    window.scrollTo(0, 0);
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const changeTheme = (newTheme: 'light' | 'sepia' | 'dark') => {
    setTheme(newTheme);
    toast.success(`已切换到${newTheme === 'light' ? '浅色' : newTheme === 'sepia' ? '护眼' : '深色'}主题`);
  };
  
  const changeFontSize = (delta: number) => {
    const newSize = fontSize + delta;
    if (newSize >= 14 && newSize <= 24) {
      setFontSize(newSize);
      toast.success(`字体大小已调整为 ${newSize}px`);
    }
  };
  
  if (isLoading || !novel || !chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-novel-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-muted-foreground">加载中...</p>
        </div>
      </div>
    );
  }

  // 根据主题设置样式
  const themeStyles = {
    light: 'bg-white text-gray-800',
    sepia: 'bg-[#f8f2e4] text-[#5f4b32]',
    dark: 'bg-[#1a1a1a] text-[#e0e0e0]'
  };
  
  return (
    <div className={`min-h-screen ${themeStyles[theme]}`}>
      {/* 顶部导航 */}
      <header className={`sticky top-0 z-50 border-b ${theme === 'light' ? 'bg-white border-gray-200' : theme === 'sepia' ? 'bg-[#f8f2e4] border-[#e2d9c8]' : 'bg-[#1a1a1a] border-[#333]'} backdrop-blur-sm`}>
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to={`/novel/${nId}`} className="flex items-center gap-1 text-sm font-medium hover:opacity-80">
              <ArrowLeft className="h-4 w-4" />
              返回
            </Link>
            <div className={`text-sm font-medium truncate max-w-[150px] md:max-w-xs ${theme === 'dark' ? 'text-gray-300' : ''}`}>
              {novel.title}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="目录">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>目录</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-1">
                  {chapters.map((c) => (
                    <button
                      key={c.id}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${c.id === cId ? 'bg-primary/10 text-primary font-medium' : ''}`}
                      onClick={() => changeChapter(c.id)}
                    >
                      {c.title}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="设置">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeTheme('light')}>
                  浅色主题
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeTheme('sepia')}>
                  护眼模式
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeTheme('dark')}>
                  深色主题
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeFontSize(1)}>
                  增大字号
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeFontSize(-1)}>
                  减小字号
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/">
              <Button variant="ghost" size="icon" aria-label="首页">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* 章节内容 */}
      <div className="reading-container max-w-3xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={`text-2xl md:text-3xl font-serif font-bold mb-4 text-center ${theme === 'dark' ? 'text-gray-200' : ''}`}>
            {chapter.title}
          </h1>
          
          <div className={`flex justify-center items-center gap-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-8`}>
            <span>{novel.title}</span>
            <span>{novel.author}</span>
          </div>
          
          <div 
            className="chapter-content"
            style={{ 
              fontSize: `${fontSize}px`,
              color: theme === 'light' ? '#333' : theme === 'sepia' ? '#5f4b32' : '#e0e0e0'
            }}
          >
            {chapter.content.split('\n\n').map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
        
        {/* 章节导航 */}
        <div className="mt-12 flex justify-between">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => prevChapter && changeChapter(prevChapter.id)}
            disabled={!prevChapter}
          >
            <ArrowLeft className="h-4 w-4" />
            上一章
          </Button>
          
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => nextChapter && changeChapter(nextChapter.id)}
            disabled={!nextChapter}
          >
            下一章
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* 回到顶部按钮 */}
      {showBackToTop && (
        <button
          className={`fixed bottom-6 right-6 p-3 rounded-full shadow-md ${theme === 'light' ? 'bg-white text-gray-800' : theme === 'sepia' ? 'bg-[#f8f2e4] text-[#5f4b32]' : 'bg-[#333] text-[#e0e0e0]'} hover:opacity-90 transition-all`}
          onClick={scrollToTop}
          aria-label="回到顶部"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default ChapterDetail;
