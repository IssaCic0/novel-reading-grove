# 🌟 Novel Reading Grove

<div align="center">

![Novel Reading Grove](https://img.shields.io/badge/Novel%20Reading%20Grove-v1.0.0-blue)
![React](https://img.shields.io/badge/React-18.x-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

<p align="center">
  <strong>🎨 现代化的小说阅读平台 | Modern Novel Reading Platform</strong>
  <br>
  <i>让阅读成为一种享受 | Make Reading a Pleasure</i>
</p>

[演示 Demo](https://your-demo-link.com) · 
[报告问题 Report Bug](https://github.com/your-repo/issues) · 
[功能建议 Request Feature](https://github.com/your-repo/issues)

</div>

## ✨ 特性亮点

### 🎯 核心功能
- 📚 **智能推荐系统**
  - 基于用户阅读历史的个性化推荐
  - 相似小说智能匹配
  - 热门榜单实时更新

- 🎨 **优雅的阅读体验**
  - 自适应阅读布局
  - 多主题切换支持
  - 字体大小调节
  - 阅读进度记忆

- 🔍 **强大的搜索功能**
  - 模糊搜索支持
  - 分类筛选
  - 标签系统
  - 高级过滤选项

### 🛠 技术特色

- 💫 **流畅的动画效果**
  - 页面过渡动画
  - 卡片悬浮效果
  - 加载动画
  - 滚动视差

- 🎯 **现代化技术栈**
  - React 18 + TypeScript
  - TailwindCSS
  - Framer Motion
  - Shadcn/ui

- 📱 **响应式设计**
  - 移动端优先
  - 平板适配
  - 桌面端优化

## 🚀 快速开始

### 环境要求

- Node.js 16.x 或更高版本
- npm 7.x 或更高版本
- Git

### 安装步骤

1. 克隆仓库并进入项目目录
```bash
# 克隆项目
git clone https://github.com/your-username/novel-reading-grove.git

# 进入项目目录
cd novel-reading-grove
```

2. 安装项目依赖
```bash
# 使用 npm 安装依赖
npm install
```

3. 启动开发服务器
```bash
# 启动开发环境
npm run dev
```
启动成功后，在浏览器中访问 http://localhost:8080 即可看到项目运行效果

4. 构建生产版本（可选）
```bash
# 构建生产环境版本
npm run build
```
构建完成后，生成的文件将位于 `dist` 目录中

### 常见问题

如果在安装过程中遇到问题，请尝试以下解决方案：

1. 确保 Node.js 和 npm 版本符合要求
```bash
# 检查 Node.js 版本
node --version

# 检查 npm 版本
npm --version
```

2. 如果依赖安装失败，尝试清除 npm 缓存
```bash
npm cache clean --force
npm install
```

3. 如果启动开发服务器时端口被占用，可以修改 `vite.config.ts` 中的端口配置

## 📖 使用指南

### 用户功能
- 📚 浏览和搜索小说
- 🔖 添加书签和收藏
- ⭐ 评分和评论
- 📱 移动端阅读

### 管理功能
- 📊 数据统计和分析
- 📝 内容管理
- 👥 用户管理
- 🔒 权限控制

## 🎨 自定义主题

项目使用 TailwindCSS 进行样式管理，支持深色模式和自定义主题。您可以通过修改 `index.css` 文件来自定义主题：

```css
@layer base {
  :root {
    /* 主题色 */
    --primary: 221.2 83% 53.3%;    /* 主色调 */
    --secondary: 210 40% 96.1%;    /* 次要色调 */
    --accent: 210 40% 96.1%;       /* 强调色 */
    
    /* 背景和前景色 */
    --background: 210 40% 98%;     /* 背景色 */
    --foreground: 222.2 84% 4.9%;  /* 前景色 */
    
    /* 卡片样式 */
    --card: 0 0% 100%;             /* 卡片背景 */
    --card-foreground: 222.2 84% 4.9%;
    
    /* 弹出层样式 */
    --popover: 0 0% 100%;          /* 弹出层背景 */
    --popover-foreground: 222.2 84% 4.9%;
    
    /* 边框和输入框 */
    --border: 214.3 31.8% 91.4%;   /* 边框颜色 */
    --input: 214.3 31.8% 91.4%;    /* 输入框颜色 */
    
    /* 圆角 */
    --radius: 0.75rem;             /* 默认圆角大小 */
  }

  /* 深色模式 */
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* 其他深色模式配色... */
  }
}

/* 自定义字体 */
@layer base {
  :root {
    --font-sans: 'Noto Sans SC', system-ui, sans-serif;    /* 无衬线字体 */
    --font-serif: 'Noto Serif SC', Georgia, serif;         /* 衬线字体 */
  }
}

### 主题定制说明

1. **颜色系统**
   - 使用 HSL 颜色格式（色相、饱和度、亮度）
   - 支持亮色和暗色两种模式
   - 可以通过修改 CSS 变量快速更换主题

2. **字体系统**
   - 默认使用思源黑体和思源宋体
   - 支持自定义字体族
   - 包含优雅的降级方案

3. **响应式设计**
   - 支持根据屏幕尺寸自动调整
   - 可以针对不同设备定制样式

4. **组件主题**
   - 所有组件样式都基于主题变量
   - 支持全局统一更换主题
   - 可以针对单个组件覆盖样式

## 🤝 贡献指南

我们欢迎所有形式的贡献，无论是新功能、bug 修复还是文档改进。

1. Fork 项目
2. 创建特性分支 (\`git checkout -b feature/AmazingFeature\`)
3. 提交改动 (\`git commit -m 'Add some AmazingFeature'\`)
4. 推送到分支 (\`git push origin feature/AmazingFeature\`)
5. 开启 Pull Request

## 📄 开源协议

该项目基于 MIT 协议开源 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

<div align="center">

**Novel Reading Grove** ©2024 Created by [Your Name]

</div>
