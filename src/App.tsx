
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./ThemeProvider";

// 页面导入
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NovelDetail from "./pages/NovelDetail";
import ChapterDetail from "./pages/ChapterDetail";
import Categories from "./pages/Categories";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Ranking from "./pages/Ranking";
import LatestUpdates from "./pages/LatestUpdates";
import UserProfile from "./pages/UserProfile";
import SearchResults from "./pages/SearchResults";

// 管理员页面导入
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Novels from "./pages/admin/Novels";
import Chapters from "./pages/admin/Chapters";
import Users from "./pages/admin/Users";
import Comments from "./pages/admin/Comments";
import Settings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              {/* 用户前台路由 */}
              <Route path="/" element={<Index />} />
              <Route path="/novel/:id" element={<NovelDetail />} />
              <Route path="/novel/:novelId/chapter/:chapterId" element={<ChapterDetail />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/ranking" element={<Ranking />} />
              <Route path="/latest" element={<LatestUpdates />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/search" element={<SearchResults />} />
              
              {/* 管理员后台路由 */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/novels" element={<Novels />} />
              <Route path="/admin/chapters" element={<Chapters />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/comments" element={<Comments />} />
              <Route path="/admin/settings" element={<Settings />} />
              
              {/* 404页面 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
