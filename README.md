# 期刊Workshop展示网站

一个现代化的学术期刊workshop展示网站，专为GitHub项目设计，具有响应式布局和丰富的交互功能。

## 🌟 功能特性

### 核心功能
- **响应式设计** - 完美适配桌面端、平板和移动设备
- **现代化UI** - 采用渐变色彩和毛玻璃效果，视觉效果出色
- **交互式导航** - 平滑滚动导航，移动端汉堡菜单
- **Workshop展示** - 动态加载和分类过滤功能
- **期刊展示** - 展示合作期刊信息
- **联系表单** - 带验证的联系表单功能

### 技术特性
- **纯前端实现** - HTML5 + CSS3 + JavaScript，无需后端
- **模块化设计** - 代码结构清晰，易于维护
- **性能优化** - 图片懒加载、滚动动画优化
- **无障碍支持** - 键盘导航和屏幕阅读器友好
- **SEO友好** - 语义化HTML结构

## 🚀 快速开始

### 环境要求
- 现代浏览器（Chrome、Firefox、Safari、Edge）
- 本地服务器（推荐使用Live Server）

### 安装步骤

1. **克隆或下载项目**
   ```bash
   git clone <repository-url>
   cd journal-workshop
   ```

2. **启动本地服务器**
   
   使用VS Code Live Server：
   - 安装Live Server扩展
   - 右键点击`index.html`
   - 选择"Open with Live Server"

   或使用Python简单服务器：
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

3. **访问网站**
   ```
   http://localhost:8000
   ```

## 📁 项目结构

```
journal-workshop/
├── index.html          # 主页面文件
├── styles.css          # 样式文件
├── script.js           # JavaScript功能文件
└── README.md           # 项目说明文档
```

## 🎨 页面结构

### 主要部分
1. **导航栏** - 固定顶部导航，支持移动端菜单
2. **首页横幅** - 吸引人的英雄区域，包含浮动卡片动画
3. **关于我们** - 介绍网站使命和统计数据
4. **Workshop展示** - 可过滤的workshop卡片网格
5. **期刊展示** - 合作期刊信息展示
6. **联系我们** - 联系信息和表单
7. **页脚** - 链接和社交媒体信息

### 交互功能
- **平滑滚动** - 点击导航链接平滑滚动到对应部分
- **Workshop过滤** - 按类别过滤workshop内容
- **表单验证** - 实时表单验证和提交反馈
- **响应式菜单** - 移动端汉堡菜单
- **滚动动画** - 元素进入视口时的淡入动画

## 🛠️ 自定义配置

### 修改Workshop数据
在`script.js`文件中找到`loadWorkshopData()`函数，修改`workshopData`数组：

```javascript
const workshopData = [
    {
        id: 1,
        title: '您的Workshop标题',
        description: 'Workshop描述',
        category: 'ai', // ai, data, bio, engineering
        date: '2024-03-15',
        speaker: '演讲者姓名',
        icon: 'fas fa-brain' // Font Awesome图标类名
    },
    // 添加更多workshop...
];
```

### 修改期刊信息
在`index.html`中找到`.publication-grid`部分，修改期刊卡片：

```html
<div class="publication-card">
    <div class="journal-logo">
        <i class="fas fa-atom"></i>
    </div>
    <h3>期刊名称</h3>
    <p>影响因子: XX.X</p>
    <div class="journal-tags">
        <span class="tag">标签1</span>
        <span class="tag">标签2</span>
    </div>
</div>
```

### 修改联系信息
在`index.html`中找到`.contact-info`部分，更新联系信息：

```html
<div class="contact-item">
    <i class="fas fa-envelope"></i>
    <div>
        <h4>邮箱</h4>
        <p>your-email@example.com</p>
    </div>
</div>
```

### 自定义颜色主题
在`styles.css`文件顶部修改CSS变量：

```css
:root {
    --primary-color: #2563eb;    /* 主色调 */
    --secondary-color: #64748b;  /* 次要色调 */
    --accent-color: #f59e0b;     /* 强调色 */
    /* 更多颜色变量... */
}
```

## 📱 响应式断点

- **桌面端**: > 768px
- **平板端**: 768px - 1024px
- **移动端**: < 768px
- **小屏移动端**: < 480px

## 🎯 浏览器支持

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 🔧 开发工具推荐

- **代码编辑器**: VS Code
- **浏览器调试**: Chrome DevTools
- **图标库**: Font Awesome 6
- **字体**: Inter (Google Fonts)

## 📝 更新日志

### v1.0.0 (2024-03-01)
- 初始版本发布
- 完整的响应式设计
- Workshop展示和过滤功能
- 联系表单和验证
- 现代化UI设计

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 支持

如果您遇到任何问题或有任何建议，请：

1. 查看 [Issues](../../issues) 页面
2. 创建新的 Issue
3. 发送邮件至 contact@journalworkshop.org

## 🙏 致谢

- [Font Awesome](https://fontawesome.com/) - 图标库
- [Google Fonts](https://fonts.google.com/) - 字体服务
- [Inter Font](https://rsms.me/inter/) - 主要字体

---

**注意**: 这是一个纯前端项目，所有数据都是静态的。如需动态数据，请集成后端API。
