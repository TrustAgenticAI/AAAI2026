// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initSmoothScrolling();
    initScheduleFeatures();
});

// 导航功能
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // 移动端菜单切换
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // 点击导航链接时关闭移动端菜单
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // 滚动时导航栏样式变化
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
    });
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.speaker-card, .organizer-card, .paper-item, .schedule-row');
    animatedElements.forEach(el => observer.observe(el));
}

// 平滑滚动
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 60; // 考虑导航栏高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 日程表功能
function initScheduleFeatures() {
    // 添加日程表交互功能
    const scheduleRows = document.querySelectorAll('.schedule-row');
    
    scheduleRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            if (!this.classList.contains('coffee-break') && !this.classList.contains('lunch')) {
                this.style.backgroundColor = 'var(--bg-secondary)';
            }
        });
        
        row.addEventListener('mouseleave', function() {
            if (!this.classList.contains('coffee-break') && !this.classList.contains('lunch')) {
                this.style.backgroundColor = '';
            }
        });
    });

    // 添加当前时间高亮功能
    highlightCurrentTime();
}

// 高亮当前时间
function highlightCurrentTime() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    const scheduleRows = document.querySelectorAll('.schedule-row');
    
    scheduleRows.forEach(row => {
        const timeCell = row.querySelector('.time');
        if (timeCell) {
            const timeText = timeCell.textContent.trim();
            const timeMatch = timeText.match(/(\d{1,2}):(\d{2})/);
            
            if (timeMatch) {
                const startHour = parseInt(timeMatch[1]);
                const startMinute = parseInt(timeMatch[2]);
                const startTime = startHour * 60 + startMinute;
                
                // 检查是否在时间范围内（假设每个活动持续30分钟）
                if (currentTime >= startTime && currentTime < startTime + 30) {
                    row.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
                    row.style.borderLeft = '4px solid var(--primary-color)';
                }
            }
        }
    });
}

// 添加页面加载动画
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // 为hero部分添加动画
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('fade-in-up');
        }, 300);
    }
});

// 添加滚动进度指示器
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// 初始化滚动进度条
initScrollProgress();

// 添加键盘导航支持
document.addEventListener('keydown', function(e) {
    // ESC键关闭移动端菜单
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// 添加简单的搜索功能（可选）
function initSearch() {
    // 为论文部分添加搜索功能
    const papersSection = document.querySelector('.papers');
    if (papersSection) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div class="search-box">
                <input type="text" id="paperSearch" placeholder="Search papers..." />
                <i class="fas fa-search"></i>
            </div>
        `;
        
        const sectionHeader = papersSection.querySelector('h2');
        sectionHeader.insertAdjacentElement('afterend', searchContainer);
        
        // 添加搜索样式
        const searchStyles = `
            <style>
            .search-container {
                margin: 1rem 0 2rem 0;
                text-align: center;
            }
            .search-box {
                position: relative;
                max-width: 400px;
                margin: 0 auto;
            }
            .search-box input {
                width: 100%;
                padding: 10px 40px 10px 16px;
                border: 2px solid var(--border-color);
                border-radius: 25px;
                font-size: 0.875rem;
                transition: border-color 0.3s ease;
            }
            .search-box input:focus {
                outline: none;
                border-color: var(--primary-color);
            }
            .search-box i {
                position: absolute;
                right: 16px;
                top: 50%;
                transform: translateY(-50%);
                color: var(--text-light);
            }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', searchStyles);
        
        // 添加搜索功能
        const searchInput = document.getElementById('paperSearch');
        const paperItems = document.querySelectorAll('.paper-item');
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            paperItems.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const authors = item.querySelector('.authors').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || authors.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// 初始化搜索功能
initSearch();

// 添加简单的主题切换功能（可选）
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: var(--primary-color);
        color: white;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });
}

// 添加触摸手势支持（移动端）
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // 向左滑动
            console.log('Swipe left');
        } else {
            // 向右滑动
            console.log('Swipe right');
        }
    }
}

// 添加性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化滚动事件
const debouncedScrollHandler = debounce(function() {
    // 滚动处理逻辑
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// 添加简单的统计功能
function initAnalytics() {
    // 跟踪页面访问
    console.log('Workshop page loaded');
    
    // 跟踪链接点击
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Link clicked:', this.href);
        });
    });
}

// 初始化统计功能
initAnalytics();