// Shared demo project data for homepage, archive and detail pages.
// Demonstration records only. Each project has ONE primary group and MANY type tags.
window.portfolioProjects=[2026,2025,2024,2023].flatMap(year=>window.designCategories.map((category,i)=>({
 id:`${year}-${i}`,year,primaryCategory:category.id,
 types:year===2026&&category.id==='digital'?['digital','ip']:[category.id],
 title:year===2026&&category.id==='digital'?'综合项目 · 筛选演示':`${category.label} · 占位`,
 context:year===2026&&category.id==='digital'?'综合项目':'',
 outputs:{brand:['广告','包装','海报'],ip:['IP形象'],digital:['小程序','视频','IP形象'],book:['书籍','编排'],space:['展览','空间视觉']}[category.id],
 image:'assets/zhang-chun-xia-cover.png',transparent:true,url:'assets/zhang-chun-xia-cover.png'
})));

// Confirmed project information supplied by Li MY. Other records remain demos.
const realBookIndex=window.portfolioProjects.findIndex(p=>p.year===2026&&p.primaryCategory==='book');
window.portfolioProjects[realBookIndex]={
 id:'zhang-chun-xia',aliases:['2026-3'],year:2026,primaryCategory:'book',types:['book'],
 title:'张春霞相当一般',outputs:['书籍设计','编排','装帧'],
 tools:['ps','id','xingtu','gpt'],
 relatedProjects:['zhang-chun-xia-poster'],
 image:'assets/zhang-chun-xia-cover.png',transparent:true,isReal:true,
 specs:[['装帧方式','裸脊锁线'],['开本','130 × 130 mm'],['页数','96 页'],['完成年份','2026']],
 introduction:'本书以电影《宇宙探索编辑部》的角色“孙一通”笔下的诗为主要内容进行编排。诗文的内容大多朦胧而抽象，因此书中通过梦幻、超现实的图片以及文字设计，呈现出一种梦核的不真实感。',
 eclipse:'日食作为影片高潮的线索，串联起整本书。除了封面的镂空效果，在每一个章节的页面边缘都会有一个小小的圆孔象征日食，并随着阅读的推进逐渐扩大，形成连续的视觉变化。',
 process:'《宇宙探索编辑部》是我一直很喜欢的电影，我对它的喜欢和孙一通的诗一样模糊朦胧，我希望把这种感觉通过书籍呈现出来。书本的开本在130 × 130 mm，小巧的同时也有一定的厚度。制作的过程就是把阅读文字后第一印象想到的画面记录下来，然后思考在具体的内页中应该如何与结合文字布局，再用不同的工具处理具体图片。',
 material:'内页中配合文字也有镂空、综合材料的变化，丰富了阅读的体验，让读者能进一步感受孙一通的“外星人”世界。'
};

const realPosterIndex=window.portfolioProjects.findIndex(p=>p.year===2026&&p.primaryCategory==='digital');
window.portfolioProjects[realPosterIndex]={
 id:'zhang-chun-xia-poster',aliases:['2026-2'],year:2026,primaryCategory:'digital',types:['digital'],
 title:'张春霞相当一般 · 交互海报',outputs:['交互海报','交互设计'],
 tools:['ps','gpt','procreate'],
 relatedProjects:['zhang-chun-xia'],
 image:'assets/poster/poster-cover.png',video:'assets/poster/interaction-demo-20261119.mp4',isReal:true,format:'poster',
 description:[
  '以抖音博主@怀河的创作为灵感，即在光照到眼睛的时候眼睛闭起来，光圈移走眼睛又会睁开。在《宇宙探索编辑部》中，日食来临之时，孙一通讲述了他儿时因为直视太阳而险些失明的故事。',
  '医生所的护士告诉他，“憨娃儿，不要盯着太阳看，眼睛会瞎”。',
  '画面中的太阳可以实现交互，点击后变成光圈追踪模式。'
 ],
 externalURL:'https://vercel-poster-three.vercel.app'
};

// Haidian Jiwa completion year confirmed by the creator.
const realIPIndex=window.portfolioProjects.findIndex(p=>p.year===2026&&p.primaryCategory==='ip');
window.portfolioProjects[realIPIndex]={
 id:'haidian-jiwa',aliases:['2026-1'],year:2026,yearConfirmed:true,
 tools:['gpt','gemini','jimeng','procreate','blender','hunyuan'],
 primaryCategory:'ip',types:['ip'],title:'海淀鸡娃',outputs:['IP形象设计'],
 relatedProjects:['jiwa-gashapon','huangzhuang-dream','super-jiwa'],
 image:'assets/haidian-jiwa/cover.png',isReal:true,format:'ip'
};

// Confirmed 2026 projects and their supplied cover images.
const relatedWorks2026=[
 {id:'super-jiwa',title:'超级鸡娃',tools:['ai','figma','gpt'],primaryCategory:'digital',types:['digital'],outputs:['新媒体'],image:'assets/super-jiwa/iphone15-cover.svg',original:'assets/super-jiwa/iphone15-cover.svg',phoneMockup:true,imageAlt:'超级鸡娃小程序：iPhone 15 样机中的粉紫色鸡娃扭蛋机界面'},
 {id:'jiwa-gashapon',title:'鸡娃扭蛋机',primaryCategory:'space',types:['space'],outputs:['装置'],image:'assets/jiwa-gashapon/cover.webp',original:'assets/jiwa-gashapon/original.png',imageAlt:'鸡娃扭蛋机装置：透明扭蛋球与鸡娃人物模型'},
 {id:'huangzhuang-dream',title:'黄庄一梦',tools:['gemini','gpt','jimeng','ps','jianying'],videoCover:true,primaryCategory:'digital',types:['digital'],outputs:['新媒体','视频'],image:'assets/huangzhuang-dream/cover.webp',original:'assets/huangzhuang-dream/original.png',imageAlt:'黄庄一梦视频静帧：两位戴鸡形头套的人物撑伞走过天桥',caption:'视频静帧'}
].map(item=>({...item,year:2026,yearConfirmed:true,isReal:true,format:'photo',relatedProjects:['haidian-jiwa']}));
const spacePlaceholderIndex=window.portfolioProjects.findIndex(p=>p.year===2026&&p.primaryCategory==='space'&&!p.isReal);
if(spacePlaceholderIndex>=0)window.portfolioProjects.splice(spacePlaceholderIndex,1,...relatedWorks2026);
else window.portfolioProjects.push(...relatedWorks2026);
window.portfolioDraftProjects=[];

// Brand packaging, 2025 completion year and tools confirmed by the creator.
const fangshanBrandIndex=window.portfolioProjects.findIndex(p=>p.year===2025&&p.primaryCategory==='brand'&&!p.isReal);
const fangshanBrand={
 id:'fangshan-haoshi',aliases:['2025-0'],year:2025,yearConfirmed:true,
 tools:['ps','jimeng','jianying'],
 primaryCategory:'brand',types:['brand'],title:'房山好柿',outputs:['品牌包装设计','礼盒包装'],
 description:[
  "房山好柿是围绕北京房山磨盘柿展开的品牌与包装设计课程项目。设计从地域文化、秋日风味与传统手工制柿工艺出发，将“柿”与“事”的谐音祝愿融入品牌表达，尝试让地方特产通过统一的视觉语言，传递自然、温暖与富有人情味的品牌印象。",
  "前期通过产品特点梳理、SWOT 分析与竞品观察，明确了礼赠与日常消费两类使用场景。品牌主要面向注重品质、工艺细节与文化内涵的消费者，并规划精装礼盒、伴手礼与“一口冰沁柿”三条产品线，以不同的包装体量和视觉表达回应送礼、携带分享及年轻化消费的需求。",
  "视觉识别以饱满的柿子轮廓为基础，将“房山好柿”四字置于印章式构图中，保留篆刻般的不规则边缘与质朴肌理。色彩采用柿子橙、琉璃黄与古树棕，结合具有刻印感的标题字体，建立温暖而沉稳的视觉基调。柿蒂与缠枝纹样进一步延展为装饰图形，使标志、包装和衍生应用保持连贯。",
  "精装礼盒以“宫廷贡品”为设计灵感，将柿子融入明清缠枝纹样，以橙色盒身与金色浮雕效果呈现丰收和吉祥的寓意。内盒以分格结构陈列柿饼，并通过不同挂霜程度的排列呈现产品差异；盒盖内侧加入采摘、清洗、削皮、晾晒、揉搓与捂霜的工艺插画，让开盒过程同时成为了解品牌故事的过程。",
  "伴手礼包装围绕“开窗见喜，柿柿如意”展开，从传统园林花窗的借景方式中获得灵感，以镂空窗口露出内部产品，结合提手结构与独立包装，形成便于携带和分享的礼赠形式。“一口冰沁柿”则在原有视觉系统中引入清凉的蓝色，与橙色柿蒂纹样形成对比，通过桶装与小杯组合表现更轻快、现代的产品形象。",
  "品牌图形还被应用于冰箱贴、帆布袋、笔记本、卡片及手机壳等衍生设计，并延伸至公众号、小红书与直播间的线上展示提案。项目将产地故事、手工工艺与产品包装联系起来，探索地方农产品从单一商品走向完整品牌体验的表达方式。"
],
 image:'assets/fangshan-haoshi/gift-box.png',original:'assets/fangshan-haoshi/gift-box.png',
 imageAlt:'房山好柿品牌礼盒包装：橙色盒身搭配金色柿子与藤蔓纹样',
 isReal:true,format:'photo'
};
if(fangshanBrandIndex>=0)window.portfolioProjects.splice(fangshanBrandIndex,1,fangshanBrand);
else window.portfolioProjects.push(fangshanBrand);

// 2025 book design and software confirmed by the creator.
const seventhDayIndex=window.portfolioProjects.findIndex(p=>p.year===2025&&p.primaryCategory==='book'&&!p.isReal);
const seventhDay={
 id:'the-seventh-day',aliases:['2025-3'],year:2025,yearConfirmed:true,
 primaryCategory:'book',types:['book'],title:'第七天',outputs:['书籍设计'],
 tools:['id','ps','gpt'],isReal:true,format:'photo',transparent:true,
 image:'assets/the-seventh-day/cover.png',original:'assets/the-seventh-day/original.jpg',
 imageAlt:'《第七天》书籍设计：灰色书封与日历式小册子',
 specs:[['原著','余华《第七天》'],['开本','148 × 210 mm'],['页数','280 页'],['装帧方式','锁线'],['指导老师','王红卫']],
 introduction:'以余华小说《第七天》为主题进行书籍编排与装帧设计。故事围绕杨飞死后七天的经历展开，他在寻找父亲的途中遇见不同的亡灵。设计以嵌入书中的异形小日历回应“七天”，将时间线索融入翻阅过程。',
 calendar:'小说的终章让各条叙事线索在此收束，也让我联想到一本只有七页的日历。封面以日历形式呈现书名，呼应同名终章，表达回归与完结。内册采用真正的黄历形式，利用黄历中“宜”“忌”等提示，将各章节的情节暗示在日历中，作为阅读的伏笔。',
 illustration:'插图以黑白与红色为主要色彩，回应小说中死亡与阴间的氛围；通过增强噪点，营造具有年代感的图像质地。绝大部分插图使用 Photoshop 对真实照片进行处理，人物均不呈现清晰面部。',
 typography:'主角杨飞的内心活动使用竖排，与横排正文区分，同时带来编排节奏的变化。在部分特定文本中，将文字作为图形元素进行编排，以字形、位置与疏密辅助表达内容。'
};
if(seventhDayIndex>=0)window.portfolioProjects.splice(seventhDayIndex,1,seventhDay);
else window.portfolioProjects.push(seventhDay);

// Handmade book and completion year supplied by the creator.
window.portfolioProjects.push({
 id:'spring-equinox',year:2025,yearConfirmed:true,
 primaryCategory:'book',types:['book'],title:'春分之歌',outputs:['手工书'],
 isReal:true,format:'photo',transparent:true,
 image:'assets/spring-equinox/cover.png',original:'assets/spring-equinox/cover.png',
 imageAlt:'《春分之歌》手工书：黄绿色树林与飞鸟版画，保留手工纸自然边缘',
 description:["春分这一天，地球昼夜等长，象征着自然界光与暗的完美平衡，也因此得名。春分后，北半球白昼时间逐渐延长，温度稳步回升，春意愈发浓烈，万物也随之焕发生机。", "春分的“三候”为：一候玄鸟至，二候雷乃发声，三候始电。它们层层递进，共同描绘出春分中最具生命力的时刻。因此我以“三候”创作一幅拉页长图，作为整本图文作品中视觉上最震撼、信息量最丰富的一幅，以表达春分最鲜明的生命张力。我将全书的主题定为“万物的生命希望”，借春天的到来鼓励人们重新焕发内在的活力与热情，并设定“燕子”这一春之使者为贯穿全文的线索角色。燕子作为“三候”之一，既是季节转换的标志，也是报春的使者。燕子的飞行方向与阅读方向保持一致，象征它引领读者走入春日的脉络，追随春意的足迹，完成一次充满希望与生命力的阅读旅程。"]
});

// Replace the 2026 brand demo slot with the creator's confirmed 2025 work.
const teaBrandIndex=window.portfolioProjects.findIndex(p=>p.year===2026&&p.primaryCategory==='brand'&&!p.isReal);
const teaBrand={
 id:'xiaoshajiang-tea',year:2025,yearConfirmed:true,tools:['ai','ps'],
 primaryCategory:'brand',types:['brand'],title:'小沙江金银花茶',outputs:['品牌设计'],
 isReal:true,format:'photo',transparent:true,
 image:'assets/xiaoshajiang-tea/cover.webp',original:'assets/xiaoshajiang-tea/original.png',
 imageAlt:'小沙江金银花茶品牌设计：渐变花卉图案礼盒与菊花、枸杞、玫瑰配方茶包装'
};
if(teaBrandIndex>=0)window.portfolioProjects.splice(teaBrandIndex,1,teaBrand);
else window.portfolioProjects.push(teaBrand);

// IP project and 2025 completion year supplied by the creator.
const tianshiliIPIndex=window.portfolioProjects.findIndex(p=>p.year===2025&&p.primaryCategory==='ip'&&!p.isReal);
const tianshiliIP={
 id:'tianshili-cod-sausage',aliases:['2025-1'],year:2025,yearConfirmed:true,tools:['ai','ps','jimeng'],
 primaryCategory:'ip',types:['ip'],title:'力诚儿童鳕鱼肠',outputs:['IP设计'],
 isReal:true,format:'photo',transparent:true,
 image:'assets/tianshili-cod-sausage/cover.png',original:'assets/tianshili-cod-sausage/original.png',
 imageAlt:'力诚儿童鳕鱼肠 IP 设计：白色与紫色盲盒包装，搭配彩色角色图案',
 description:["为力诚儿童鳕鱼肠设计“鳕宝 CODDY”系列 IP 及品牌视觉规范。鳕宝是一群穿着香肠外衣的鳕鱼宝宝，以圆润轮廓、微笑表情和活泼配色传达亲切、快乐的性格，并通过不同表情与装扮丰富角色形象。", "系列包装围绕虾蟹味、经典原味与芝士味展开，将橙、绿、黄三种辅助色分别结合食材图形，形成统一又易于区分的产品系列。角色与辅助图形共同构成包装的视觉语言，并延伸至货架陈列效果展示。", "潮玩设计在统一造型基础上，通过耳机、墨镜、皇冠、滑板等配件赋予鳕宝不同身份，形成“神奇的鳕宝”盲盒系列，并延伸至盲盒包装、宣传海报和数字界面展示。"],
 coddyImages:[{"src": "assets/tianshili-cod-sausage/details/detail-01.webp", "original": "assets/tianshili-cod-sausage/details/detail-01.png", "caption": "鳕宝 CODDY 主形象", "width": 2400, "height": 1696, "darken": true}, {"src": "assets/tianshili-cod-sausage/details/detail-02.webp", "original": "assets/tianshili-cod-sausage/details/detail-02.png", "caption": "鳕宝三视图", "width": 766, "height": 284, "darken": true}, {"src": "assets/tianshili-cod-sausage/details/detail-03.webp", "original": "assets/tianshili-cod-sausage/details/detail-03.png", "caption": "鳕宝的六种表情", "width": 2400, "height": 767, "darken": true}, {"src": "assets/tianshili-cod-sausage/details/detail-04.webp", "original": "assets/tianshili-cod-sausage/details/detail-04.png", "caption": "三种口味的系列包装", "width": 2400, "height": 971, "darken": true}, {"src": "assets/tianshili-cod-sausage/details/detail-05.webp", "original": "assets/tianshili-cod-sausage/details/detail-05.png", "caption": "货架陈列效果", "width": 1792, "height": 576, "darken": false}, {"src": "assets/tianshili-cod-sausage/details/detail-06.webp", "original": "assets/tianshili-cod-sausage/details/detail-06.png", "caption": "神奇的鳕宝 · 九款潮玩", "width": 878, "height": 866, "darken": true}, {"src": "assets/tianshili-cod-sausage/details/detail-07.webp", "original": "assets/tianshili-cod-sausage/details/detail-07.png", "caption": "鳕宝盲盒包装", "width": 2400, "height": 1800, "darken": true}, {"src": "assets/tianshili-cod-sausage/details/detail-08.webp", "original": "assets/tianshili-cod-sausage/details/detail-08.png", "caption": "数字界面展示", "width": 1107, "height": 2400, "darken": false}, {"src": "assets/tianshili-cod-sausage/details/detail-09.webp", "original": "assets/tianshili-cod-sausage/details/detail-09.png", "caption": "MAGIC CODDY 系列海报", "width": 768, "height": 1344, "darken": false}]
};
if(tianshiliIPIndex>=0)window.portfolioProjects.splice(tianshiliIPIndex,1,tianshiliIP);
else window.portfolioProjects.push(tianshiliIP);

// Game design, title, year and tools supplied by the creator.
const candidateIndex=window.portfolioProjects.findIndex(p=>p.year===2025&&p.primaryCategory==='digital'&&!p.isReal);
const candidateGame={
 id:'united-nations-candidate',aliases:['2025-2'],year:2025,yearConfirmed:true,
 primaryCategory:'digital',types:['digital'],title:'United Nations Candidate（新共和国候选人）',
 outputs:['游戏设计'],tools:['procreate','gpt','unity'],isReal:true,format:'photo',
 image:'assets/united-nations-candidate/cover.webp',original:'assets/united-nations-candidate/original.png',
 imageAlt:'新共和国候选人游戏画面：紫粉色城市街道、角色与封锁路障'
};
if(candidateIndex>=0)window.portfolioProjects.splice(candidateIndex,1,candidateGame);
else window.portfolioProjects.push(candidateGame);

// Concept design, year and software supplied by the creator.
window.portfolioProjects.push({
 id:'tranquil-utopia',year:2025,yearConfirmed:true,
 primaryCategory:'digital',types:['digital'],title:'Tranquil Utopia（宁静乌托邦）',
 outputs:['概念设计'],tools:['blender','midjourney','figma'],isReal:true,format:'photo',
 image:'assets/tranquil-utopia/cover.webp',original:'assets/tranquil-utopia/original.png',
 imageAlt:'宁静乌托邦概念设计：蓝白色未来建筑、环形水道与梦幻植物景观'
});

// Typeface project: archive and detail only; intentionally omitted from the homepage.
window.portfolioProjects.push({
 id:'quanying-type',year:2024,month:5,yearConfirmed:true,tools:['ai','glyphs'],
 primaryCategory:'book',types:['book'],title:'隶书全瑛体',outputs:['字体设计','编排设计'],
 isReal:true,format:'typeface',showOnHomepage:false,
 image:'assets/quanying-type/strokes.webp',original:'assets/quanying-type/strokes.png',
 imageAlt:'隶书全瑛体笔形展示：圆润的起收笔与舒展的撇捺',
 description:[
  '《隶书全瑛体》以《曹全碑》与《乙瑛碑》为主要参考，探索隶书笔形与现代字体结构之间的结合。设计保留隶书圆润含蓄、舒展沉稳的特点，同时参考现代黑体的间架关系，使传统书写的韵味融入更清晰、统一的字形系统。',
  '创作从碑帖临摹与笔画分析开始，通过观察起笔、行笔与收笔的节奏，提取具有代表性的笔形，再逐步整理为可用于字符设计的笔画规范。针对现代简体字的结构需求，调整部件比例、中宫、重心与笔画之间的避让关系，使每个字在保持自身结构特点的同时，呈现一致的视觉风格。',
  '字体经过多轮调整，并通过不同字号的横排与竖排检验整体效果。大字号用于观察笔形细节，小字号用于比较字面大小、黑白关系与阅读节奏，在反复校正中平衡书写的力度与排版的秩序。'
 ]
});

// Completion dates confirmed by the creator, in year/month precision.
const completionDates={
 'zhang-chun-xia':[2026,10],
 'zhang-chun-xia-poster':[2026,10],
 'haidian-jiwa':[2026,5],
 'super-jiwa':[2026,6],
 'jiwa-gashapon':[2026,6],
 'huangzhuang-dream':[2026,6],
 'xiaoshajiang-tea':[2025,1],
 'fangshan-haoshi':[2025,10],
 'tianshili-cod-sausage':[2024,10],
 'united-nations-candidate':[2025,9],
 'the-seventh-day':[2025,5],
 'spring-equinox':[2025,4],
 'tranquil-utopia':[2025,3]
};
window.formatProjectDate=project=>project.yearConfirmed===false?'年份待补充':project.month?`${project.year}.${String(project.month).padStart(2,'0')}`:String(project.year);
for(const project of window.portfolioProjects){
 const date=completionDates[project.id];
 if(!date)continue;
 [project.year,project.month]=date;
 project.yearConfirmed=true;
 if(project.specs)project.specs=project.specs.map(([label,value])=>label==='完成年份'?['完成时间',window.formatProjectDate(project)]:[label,value]);
}

// Poti: image, completion date and tools supplied by the creator.
window.portfolioProjects.push({
 id:'poti',year:2025,month:8,yearConfirmed:true,
 primaryCategory:'ip',types:['ip'],title:'Poti',outputs:['IP设计'],
 tools:['liblib','jimeng','ps','ai'],isReal:true,format:'photo',
 image:'assets/poti/cover.png',original:'assets/poti/original.png',transparent:true,
 imageAlt:'Poti IP形象：银蓝色圆筒身体、绿色像素表情与深色运动鞋，透明背景',
 storySections:[
  {
    "title": "角色介绍",
    "paragraphs": [
      "Poti（波提）是一只呆萌、慢半拍的机器人锅。它原本是一口被人类遗弃的普通锅，在一个雨夜被神秘的宇宙射线击中，长出了双腿，也拥有了自己的意识。它说话有些口吃，常常沉浸在自己的小世界里，却会偶尔冒出关于宇宙与生命的独特见解。",
      "Poti 的灵感来自电影《宇宙探索编辑部》中孙一通戴在头上的锅。设计将日常器物转化为一个有情绪、有性格的角色，让一口普通的锅成为连接生活与宇宙想象的载体。"
    ]
  },
  {
    "title": "从草图到形象",
    "paragraphs": [
      "前期草图以锅的圆筒轮廓为主体，将两侧锅柄转化为短小的手臂，再加入细长的双腿与宽大的鞋子。略微倾斜的身体和不太协调的比例，让 Poti 看起来有些笨拙，也显得亲近。",
      "最终形象延续了草图中的身体结构，以银蓝色金属质感保留旧锅的器物特征，并将正面的圆形区域发展为表情屏幕。绿色像素表情呈现开心、生气与伤心等情绪，与金属身体形成对比，让它在机械感之外，也有直观、柔软的情绪表达。"
    ]
  }
],
 detailImages:[
  {src:'assets/poti/turnaround.png',caption:'Poti 三视图：正面、侧面与背面'},
  {src:'assets/poti/sketch.png',caption:'Poti 前期草图'},
  {src:'assets/poti/poster.png',caption:'Poti 介绍海报：角色设定、表情与衍生应用'}
 ]
});

// Project copy and images approved by MY.
const approvedMediaProjects={
  "tranquil-utopia": {
    "description": [
      "《宁静乌托邦》从对死亡的恐惧出发，探讨现代医疗技术、生命尊严与临终关怀之间的关系。项目关注一种矛盾：当人们借助技术不断延长生命、抵抗自然终点时，是否也加深了对死亡的恐惧与对生命意义的迷惘？设计通过虚构的未来社区与实验影像，邀请观众重新审视这一关系。",
      "在项目设定中，LDCO 是一个关注生命尊严的未来组织。“宁静乌托邦”社区将个人居住空间、家属陪伴与服务设施组织在一起，以接近家的环境回应生命最后阶段的生活需求。这一设定属于概念叙事，并非现实机构或已建成的医疗项目。",
      "视觉设计以白色和浅蓝色为主，结合弧形建筑、环形水道、植物与柔和光线，营造宁静、轻盈的空间氛围。三维建模将社区入口、建筑群、景观和居住空间转化为可观看的场景，使抽象的照护愿景获得具体的空间形态。",
      "设计还延伸至社区网页、AI 管家与智能手环等服务触点。网页承载社区介绍、申请入住、交流与阅读等内容；AI 管家 ROB-4079 与智能手环则作为概念中的陪伴和交互媒介。手环中的表单允许居民调整个人意愿或申请离开社区，将人的选择纳入对未来照护服务的思考。最终通过实验影像、三维场景和网页展示，邀请观众重新思考死亡、医疗技术与生命意义之间的关系。"
    ],
    "detailImages": [
      {
        "src": "assets/tranquil-utopia/details/detail-01.webp",
        "caption": "社区鸟瞰",
        "width": 1920,
        "height": 1080
      },
      {
        "src": "assets/tranquil-utopia/details/detail-02.webp",
        "caption": "社区入口",
        "width": 1920,
        "height": 1080
      },
      {
        "src": "assets/tranquil-utopia/details/detail-03.webp",
        "caption": "建筑与景观",
        "width": 1920,
        "height": 1080
      },
      {
        "src": "assets/tranquil-utopia/details/detail-04.webp",
        "caption": "居住空间建模过程",
        "width": 1920,
        "height": 1080
      },
      {
        "src": "assets/tranquil-utopia/details/detail-05.webp",
        "caption": "网页首页",
        "width": 1728,
        "height": 1117
      },
      {
        "src": "assets/tranquil-utopia/details/detail-06.webp",
        "caption": "社区介绍网页",
        "width": 1728,
        "height": 1117
      },
      {
        "src": "assets/tranquil-utopia/details/figma-services.webp",
        "caption": "网页、AI 管家与智能手环",
        "width": 1800,
        "height": 900
      }
    ],
    "outputs": [
      "概念设计",
      "三维场景",
      "实验影像",
      "网页设计"
    ]
  },
  "united-nations-candidate": {
    "description": [
      "《新共和国候选人》是一款围绕性别刻板印象与父权结构展开的讽刺性二维游戏。项目以“父权制下没有赢家”为核心命题，关注男性被要求表现强硬、女性被限定为柔弱等社会期待如何同时约束不同性别的人，并尝试以卡通视觉和游戏体验，引导年轻玩家思考平等、自由与相互理解。",
      "故事设定在一个因性别冲突而发生社会变革的未来世界。玩家作为联合国新领导人的候选者，需要通过一系列试炼，证明自己能够回应分歧、重建平等的社会。设计将这一宏观议题转化为具体的行动与选择，让玩家在通关过程中面对带有偏见的提示与规则。",
      "最终展示将三个关卡分别命名为力量（Strength）、敏捷（Agility）与公正（Impartiality）。力量关卡围绕推移重物与行动速度展开；敏捷关卡通过交替出现的前进、停止指令检验玩家行动；公正关卡则以对话选择呈现工作分工、家庭责任等问题，并结合生命值与错误反馈组织体验。关卡将操作挑战与社会议题结合，邀请玩家辨认习以为常的性别标签。",
      "视觉采用紫、粉、蓝色与手绘线条，塑造城市街道、机械设施和夸张的审判场景。轻松的卡通表象与带有压迫感的空间形成张力，使严肃议题以更易进入的方式展开。项目通过 Unity 游戏实现与影像展示，将角色、场景、界面和关卡流程组织为完整的作品表达。"
    ],
    "detailImages": [
      {
        "src": "assets/united-nations-candidate/details/detail-01.webp",
        "caption": "第一关：街道与路障",
        "width": 1740,
        "height": 776
      },
      {
        "src": "assets/united-nations-candidate/details/detail-02.webp",
        "caption": "第二关：机械设施",
        "width": 1724,
        "height": 782
      },
      {
        "src": "assets/united-nations-candidate/details/detail-03.webp",
        "caption": "第三关：对话选择",
        "width": 1724,
        "height": 810
      },
      {
        "src": "assets/united-nations-candidate/details/detail-04.webp",
        "caption": "第三关：角色状态与反馈",
        "width": 1738,
        "height": 780
      },
      {
        "src": "assets/united-nations-candidate/details/figma-concept.webp",
        "caption": "概念与关卡流程",
        "width": 1800,
        "height": 900
      },
      {
        "src": "assets/united-nations-candidate/details/figma-process.webp",
        "caption": "游戏制作与实现过程",
        "width": 1800,
        "height": 900
      }
    ],
    "outputs": [
      "游戏设计",
      "影像"
    ]
  }
};
for(const item of window.portfolioProjects){
 if(approvedMediaProjects[item.id])Object.assign(item,approvedMediaProjects[item.id]);
}

// One graduation series: each page links directly to every other project.
window.graduationProjectIDs=['haidian-jiwa','super-jiwa','jiwa-gashapon','huangzhuang-dream'];
for(const item of window.portfolioProjects){
 if(!window.graduationProjectIDs.includes(item.id))continue;
 item.seriesID='haidian-jiwa-graduation';
 item.seriesLabel='海淀鸡娃 · 毕业设计';
 item.relatedProjects=window.graduationProjectIDs.filter(id=>id!==item.id);
}

// Graduation introductions adapted from the thesis and approved by MY.
const approvedGraduationIntroductions={
  "haidian-jiwa": [
    "“海淀鸡娃”以在教育竞争中成长的中学生为创作对象，将“鸡”与“孩子”的视觉特征结合，塑造戴鸡形头套、穿宽大校服的角色。遮住上半张脸的头套与延伸至脚踝的衣摆，使面部表情和身体轮廓变得模糊，让形象承载一种熟悉而难以对应到具体个人的集体成长经验。",
    "白色头套与蓝、紫、粉三种邻近色校服构成系列视觉，珠光质感则为日常校园符号加入梦幻气息。设计从草图、三视图与三维模型逐步转化为实物，采用白色树脂光固化打印，并经过打磨补土、丙烯上色和保护封层，形成展示型与盲盒尺寸两种模型。角色也成为扭蛋机装置、小程序与影像叙事之间共同的视觉线索。"
  ],
  "super-jiwa": [
    "《超级鸡娃》是“海淀鸡娃”毕业设计中的小程序交互作品。由于展览中的实体扭蛋机无法实际扭出蛋体，设计以线上抽取体验作为补充，借用盲盒抽卡机的界面形式，将装置中的投入、期待与结果的不确定性延伸到可参与的数字体验中。",
    "用户在固定额度的虚拟预算内安排抽取策略，可以集中投入一次高价抽取，也可以分散为多次低价尝试。选择看似提供了控制结果的可能，但不同策略并不会改变每次抽取的底层概率。反复投入与等待结果的过程，使参与者体会从掌控感到落空感的变化，并重新思考教育投入、社会期待与个体成长之间的关系。"
  ],
  "jiwa-gashapon": [
    "“鸡娃扭蛋机”以扭蛋机“标准化投入、随机性产出”的结构，回应教育投入与成长结果之间的不确定关系。金钱、时间与期待被转化为熟悉的消费娱乐意象，让观众从日常经验出发，进入关于培养、竞争与评价的思考。",
    "装置采用纯白外观，与透明扭蛋中蓝、紫、粉色的“鸡娃”角色形成对照。透明球体让角色同时处于被保护、被封装与被展示的状态，延续了 IP 形象关于标准化与个体差异的表达。展览中的装置承担实体展示与叙事提示的作用，实际抽取体验由配套小程序补充，两者共同构成作品的参与路径。"
  ],
  "huangzhuang-dream": [
    "《黄庄一梦》以一次扭蛋行为作为记忆被唤起的起点：成长后的“鸡娃”在面对扭蛋的瞬间，被带回自己的少年时期。影像以动态循环动画组织叙事，通过蒙太奇、闪回与片段重组，让城市空间、角色和抽象符号像梦中的记忆碎片一样交叠，呈现回望童年时非线性的感知。",
    "场景从海淀黄庄及周边的地铁站、天桥、公共雕塑等日常景观中提取视觉特征，再通过悬浮、错置与重组，将现实地点转化为介于城市与主观记忆之间的空间。柔和梦幻的色彩与八音盒音乐形成温暖、童趣的外表，机械循环的动作和声音则带来另一层感受。作品保留含蓄开放的表达，让不同观众在熟悉与陌生、温馨与疏离之间，回望自己的成长经验。"
  ]
};
for(const item of window.portfolioProjects){
 if(approvedGraduationIntroductions[item.id])item.description=approvedGraduationIntroductions[item.id];
}

// Only completed project records are exposed to the portfolio views.
window.portfolioProjects=window.portfolioProjects.filter(project=>project.isReal===true);

// Additional graduation media approved by MY, including the mini-program code.
const approvedGraduationMedia={
  "jiwa-gashapon": {
    "graduationImages": [
        {
            "src": "assets/jiwa-gashapon/exhibition-05.webp",
            "original": "assets/jiwa-gashapon/exhibition-05.jpg",
            "caption": "透明扭蛋内的鸡娃角色细节",
            "width": 2048,
            "height": 1536
        },
        {
            "src": "assets/jiwa-gashapon/exhibition-57.webp",
            "original": "assets/jiwa-gashapon/exhibition-57.jpg",
            "caption": "鸡娃扭蛋机侧面与展台",
            "width": 2048,
            "height": 1536
        },
        {
            "src": "assets/jiwa-gashapon/exhibition-01.webp",
            "original": "assets/jiwa-gashapon/exhibition-01.jpg",
            "caption": "鸡娃扭蛋机展览整体",
            "width": 1600,
            "height": 2400
        },
        {
            "src": "assets/jiwa-gashapon/exhibition-03.webp",
            "original": "assets/jiwa-gashapon/exhibition-03.jpg",
            "caption": "透明球仓与鸡娃扭蛋",
            "width": 1536,
            "height": 2048
        },
        {
            "src": "assets/jiwa-gashapon/exhibition-69.webp",
            "original": "assets/jiwa-gashapon/exhibition-69.jpg",
            "caption": "展览现场与配套交互屏幕",
            "width": 1600,
            "height": 2400
        },
        {
            "src": "assets/jiwa-gashapon/exhibition-55.webp",
            "original": "assets/jiwa-gashapon/exhibition-55.jpg",
            "caption": "扭蛋机旋钮与展签细节",
            "width": 1536,
            "height": 2048
        }
    ]
},
  "super-jiwa": {
    "graduationVideo": {
      "src": "assets/super-jiwa/interaction-demo.mp4",
      "poster": "assets/super-jiwa/demo-poster.webp",
      "caption": "小程序交互演示",
      "portrait": true
    },
    "graduationImages": [
      {
        "src": "assets/super-jiwa/illustration-sketch.webp",
        "caption": "插画前期草图",
        "width": 476,
        "height": 476,
        "kind": "sketch"
      },
      {
        "src": "assets/super-jiwa/illustration-final.webp",
        "caption": "插画终稿",
        "width": 832,
        "height": 1160,
        "kind": "final"
      },
      {
        "src": "assets/super-jiwa/interaction-flow-final.webp",
        "caption": "小程序交互流程",
        "width": 1682,
        "height": 700,
        "kind": "flow"
      },
      {
        "src": "assets/super-jiwa/result-final-1.svg",
        "caption": "普通鸡娃 01 · 完整结果卡片",
        "width": 312,
        "height": 407,
        "kind": "full-result"
      },
      {
        "src": "assets/super-jiwa/result-final-2.svg",
        "caption": "普通鸡娃 02 · 完整结果卡片",
        "width": 318,
        "height": 412,
        "kind": "full-result"
      },
      {
        "src": "assets/super-jiwa/result-final-3.svg",
        "caption": "超级鸡娃 · 完整结果卡片",
        "width": 316,
        "height": 413,
        "kind": "full-result"
      },
      {
        "src": "assets/super-jiwa/mini-program-code.webp",
        "caption": "微信扫码体验小程序",
        "width": 1210,
        "height": 1210,
        "kind": "code"
      }
    ]
  },
  "huangzhuang-dream": {
    "videoPrimary": true,
    "graduationVideo": {
      "src": "assets/huangzhuang-dream/film.mp4",
      "poster": "assets/huangzhuang-dream/film-poster.webp",
      "caption": "黄庄一梦 · 完整影像"
    },
    "graduationImages": [
      {
        "src": "assets/huangzhuang-dream/selected-still-01.webp",
        "caption": "扭蛋与记忆的起点",
        "width": 1920,
        "height": 1080,
        "kind": ""
      },
      {
        "src": "assets/huangzhuang-dream/selected-still-02.webp",
        "caption": "海淀黄庄的城市意象",
        "width": 1920,
        "height": 1080,
        "kind": ""
      },
      {
        "src": "assets/huangzhuang-dream/selected-still-03.webp",
        "caption": "天桥上的鸡娃",
        "width": 1920,
        "height": 1080,
        "kind": ""
      },
      {
        "src": "assets/huangzhuang-dream/selected-still-04.webp",
        "caption": "记忆中的足球场",
        "width": 1920,
        "height": 1080,
        "kind": ""
      },
      {
        "src": "assets/huangzhuang-dream/selected-still-05.webp",
        "caption": "成长记忆中的时钟",
        "width": 1920,
        "height": 1080,
        "kind": ""
      }
    ]
  }
};
for(const item of window.portfolioProjects){
 if(approvedGraduationMedia[item.id])Object.assign(item,approvedGraduationMedia[item.id]);
}

// Approved course project: 情人坡失物簿.
window.portfolioProjects.push({
  "id": "lost-property",
  "title": "情人坡失物簿",
  "year": 2025,
  "month": 3,
  "yearConfirmed": true,
  "primaryCategory": "space",
  "types": [
    "space"
  ],
  "outputs": [
    "空间装置",
    "影像记录"
  ],
  "isReal": true,
  "format": "photo",
  "image": "assets/lost-property/photo-10.webp",
  "original": "assets/lost-property/photo-10.jpg",
  "imageAlt": "情人坡失物簿：蓝天下悬挂失物图像的气球",
  "collaborators": [
    "秦子悦",
    "李铭玥"
  ],
  "detailImages": [
    {
      "src": "assets/lost-property/photo-10.webp",
      "original": "assets/lost-property/photo-10.jpg",
      "caption": "情人坡失物簿项目封面",
      "width": 2400,
      "height": 1850
    },
    {
      "src": "assets/lost-property/photo-08.webp",
      "original": "assets/lost-property/photo-08.jpg",
      "caption": "气球与失物图像在树枝间的整体布置",
      "width": 2400,
      "height": 1600
    },
    {
      "src": "assets/lost-property/photo-01.webp",
      "original": "assets/lost-property/photo-01.jpg",
      "caption": "气球与情人坡空间",
      "width": 1600,
      "height": 2400
    },
    {
      "src": "assets/lost-property/photo-02.webp",
      "original": "assets/lost-property/photo-02.jpg",
      "caption": "悬挂在气球下的失物图像",
      "width": 2400,
      "height": 1600
    },
    {
      "src": "assets/lost-property/photo-05.webp",
      "original": "assets/lost-property/photo-05.jpg",
      "caption": "树枝间的气球与失物",
      "width": 1600,
      "height": 2400
    },
    {
      "src": "assets/lost-property/photo-06.webp",
      "original": "assets/lost-property/photo-06.jpg",
      "caption": "现场布置过程",
      "width": 2400,
      "height": 1600
    },
    {
      "src": "assets/lost-property/photo-21.webp",
      "original": "assets/lost-property/photo-21.jpg",
      "caption": "失物图像整理与安装",
      "width": 2400,
      "height": 1600
    },
    {
      "src": "assets/lost-property/photo-04.webp",
      "original": "assets/lost-property/photo-04.jpg",
      "caption": "气球随风远去",
      "width": 2400,
      "height": 1350
    }
  ],
  "description": [
    "《情人坡失物簿》关注人与校园空间之间的情感联系。被遗落在情人坡的物品，既是具体的日常用品，也承载着某个人的经历、某段关系或未曾释然的记忆。作品将这些失物转化为图像，悬挂在气球下方，让它们重新出现在曾经被遗落的空间中。",
    "创作最初尝试由人直接放飞气球，随后将方案调整为把气球高低错落地布置在树枝之间，让它们自然随风飘散。气球成为情感的载体，失物图像随之升起、远去，表达对过去的释怀与对未来的开放。现场也有人驻足观看、拍照，使作品与经过这片空间的人产生新的联系。"
  ],
  "projectVideos": [
    {
      "src": "assets/lost-property/intro.mp4",
      "poster": "assets/lost-property/intro-poster.jpg",
      "caption": "记录簿介绍"
    },
    {
      "src": "assets/lost-property/film.mp4",
      "poster": "assets/lost-property/film-poster.jpg",
      "caption": "现场影像记录"
    }
  ]
});

// Approved character design course project.
window.portfolioProjects.push({
  "id": "tiangou",
  "title": "《山海经》天狗形象设计",
  "year": 2024,
  "month": 3,
  "yearConfirmed": true,
  "primaryCategory": "ip",
  "types": [
    "ip"
  ],
  "outputs": [
    "IP形象设计",
    "字体设计"
  ],
  "tools": [
    "procreate",
    "ps"
  ],
  "isReal": true,
  "format": "photo",
  "transparent": true,
  "image": "assets/tiangou/cover.webp",
  "original": "assets/tiangou/cover.png",
  "imageAlt": "《山海经》天狗形象：白首、灰褐色斑纹与金色绣球",
  "detailImages": [
    {
      "number": 2,
      "src": "assets/tiangou/image-02.webp",
      "original": "assets/tiangou/image-02.png",
      "caption": "轮廓草图",
      "width": 2048,
      "height": 2048
    },
    {
      "number": 3,
      "src": "assets/tiangou/image-03.webp",
      "original": "assets/tiangou/image-03.png",
      "caption": "上色与造型推敲",
      "width": 2048,
      "height": 2048
    },
    {
      "number": 4,
      "src": "assets/tiangou/image-04.webp",
      "original": "assets/tiangou/image-04.png",
      "caption": "三视图与状态设定",
      "width": 2024,
      "height": 1710
    },
    {
      "number": 8,
      "src": "assets/tiangou/image-08.webp",
      "original": "assets/tiangou/image-08.jpeg",
      "caption": "天狗字体设计",
      "width": 1355,
      "height": 1179
    },
    {
      "number": 5,
      "src": "assets/tiangou/image-05.webp",
      "original": "assets/tiangou/image-05.png",
      "caption": "标准形象",
      "width": 1010,
      "height": 758
    },
    {
      "number": 6,
      "src": "assets/tiangou/image-06.webp",
      "original": "assets/tiangou/image-06.png",
      "caption": "守护状态",
      "width": 920,
      "height": 1086
    },
    {
      "number": 7,
      "src": "assets/tiangou/image-07.webp",
      "original": "assets/tiangou/image-07.png",
      "caption": "御凶状态",
      "width": 920,
      "height": 1084
    }
  ],
  "description": [
    "本项目以《山海经》中“状如狸而白首”“可以御凶”的天狗为创作起点，探索古代异兽描述与当代角色设计之间的转化。前期通过动物形态、传统异兽图像及陕西炕头石狮等资料研究，提取猫科动物的体态、白色面部与守护意象，逐步建立角色的外形与故事设定。",
    "形象以灰褐色斑纹、修长耳形和长尾形成识别特征，并加入金色项圈、璎珞与绣球。角色拥有“守护”与“御凶”两种状态：平和时呈现异色双瞳，战斗时转为血红眼睛，绣球也分别对应“煦日”与“烈日”。设计通过三视图、配饰细节、动作及日夜场景，展现角色的性格与状态变化。",
    "配套字体将“天狗”二字结合为纵向图形，并参考篆字与符箓的形式，使文字与角色的神话气质保持联系。"
  ]
});
