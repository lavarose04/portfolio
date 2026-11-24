window.renderTeaProject=function(detail,project){
 const base='assets/xiaoshajiang-tea/';
 const imageSizes={"gift-box-neutral.png":[1468, 1071],"gift-box-original.png": [1184, 864], "cover.webp": [1066, 1800], "pattern-result.png": [588, 544], "textile-reference.png": [644, 342], "gift-box.webp": [746, 534], "element-chrysanthemum.png": [166, 211], "original.png": [7600, 5500], "element-star.png": [155, 144], "hero-packaging.webp": [1076, 1800], "hero-packaging-original.png": [7600, 5500], "element-butterfly.png": [133, 144], "pattern-rose.png": [377, 380], "pattern-chrysanthemum.png": [377, 380], "element-rose.png": [188, 211], "traditional-elements.png": [655, 144], "composition.png": [366, 366], "element-goji.png": [188, 211], "pattern-goji.png": [377, 380], "ingredient-elements.png": [1188, 211], "element-honeysuckle.png": [200, 211], "pattern-honeysuckle.png": [377, 380]};
 const picture=(file,alt,cls='',original=file)=>`<figure class="tea-figure ${cls}"><a href="${base+original}" data-tea-image aria-label="放大查看：${alt}"><img src="${base+file}" alt="${alt}" width="${imageSizes[file][0]}" height="${imageSizes[file][1]}" loading="${cls==='tea-hero'?'eager':'lazy'}" decoding="${cls==='tea-hero'?'sync':'async'}"></a></figure>`;
 const plants=[['honeysuckle','金银花'],['chrysanthemum','菊花'],['rose','玫瑰'],['goji','枸杞']];
 document.title='小沙江 · 金银花自由配方茶 — MY Portfolio';
 detail.classList.add('tea-detail');
 detail.innerHTML=`<a class="work-back" href="work.html?year=2025&type=brand">←︎ 返回品牌与视觉传播</a>
 <div class="detail-heading"><div><p class="eyebrow">BRAND & PACKAGING / ${window.formatProjectDate(project)}</p><h1>小沙江 · 金银花自由配方茶</h1></div><span>品牌设计 · 包装设计</span></div>
 <div class="tea-intro"><p>把花瑶挑花的图案语言，带入一盒可以自由搭配的花茶。</p><nav aria-label="项目章节"><a href="#tea-pattern">01 图案创作</a><a href="#tea-products">02 自由配方与包装</a></nav></div>
 ${picture('hero-packaging.webp','小沙江自由配方茶组合：金银花、菊花、枸杞与玫瑰包装','tea-hero','hero-packaging-original.png')}
 <section id="tea-pattern" class="tea-section"><header class="tea-section-heading"><p class="eyebrow">01 / PATTERN DEVELOPMENT</p><h2>从花瑶挑花，到花茶图案</h2></header>
 <div class="tea-origin">${picture('textile-reference.png','花瑶挑花传统纹样参考')}<div><h3>以传统纹样为起点</h3><p>花瑶挑花是湖南花瑶妇女世代传承的刺绣技艺，以工整的针脚和鲜明的色彩对比，表现花鸟、几何纹等题材。设计借鉴挑花的构图与图形语言，将花茶成分转译为可以组合的图案单元。</p></div></div>
 <div class="tea-element-section"><div class="tea-copy"><span class="tea-step"><i class="tea-element-marker tea-element-circle" aria-hidden="true"></i>圆形 / 创作元素</span><h3>让图形表达花茶成分</h3><p>提取金银花、菊花、玫瑰与枸杞树的形态，以统一的方格轮廓建立系列识别。</p></div><div class="tea-elements">${plants.map(([key,name])=>`<figure><img src="${base}element-${key}.png" alt="${name}图形单元" loading="lazy"><figcaption>${key==='goji'?'枸杞树':name}</figcaption></figure>`).join('')}</div></div>
 <div class="tea-element-section tea-traditional"><div class="tea-copy"><span class="tea-step"><i class="tea-element-marker tea-element-square" aria-hidden="true"></i>方形 / 传统元素</span><h3>保留挑花的传统语汇</h3><p>八角花与蝴蝶作为次要元素，与花茶图形共同构成纹样。</p></div><div class="tea-elements">${[['star','八角花'],['butterfly','蝴蝶']].map(([key,name])=>`<figure><img src="${base}element-${key}.png" alt="${name}传统图案" loading="lazy"><figcaption>${name}</figcaption></figure>`).join('')}</div></div>
 <div class="tea-formula"><p>图形元素 <span>＋</span> 构图方式 <span>＝</span> 新的图案</p><div class="tea-formula-body"><div>${picture('composition.png','圆形位置的主要元素与方形位置的次要元素对称组合示意')}<h3>主要元素 × 次要元素</h3><p>以圆形位置的创作元素为视觉主体，在对称构图中穿插方形位置的传统元素，组合出完整纹样。</p></div><span class="tea-formula-arrow" aria-hidden="true">→︎</span><div>${picture('pattern-result.png','花茶元素与传统纹样组合形成的渐变图案')}<h3>统一结构，自由组合</h3><p>通过替换图形单元和颜色，在同一套构图逻辑中延展系列。</p></div></div></div>
 <div class="tea-pattern-heading"><h3>四种原料，四组视觉识别</h3><p>用不同的渐变配色区分花茶成分。</p></div><div class="tea-patterns">${plants.map(([key,name],i)=>`<figure><a href="${base}pattern-${key}.png" data-tea-image aria-label="放大查看：${name}纹样"><img src="${base}pattern-${key}.png" alt="${name}包装纹样" loading="lazy"></a><figcaption><span>0${i+1} /</span>${name}</figcaption></figure>`).join('')}</div>
 </section>
 <section id="tea-products" class="tea-section"><header class="tea-section-heading"><p class="eyebrow">02 / PRODUCT & PACKAGING</p><h2>DIY 自由配方茶</h2></header><div class="tea-concept-copy tea-product-summary"><div><p>以夏初采摘的金银花为基础，配合菊花、玫瑰与枸杞，让饮用者按照个人喜好自由选择、组合。产品内附搭配指南，将选择与搭配的过程也纳入饮茶体验。</p><p>四种原料沿用同一套图案构建逻辑，以不同色彩区分。视觉上的系列感，对应产品使用上的自由组合。</p><p>金银花与三款搭配原料以独立包装呈现，图案、色彩与原料名称相互对应；外盒将四组视觉识别集合在一起，形成完整的自由配方茶礼盒。</p></div><p class="tea-concept-line">一盒花茶，<br>由自己决定搭配。</p></div>
 <div class="tea-packaging-pair tea-product-gallery">
 ${picture('gift-box-neutral.png','小沙江金银花自由配方茶礼盒高清包装效果','tea-gift-box tea-gift-box-hd','gift-box-neutral.png')}
 <figure class="tea-figure tea-gift-box tea-gift-box-open"><a href="${base}gift-box-open-matched.png" data-tea-image aria-label="放大查看：小沙江自由配方茶礼盒与四款独立包装"><img src="${base}gift-box-open-matched.png" alt="小沙江自由配方茶礼盒与四款独立包装" loading="lazy" decoding="async"></a></figure>
 <figure class="tea-figure tea-gift-box tea-packaging-kit"><a href="${base}packaging-kit-transparent.png" data-tea-image aria-label="放大查看：小沙江配方茶组合与搭配手册"><img src="${base}packaging-kit-transparent.png" alt="小沙江配方茶独立包装组合与自由配方茶搭配手册" loading="lazy" decoding="async"></a></figure>
 </div>
 </section>

 <div class="book-detail-links"><a class="work-back" href="work.html?year=2025&type=brand">继续浏览品牌设计 ↗︎</a><a class="work-back" href="index.html">回到首页 ↗︎</a></div>`;
 const triggers=[...detail.querySelectorAll('[data-tea-image]')];
 window.setupBookViewer({label:'小沙江品牌设计图片查看',triggers,photos:triggers.map(a=>({original:a.getAttribute('href'),preview:a.querySelector('img').getAttribute('src'),caption:a.querySelector('img').alt}))});
};
