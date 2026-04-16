// 数据
var treeData = [{
    id:'root', label:'全部', open:true,
    files:[
        {name:'电梯升降机.glb', model:'--', maker:'--', cat:'电梯客运系统', time:'2026-03-02 10:00:50'},
        {name:'站内自动扶梯.glb', model:'--', maker:'--', cat:'电梯客运系统', time:'2026-03-02 10:00:50'},
        {name:'门禁.glb', model:'--', maker:'--', cat:'门禁系统', time:'2026-03-02 10:01:15'},
        {name:'枪机.glb', model:'--', maker:'--', cat:'通信系统', time:'2026-03-02 10:01:15'},
        {name:'球机.glb', model:'--', maker:'--', cat:'通信系统', time:'2026-03-02 10:01:15'},
        {name:'自动客服桌子.glb', model:'--', maker:'--', cat:'自动售检票系统', time:'2026-03-02 10:01:15'},
        {name:'卷帘门.glb', model:'--', maker:'--', cat:'站台门系统', time:'2026-03-03 11:20:23'},
        {name:'PSD_滑动门.glb', model:'--', maker:'--', cat:'站台门系统', time:'2026-03-04 14:50:28'}
    ],
    children:[
        {id:'n1', label:'电梯客运系统', open:true, files:[{name:'电梯升降机.glb', model:'--', maker:'--', cat:'电梯客运系统', time:'2026-03-02 10:00:50'},{name:'站内自动扶梯.glb', model:'--', maker:'--', cat:'电梯客运系统', time:'2026-03-02 10:00:50'}], children:[
            {id:'n1-1', label:'楼梯升降机', open:false, files:[{name:'电梯升降机.glb', model:'--', maker:'--', cat:'电梯客运系统', time:'2026-03-02 10:00:50'}], children:[]},
            {id:'n1-2', label:'自动扶梯', open:false, files:[{name:'站内自动扶梯.glb', model:'--', maker:'--', cat:'电梯客运系统', time:'2026-03-02 10:00:50'}], children:[]}
        ]},
        {id:'n2', label:'门禁系统', open:false, files:[{name:'门禁.glb', model:'--', maker:'--', cat:'门禁系统', time:'2026-03-02 10:01:15'}], children:[]},
        {id:'n3', label:'通信系统', open:false, files:[{name:'枪机.glb', model:'--', maker:'--', cat:'通信系统', time:'2026-03-02 10:01:15'},{name:'球机.glb', model:'--', maker:'--', cat:'通信系统', time:'2026-03-02 10:01:15'}], children:[]},
        {id:'n4', label:'自动售检票系统', open:false, files:[{name:'自动客服桌子.glb', model:'--', maker:'--', cat:'自动售检票系统', time:'2026-03-02 10:01:15'}], children:[]},
        {id:'n5', label:'环境与设备监控系统', open:false, files:[], children:[]},
        {id:'n6', label:'站台门系统', open:false, files:[{name:'卷帘门.glb', model:'--', maker:'--', cat:'站台门系统', time:'2026-03-03 11:20:23'},{name:'PSD_滑动门.glb', model:'--', maker:'--', cat:'站台门系统', time:'2026-03-04 14:50:28'}], children:[]}
    ]
}];

var importTreeLabels = ['通风空调与采暖系统','给水与排水设备','供电','通信系统','主变电系统','电梯客运系统','自动售检票系统','乘客信息系统','灭火系统','安防系统','门禁系统','防雷与接地','环境与设备监控系统','站台门系统','综合监控系统'];
var importFiles = [{name:'枪机.glb'},{name:'球机.glb'},{name:'门禁.glb'},{name:'自动客服桌子.glb'},{name:'票房售票机.glb'},{name:'自动客服.glb'},{name:'自动售票机.glb'},{name:'站内自动扶梯.glb'},{name:'站外自动扶梯.glb'},{name:'楼梯升降机.glb'}];
var exportTasks = [
    {name:'《重庆十五号线项目》bim项目设备数据包20260303082328.zip',hl:false},
    {name:'《重庆十五号线项目》bim项目设备数据包20260303084701.zip',hl:false},
    {name:'《重庆十五号线项目》bim项目设备数据包20260303085209.zip',hl:true},
    {name:'《重庆十五号线项目》bim项目设备数据包20260303085401.zip',hl:false},
    {name:'《重庆十五号线项目》bim项目设备数据包20260303090856.zip',hl:false},
    {name:'《重庆十五号线项目》bim项目设备数据��20260303095128.zip',hl:false},
    {name:'《重庆十五号线项目》bim项目设备数据包20260303151235.zip',hl:false}
];

// Toast
var toastMsgs = { download: '开始下载 1个文件', delete: '删除成功', export: '导出任务已创建，请到「导出任务」中查看进度' };
function showToast(type) {
    var msg = toastMsgs[type] || (type||'操作成功');
    var wrap = document.getElementById('toast-wrap');
    var bar = document.createElement('div');
    bar.className = 'toast-bar';
    bar.innerHTML = '<div class="toast-icon-ok"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5"><polyline points="20 6 9 17 4 12"/></svg></div>' + msg;
    wrap.appendChild(bar);
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ bar.classList.add('show'); }); });
    setTimeout(function(){ bar.classList.remove('show');setTimeout(function(){ if(bar.parentNode) bar.parentNode.removeChild(bar); }, 300); }, 3000);
}

function doExportFile() { showToast('export'); }

// Modal
function showModal(id){ document.getElementById(id).classList.add('show'); }
function hideModal(id){ document.getElementById(id).classList.remove('show'); }
document.querySelectorAll('.modal-overlay').forEach(function(o){ o.addEventListener('click', function(e){ if(e.target===o) o.classList.remove('show'); }); });

// 文件夹图标
function folderIcon(open){
    var c = open ? '#e8a054' : '#f0b76a';
    return '<svg viewBox="0 0 16 13" fill="none" width="15" height="13">' + '<rect x="0" y="3" width="15" height="9.5" rx="1.5" fill="'+c+'" opacity="0.3" stroke="'+c+'" stroke-width="1"/><rect x="0" y="0.5" width="6" height="3.5" rx="1" fill="'+c+'" opacity="0.65"/></svg>';
}

// 树形结构
var currentPopup = null;
function closeAllPopups(){ document.querySelectorAll('.tn-popup').forEach(function(p){ p.remove(); }); currentPopup=null; }
document.addEventListener('click', function(e){ if(!e.target.closest('.tn-menu-btn')&&!e.target.closest('.tn-popup')) closeAllPopups(); });

function buildTree(nodes, container, depth){
    nodes.forEach(function(node){
        var wrap = document.createElement('div');
        wrap.className = 'tn-wrap';
        var row = document.createElement('div');
        row.className = 'tn-row';
        row.style.paddingLeft = (8+depth*14)+'px';
        var hasChildren = node.children && node.children.length > 0;

        var arrowEl = document.createElement('span');
        arrowEl.className = 'tn-arrow';
        if(hasChildren){ arrowEl.innerHTML = '&#9654;'; arrowEl.style.transform = node.open?'rotate(90deg)':'rotate(0deg)'; }

        var folderEl = document.createElement('span');
        folderEl.className = 'tn-folder';
        folderEl.innerHTML = folderIcon(node.open);

        var labelEl = document.createElement('span');
        labelEl.className = 'tn-label';
        labelEl.textContent = node.label;

        var menuBtn = document.createElement('div');
        menuBtn.className = 'tn-menu-btn';
        menuBtn.innerHTML = '<span></span><span></span><span></span>';
        menuBtn.onclick = function(e){
            e.stopPropagation();
            closeAllPopups();
            var popup = document.createElement('div');
            popup.className = 'tn-popup';
            var delItem = document.createElement('div');
            delItem.className = 'tn-popup-item';
            delItem.textContent = '删除';
            delItem.onclick = function(e){ e.stopPropagation(); closeAllPopups(); showModal('modal-confirm'); };
            popup.appendChild(delItem);
            row.style.position='relative';
            row.appendChild(popup);
            currentPopup=popup;
        };

        row.appendChild(arrowEl); row.appendChild(folderEl); row.appendChild(labelEl); row.appendChild(menuBtn);

        var childDiv = null;
        if(hasChildren){
            childDiv = document.createElement('div');
            childDiv.style.display = node.open?'block':'none';
            buildTree(node.children, childDiv, depth+1);
        }

        row.addEventListener('click', function(e){
            if(e.target.closest('.tn-menu-btn')||e.target.closest('.tn-popup')) return;
            if(hasChildren){
                node.open = !node.open;
                arrowEl.style.transform = node.open?'rotate(90deg)':'rotate(0deg)';
                folderEl.innerHTML = folderIcon(node.open);
                if(childDiv) childDiv.style.display = node.open?'block':'none';
            }
            renderTable(node.files||[]);
            document.querySelectorAll('.tn-row').forEach(function(r){ r.classList.remove('selected'); });
            row.classList.add('selected');
        });

        wrap.appendChild(row);
        if(childDiv) wrap.appendChild(childDiv);
        container.appendChild(wrap);
    });
}

// 表格渲染
function renderTable(files){
    var tbody = document.getElementById('table-body');
    tbody.innerHTML='';
    if(!files||files.length===0){
        var tr=document.createElement('tr');
        tr.innerHTML='<td colspan="7" style="text-align:center;color:#ccc;padding:40px 0;">暂无数据</td>';
        tbody.appendChild(tr); return;
    }
    files.forEach(function(f){
        var tr=document.createElement('tr');
        tr.innerHTML='<td style="padding-left:12px;"><input type="checkbox" class="row-cb" style="accent-color:#e65c3b;width:14px;height:14px;" onchange="syncHeaderCb()"></td>'+'<td>'+f.name+'</td>'
            +'<td class="col-dash">'+(f.model||'--')+'</td>'
            +'<td class="col-dash">'+(f.maker||'--')+'</td>'
            +'<td><span class="cat-tag">'+(f.cat||'--')+'</span></td>'
            +'<td>'+f.time+'</td>'
            +'<td><div class="op-btns">'
            +'<button class="op-btn" onclick="openDetail(\''+f.name+'\')">详情</button>'
            +'<button class="op-btn">预览</button>'
            +'<button class="op-btn" onclick="window.location.href=\'../设备编辑原型/材质编辑页面.html\'">编辑</button>'
            +'<button class="op-btn" onclick="showToast(\'download\')">下载</button>'
            +'<button class="op-btn" onclick="showModal(\'modal-confirm\')">删除</button>'
            +'</div></td>';
        tbody.appendChild(tr);
    });
}

function toggleAllCb(el){ document.querySelectorAll('#table-body .row-cb').forEach(function(cb){ cb.checked=el.checked; }); }
function syncHeaderCb(){
    var cbs=document.querySelectorAll('#table-body .row-cb');
    var total=cbs.length,checked=0;
    cbs.forEach(function(cb){ if(cb.checked) checked++; });
    var cbAll=document.getElementById('cb-all');
    if(!cbAll) return;
    cbAll.checked=checked===total&&total>0;
    cbAll.indeterminate=checked>0&&checked<total;
}

function openDetail(name){ document.getElementById('detail-title').textContent=name||'楼梯升降机.glb'; showModal('modal-detail'); }

// 菜单交互
function toggleMenu(key){
    var submenu = document.getElementById('submenu-' + key);
    var arrow = document.getElementById('arrow-' + key);
    var isCollapsed = submenu.classList.contains('collapsed');
    submenu.classList.toggle('collapsed',!isCollapsed);
    arrow.classList.toggle('collapsed',!isCollapsed);
}

// 项目详情
function openProjectDetail(projectName, projectLine){
    document.getElementById('projectListPage').classList.add('hidden');
    document.getElementById('projectDetail').classList.add('active');
    document.getElementById('detailProjectName').textContent = projectName;
}

function closeProjectDetail(){
    document.getElementById('projectListPage').classList.remove('hidden');
    document.getElementById('projectDetail').classList.remove('active');
}

function switchTab(tabName){
    document.querySelectorAll('.ptab').forEach(function(item){ item.classList.remove('active'); if(item.dataset.tab === tabName) item.classList.add('active'); });
    document.querySelectorAll('.tab-pane').forEach(function(pane){ pane.classList.remove('active'); });
    document.getElementById('tab-' + tabName).classList.add('active');
}

// 导入树
function buildImportTree(){
    var container=document.getElementById('import-tree-root');
    if(!container) return;
    importTreeLabels.forEach(function(label){
        var row=document.createElement('div');
        row.className='it-row';
        row.innerHTML='<span style="color:#bbb;font-size:9px;margin-right:3px;">&#9654;</span>'
            +'<span style="margin-right:4px;display:inline-flex;">'+folderIcon(false)+'</span>'
            +'<span>'+label+'</span>';
        row.onclick=function(){ document.querySelectorAll('.it-row').forEach(function(r){ r.classList.remove('active'); }); row.classList.add('active'); };
        container.appendChild(row);
    });
}

function renderImportTable(){
    var tbody=document.getElementById('import-table-body');
    if(!tbody) return;
    importFiles.forEach(function(f){
        var tr=document.createElement('tr');
        tr.innerHTML='<td><input type="checkbox" style="accent-color:#e65c3b;width:14px;height:14px;"></td>'
            +'<td><span class="file-link">'+f.name+'</span></td>'
            +'<td style="color:#bbb;">--</td>'
            +'<td style="color:#bbb;">--</td>';
        tbody.appendChild(tr);
    });
}

function renderExportTable(){
    var tbody=document.getElementById('export-tbody');
    if(!tbody) return;
    exportTasks.forEach(function(task){
        var tr=document.createElement('tr');
        if(task.hl) tr.classList.add('hl');
        tr.innerHTML='<td class="export-name">'+task.name+'</td>'
            +'<td><span class="status-done">已完成</span></td>'
            +'<td><div class="eop">'
            +'<span onclick="showToast(\'download\')">下载</span>'
            +'<span onclick="showModal(\'modal-confirm\')">删除</span>'
            +'</div></td>';
        tbody.appendChild(tr);
    });
}

// 初始化
window.onload = function(){
    // 禁用浏览器滚动恢复，强制滚动到顶部
    if('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    buildTree(treeData, document.getElementById('tree-root'), 0);
    renderTable(treeData[0].files);
    buildImportTree();
    renderImportTable();
    renderExportTable();
    initDeviceModelPage();
    initStationTree();
    initStationTable();

    // 按ESC关闭弹窗
    document.addEventListener('keydown', function(e) {
        if(e.key === 'Escape') {
            closeStationMenu();
            document.querySelectorAll('.modal-overlay').forEach(function(m) { m.classList.remove('show'); });
        }
    });

    // 阻止默认的滚动恢复行为
    window.addEventListener('beforeunload', function() {
        window.scrollTo(0, 0);
    });
};

// 设备模型页面
function showDeviceModel(catName){
    console.log('showDeviceModel called:', catName);
    // 隐藏列表视图，显示卡片视图
    var listView = document.getElementById('deviceListView');
    var modelView = document.getElementById('deviceModelView');
    if(listView) listView.style.display = 'none';
    if(modelView) {
        modelView.style.display = '';
        modelView.classList.add('show');
    }

    // 分类按钮交互
    document.querySelectorAll('.dm-cat-btn').forEach(function(btn){
        btn.onclick = function(){
            document.querySelectorAll('.dm-cat-btn').forEach(function(b){ b.classList.remove('active'); });
            btn.classList.add('active');
        };
    });
}

// 车站管理 - 右键菜单功能
var stationCurrentTarget = '';

function showStationMenu(e, name) {
    e.stopPropagation();
    stationCurrentTarget = name;
    var menu = document.getElementById('stationContextMenu');
    var mask = document.getElementById('stationMask');
    if(!menu) return;

    var rect = e.target.getBoundingClientRect();
    menu.style.left = rect.right + 'px';
    menu.style.top = rect.bottom + 4 + 'px';
    menu.style.display = 'block';
    mask.style.display = 'block';
}

function closeStationMenu() {
    var menu = document.getElementById('stationContextMenu');
    var mask = document.getElementById('stationMask');
    if(menu) menu.style.display = 'none';
    if(mask) mask.style.display = 'none';
}

function openStationRename() {
    closeStationMenu();
    var input = document.getElementById('stationRenameInput');
    var modal = document.getElementById('stationRenameModal');
    if(input) input.value = stationCurrentTarget;
    if(modal) modal.classList.add('show');
}

function openStationDelete() {
    closeStationMenu();
    var target = document.getElementById('stationDeleteTarget');
    var modal = document.getElementById('stationDeleteModal');
    if(target) target.textContent = stationCurrentTarget;
    if(modal) modal.classList.add('show');
}

// 点击树节点交互 - 车站管理
function initStationTree() {
    var treeRoot = document.getElementById('station-tree-root');
    if(!treeRoot) return;

    // 树节点点击效果
    treeRoot.querySelectorAll('.tree-item, .tree-child-item').forEach(function(item) {
        item.addEventListener('click', function(e) {
            if(e.target.classList.contains('tree-more-btn')) return;
            treeRoot.querySelectorAll('.tree-item, .tree-child-item').forEach(function(i) {
                i.classList.remove('active');
            });
            item.classList.add('active');
        });
    });

    // 折叠展开
    treeRoot.querySelectorAll('.tree-arrow').forEach(function(arrow) {
        arrow.addEventListener('click', function(e) {
            e.stopPropagation();
            var parent = arrow.closest('.tree-item');
            var children = parent.nextElementSibling;
            if(children && children.classList.contains('tree-children')) {
                children.style.display = children.style.display === 'none' ? 'block' : 'none';
                arrow.textContent = children.style.display === 'none' ? '▶' : '▼';
            }
        });
    });
}

// 车站管理表格行交互
function initStationTable() {
    var tableWrap = document.querySelector('.station-manager .table-wrap');
    if(!tableWrap) return;

    tableWrap.querySelectorAll('tbody tr').forEach(function(tr) {
        tr.addEventListener('click', function(e) {
            if(e.target.tagName === 'INPUT' || e.target.tagName === 'SPAN') return;
            var cb = tr.querySelector('input[type="checkbox"]');
            if(cb) cb.checked = !cb.checked;
        });
    });
}