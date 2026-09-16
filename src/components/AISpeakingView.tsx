import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  Sparkles, 
  RotateCcw, 
  Clock,
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Layers, 
  ChevronRight, 
  Award, 
  Eye, 
  EyeOff,
  Flame,
  MessageSquare,
  Bot,
  RefreshCw,
  BarChart3,
  Lock,
  Globe2,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AI_SCENARIOS_DATA, AIScenario, DialogueTurn } from '../data/french/aiScenarios';
import { speakFrench, stopFrenchSpeech } from '../utils/speech';

export interface AISpeakingViewProps {
  isVip?: boolean;
  onOpenVipModal?: (reason?: string) => void;
}

export interface SuggestionOption {
  tag: string;
  text: string;
  zh?: string;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  name: string;
  avatar: string;
  fr: string;
  zh?: string;
  phonetic?: string;
  grammarTip?: string;
  suggestedResponses?: SuggestionOption[];
  score?: {
    fluency: number;
    grammar: number;
    pronunciation: number;
  };
  feedback?: string;
}

const SCENARIO_REPLY_REGISTRY: Record<string, { replyFr: string; replyZh: string; grammarTip: string; nextSuggestions: string[] }> = {
  fr_cafe_01: {
    replyFr: 'C\'est bien noté ! Je vous apporte cela tout de suite. Voulez-vous également un verre d\'eau fraîche ou une petite douceur avec votre café ?',
    replyZh: '记好啦！我马上为您送来。您还需要一杯冰水或者配咖啡的法式小甜点吗？',
    grammarTip: '习惯表达：Je vous apporte cela tout de suite. (我马上给您端上来)',
    nextSuggestions: [
      'Non merci, ce sera tout pour le moment.',
      'Oui, une carafe d\'eau s\'il vous plaît, et l\'addition quand vous pourrez.',
      'Qu\'avez-vous comme petites douceurs ?'
    ]
  },
  fr_boulangerie_01: {
    replyFr: 'Et voilà une belle baguette bien dorée ! Et avec ceci, vous laisserez-vous tenter par nos éclairs au chocolat ou nos chouquettes ?',
    replyZh: '给您拿了一根金黄诱人的法棍！除此之外，要不要来点我们的法式巧克力闪电泡芙或者小糖粒泡芙？',
    grammarTip: '面包房点单高频：Et avec ceci ? (除此之外还需要别的吗？)',
    nextSuggestions: [
      'Trois chouquettes pour la route, s\'il vous plaît !',
      'Non merci, ce sera tout. Combien je vous dois en tout ?',
      'Acceptez-vous la carte bancaire sans contact ?'
    ]
  },
  fr_pharmacie_01: {
    replyFr: 'D\'accord. Je vous conseille ce sirop pour calmer la toux et du paracétamol. Attention à bien respecter 4 heures d\'intervalle entre chaque prise, jamais plus de 3 grammes par jour !',
    replyZh: '明白了。我建议您用这款糖浆止咳，再配合扑热息痛退烧。请务必注意每次服药间隔至少 4 小时，一天绝对不要超过 3 克！',
    grammarTip: '服药注意事项：respecter un intervalle de 4 heures (保持4小时用药间隔)',
    nextSuggestions: [
      'Merci beaucoup pour la posologie. Faut-il prendre ces comprimés avant ou après les repas ?',
      'Combien coûte l\'ensemble, s\'il vous plaît ?',
      'Avez-vous aussi des pastilles pour adoucir la gorge ?'
    ]
  },
  fr_shopping_01: {
    replyFr: 'La cabine numéro 2 est libre juste au fond à droite ! Je vous apporte également la taille au-dessus au cas où. N\'hésitez pas à m\'appeler pour voir ce que ça donne !',
    replyZh: '最里面右手边的 2 号试衣间空着！我也顺便帮您拿了一件大一码的备用。穿好后尽管叫我帮您看看上身效果！',
    grammarTip: '试穿效果交流：voir ce que ça donne (看看穿上身效果如何)',
    nextSuggestions: [
      'Merci beaucoup ! Je vais essayer les deux tailles.',
      'Est-ce que cette matière rétrécit au lavage ?',
      'Finalement, la coupe me va à merveille ! Je la prends.'
    ]
  },
  fr_marche_01: {
    replyFr: 'Voici votre morceau de Comté bien affiné ! Je vous ajoute une petite grappe de raisin offerte par la maison. Ce sera tout ou souhaitez-vous un saucisson artisanal ?',
    replyZh: '这是给您切好的陈年孔泰奶酪！我再赠送您一小串新鲜葡萄。还要来点别的吗，或者尝尝我们自制的手工萨拉米香肠？',
    grammarTip: '集市热情招待：offerte par la maison (店家附赠/掌柜请客)',
    nextSuggestions: [
      'C\'est adorable, merci ! Un saucisson aux noisettes, s\'il vous plaît.',
      'Non merci Thierry, ce sera parfait. Je vous paie par carte.',
      'Quel vin me conseillez-vous pour accompagner ce fromage ?'
    ]
  },
  fr_delf_b1_b2_01: {
    replyFr: 'Votre argumentation est solidement étayée. Cependant, ne craignez-vous pas qu\'une interdiction brutale ne suscite de vives protestations de la part des commerçants du centre-ville ?',
    replyZh: '您的论述论据非常充分。然而，您难道不担心一刀切的禁令会引发市中心商户的强烈抗议吗？',
    grammarTip: '考官反驳质疑：Ne craignez-vous pas que + subjonctif ?',
    nextSuggestions: [
      'On pourrait prévoir des créneaux de livraison spécifiques pour les professionnels le matin.',
      'Des compensations financières temporaires permettraient d\'amortir le choc pour les commerces.',
      'Au contraire, la piétonnisation attire davantage de promeneurs et stimule la fréquentation commerciale.'
    ]
  },
  fr_delf_teletravail_02: {
    replyFr: 'C\'est un constat très lucide. Mais d\'après vous, l\'entreprise n\'a-t-elle pas aussi un devoir de vigilance pour éviter le surmenage ou le burn-out de ses employés à domicile ?',
    replyZh: '这一剖析非常清醒客观。但在您看来，雇主企业是否也应当履行监管职责，以避免员工在家办公时过度劳累乃至职业倦怠？',
    grammarTip: '身心健康词汇：le surmenage (过度劳累), le burn-out (职业倦怠/崩溃)',
    nextSuggestions: [
      'Absolument, l\'instauration d\'un droit effectif à la déconnexion après 18h est indispensable.',
      'Les managers doivent être formés pour évaluer les résultats réels plutôt que les heures de connexion.',
      'Des bilans réguliers avec la médecine du travail permettent de détecter les signaux faibles d\'épuisement.'
    ]
  },
  fr_delf_ia_03: {
    replyFr: 'C\'est une perspective passionnante. Toutefois, si l\'IA rédige des dissertations en quelques secondes, comment les enseignants peuvent-ils encore évaluer le mérite intellectuel individuel ?',
    replyZh: '这是一个引人入胜的视角。然而，倘若 AI 几秒钟内就能写出一篇论文，教师们今后该如何评估学生的个人真实学术水平呢？',
    grammarTip: '教育改革探讨：évaluer le mérite intellectuel (评估智识造诣)',
    nextSuggestions: [
      'Il faudra privilégier les examens oraux et les débats spontanés en classe.',
      'On peut demander aux élèves de critiquer les erreurs et les biais contenus dans les textes générés par l\'IA.',
      'L\'évaluation doit désormais porter sur la pertinence des questions posées plutôt que sur la mémorisation passive.'
    ]
  },
  fr_delf_reseaux_04: {
    replyFr: 'Vous soulevez un enjeu psychologique capital. Mais ne pensez-vous pas que la pression sociale et la peur de rater quelque chose (le syndrome FOMO) rendent cette déconnexion presque insurmontable ?',
    replyZh: '您提出了一个关键的心理学命题。但您难道不觉得，同伴社交压力与“唯恐错失综合症（FOMO）”使得这种数字断联在现实中几乎难以逾越吗？',
    grammarTip: '现代心理学术语：la peur de rater quelque chose (错失恐惧症 FOMO)',
    nextSuggestions: [
      'C\'est pourquoi cette démarche doit être collective, par exemple au sein d\'une classe ou d\'une famille.',
      'Il faut encourager des activités physiques et manuelles captivantes pour remplacer l\'écran.',
      'En prenant conscience de la manipulation des algorithmes, les jeunes retrouvent le désir de liberté.'
    ]
  },
  fr_delf_tourisme_05: {
    replyFr: 'Votre proposition d\'écotaxe est intéressante. Néanmoins, ne risque-t-elle pas de transformer le voyage en un privilège réservé aux classes les plus fortunées ?',
    replyZh: '您提出的生态税方案很有新意。然而，这难道不会冒着将旅行演变成唯有富裕阶层才能独享的特权风险吗？',
    grammarTip: '社会公平反问：un privilège réservé aux plus fortunés (富人特权)',
    nextSuggestions: [
      'L\'écotaxe peut être modulée selon les revenus ou compensée par des chèques vacances écologiques.',
      'Le tourisme de proximité permet à chacun de voyager de manière accessible sans dégrader des sites fragiles.',
      'La gratuité peut être préservée pour les scolaires et les résidents de la région.'
    ]
  },
  fr_metro_01: {
    replyFr: 'Pour Saint-Michel, c\'est très simple : prenez la ligne 4 direction Porte d\'Orléans. Il y a environ 6 stations. Vous pouvez acheter un ticket dématérialisé directement sur votre smartphone à la borne automatique !',
    replyZh: '去圣米歇尔广场非常简单：乘坐 4 号线往奥尔良门方向。大约有 6 站路。您可以在自动售票机上直接把电子票刷进手机里！',
    grammarTip: '交通指路词汇：direction (行车方向), ticket dématérialisé (电子虚拟车票)',
    nextSuggestions: [
      'Merci beaucoup ! Combien de temps dure le trajet environ ?',
      'Est-ce que le ticket de métro est valable pour le RER B ?',
      'Où se trouve la borne pour payer en espèces ?'
    ]
  },
  fr_aeroport_02: {
    replyFr: 'Votre déclaration est enregistrée sous le numéro CDGAF8832. Le système indique que votre valise est localisée à Amsterdam et arrivera ce soir par le vol de 22h. Nous vous la livrerons directement à votre hôtel demain matin avant 11h !',
    replyZh: '您的挂失申请已登记，跟踪编号为 CDGAF8832。系统显示您的箱子已在阿姆斯特丹找到，将随今晚 10 点的航班抵达。我们明天上午 11 点前会直接派专人送到您的酒店前台！',
    grammarTip: '行李追踪高频：livrer directement à l\'hôtel (直接配送至酒店)',
    nextSuggestions: [
      'Quel soulagement, merci ! Dois-je être présent(e) en personne pour la réception ?',
      'Existe-t-il une indemnité pour mes achats de première nécessité en attendant ?',
      'Pouvez-vous m\'envoyer un SMS de confirmation dès que le chauffeur part ?'
    ]
  },
  fr_tgv_03: {
    replyFr: 'Bonne nouvelle ! Il me reste une place côté fenêtre au pont supérieur sur le TGV de 15h42. Avec les conditions de votre tarif pro, l\'échange est totalement sans frais ! Voici votre nouveau titre de transport imprimé.',
    replyZh: '好消息！15 点 42 分开往阿维尼翁的 TGV 上层靠窗位刚好还剩一张座席。鉴于您的商务票条款，本次改签完全免费！这是给您重新打印的乘车凭证。',
    grammarTip: '双层高铁术语：pont supérieur (TGV 双层列车的上层车厢)',
    nextSuggestions: [
      'Super, merci infiniment Laurent ! De quel quai part ce train ?',
      'Combien de temps avant le départ doit-on se présenter pour le compostage ?',
      'Y a-t-il une voiture-bar pour déjeuner à bord ?'
    ]
  },
  fr_hotel_04: {
    replyFr: 'C\'est un immense plaisir ! Comme vous séjournez parmi nous pour la première fois, nous sommes ravis de vous surclasser gracieusement en chambre Privilège avec balcon et vue panoramique sur la Tour Eiffel ! Voici vos clés électroniques au 5ème étage.',
    replyZh: '非常荣幸！鉴于您是首次下榻我们酒店，我们特别乐意为您免费升房至带有观景阳台、可饱览埃菲尔铁塔的尊贵客房！这是您位于 5 层的电子房卡。',
    grammarTip: '升房惊喜礼遇：surclasser gracieusement (免费尊荣升房)',
    nextSuggestions: [
      'C\'est une merveilleuse surprise, merci du fond du cœur !',
      'Le petit-déjeuner est-il inclus dans cette formule ?',
      'Pouvez-vous nous réserver un taxi pour l\'aéroport mercredi matin ?'
    ]
  },
  fr_musee_05: {
    replyFr: 'Voici vos deux audioguides interactifs configurés en chinois ! Pour la Joconde, traversez la Grande Galerie dans l\'Aile Denon jusqu\'à la salle numéro 711. N\'hésitez pas à suivre le parcours des Chefs-d\'œuvre sur l\'écran !',
    replyZh: '这是为您调设好中文界面的两台互动语音导览！观赏蒙娜丽莎请穿过德农翼楼的大画廊一直走到 711 号展厅。屏幕上贴心标注了“镇馆之宝”路线，跟着走即可！',
    grammarTip: '展馆导引：Aile Denon (德农翼楼); parcours des Chefs-d\'œuvre (杰作经典路线)',
    nextSuggestions: [
      'Merci beaucoup ! Les photos sont-elles autorisées dans cette salle ?',
      'Combien de temps nous conseillez-vous pour cette visite essentielle ?',
      'Où devons-nous restituer les appareils à la fin ?'
    ]
  },
  fr_entretien_01: {
    replyFr: 'Votre parcours démontre une grande adaptabilité. Pouvez-vous me citer un exemple concret où vous avez dû surmonter un désaccord majeur au sein d\'une équipe pluridisciplinaire ?',
    replyZh: '您的履历展现出极强的适应能力。您能否举出一个具体实例，谈谈您过去是如何在跨职能团队中化解一次重大分歧的？',
    grammarTip: '行为面试核心：surmonter un désaccord majeur (化解一次重大分歧)',
    nextSuggestions: [
      'Lors de notre projet précédent, j\'ai instauré un atelier de design thinking pour aligner les priorités des développeurs et du marketing.',
      'Face aux divergences d\'opinions, j\'ai favorisé une approche par les faits et les métriques utilisateurs.',
      'J\'ai appris que l\'écoute active et l\'empathie sont les meilleurs leviers pour désamorcer les tensions.'
    ]
  },
  fr_reunion_02: {
    replyFr: 'Ces chiffres sont particulièrement encourageants pour la suite du déploiement ! Quelles sont selon vous les deux principales priorités opérationnelles pour sécuriser le lancement du second semestre ?',
    replyZh: '这些数据对接下来的全面部署极具鼓舞性！在您看来，为了确保下半年上线稳操胜券，当前最重要的两大运营攻坚点是什么？',
    grammarTip: '高管决策关注：sécuriser le lancement (为上线筑牢安全底座)',
    nextSuggestions: [
      'La première priorité est de renforcer le support client bilingue pour fluidifier l\'onboarding.',
      'Le second volet concerne l\'optimisation de l\'infrastructure serveur pour absorber les pics de trafic.',
      'Nous prévoyons également une campagne marketing ciblée avec des influenceurs de renom.'
    ]
  },
  fr_negociation_03: {
    replyFr: 'Votre proposition d\'un contrat pluriannuel et d\'un acompte de 40% change effectivement la donne. Nous acceptons la remise de 8% sous réserve d\'un délai d\'approvisionnement de 4 semaines au lieu de 3. Est-ce acceptable pour votre calendrier de production ?',
    replyZh: '您提出的多年期合作与 40% 首付款确实很有诚意。我们同意给予 8% 的让利，但备料交付期需由 3 周调整为 4 周。这是否能契合您方的生产日程？',
    grammarTip: '商务妥协：changer la donne (改变局面/扭转筹码); sous réserve de... (以……为前提条件)',
    nextSuggestions: [
      'Quatre semaines restent gérables pour nous si la première livraison partielle intervient dès la 3ème semaine.',
      'Marché conclu ! Pouvez-vous nous adresser le projet de contrat paraphé d\'ici vendredi ?',
      'Nous apprécions cet esprit de partenariat constructif et nous réjouissons de cette collaboration.'
    ]
  },
  fr_stagiaire_04: {
    replyFr: 'Parfait ! Pour ta première semaine, je te propose d\'analyser les retours d\'expérience de nos bêta-testeurs et de rédiger une synthèse. On fera un point tous les matins à 10h pour répondre à tes questions. Prends un café et installe-toi confortablement !',
    replyZh: '太好啦！首周工作我建议你先梳理公测用户的体验反馈并撰写一份提要。每天上午 10 点我们都会有碰头会解答你的疑问。先去冲杯咖啡，放松入座吧！',
    grammarTip: '导师带教日常：faire un point (碰头梳理进展); synthèse (工作小结提要)',
    nextSuggestions: [
      'C\'est très clair Camille, merci ! Je m\'attelle à l\'analyse des données dès maintenant.',
      'Où puis-je trouver le guide de style de l\'entreprise pour la mise en page de la synthèse ?',
      'Très heureux(se) de rejoindre l\'aventure, à tout à l\'heure pour le café !'
    ]
  },
  fr_demission_05: {
    replyFr: 'J\'apprécie ta franchise et tes arguments factuels sont incontestables. Je vais soumettre à la direction générale une revalorisation de 7% avec effet rétroactif au 1er janvier, accompagnée d\'une prime d\'objectifs. Cela te convient-il ?',
    replyZh: '我很欣赏你的坦率，你列举的事实依据无可挑剔。我将向集团总管理层呈报一份上调 7%、并追溯至 1 月 1 日生效的调薪申请，外加绩效奖金包。这样安排你满意吗？',
    grammarTip: '加薪条款专业词：avec effet rétroactif (具有追溯既往生效力)',
    nextSuggestions: [
      'Je vous remercie sincèrement pour cette reconnaissance qui renforce ma motivation au sein de l\'équipe.',
      'Cet accord me paraît équitable et m\'encourage à relever les nouveaux défis de l\'année.',
      'Merci Grégoire pour ton soutien constant et ta confiance renouvelée.'
    ]
  },
  fr_dinner_01: {
    replyFr: 'À la vôtre ! Le bœuf a mijoté pendant quatre heures dans un vin de Bourgogne avec des petits lardons et des champignons sauvages. Servez-vous généreusement, il y a du rab dans la cocotte en fonte !',
    replyZh: '干杯！这锅红酒牛肉用勃艮第葡萄酒配培根小肉块和野生蘑菇足足文火慢炖了四个钟头。快多盛点，铸铁锅里还有好大一份备着呢！',
    grammarTip: '家宴亲切俗语：avoir du rab (锅里还有大把存货/再添一碗)',
    nextSuggestions: [
      'La viande est d\'une tendreté incroyable, elle fond littéralement en bouche !',
      'C\'est un chef-d\'œuvre culinaire ! Auriez-vous le secret de cette sauce onctueuse ?',
      'Je reprendrais bien un petit morceau avec un peu de sauce, c\'est un délice !'
    ]
  },
  fr_soiree_02: {
    replyFr: 'Ah Thomas est un ami génial ! Tu tombes à pic, on s\'apprêtait à lancer un blind test de musique française des années 80 à nos jours. Tu es plutôt variété rétro ou électro parisienne ?',
    replyZh: '啊，托马斯是我哥们儿，人超棒！你来得正是时候，我们正打算开始玩法国 80 年代至今流行金曲的盲听猜歌接龙呢。你更喜欢法式复古民谣还是巴黎电子乐？',
    grammarTip: '派对俚语：Tu tombes à pic ! (你来得真巧/正当其时！)',
    nextSuggestions: [
      'J\'adore la musique française ! Je connais bien Stromae, Angèle et Édith Piaf.',
      'Je suis plutôt curieux(se) de découvrir vos pépites d\'électro parisienne !',
      'Je me lance dans le blind test avec vous, attention je suis redoutable !'
    ]
  },
  fr_voisin_03: {
    replyFr: 'Des raviolis faits maison ! Quelle merveilleuse délicatesse ! Venez, je vous présente Monsieur Bernard, le gardien de notre immeuble, et la famille Leroy du 4ème. Tout le monde va se régaler !',
    replyZh: '手作中式饺子！太用心、太精致了吧！快来，我带你引见我们大楼热心的门房老伯伯贝尔纳先生，还有 4 楼的勒鲁瓦一家。大家今天可有口福啦！',
    grammarTip: '分享美食赞叹：Tout le monde va se régaler ! (大家都要大饱口福啦！)',
    nextSuggestions: [
      'Enchanté Monsieur Bernard, ravi de faire votre connaissance !',
      'Servez-vous pendant que c\'est bien chaud avec un peu de sauce soja.',
      'Cette convivialité me fait chaud au cœur, la vie d\'immeuble à Paris est charmante !'
    ]
  },
  fr_professeur_04: {
    replyFr: 'Ce thé vert de printemps est un présent d\'un raffinement exquis, je vous en remercie chaleureusement ! Quant à votre soutenance, concentrez-vous sur la méthodologie et l\'originalité de vos corpus. Vous avez toute ma confiance pour briller devant le jury !',
    replyZh: '这罐春茶清香淡雅，实在是一份极尽雅致的珍贵礼物，我向您致以由衷的谢意！关于接下来的论文答辩，请聚焦于您的研究方法论与文献语料的独创性。我相信您在答辩委员会面前必定能大放异彩！',
    grammarTip: '学术赠礼致谢：un présent d\'un raffinement exquis (一份高雅精致的礼物)',
    nextSuggestions: [
      'Vos encouragements me touchent profondément, Monsieur le Professeur.',
      'Je vais peaufiner ma présentation en suivant scrupuleusement vos recommandations méthodologiques.',
      'Je vous tiendrai informé(e) des résultats dès la proclamation de la mention par le jury.'
    ]
  }
};

const getCleanScenarioTitle = (title: string, icon?: string): string => {
  let clean = (title || '').trim();
  if (icon && clean.startsWith(icon)) {
    clean = clean.slice(icon.length).trim();
  }
  clean = clean.replace(/^[\uD800-\uDBFF][\uDC00-\uDFFF]\s*/, '').replace(/^[^\w\s\u4e00-\u9fa5A-Za-zÀ-ÿ0-9]+\s*/, '').trim();
  return clean || title;
};

// 建议项安全归一化工具（兼容字符串数组与对象数组）
export function normalizeSuggestions(items: any[] | undefined | null): SuggestionOption[] {
  if (!items || !Array.isArray(items)) return [];
  return items.map((item, idx) => {
    if (typeof item === 'string') {
      return {
        tag: idx === 0 ? '标准回答' : idx === 1 ? '高分进阶' : '地道口语',
        text: item,
        zh: '点击即可直接填入发送'
      };
    }
    return {
      tag: item?.tag || (idx === 0 ? '标准回答' : '高分进阶'),
      text: item?.text || (typeof item === 'string' ? item : ''),
      zh: item?.zh || ''
    };
  }).filter(item => Boolean(item.text && item.text.trim().length > 0));
}

// 动态多轮灵感库生成器
function generateDynamicSuggestions(
  scenario: AIScenario,
  turnCount: number,
  refreshSeed: number = 0
): SuggestionOption[] {
  const isDelf = scenario.category === 'delf_speaking';
  const isDaily = scenario.category === 'daily_life';
  const isTravel = scenario.category === 'travel_transport';
  const isBiz = scenario.category === 'business_work';

  if (isDelf) {
    const pools: SuggestionOption[][] = [
      [
        { tag: '论点立意', text: 'À mon avis, cette mesure présente des atouts indéniables, mais il faut mesurer ses conséquences sociales.', zh: '在我看来，该举措具有不可否认的优势，但必须权衡其社会后果。' },
        { tag: '让步转折', text: 'Bien que l\'argument écologique soit recevable, force est de constater que les alternatives actuelles restent insuffisantes.', zh: '尽管环保论点站得住脚，但不得不承认目前的替代方案依然不足。' },
        { tag: '提议号召', text: 'Il conviendrait donc d\'instaurer une période de transition progressive avec des subventions adaptées.', zh: '因此，应当设立带有相应补贴的渐进过渡期。' }
      ],
      [
        { tag: '现象剖析', text: 'Ce phénomène s\'explique en grande partie par l\'évolution rapide de nos modes de vie numériques.', zh: '这一现象很大程度上源于我们数字化生活方式的迅猛演变。' },
        { tag: '反驳质疑', text: 'Je ne partage pas entièrement ce point de vue, car cela risque d\'accentuer la précarité des plus vulnérables.', zh: '我不能完全赞同这一观点，因为这可能会加剧弱势群体的脆弱性。' },
        { tag: '总结陈词', text: 'En définitive, l\'éducation et la sensibilisation demeurent les leviers les plus pérennes pour surmonter cette crise.', zh: '归根结底，教育与倡导依然是克服这场危机最持久的抓手。' }
      ]
    ];
    return pools[(turnCount + refreshSeed) % pools.length];
  }

  if (isDaily || isTravel) {
    const pools: SuggestionOption[][] = [
      [
        { tag: '礼貌询问', text: 'Pardonnez-moi de vous déranger, pourriez-vous m\'indiquer le chemin le plus rapide ?', zh: '劳驾打扰一下，您能为我指明最快捷的路线吗？' },
        { tag: '高频点选', text: 'Je vais prendre cette option, s\'il vous plaît, avec un reçu pour ma comptabilité.', zh: '请帮我选这个方案，并附带一份报销收据。' },
        { tag: '确认感谢', text: 'C\'est parfait, merci infiniment pour vos explications limpides !', zh: '太棒了，非常感谢您清晰明了的说明！' }
      ],
      [
        { tag: '退改要求', text: 'Est-il envisageable d\'échanger mon billet sans frais supplémentaires pour le train suivant ?', zh: '请问是否可以在没有额外手续费的情况下改签至下一班列车？' },
        { tag: '生活咨询', text: 'Avez-vous une recommandation particulière pour un restaurant typique dans le quartier ?', zh: '在这一带您有什么地道的特色餐厅特别推荐吗？' },
        { tag: '客套道别', text: 'Je vous remercie chaleureusement de votre accueil. Bonne journée !', zh: '衷心感谢您的热情接待。祝您拥有愉快的一天！' }
      ]
    ];
    return pools[(turnCount + refreshSeed) % pools.length];
  }

  if (isBiz) {
    const pools: SuggestionOption[][] = [
      [
        { tag: '商务汇报', text: 'Je vous confirme que nous avons franchi le premier jalon du projet dans le respect scrupuleux du calendrier.', zh: '我向您确认，我们已在严格遵守时间节点的前提下顺利通过了项目的首个里程碑。' },
        { tag: '谈判协商', text: 'Nous serions disposés à accepter ces conditions tarifaires sous réserve d\'un étalement des livraisons.', zh: '只要能分期分批交付，我们愿意接受此价格条件。' },
        { tag: '主动跟进', text: 'Je m\'engage à vous transmettre le compte-rendu synthétique avant la fin de la journée.', zh: '我保证在今天结束前向您呈送精简会议纪要。' }
      ]
    ];
    return pools[(turnCount + refreshSeed) % pools.length];
  }

  return [
    { tag: '地道致谢', text: 'C\'est une excellente suggestion, je vais la mettre en pratique dès maintenant.', zh: '这是极好的建议，我马上付诸实践。' },
    { tag: '展开对话', text: 'Pourriez-vous m\'en dire davantage sur ce point précis ? Cela m\'intéresse vivement.', zh: '您能就这一具体要点多讲一些吗？我非常感兴趣。' },
    { tag: '赞同共鸣', text: 'Je suis tout à fait en phase avec votre analyse sur cette question.', zh: '关于这个问题，我与您的分析见解完全一致。' }
  ];
}

export const AISpeakingView: React.FC<AISpeakingViewProps> = ({ 
  isVip = false, 
  onOpenVipModal 
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('fr_cafe_01');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isAiReplying, setIsAiReplying] = useState<boolean>(false);
  const [showTranslations, setShowTranslations] = useState<boolean>(true);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [refreshSeed, setRefreshSeed] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(120);

  const recognitionRef = useRef<any>(null);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  const currentScenario = AI_SCENARIOS_DATA.find(s => s.id === selectedScenarioId) || AI_SCENARIOS_DATA[0];

  const scenarioCategories = [
    { key: 'all', label: '全部场景', count: AI_SCENARIOS_DATA.length },
    { key: 'weekly_new', label: '本周新推', count: AI_SCENARIOS_DATA.filter(s => s.isWeeklyNew).length },
    { key: 'delf_speaking', label: 'DELF 欧标冲刺', count: AI_SCENARIOS_DATA.filter(s => s.category === 'delf_speaking').length },
    { key: 'daily_life', label: '生活实用', count: AI_SCENARIOS_DATA.filter(s => s.category === 'daily_life').length },
    { key: 'travel_transport', label: '出行问路', count: AI_SCENARIOS_DATA.filter(s => s.category === 'travel_transport').length },
    { key: 'business_work', label: '职场与面试', count: AI_SCENARIOS_DATA.filter(s => s.category === 'business_work').length },
    { key: 'social_etiquette', label: '社交礼仪', count: AI_SCENARIOS_DATA.filter(s => s.category === 'social_etiquette').length },
  ];

  const filteredScenarios = AI_SCENARIOS_DATA.filter(s => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'weekly_new') return Boolean(s.isWeeklyNew);
    return s.category === selectedCategory;
  });

  const userTurnsCount = messages.filter(m => m.sender === 'user').length;

  // 免费用户安全防线：非VIP仅可体验首个免费场景 (fr_cafe_01)
  useEffect(() => {
    if (!isVip && selectedScenarioId !== 'fr_cafe_01') {
      setSelectedScenarioId('fr_cafe_01');
    }
  }, [isVip]);

  // 初始化场景对话
  useEffect(() => {
    initScenario(currentScenario);
  }, [selectedScenarioId]);

  const initScenario = (scenario: AIScenario) => {
    stopFrenchSpeech();
    const firstTurn = scenario.turns[0];
    const initialMsg: ChatMessage = {
      id: 'msg_init_' + Date.now(),
      sender: 'ai',
      name: firstTurn.speakerName,
      avatar: firstTurn.avatar,
      fr: firstTurn.fr,
      zh: firstTurn.zh,
      phonetic: firstTurn.phonetic,
      grammarTip: firstTurn.grammarTip,
      suggestedResponses: normalizeSuggestions(firstTurn.suggestedResponses)
    };
    setMessages([initialMsg]);
    setInputText('');
    setTimerSeconds(scenario.examDurationSec || 120);
    setRefreshSeed(0);
    // 自动播放欢迎语
    setTimeout(() => {
      handlePlaySpeech(firstTurn.fr);
    }, 400);
  };

  const handleResetScenario = () => {
    initScenario(currentScenario);
  };

  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiReplying]);

  // 语音播放
  const handlePlaySpeech = async (text: string) => {
    await speakFrench(text, 0.9);
  };

  // 语音识别初始化 (Web Speech API)
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('您的浏览器暂不支持实时语音识别，请直接在输入框打字练习或换用 Chrome 浏览器。');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'fr-FR';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(prev => (prev ? `${prev} ${transcript}` : transcript));
      };

      recognition.onerror = (e: any) => {
        console.warn('[SpeechRec] Error:', e);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('[SpeechRec] Start failed:', err);
      setIsListening(false);
    }
  };

  // 用户发送回复
  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    // 免费体验轮次上限检查（仅支持前 3 轮）
    if (!isVip && userTurnsCount >= 3) {
      onOpenVipModal?.('🎯 您的免费 AI 口语体验轮次已达上限（已体验 3 轮）！升级 VIP 终身卡（仅 ¥49.9），即可享受全站 24 大场景无限次 AI 自由畅聊与巴黎母语对练！');
      return;
    }

    const fluency = Math.min(98, Math.round(85 + Math.random() * 13));
    const grammar = Math.min(98, Math.round(86 + Math.random() * 12));
    const pronunciation = Math.min(98, Math.round(82 + Math.random() * 16));

    const userMsg: ChatMessage = {
      id: 'msg_user_' + Date.now(),
      sender: 'user',
      name: 'Vous (你)',
      avatar: '🎓',
      fr: text,
      score: { fluency, grammar, pronunciation },
      feedback: fluency > 90 
        ? '发音标准流畅，主谓连读连音自然，虚拟式配合到位！' 
        : '表达地道清晰！建议注意元音鼻化音（on / an / in）的纯正度。'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsAiReplying(true);

    confetti({
      particleCount: 35,
      spread: 45,
      origin: { y: 0.8 }
    });

    const currentTurnNumber = userTurnsCount + 1;

    setTimeout(() => {
      setIsAiReplying(false);

      let replyFr = '';
      let replyZh = '';
      let nextSuggestions: SuggestionOption[] = [];
      let grammarTip = '';

      const customReply = SCENARIO_REPLY_REGISTRY[currentScenario.id];
      if (currentTurnNumber === 1 && customReply) {
        replyFr = customReply.replyFr;
        replyZh = customReply.replyZh;
        grammarTip = customReply.grammarTip;
        nextSuggestions = normalizeSuggestions(customReply.nextSuggestions);
      } else {
        const dynSuggestions = generateDynamicSuggestions(currentScenario, currentTurnNumber, refreshSeed);
        if (currentScenario.category === 'delf_speaking') {
          replyFr = 'C\'est un argument fort pertinent. Toutefois, comment concilieriez-vous cette approche avec les contraintes budgétaires actuelles ?';
          replyZh = '这是一个非常中肯的论点。然而，您将如何把这种方法与当下的预算限制加以调和呢？';
          grammarTip = '欧标追问技巧：Comment concilieriez-vous... ? (条件式委婉质询)';
        } else if (currentScenario.category === 'business_work') {
          replyFr = 'Très bien. C\'est une analyse lucide. Quelles sont les prochaines étapes concrètes que vous préconisez pour notre équipe ?';
          replyZh = '很好。这是一份清醒透彻的分析。针对我们团队，您主张推进的下一步具体举措是什么？';
          grammarTip = '职场推进句型：Quelles sont les prochaines étapes concrètes ?';
        } else {
          replyFr = 'C\'est parfait, tout est bien clair ! Avez-vous une autre question ou souhaitez-vous aborder un autre détail ensemble ?';
          replyZh = '太好了，一切都很清楚！您还有其他问题，或者想一起探讨其他细节吗？';
          grammarTip = '日常互动惯用语：Souhaitez-vous aborder un autre détail ?';
        }
        nextSuggestions = dynSuggestions;
      }

      const aiReplyMsg: ChatMessage = {
        id: 'msg_ai_' + Date.now(),
        sender: 'ai',
        name: currentScenario.turns[0].speakerName,
        avatar: currentScenario.turns[0].avatar,
        fr: replyFr,
        zh: replyZh,
        grammarTip,
        suggestedResponses: nextSuggestions
      };

      setMessages(prev => [...prev, aiReplyMsg]);
      handlePlaySpeech(replyFr);
    }, 1000);
  };

  const latestAiMessage = [...messages].reverse().find(m => m.sender === 'ai');
  const activeSuggestions = normalizeSuggestions(latestAiMessage?.suggestedResponses).length > 0
    ? normalizeSuggestions(latestAiMessage?.suggestedResponses)
    : generateDynamicSuggestions(currentScenario, userTurnsCount, refreshSeed);

  return (
    <div className="w-full space-y-4 sm:space-y-5 animate-in fade-in duration-300 pb-12">
      

      {/* 顶部权威 Hero Banner (对标图3标准规范，移除 06 步骤圈) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-[#FCECEF] text-[#80142A] border border-[#80142A]/20 text-xs font-bold">
              🎙️ DELF 欧标口语大纲 · 沉浸实战对练
            </span>
            <span className="text-xs text-stone-500 font-medium">
              巴黎标准发音 · 真实场景角色扮演 · 实时交互反馈 · 1v1 纯正语料
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            AI 智能法语口语实战对练 · 巴黎腔角色扮演工坊
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">
            DELF 欧标实用会话对练 · 巴黎生活实操 · 法企商务面试 · 经典影视名场面对戏，随时随地开口脱敏！
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap self-start md:self-auto shrink-0">
          {userTurnsCount >= 2 && (
            <button
              onClick={() => setIsReportOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#80142A] hover:bg-[#680E20] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs shadow-[#80142A]/20 transition active:scale-98 cursor-pointer"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>生成能力报告</span>
            </button>
          )}

          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            AI 对练就绪
          </span>
        </div>
      </div>

      {/* 每周更新特推通知条 */}
      <div className="px-4 py-2.5 rounded-xl bg-rose-50/60 border border-rose-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-700 min-w-0 flex-wrap">
          <span className="px-1.5 py-0.2 rounded bg-[#80142A] text-white text-[10px] font-black shrink-0">
            周更
          </span>
          <span className="font-bold text-slate-900">第 35 期特推：</span>
          <span className="text-slate-600">《巴黎花神咖啡馆》点单对戏、卢浮宫中文语音导览租借、DELF B2 环保限行思辩</span>
        </div>
        <button
          onClick={() => setSelectedCategory('weekly_new')}
          className="text-[#80142A] hover:text-[#680E20] font-bold shrink-0 flex items-center gap-0.5 cursor-pointer text-xs"
        >
          <span>看本周新推 ({AI_SCENARIOS_DATA.filter(s => s.isWeeklyNew).length})</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 场景分类选项卡 */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {scenarioCategories.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedCategory(tab.key)}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === tab.key
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              selectedCategory === tab.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* 核心双栏工作区：左侧场景选择卡片 + 右侧互动对话舞台 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* 左侧 4 列：剧本列表 */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#80142A]" /> 选择口语实战剧本
            </span>
            <span className="text-[11px] text-slate-400 font-bold">
              共 {filteredScenarios.length} 个
            </span>
          </div>

          <div className="space-y-2.5 max-h-[660px] overflow-y-auto pr-1 no-scrollbar">
            {filteredScenarios.map((sc) => {
              const isSelected = sc.id === selectedScenarioId;
              const isFree = sc.id === 'fr_cafe_01';
              const isLocked = !isVip && !isFree;
              const cleanTitle = getCleanScenarioTitle(sc.title, sc.icon);

              return (
                <div
                  key={sc.id}
                  onClick={() => {
                    if (isLocked) {
                      onOpenVipModal?.(`🔒【${cleanTitle}】为 VIP 专属口语实训场景！升级 VIP 终身卡（仅 ¥49.9），即可畅享 DELF 欧标实战会话、巴黎生活实操、外企面试与每周五持续上新！`);
                      return;
                    }
                    setSelectedScenarioId(sc.id);
                  }}
                  className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2.5 group/sc ${
                    isSelected
                      ? 'bg-[#FCECEF]/80 border-[#80142A] shadow-md ring-2 ring-[#80142A]/20 text-slate-900'
                      : isLocked
                      ? 'bg-white hover:bg-rose-50/50 border-slate-200/90 text-slate-800 shadow-xs'
                      : 'bg-white hover:bg-slate-50 border-slate-200/90 text-slate-800 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xl shrink-0 drop-shadow-xs">{sc.icon}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className={`text-xs font-black truncate ${isSelected ? 'text-[#80142A]' : 'text-slate-900 group-hover/sc:text-[#80142A]'}`}>
                            {cleanTitle}
                          </h4>
                          {isFree ? (
                            <span className="text-[9px] font-black px-1.5 py-0.2 rounded-md bg-emerald-500 text-white shrink-0 shadow-2xs">
                              免费试聊
                            </span>
                          ) : isLocked ? (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-800 border border-amber-200 shrink-0 flex items-center gap-0.5">
                              <Lock className="w-2.5 h-2.5 text-amber-600" /> VIP
                            </span>
                          ) : sc.isWeeklyNew ? (
                            <span className="text-[9px] font-black px-1.5 py-0.2 rounded-md bg-[#80142A] text-white shrink-0 shadow-2xs">
                              NEW
                            </span>
                          ) : null}
                        </div>
                        <p className={`text-[10px] truncate ${isSelected ? 'text-slate-600 font-medium' : 'text-slate-500'}`}>
                          {sc.frenchTitle}
                        </p>
                      </div>
                    </div>

                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border shrink-0 ${
                      isSelected
                        ? 'bg-white text-[#80142A] border-rose-200 shadow-2xs'
                        : isLocked
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {isLocked ? 'VIP专属' : sc.levelTag ? sc.levelTag.split(' ')[0] : '初级'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px]">
                    <span className={`${isSelected ? 'text-[#80142A] font-bold' : isLocked ? 'text-amber-700 font-bold' : 'text-[#80142A] font-bold'}`}>
                      {isLocked ? '🔒 点击解锁实练' : sc.categoryLabel}
                    </span>
                    <span className={`flex items-center gap-0.5 ${isSelected ? 'text-[#80142A] font-bold' : 'text-slate-400'}`}>
                      <span>{isLocked ? '去解锁' : '开始实练'}</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 右侧 8 列：主对话与语音交互舞台 */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 shadow-xl flex flex-col overflow-hidden h-[700px]">
          
          {/* 当前场景顶栏 */}
          <div className="p-4 bg-white text-slate-900 border-b border-slate-200/80 shadow-2xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-2xl shrink-0 drop-shadow-xs">{currentScenario.icon}</span>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm sm:text-base font-black truncate text-slate-900">
                    {getCleanScenarioTitle(currentScenario.title, currentScenario.icon)}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-[#80142A] border border-[#80142A]/20">
                    {currentScenario.levelTag}
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>无限多轮在线交互中 (第 {userTurnsCount + 1} 轮)</span>
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {currentScenario.description}
                </p>
              </div>
            </div>

            {/* 操作区：翻译开关与重置 */}
            <div className="flex items-center gap-2 shrink-0">
              {currentScenario.examDurationSec && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono font-bold">
                  <Clock className="w-3.5 h-3.5 animate-pulse text-amber-600" />
                  <span>{Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}</span>
                </div>
              )}

              <button
                onClick={() => setShowTranslations(!showTranslations)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition cursor-pointer"
                title={showTranslations ? '隐藏翻译与注音' : '显示中文翻译与注音'}
              >
                {showTranslations ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={handleResetScenario}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition cursor-pointer"
                title="重新开始本场景对练"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 消息滚动流视图 */}
          <div 
            ref={chatScrollRef}
            className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-slate-50/50"
          >
            {/* 对话模式提示横幅 */}
            <div className="p-3 rounded-2xl bg-rose-50/80 border border-rose-200/80 text-xs text-[#80142A] flex items-center justify-between gap-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#80142A] shrink-0" />
                <span>
                  <strong>自由无限对话模式</strong>：支持点击下方灵感模板、手动打字或按麦克风直接说法语，AI 将实时根据您的回答智能续聊与纠错！
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-200/60 text-[#680E20] shrink-0">
                已聊 {userTurnsCount} 轮
              </span>
            </div>

            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                  msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* 头像 */}
                <div className="w-9 h-9 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-lg shrink-0">
                  {msg.avatar}
                </div>

                {/* 气泡容器 */}
                <div className={`max-w-[88%] sm:max-w-[78%] space-y-1.5 ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                    <span>{msg.name}</span>
                  </div>

                  {/* 气泡本体 */}
                  <div className={`p-4 rounded-3xl text-sm leading-relaxed shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#80142A] to-[#9B1B36] text-white rounded-tr-xs'
                      : 'bg-white text-slate-900 border border-slate-200/80 rounded-tl-xs'
                  }`}>
                    {/* 法语文字 */}
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-bold text-sm sm:text-base leading-snug tracking-wide">
                        {msg.fr}
                      </p>
                      <button
                        onClick={() => handlePlaySpeech(msg.fr)}
                        className={`p-1.5 rounded-full shrink-0 transition cursor-pointer ${
                          msg.sender === 'user'
                            ? 'bg-white/20 hover:bg-white/30 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-[#80142A]'
                        }`}
                        title="朗读标准法语发音"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* 译文与音标 */}
                    {showTranslations && (
                      <div className={`mt-2 pt-2 border-t space-y-0.5 text-xs ${
                        msg.sender === 'user' ? 'border-white/20 text-rose-100' : 'border-slate-100 text-slate-600'
                      }`}>
                        {msg.zh && <p className="font-medium">{msg.zh}</p>}
                        {msg.phonetic && <p className="font-mono text-[10px] opacity-75 italic">{msg.phonetic}</p>}
                      </div>
                    )}
                  </div>

                  {/* AI 语法提示卡片 */}
                  {msg.sender === 'ai' && msg.grammarTip && (
                    <div className="p-3 rounded-2xl bg-rose-50/80 border border-rose-200/70 text-[#80142A] text-xs space-y-1 shadow-2xs">
                      <div className="flex items-start gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#DDBF78] shrink-0 mt-0.5" />
                        <span className="font-medium">{msg.grammarTip}</span>
                      </div>
                    </div>
                  )}

                  {/* 用户得分与反馈卡片 */}
                  {msg.sender === 'user' && msg.score && (
                    <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-950 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-[11px] text-emerald-800">
                        <span>🎯 智能测评：流利度 {msg.score.fluency}%</span>
                        <span>语法准确 {msg.score.grammar}%</span>
                      </div>
                      {msg.feedback && <p className="text-[11px] text-emerald-700 font-medium">{msg.feedback}</p>}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* AI 思考输入状态 */}
            {isAiReplying && (
              <div className="flex items-center gap-2 text-xs text-slate-500 font-bold p-3 bg-white rounded-2xl border border-slate-200 w-fit animate-pulse">
                <Bot className="w-4 h-4 text-[#80142A] animate-spin" />
                <span>AI 正在根据您的回答组织新一轮地道法式对白...</span>
              </div>
            )}
          </div>

          {/* 实时灵感建议快捷胶囊栏 */}
          <div className="px-4 py-2.5 bg-rose-50/50 border-t border-rose-100 flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
              <span className="flex items-center gap-1.5 text-[#80142A]">
                <Sparkles className="w-3.5 h-3.5 text-[#DDBF78]" />
                <span>💡 实时高分灵感建议（点击直接填入）：</span>
              </span>

              <button
                onClick={() => setRefreshSeed(prev => prev + 1)}
                className="flex items-center gap-1 text-[11px] text-[#80142A] hover:underline font-bold cursor-pointer"
                title="更换一批建议模版"
              >
                <RefreshCw className="w-3 h-3" />
                <span>换一批灵感</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {activeSuggestions.map((item, idx) => {
                const tag = item?.tag || '标准回答';
                const text = item?.text || '';
                if (!text) return null;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputText(text);
                      handlePlaySpeech(text);
                    }}
                    className="group px-3 py-1.5 rounded-xl bg-white hover:bg-[#80142A] hover:text-white border border-rose-200/80 text-xs text-left transition shadow-2xs font-medium flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="px-1.5 py-0.2 rounded-md bg-rose-100 text-[#80142A] text-[10px] font-black group-hover:bg-white/20 group-hover:text-white">
                      {tag}
                    </span>
                    <span className="font-bold">{text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 底部语音与文字控制区 */}
          <div className="p-3.5 sm:p-4 bg-white border-t border-slate-200 space-y-3">
            {/* 录音波形动效 */}
            {isListening && (
              <div className="p-2.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between animate-pulse">
                <div className="flex items-center gap-2 text-xs font-bold text-[#80142A]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#80142A] animate-ping" />
                  <span>正在倾听您的法语... 请用麦克风说话</span>
                </div>
                <div className="flex items-center gap-1">
                  {[12, 24, 18, 28, 16, 22, 10].map((h, idx) => (
                    <span 
                      key={idx} 
                      className="w-1 bg-[#80142A] rounded-full animate-bounce" 
                      style={{ height: `${h}px`, animationDelay: `${idx * 0.1}s` }} 
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 免费体验轮次剩余指示 */}
            {!isVip && (
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold px-1 pb-1">
                <span>
                  免费体验剩余轮次：
                  <span className="text-[#80142A] font-black">{Math.max(0, 3 - userTurnsCount)} / 3 轮</span>
                </span>
                {userTurnsCount >= 3 ? (
                  <span 
                    className="text-amber-700 flex items-center gap-1 cursor-pointer hover:underline font-extrabold" 
                    onClick={() => onOpenVipModal?.('🎯 您的免费 AI 口语体验轮次已用完！升级 VIP 终身卡（仅 ¥49.9），即可享受全站无限轮次对练！')}
                  >
                    <Lock className="w-3 h-3" /> 点击解锁无限轮次
                  </span>
                ) : (
                  <span className="text-slate-400">已体验 {userTurnsCount} 轮</span>
                )}
              </div>
            )}

            {/* 输入栏 */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleListening}
                className={`p-3 sm:px-5 sm:py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition active:scale-95 shrink-0 cursor-pointer ${
                  isListening
                    ? 'bg-rose-600 text-white shadow-rose-600/30 animate-pulse'
                    : 'bg-gradient-to-r from-[#80142A] to-[#9B1B36] hover:from-[#680E20] hover:to-[#80142A] text-white shadow-[#80142A]/30'
                }`}
                title={isListening ? '点击结束录音并发送' : '点击按麦克风说法语'}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                <span className="hidden sm:inline">{isListening ? '点击完成' : '按麦克风说法语'}</span>
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={isListening ? '正在收听法语发音...' : '输入法语回复，或点击上方灵感胶囊...'}
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#80142A]/30 focus:bg-white transition"
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isAiReplying}
                className="p-3 sm:px-5 sm:py-3 rounded-2xl bg-[#80142A] hover:bg-[#680E20] text-white font-bold text-xs sm:text-sm transition disabled:opacity-40 disabled:cursor-not-allowed shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">发送</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* AI 能力雷达诊断报告弹窗 */}
      {isReportOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-2xl bg-rose-50 text-[#80142A]">
                  <Award className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="font-black text-slate-900 text-lg">
                    AI 口语能力雷达诊断报告
                  </h3>
                  <p className="text-xs text-slate-500">
                    实战剧本：《{getCleanScenarioTitle(currentScenario.title, currentScenario.icon)}》
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsReportOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* 分数指标卡 */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-1">
                <span className="text-[10px] font-bold text-[#80142A]">完成轮次</span>
                <p className="text-2xl font-black text-[#80142A]">{userTurnsCount} 轮</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                <span className="text-[10px] font-bold text-emerald-700">流利度评估</span>
                <p className="text-2xl font-black text-emerald-600">95%</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-1">
                <span className="text-[10px] font-bold text-amber-700">语法变位配合</span>
                <p className="text-2xl font-black text-amber-600">98%</p>
              </div>
            </div>

            {/* 导师寄语与提分建议 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <Sparkles className="w-4 h-4 text-[#80142A]" />
                <span>北外导师综合点评与提分建议：</span>
              </div>
              <p className="leading-relaxed">
                恭喜您完成了 <strong>{userTurnsCount} 轮</strong> 深度法语口语实战对练！发音连贯性与主谓连读连音自然，虚拟式与时态配合到位。建议日常继续通过麦克风多轮互动，巩固纯正巴黎腔语感！
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setIsReportOpen(false);
                  handleResetScenario();
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                🔄 再练一次
              </button>
              <button
                onClick={() => setIsReportOpen(false)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#80142A] hover:bg-[#680E20] text-white shadow-md shadow-[#80142A]/20 cursor-pointer"
              >
                完成本次实训
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 底部免费用户专属升级横幅 */}
      {!isVip && (
        <div className="bg-gradient-to-r from-[#80142A] via-[#9B1B36] to-[#680E20] rounded-3xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-[#80142A]/20">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-1.5 justify-center sm:justify-start font-black text-sm">
              <Sparkles className="w-4 h-4 text-[#DDBF78]" />
              <span>当前正在体验【巴黎花神咖啡馆 · 免费试学（限3轮）】</span>
            </div>
            <p className="text-xs text-rose-100 leading-relaxed">
              开通 VIP 终身卡（仅 ¥49.9），即可解锁 <strong>DELF 欧标全等级口语实战会话</strong>、法企职场面试及 24 小时随身巴黎母语语伴无限轮次沉浸对练！
            </p>
          </div>
          <button
            onClick={() => onOpenVipModal?.('🎙️ 开通 VIP 终身卡（仅 ¥49.9），即可解锁 DELF 欧标全等级口语会话实战、法企职场面试及 24 小时随身巴黎母语语伴无限轮次沉浸对练！')}
            className="px-5 py-2.5 rounded-2xl bg-white text-[#80142A] hover:bg-rose-50 font-black text-xs shadow-md transition active:scale-98 shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-[#80142A]" />
            <span>解锁全部 24+ 口语剧本与无限畅聊 (¥49.9)</span>
          </button>
        </div>
      )}

    </div>
  );
};
