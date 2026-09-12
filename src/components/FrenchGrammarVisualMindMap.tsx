import React, { useState, useRef } from 'react';
import { 
  Network, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ChevronRight, 
  ChevronDown, 
  Sparkles, 
  Layers, 
  ArrowRight,
  ExternalLink,
  BookOpen
} from 'lucide-react';

export interface FrenchMindMapNode {
  id: string;
  label: string;
  subLabel?: string;
  grammarId?: string; // If set, clicking will jump to card
  tabTarget?: 'library' | 'conjugation';
  color: 'rose' | 'indigo' | 'emerald' | 'amber';
  children?: FrenchMindMapNode[];
}

export const FRENCH_MIND_MAP_TREE_DATA: FrenchMindMapNode = {
  id: 'root',
  label: '🇫🇷 法语核心文法全景思维导图',
  subLabel: 'Arborescence de la Grammaire (考研二外 & DELF 46核心考点全景大树)',
  color: 'rose',
  children: [
    // ==================== 主干 1: 冠词、名词与性数配合 ====================
    {
      id: 'branch-articles-nouns',
      label: '① 冠词全景、名词与性数配合 (Articles & Noms)',
      subLabel: '法语句法基石：名词前几乎必带冠词，性数配合贯穿全语言骨架',
      color: 'rose',
      children: [
        {
          id: 'sub-articles',
          label: '三大冠词体系 (判定之母)',
          color: 'rose',
          children: [
            { id: 'leaf-art-def', label: '定冠词 (le, la, l\', les)', subLabel: '特指已知事物 / 整体类别', grammarId: 'g_articles', color: 'rose' },
            { id: 'leaf-art-indef', label: '不定冠词 (un, une, des)', subLabel: '泛指可数个体初次提及', grammarId: 'g_articles', color: 'rose' },
            { id: 'leaf-art-part', label: '部分冠词 (du, de la, des)', subLabel: '不可数物质量 / 抽象品质', grammarId: 'g_articles', color: 'rose' },
            { id: 'leaf-art-neg-de', label: '否定句绝对变 de', subLabel: 'pas de pain (考研避坑大题)', grammarId: 'g_articles', color: 'rose' }
          ]
        },
        {
          id: 'sub-nouns-gender',
          label: '名词阴阳性与复数规则',
          color: 'rose',
          children: [
            { id: 'leaf-n-fem', label: '阴性后缀规律', subLabel: '-tion, -sion, -té, -ette 绝多为阴性', color: 'rose' },
            { id: 'leaf-n-masc', label: '阳性后缀规律', subLabel: '-ment, -teur, -age, -isme 绝多为阳性', color: 'rose' },
            { id: 'leaf-n-plural', label: '名词复数特异形', subLabel: '-al 变 -aux (cheval➔chevaux)', color: 'rose' }
          ]
        },
        {
          id: 'sub-adj-agreement',
          label: '品质与限定形容词',
          color: 'rose',
          children: [
            { id: 'leaf-adj-accord', label: '品质形容词性数配合', subLabel: '阴性加 -e，复数加 -s', color: 'rose' },
            { id: 'leaf-adj-pos', label: 'BAGS 前置形容词', subLabel: 'beau, bon, grand, petit 放在名词前', color: 'rose' },
            { id: 'leaf-adj-possessive', label: '主有形容词 (mon/ton/son)', subLabel: '修饰词随所拥有物阴阳配合', color: 'rose' },
            { id: 'leaf-adj-demonstrative', label: '指示形容词 (ce/cet/cette/ces)', subLabel: 'cet 用于元音/哑音h开头阳单', color: 'rose' }
          ]
        }
      ]
    },

    // ==================== 主干 2: 代词全景与指代体系 ====================
    {
      id: 'branch-pronouns',
      label: '② 代词全景与指代体系 (Système des Pronoms)',
      subLabel: '考研二外失分重灾区：COD/COI/副代词y与en及代动词严格排位法则',
      color: 'indigo',
      children: [
        {
          id: 'sub-subject-tonic',
          label: '主格代词与重读代词',
          color: 'indigo',
          children: [
            { id: 'leaf-pr-subject', label: '主格人称代词 (je~ils/on)', subLabel: 'on 的泛指某人与口语“我们”', color: 'indigo' },
            { id: 'leaf-pr-tonic', label: '重读代词 (moi, toi, lui...)', subLabel: '介词后/比较级后/强调句 C\'est moi qui', color: 'indigo' }
          ]
        },
        {
          id: 'sub-cod-coi',
          label: '直接宾语 COD 与间接宾语 COI',
          color: 'indigo',
          children: [
            { id: 'leaf-pr-cod', label: '直宾代词 COD (le/la/les)', subLabel: '无介词直连 · 提前置于动词前', grammarId: 'g_pronouns_cod_coi', color: 'indigo' },
            { id: 'leaf-pr-coi', label: '间宾代词 COI (me/te/lui/nous/vous/leur)', subLabel: '带 à 接人 · 不分男女单lui复leur', grammarId: 'g_pronouns_cod_coi', color: 'indigo' },
            { id: 'leaf-pr-order', label: '双宾语代词排位律', subLabel: 'me/te ➔ le/la ➔ lui/leur ➔ y ➔ en', color: 'indigo' }
          ]
        },
        {
          id: 'sub-y-en',
          label: '考研双璧：副代词 y 与 en',
          color: 'indigo',
          children: [
            { id: 'leaf-pr-y-place', label: '副代词 Y 替代地点与 à 事物', subLabel: 'J\'y vais / J\'y pense (绝不代人)', grammarId: 'g_pronouns_y_en', color: 'indigo' },
            { id: 'leaf-pr-en-quantity', label: '副代词 EN 替代 de 与数量', subLabel: 'J\'en ai deux / J\'en viens', grammarId: 'g_pronouns_y_en', color: 'indigo' },
            { id: 'leaf-pr-penser-trap', label: 'Penser à qn 考研陷阱', subLabel: '想人只用重读 Je pense à elle', grammarId: 'g_pronouns_y_en', color: 'indigo' }
          ]
        },
        {
          id: 'sub-relatives',
          label: '关系代词与从句指代',
          color: 'indigo',
          children: [
            { id: 'leaf-pr-qui-que', label: 'qui (代主语) vs que (代直宾)', subLabel: '关系代词引导定语从句', color: 'indigo' },
            { id: 'leaf-pr-ou-dont', label: 'où (地点时间) & dont (代 de 引导成分)', subLabel: 'la ville où... / le livre dont...', color: 'indigo' }
          ]
        }
      ]
    },

    // ==================== 主干 3: 动词变位、时态与配合 ====================
    {
      id: 'branch-verbs-tenses',
      label: '③ 动词变位、时态与语态配合 (Conjugaison & Voix)',
      subLabel: '动词是全句的心脏：三大门派脱帽换衣、过去时态对决与四大配合铁律',
      color: 'emerald',
      children: [
        {
          id: 'sub-verb-groups',
          label: '三大动词门派 (脱帽换衣法则)',
          color: 'emerald',
          children: [
            { id: 'leaf-vg-1st', label: '第 1 组 -er 脱帽换衣派', subLabel: '85% 动词 · 砍帽穿衣 · 四声全同', tabTarget: 'conjugation', color: 'emerald' },
            { id: 'leaf-vg-2nd', label: '第 2 组 -ir 双胞胎家族', subLabel: '单数 -is/-it，复数必带双胞胎 -iss-', tabTarget: 'conjugation', color: 'emerald' },
            { id: 'leaf-vg-3rd-kings', label: '第 3 组四大天王 (基石派)', subLabel: 'être, avoir, aller, faire 独立记忆', tabTarget: 'conjugation', color: 'emerald' }
          ]
        },
        {
          id: 'sub-core-tenses',
          label: '直陈式三大过去时态',
          color: 'emerald',
          children: [
            { id: 'leaf-t-pc', label: '复合过去时 (Passé Composé)', subLabel: '助动词现在时 + 过去分词 (闪电断点)', grammarId: 'g_passe_compose_accord', tabTarget: 'conjugation', color: 'emerald' },
            { id: 'leaf-t-imp', label: '未完成过去时 (Imparfait)', subLabel: '现在时 nous 词根 + 旧毛衣 (画卷背景)', grammarId: 'g_imparfait_vs_pc', tabTarget: 'conjugation', color: 'emerald' },
            { id: 'leaf-t-imp-vs-pc', label: '未完成 vs 复合对决', subLabel: '考研篇章必考：背景状态 vs 突发动作', grammarId: 'g_imparfait_vs_pc', color: 'emerald' }
          ]
        },
        {
          id: 'sub-agreement-laws',
          label: '四大灵魂纽带与性数配合',
          color: 'emerald',
          children: [
            { id: 'leaf-accord-etre', label: '14个房子位移词用 être 必配合', subLabel: 'DR MRS VANDERTRAMP 分词随主语配合', grammarId: 'g_passe_compose_accord', color: 'emerald' },
            { id: 'leaf-accord-cod-advance', label: '直宾 COD 抢跑提前配合', subLabel: 'Les fleurs que j\'ai achetées', grammarId: 'g_passe_compose_accord', color: 'emerald' },
            { id: 'leaf-accord-reflexive', label: '代动词配合判定绝招', subLabel: 'se 是直宾配合，间宾绝对不加 -e/-s', grammarId: 'g_reflexive_verbs', color: 'emerald' },
            { id: 'leaf-passive-voice', label: '被动语态 (Voix passive)', subLabel: 'être + 过去分词 + par (严格性数配合)', color: 'emerald' }
          ]
        }
      ]
    },

    // ==================== 主干 4: 虚拟式、条件式与复合从句 ====================
    {
      id: 'branch-modes-clauses',
      label: '④ 虚拟式、条件式与假设从句 (Modes & Si)',
      subLabel: '考研二外拔高分水岭：主观愿望虚拟式触发器、Si 假设系统与命令式',
      color: 'amber',
      children: [
        {
          id: 'sub-subjonctif',
          label: '虚拟式现在时 (Subjonctif)',
          color: 'amber',
          children: [
            { id: 'leaf-sub-derivation', label: '虚拟式推导零件加工法', subLabel: '现在时 ils 词根 + (-e/-es/-e/-ions/-iez/-ent)', grammarId: 'g_subjonctif', tabTarget: 'conjugation', color: 'amber' },
            { id: 'leaf-sub-obligatoire', label: '必要命令触发器', subLabel: 'Il faut que / Il est nécessaire que', grammarId: 'g_subjonctif', color: 'amber' },
            { id: 'leaf-sub-sentiment', label: '愿望情感连词短语', subLabel: 'vouloir que / bien que / pour que', grammarId: 'g_subjonctif', color: 'amber' },
            { id: 'leaf-sub-esperer-trap', label: 'Espérer que 考研送命雷区', subLabel: '后面接直陈将来时，绝不接虚拟式！', grammarId: 'g_subjonctif', color: 'amber' }
          ]
        },
        {
          id: 'sub-conditionnel-si',
          label: '条件式与 Si 假设系统',
          color: 'amber',
          children: [
            { id: 'leaf-cond-formation', label: '条件式：将来鱼身 + 未完成旧衣', subLabel: '以 -r 结尾词根 + -ais/-ait/-ions...', tabTarget: 'conjugation', color: 'amber' },
            { id: 'leaf-si-type1', label: 'Si 句型一：可能实现', subLabel: 'Si + 直陈式现在时 ➔ 主句简单将来时', color: 'amber' },
            { id: 'leaf-si-type2', label: 'Si 句型二：与现在事实相反', subLabel: 'Si + 未完成过去时 ➔ 主句条件式现在时', color: 'amber' },
            { id: 'leaf-polite-request', label: '礼貌委婉愿望 (Politesse)', subLabel: 'Je voudrais... / J\'aimerais...', color: 'amber' }
          ]
        },
        {
          id: 'sub-imperatif-discourse',
          label: '命令式与间接引语',
          color: 'amber',
          children: [
            { id: 'leaf-imp-rule', label: '命令式 tu 形式去 -s 规则', subLabel: 'Parle ! (去-s) vs Vas-y ! (顺口补-s)', tabTarget: 'conjugation', color: 'amber' },
            { id: 'leaf-indirect-speech', label: '间接引语时态呼应法则', subLabel: '主句过去时，从句时态发生历史倒退', color: 'amber' }
          ]
        }
      ]
    }
  ]
};

interface FrenchGrammarVisualMindMapProps {
  onSelectGrammar: (id: string) => void;
  onNavigateConjugation?: () => void;
  onClose?: () => void;
}

export const FrenchGrammarVisualMindMap: React.FC<FrenchGrammarVisualMindMapProps> = ({
  onSelectGrammar,
  onNavigateConjugation,
  onClose
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [collapsedBranchIds, setCollapsedBranchIds] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const toggleCollapse = (branchId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCollapsedBranchIds(prev => 
      prev.includes(branchId) 
        ? prev.filter(id => id !== branchId) 
        : [...prev, branchId]
    );
  };

  const expandAllBranches = () => {
    setCollapsedBranchIds([]);
  };

  const collapseAllBranches = () => {
    if (FRENCH_MIND_MAP_TREE_DATA.children) {
      setCollapsedBranchIds(FRENCH_MIND_MAP_TREE_DATA.children.map(c => c.id));
    }
  };

  const handleZoom = (delta: number) => {
    setZoomLevel(prev => Math.min(130, Math.max(70, prev + delta)));
  };

  const resetZoom = () => {
    setZoomLevel(100);
  };

  const handleLeafClick = (leaf: FrenchMindMapNode) => {
    if (leaf.tabTarget === 'conjugation' && onNavigateConjugation) {
      onNavigateConjugation();
      return;
    }
    if (leaf.grammarId) {
      onSelectGrammar(leaf.grammarId);
    }
  };

  return (
    <div className="bg-white text-slate-900 rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xs space-y-5 overflow-hidden relative">
      
      {/* Background Grid Pattern & Ambient Glow */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px), radial-gradient(#e2e8f0 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px'
        }} 
      />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* Header Controls Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-br from-[#80142A] to-rose-700 text-white shadow-md shadow-rose-900/20">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 flex-wrap">
              <span>法语核心文法可视化思维导图 (Visual Tree Graph)</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-[#80142A] border border-rose-200 font-extrabold">
                全景拓扑图
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              点按各级主干自由展开/收折，点击叶子节点秒级直通语法考点卡片或动词变位工作台
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {/* Zoom Controls */}
          <div className="flex items-center bg-slate-100 rounded-xl border border-slate-200 p-1">
            <button
              onClick={() => handleZoom(-10)}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white transition cursor-pointer"
              title="缩小视图"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono font-bold px-2 text-slate-700 select-none">
              {zoomLevel}%
            </span>
            <button
              onClick={() => handleZoom(10)}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white transition cursor-pointer"
              title="放大视图"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={resetZoom}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white transition ml-0.5 cursor-pointer"
              title="重置缩放"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Expand / Collapse All */}
          <div className="flex items-center bg-slate-100 rounded-xl border border-slate-200 p-1 text-xs">
            <button
              onClick={expandAllBranches}
              className="px-2.5 py-1 rounded-lg font-medium text-slate-700 hover:text-slate-900 hover:bg-white transition cursor-pointer"
            >
              展开全部
            </button>
            <button
              onClick={collapseAllBranches}
              className="px-2.5 py-1 rounded-lg font-medium text-slate-700 hover:text-slate-900 hover:bg-white transition cursor-pointer"
            >
              收起分支
            </button>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
            >
              收起导图
            </button>
          )}
        </div>
      </div>

      {/* --- Main Interactive Tree Canvas --- */}
      <div 
        ref={containerRef}
        className="relative overflow-x-auto overflow-y-hidden pb-4 pt-2 scrollbar-thin"
      >
        <div 
          className="min-w-[960px] sm:min-w-[1100px] flex items-stretch gap-0 transition-transform duration-200 origin-top-left relative"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          
          {/* 1. Central Root Node (中心总根节点 - 垂直居中) */}
          <div className="shrink-0 flex flex-col items-center justify-center my-auto z-10 w-[210px] sm:w-[240px]">
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-[#80142A] via-[#941A33] to-[#600D1E] text-white shadow-xl shadow-rose-900/25 border border-rose-400 text-center w-full space-y-1.5 select-none ring-4 ring-rose-100 relative">
              <div className="w-10 h-10 mx-auto rounded-2xl bg-white/20 flex items-center justify-center text-xl font-bold backdrop-blur-md shadow-inner">
                🌳
              </div>
              <h2 className="text-sm sm:text-base font-black tracking-tight">
                {FRENCH_MIND_MAP_TREE_DATA.label}
              </h2>
              <p className="text-[10px] text-rose-100 font-medium opacity-95 leading-tight">
                {FRENCH_MIND_MAP_TREE_DATA.subLabel}
              </p>
              <div className="pt-1">
                <span className="text-[9px] px-2.5 py-0.5 rounded-full bg-white/20 text-white font-bold inline-block">
                  4 大主干 · 46 核心考点
                </span>
              </div>

              {/* Root Node Right Branch Port Anchor Dot */}
              <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#80142A] border-2 border-white shadow-md shadow-rose-900/40 ring-2 ring-rose-300 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </div>
            </div>
          </div>

          {/* 2. Middle Connector Gutter */}
          <div className="shrink-0 w-10 sm:w-12 relative flex items-center justify-center self-stretch pointer-events-none">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-rose-400 via-indigo-400 to-rose-500 rounded-full shadow-xs" />
          </div>

          {/* 3. 4 Primary Branches Container */}
          <div className="flex-1 space-y-6 relative">
            {FRENCH_MIND_MAP_TREE_DATA.children?.map((branch, branchIdx, arr) => {
              const isBranchCollapsed = collapsedBranchIds.includes(branch.id);
              const isFirst = branchIdx === 0;
              const isLast = branchIdx === arr.length - 1;
              
              const themeStyles = 
                branch.color === 'rose' ? {
                  border: 'border-rose-200',
                  bg: 'bg-white hover:border-rose-300',
                  headerBg: 'from-rose-50 via-rose-50/70 to-amber-50/30',
                  headerTitle: 'text-slate-900',
                  pill: 'bg-rose-100 text-[#80142A] border-rose-200',
                  cardBg: 'bg-slate-50/80 border-slate-200/90',
                  nodeBg: 'bg-white hover:bg-rose-50 text-slate-800 hover:text-[#80142A] border-slate-200 hover:border-rose-300',
                  nodeText: 'text-slate-900',
                  badge: 'bg-[#80142A] text-white',
                  stemColor: 'border-rose-300 group-hover/sub:border-rose-400',
                  branchLine: 'bg-rose-400',
                  spineSegment: 'from-rose-400 to-indigo-400',
                  dot: 'bg-[#80142A]',
                  dotRing: 'ring-rose-100'
                } :
                branch.color === 'indigo' ? {
                  border: 'border-indigo-200',
                  bg: 'bg-white hover:border-indigo-300',
                  headerBg: 'from-indigo-50 via-indigo-50/70 to-rose-50/30',
                  headerTitle: 'text-slate-900',
                  pill: 'bg-indigo-100 text-indigo-700 border-indigo-200',
                  cardBg: 'bg-slate-50/80 border-slate-200/90',
                  nodeBg: 'bg-white hover:bg-indigo-50 text-slate-800 hover:text-indigo-900 border-slate-200 hover:border-indigo-300',
                  nodeText: 'text-slate-900',
                  badge: 'bg-indigo-600 text-white',
                  stemColor: 'border-indigo-300 group-hover/sub:border-indigo-400',
                  branchLine: 'bg-indigo-400',
                  spineSegment: 'from-indigo-400 to-emerald-400',
                  dot: 'bg-indigo-600',
                  dotRing: 'ring-indigo-100'
                } :
                branch.color === 'emerald' ? {
                  border: 'border-emerald-200',
                  bg: 'bg-white hover:border-emerald-300',
                  headerBg: 'from-emerald-50 via-emerald-50/70 to-teal-50/30',
                  headerTitle: 'text-slate-900',
                  pill: 'bg-emerald-100 text-emerald-700 border-emerald-200',
                  cardBg: 'bg-slate-50/80 border-slate-200/90',
                  nodeBg: 'bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 border-slate-200 hover:border-emerald-300',
                  nodeText: 'text-slate-900',
                  badge: 'bg-emerald-600 text-white',
                  stemColor: 'border-emerald-300 group-hover/sub:border-emerald-400',
                  branchLine: 'bg-emerald-400',
                  spineSegment: 'from-emerald-400 to-amber-400',
                  dot: 'bg-emerald-600',
                  dotRing: 'ring-emerald-100'
                } : {
                  border: 'border-amber-200',
                  bg: 'bg-white hover:border-amber-300',
                  headerBg: 'from-amber-50 via-amber-50/70 to-orange-50/30',
                  headerTitle: 'text-slate-900',
                  pill: 'bg-amber-100 text-amber-800 border-amber-200',
                  cardBg: 'bg-slate-50/80 border-slate-200/90',
                  nodeBg: 'bg-white hover:bg-amber-50 text-slate-800 hover:text-amber-900 border-slate-200 hover:border-amber-300',
                  nodeText: 'text-slate-900',
                  badge: 'bg-amber-600 text-white',
                  stemColor: 'border-amber-300 group-hover/sub:border-amber-400',
                  branchLine: 'bg-amber-400',
                  spineSegment: 'from-amber-400 to-rose-400',
                  dot: 'bg-amber-600',
                  dotRing: 'ring-amber-100'
                };

              return (
                <div 
                  key={branch.id}
                  className={`rounded-2xl border ${themeStyles.border} ${themeStyles.bg} transition-all duration-300 shadow-xs relative`}
                >
                  {/* Vertical Tree Spine Segment */}
                  <div 
                    className={`absolute -left-5 sm:-left-6 w-1 bg-gradient-to-b ${themeStyles.spineSegment} pointer-events-none z-0 ${
                      isFirst 
                        ? 'top-7 -bottom-6 rounded-t-full' 
                        : isLast 
                          ? '-top-6 h-[calc(1.5rem+1.75rem)] rounded-b-full' 
                          : '-top-6 -bottom-6'
                    }`} 
                  />

                  {/* Left Entrance Horizontal Branch Line connecting to Tree Spine */}
                  <div className="absolute -left-5 sm:-left-6 top-7 w-5 sm:w-6 flex items-center pointer-events-none z-10">
                    <div className={`w-full h-1 ${themeStyles.branchLine} rounded-full shadow-xs`} />
                    <div className={`w-2.5 h-2.5 rounded-full ${themeStyles.dot} -mr-1 ring-4 ${themeStyles.dotRing} shrink-0`} />
                  </div>

                  {/* Primary Branch Header (Click to collapse/expand) */}
                  <div 
                    onClick={(e) => toggleCollapse(branch.id, e)}
                    className={`p-3.5 sm:p-4 bg-gradient-to-r ${themeStyles.headerBg} border-b border-slate-100 flex items-center justify-between cursor-pointer select-none transition hover:opacity-95 rounded-t-2xl`}
                  >
                    <div className="flex items-center gap-3">
                      <button className="p-1 rounded-lg bg-white/80 text-slate-700 shadow-2xs border border-slate-200/60 transition">
                        {isBranchCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      <div>
                        <h4 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2 flex-wrap">
                          <span>{branch.label}</span>
                          <span className={`text-[10px] px-2 py-0.2 rounded-full border font-bold ${themeStyles.pill}`}>
                            {branch.children?.reduce((acc, c) => acc + (c.children?.length || 0), 0)} 个核心考点
                          </span>
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {branch.subLabel}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                      {isBranchCollapsed ? '点击展开分支' : '点击收起'}
                    </span>
                  </div>

                  {/* Secondary Branches & Leaf Nodes */}
                  {!isBranchCollapsed && (
                    <div className="p-4 space-y-4 animate-in fade-in duration-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        {branch.children?.map((subCat) => {
                          return (
                            <div 
                              key={subCat.id}
                              className="bg-slate-50/70 rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-3 flex flex-col justify-between group/sub hover:bg-slate-50 transition"
                            >
                              {/* Subcategory Header Label */}
                              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                                <div className="flex items-center gap-2">
                                  <span className={`w-2 h-2 rounded-full ${themeStyles.dot} ring-4 ${themeStyles.dotRing}`} />
                                  <span className="text-xs font-bold text-slate-800">{subCat.label}</span>
                                </div>
                                <span className="text-[10px] text-slate-500 font-mono px-2 py-0.5 rounded-full bg-white border border-slate-200 font-semibold shadow-2xs">
                                  {subCat.children?.length || 0} 考点
                                </span>
                              </div>

                              {/* Mind Map Tree Branch Connector Line & Nodes */}
                              <div className={`flex-1 flex flex-col justify-center my-auto py-1 pl-3.5 relative border-l-2 border-dashed ${themeStyles.stemColor} space-y-2 transition-colors`}>
                                {subCat.children?.map((leaf) => (
                                  <div key={leaf.id} className="relative flex items-center">
                                    {/* Mind Map Horizontal Branch Connector Line */}
                                    <div className={`absolute -left-3.5 w-3.5 h-0.5 ${themeStyles.branchLine}`} />
                                    
                                    {/* Leaf Node Button */}
                                    <button
                                      onClick={() => handleLeafClick(leaf)}
                                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 flex items-center justify-between gap-2 cursor-pointer shadow-2xs active:scale-[0.98] group/leaf ${themeStyles.nodeBg}`}
                                      title={`点击跳转查看：${leaf.label} (${leaf.subLabel || ''})`}
                                    >
                                      <div className="flex items-center gap-1.5 min-w-0">
                                        <span className="font-bold text-slate-900 group-hover/leaf:text-[#80142A] tracking-wide shrink-0">{leaf.label}</span>
                                        {leaf.subLabel && (
                                          <span className="text-[11px] text-slate-500 group-hover/leaf:text-slate-700 truncate font-normal">
                                            · {leaf.subLabel}
                                          </span>
                                        )}
                                      </div>
                                      <ArrowRight className="w-3 h-3 text-slate-400 opacity-0 group-hover/leaf:opacity-100 group-hover/leaf:text-[#80142A] group-hover/leaf:translate-x-0.5 transition shrink-0" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Bottom Hint Footer */}
      <div className="relative z-10 pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Sparkles className="w-3.5 h-3.5 text-[#80142A]" />
          <span>全体系覆盖：冠词名词基石 (11) · 代词指代体系 (11) · 动词变位与时态配合 (12) · 虚拟式/条件式从句 (12)</span>
        </div>
        <span className="text-slate-400">点击任意知识点按钮即可直达语法考点卡片或动词变位工作台</span>
      </div>

    </div>
  );
};
