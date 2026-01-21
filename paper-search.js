// 论文搜索、过滤、排序和分页功能
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('paperSearch');
    const clearSearchBtn = document.getElementById('clearSearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sortSelect');
    const perPageSelect = document.getElementById('perPageSelect');
    const paperRows = Array.from(document.querySelectorAll('.paper-row'));
    const paperCount = document.getElementById('paperCount');
    const pageInfo = document.getElementById('pageInfo');
    const paperList = document.getElementById('paperList');
    const paginationWrapper = document.getElementById('paginationWrapper');
    const paginationPages = document.getElementById('paginationPages');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const jumpToPageInput = document.getElementById('jumpToPage');
    const jumpBtn = document.getElementById('jumpBtn');
    const detailLinks = document.querySelectorAll('.paper-row-details');

    // 状态管理
    let currentFilter = 'all';
    let currentSearchTerm = '';
    let currentSort = 'date-desc';
    let currentPage = 1;
    let itemsPerPage = 20;
    let filteredPapers = [];

    // 初始化：从所有论文开始
    filteredPapers = [...paperRows];

    // 更新论文计数和分页信息
    function updatePaperInfo() {
        const total = filteredPapers.length;
        const start = total === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
        const end = Math.min(currentPage * itemsPerPage, total);
        
        paperCount.innerHTML = `Showing <strong>${start}-${end}</strong> / <strong>${total}</strong> papers`;
        
        if (total > 0) {
            const totalPages = Math.ceil(total / itemsPerPage);
            pageInfo.textContent = `(Page ${currentPage} / ${totalPages})`;
        } else {
            pageInfo.textContent = '';
        }
    }

    // 排序函数
    function sortPapers(papers) {
        const [sortBy, order] = currentSort.split('-');
        
        return papers.sort((a, b) => {
            let aValue, bValue;
            
            switch(sortBy) {
                case 'title':
                    aValue = a.getAttribute('data-title').toLowerCase();
                    bValue = b.getAttribute('data-title').toLowerCase();
                    break;
                case 'authors':
                    aValue = a.getAttribute('data-authors').toLowerCase();
                    bValue = b.getAttribute('data-authors').toLowerCase();
                    break;
                case 'date':
                    // 假设日期在 meta 中，这里简化处理
                    aValue = a.getAttribute('data-date') || '0';
                    bValue = b.getAttribute('data-date') || '0';
                    break;
                default:
                    return 0;
            }
            
            if (aValue < bValue) return order === 'asc' ? -1 : 1;
            if (aValue > bValue) return order === 'asc' ? 1 : -1;
            return 0;
        });
    }

    // 过滤和搜索论文
    function filterAndSortPapers() {
        filteredPapers = paperRows.filter(row => {
            const type = row.getAttribute('data-type');
            const title = row.getAttribute('data-title').toLowerCase();
            const authors = row.getAttribute('data-authors').toLowerCase();
            
            // 类型过滤
            const typeMatch = currentFilter === 'all' || type === currentFilter;
            
            // 搜索匹配
            const searchMatch = currentSearchTerm === '' || 
                title.includes(currentSearchTerm.toLowerCase()) || 
                authors.includes(currentSearchTerm.toLowerCase());
            
            return typeMatch && searchMatch;
        });

        // 排序
        filteredPapers = sortPapers(filteredPapers);

        // 重置到第一页
        currentPage = 1;
        
        // 渲染
        renderPapers();
        updatePagination();
    }

    // 渲染当前页的论文
    function renderPapers() {
        // 隐藏所有论文
        paperRows.forEach(row => {
            row.style.display = 'none';
        });

        // 计算当前页的范围
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const papersToShow = itemsPerPage === 'all' 
            ? filteredPapers 
            : filteredPapers.slice(start, end);

        // 显示当前页的论文
        papersToShow.forEach(paper => {
            paper.style.display = '';
        });

        // 更新信息
        updatePaperInfo();

        // 显示/隐藏无结果提示
        if (filteredPapers.length === 0) {
            showNoResults();
        } else {
            hideNoResults();
        }

        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 更新分页控件
    function updatePagination() {
        const total = filteredPapers.length;
        const totalPages = itemsPerPage === 'all' ? 1 : Math.ceil(total / itemsPerPage);
        
        // 如果不需要分页，隐藏分页控件
        if (totalPages <= 1 || itemsPerPage === 'all') {
            paginationWrapper.style.display = 'none';
            return;
        }

        paginationWrapper.style.display = 'block';

        // 更新上一页/下一页按钮
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;

        // 生成页码按钮
        paginationPages.innerHTML = '';
        const maxVisiblePages = 7;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // 第一页
        if (startPage > 1) {
            addPageButton(1);
            if (startPage > 2) {
                addEllipsis();
            }
        }

        // 页码按钮
        for (let i = startPage; i <= endPage; i++) {
            addPageButton(i);
        }

        // 最后一页
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                addEllipsis();
            }
            addPageButton(totalPages);
        }

        // 更新跳转输入框
        jumpToPageInput.max = totalPages;
        jumpToPageInput.value = currentPage;
    }

    // 添加页码按钮
    function addPageButton(pageNum) {
        const btn = document.createElement('button');
        btn.className = 'pagination-page';
        if (pageNum === currentPage) {
            btn.classList.add('active');
        }
        btn.textContent = pageNum;
        btn.addEventListener('click', () => {
            currentPage = pageNum;
            renderPapers();
            updatePagination();
        });
        paginationPages.appendChild(btn);
    }

    // 添加省略号
    function addEllipsis() {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'pagination-ellipsis';
        ellipsis.textContent = '...';
        paginationPages.appendChild(ellipsis);
    }

    // 显示"无结果"提示
    function showNoResults() {
        let noResults = document.getElementById('noResults');
        if (!noResults) {
            noResults = document.createElement('div');
            noResults.id = 'noResults';
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <i class="fas fa-search"></i>
                <p>未找到匹配的论文</p>
                <p class="no-results-hint">请尝试使用其他关键词或清除过滤器</p>
            `;
            paperList.appendChild(noResults);
        }
        noResults.style.display = 'block';
    }

    // 隐藏"无结果"提示
    function hideNoResults() {
        const noResults = document.getElementById('noResults');
        if (noResults) {
            noResults.style.display = 'none';
        }
    }

    // 搜索输入事件
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentSearchTerm = this.value.trim();
            
            if (currentSearchTerm.length > 0) {
                clearSearchBtn.style.display = 'flex';
            } else {
                clearSearchBtn.style.display = 'none';
            }
            
            filterAndSortPapers();
        });

        searchInput.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        searchInput.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    }

    // 清除搜索按钮
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', function() {
            searchInput.value = '';
            currentSearchTerm = '';
            this.style.display = 'none';
            filterAndSortPapers();
            searchInput.focus();
        });
    }

    // 过滤器按钮事件
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            filterAndSortPapers();
        });
    });

    // 排序选择事件
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentSort = this.value;
            filterAndSortPapers();
        });
    }

    // 每页数量选择事件
    if (perPageSelect) {
        perPageSelect.addEventListener('change', function() {
            itemsPerPage = this.value === 'all' ? 'all' : parseInt(this.value);
            currentPage = 1;
            renderPapers();
            updatePagination();
        });
    }

    // 上一页按钮
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                renderPapers();
                updatePagination();
            }
        });
    }

    // 下一页按钮
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            const totalPages = itemsPerPage === 'all' 
                ? 1 
                : Math.ceil(filteredPapers.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderPapers();
                updatePagination();
            }
        });
    }

    // 跳转页面
    if (jumpBtn && jumpToPageInput) {
        jumpBtn.addEventListener('click', function() {
            const targetPage = parseInt(jumpToPageInput.value);
            const totalPages = itemsPerPage === 'all' 
                ? 1 
                : Math.ceil(filteredPapers.length / itemsPerPage);
            
            if (targetPage >= 1 && targetPage <= totalPages) {
                currentPage = targetPage;
                renderPapers();
                updatePagination();
            }
        });

        jumpToPageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                jumpBtn.click();
            }
        });
    }

    // 展开/收起摘要
    detailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const row = this.closest('.paper-row');
            if (!row) return;

            let abstractBox = row.querySelector('.paper-row-abstract');
            if (!abstractBox) {
                abstractBox = document.createElement('div');
                abstractBox.className = 'paper-row-abstract';
                const abstractText = row.getAttribute('data-abstract') || '暂无摘要，敬请期待。';
                
                // 获取 poster link，如果存在则加入一个链接
                const posterLink = row.getAttribute('data-poster-link');
                let contentHtml = `<p>${abstractText}</p>`;
                // if (posterLink && posterLink.trim() !== "") {
                //     // 可定制 poster 显示内容
                //     contentHtml += `<p><a href="${posterLink}" target="_blank" rel="noopener" class="poster-link">Poster Link</a></p>`;
                // }
                abstractBox.innerHTML = contentHtml;

                row.appendChild(abstractBox);
            }

            const isOpen = row.classList.toggle('show-abstract');
            abstractBox.style.display = isOpen ? 'block' : 'none';
            this.textContent = isOpen ? 'Hide details' : 'Show details';
        });
    });

    // 键盘快捷键支持
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K 聚焦搜索框
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
        
        // ESC 清除搜索
        if (e.key === 'Escape' && searchInput && searchInput.value.length > 0) {
            searchInput.value = '';
            currentSearchTerm = '';
            clearSearchBtn.style.display = 'none';
            filterAndSortPapers();
        }

        // 左右箭头键翻页
        if (e.key === 'ArrowLeft' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            if (prevPageBtn && !prevPageBtn.disabled) {
                prevPageBtn.click();
            }
        }
        if (e.key === 'ArrowRight' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            if (nextPageBtn && !nextPageBtn.disabled) {
                nextPageBtn.click();
            }
        }
    });

    // URL 参数支持
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    const filterParam = urlParams.get('filter');
    const sortParam = urlParams.get('sort');
    const pageParam = urlParams.get('page');
    
    if (searchParam && searchInput) {
        searchInput.value = searchParam;
        currentSearchTerm = searchParam;
        clearSearchBtn.style.display = 'flex';
    }
    
    if (filterParam) {
        const targetBtn = document.querySelector(`.filter-btn[data-filter="${filterParam}"]`);
        if (targetBtn) {
            filterButtons.forEach(b => b.classList.remove('active'));
            targetBtn.classList.add('active');
            currentFilter = filterParam;
        }
    }

    if (sortParam && sortSelect) {
        sortSelect.value = sortParam;
        currentSort = sortParam;
    }

    if (pageParam) {
        currentPage = parseInt(pageParam) || 1;
    }
    
    // 初始化
    filterAndSortPapers();
    updatePagination();
});
