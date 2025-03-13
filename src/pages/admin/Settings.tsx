
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon, 
  Save, 
  RotateCw, 
  Mail, 
  Globe, 
  Shield, 
  Database, 
  Lock, 
  FileText,
  RefreshCw,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';

const Settings: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Site settings mock data
  const [siteSettings, setSiteSettings] = useState({
    siteName: '悦读小说网',
    siteDescription: '提供海量小说在线阅读，更新快、无弹窗、免费读！',
    contactEmail: 'admin@example.com',
    recordNumber: '粤ICP备XXXXXXXX号',
    allowRegistration: true,
    enableComments: true,
    maintenanceMode: false,
    cacheEnabled: true,
    backupFrequency: 'daily'
  });
  
  // Security settings mock data
  const [securitySettings, setSSecuritySettings] = useState({
    adminPassword: '',
    confirmPassword: '',
    loginAttempts: '5',
    sessionTimeout: '120',
    enableCaptcha: true,
    enableTwoFactor: false
  });
  
  const handleSaveSettings = (settingsType: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`${settingsType}设置保存成功`);
    }, 800);
  };
  
  const handleClearCache = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('系统缓存已清除');
    }, 1500);
  };
  
  const handleDatabaseBackup = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('数据库备份已创建，文件名: backup_20250315_120000.sql');
    }, 2000);
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <SettingsIcon className="h-6 w-6" />
            系统设置
          </h1>
        </div>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general" className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              网站设置
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              安全设置
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="flex items-center gap-1">
              <Database className="h-4 w-4" />
              系统维护
            </TabsTrigger>
          </TabsList>
          
          {/* 网站通用设置 */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>网站通用设置</CardTitle>
                <CardDescription>设置网站的基本信息和功能选项</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">网站名称</Label>
                    <Input 
                      id="siteName" 
                      value={siteSettings.siteName}
                      onChange={(e) => setSiteSettings({...siteSettings, siteName: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">联系邮箱</Label>
                    <Input 
                      id="contactEmail" 
                      type="email"
                      value={siteSettings.contactEmail}
                      onChange={(e) => setSiteSettings({...siteSettings, contactEmail: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">网站描述</Label>
                  <Textarea 
                    id="siteDescription" 
                    rows={3}
                    value={siteSettings.siteDescription}
                    onChange={(e) => setSiteSettings({...siteSettings, siteDescription: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="recordNumber">备案号</Label>
                    <Input 
                      id="recordNumber" 
                      value={siteSettings.recordNumber}
                      onChange={(e) => setSiteSettings({...siteSettings, recordNumber: e.target.value})}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">功能设置</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allowRegistration">开放注册</Label>
                      <p className="text-sm text-muted-foreground">
                        允许新用户在网站上注册账号
                      </p>
                    </div>
                    <Switch 
                      id="allowRegistration" 
                      checked={siteSettings.allowRegistration}
                      onCheckedChange={(checked) => setSiteSettings({...siteSettings, allowRegistration: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enableComments">评论功能</Label>
                      <p className="text-sm text-muted-foreground">
                        允许用户对小说和章节发表评论
                      </p>
                    </div>
                    <Switch 
                      id="enableComments" 
                      checked={siteSettings.enableComments}
                      onCheckedChange={(checked) => setSiteSettings({...siteSettings, enableComments: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="maintenanceMode">维护模式</Label>
                      <p className="text-sm text-muted-foreground">
                        启用维护模式，网站将暂时关闭访问
                      </p>
                    </div>
                    <Switch 
                      id="maintenanceMode" 
                      checked={siteSettings.maintenanceMode}
                      onCheckedChange={(checked) => setSiteSettings({...siteSettings, maintenanceMode: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="cacheEnabled">系统缓存</Label>
                      <p className="text-sm text-muted-foreground">
                        启用系统缓存以提高网站访问速度
                      </p>
                    </div>
                    <Switch 
                      id="cacheEnabled" 
                      checked={siteSettings.cacheEnabled}
                      onCheckedChange={(checked) => setSiteSettings({...siteSettings, cacheEnabled: checked})}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button 
                  variant="default" 
                  onClick={() => handleSaveSettings("网站")}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                      保存中...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      保存设置
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* 安全设置 */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>安全设置</CardTitle>
                <CardDescription>管理网站的安全选项和管理员密码</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">管理员密码</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="adminPassword">新密码</Label>
                      <Input 
                        id="adminPassword" 
                        type="password"
                        placeholder="输入新密码"
                        value={securitySettings.adminPassword}
                        onChange={(e) => setSSecuritySettings({...securitySettings, adminPassword: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">确认密码</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password"
                        placeholder="确认新密码"
                        value={securitySettings.confirmPassword}
                        onChange={(e) => setSSecuritySettings({...securitySettings, confirmPassword: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    密码长度至少为8个字符，包含字母、数字和特殊字符
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">账户安全</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="loginAttempts">最大登录尝试次数</Label>
                      <Input 
                        id="loginAttempts" 
                        type="number"
                        min="1"
                        max="10"
                        value={securitySettings.loginAttempts}
                        onChange={(e) => setSSecuritySettings({...securitySettings, loginAttempts: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">会话超时时间（分钟）</Label>
                      <Input 
                        id="sessionTimeout" 
                        type="number"
                        min="10"
                        max="1440"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => setSSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enableCaptcha">启用验证码</Label>
                      <p className="text-sm text-muted-foreground">
                        在登录和注册页面显示验证码
                      </p>
                    </div>
                    <Switch 
                      id="enableCaptcha" 
                      checked={securitySettings.enableCaptcha}
                      onCheckedChange={(checked) => setSSecuritySettings({...securitySettings, enableCaptcha: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enableTwoFactor">双因素认证</Label>
                      <p className="text-sm text-muted-foreground">
                        为管理员账户启用双因素认证
                      </p>
                    </div>
                    <Switch 
                      id="enableTwoFactor" 
                      checked={securitySettings.enableTwoFactor}
                      onCheckedChange={(checked) => setSSecuritySettings({...securitySettings, enableTwoFactor: checked})}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button 
                  variant="default" 
                  onClick={() => handleSaveSettings("安全")}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                      保存中...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      保存安全设置
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* 系统维护 */}
          <TabsContent value="maintenance">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>缓存管理</CardTitle>
                  <CardDescription>管理系统缓存和临时文件</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">系统缓存</h4>
                        <p className="text-sm text-muted-foreground">
                          清除系统缓存以释放空间并解决潜在问题
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={handleClearCache}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <RotateCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            清除缓存
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">临时文件</h4>
                        <p className="text-sm text-muted-foreground">
                          清除系统临时文件和日志
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsLoading(true);
                          setTimeout(() => {
                            setIsLoading(false);
                            toast.success('临时文件已清除');
                          }, 1000);
                        }}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <RotateCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Trash2 className="mr-2 h-4 w-4" />
                            清除文件
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>数据库管理</CardTitle>
                  <CardDescription>管理数据库备份和优化</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">数据库备份</h4>
                        <p className="text-sm text-muted-foreground">
                          创建当前数据库的完整备份
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={handleDatabaseBackup}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <RotateCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Database className="mr-2 h-4 w-4" />
                            创建备份
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">数据库优化</h4>
                        <p className="text-sm text-muted-foreground">
                          优化数据库结构和索引，提高系统性能
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsLoading(true);
                          setTimeout(() => {
                            setIsLoading(false);
                            toast.success('数据库优化完成');
                          }, 2500);
                        }}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <RotateCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <FileText className="mr-2 h-4 w-4" />
                            优化数据库
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;
