import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  Sparkles, 
  RotateCcw, 
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

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  name: string;
  avatar: string;
  fr: string;
  zh?: string;
  phonetic?: string;
  grammarTip?: string;
  suggestedResponses?: string[];
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

export const AISpeakingView: React.FC<AISpeakingViewProps> = ({ 
  isVip = false, 
  onOpenVipModal 
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('fr_cafe_01');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isAiReplying, setIsAiReplying] = useState<boolean>(false);
  const [showTranslations, setShowTranslations] = useState<boolean>(true);
  const [showPhonetics, setShowPhonetics] = useState<boolean>(false);
  const [playingAudioFr, setPlayingAudioFr] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  const currentScenario = AI_SCENARIOS_DATA.find(s => s.id === selectedScenarioId) || AI_SCENARIOS_DATA[0];

  const categories = [
    { id: 'all', label: '全部场景' },
    { id: 'daily_life', label: '生活实用' },
    { id: 'delf_speaking', label: '欧标冲刺 (B1/B2)' },
    { id: 'travel_transport', label: '出行问路' },
    { id: 'business_work', label: '职场面试' },
    { id: 'social_etiquette', label: '社交礼仪' },
  ];

  const filteredScenarios = AI_SCENARIOS_DATA.filter(s => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
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
      suggestedResponses: firstTurn.suggestedResponses
    };
    setMessages([initialMsg]);
    setInputText('');
    stopFrenchSpeech();
    // 自动播放欢迎语
    setTimeout(() => {
      handlePlaySpeech(firstTurn.fr);
    }, 400);
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiReplying]);

  // 语音播放
  const handlePlaySpeech = async (text: string) => {
    setPlayingAudioFr(text);
    await speakFrench(text, 0.9);
    setPlayingAudioFr(null);
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
      onOpenVipModal?.('🎯 您的免费 AI 口语体验轮次已达上限（已体验 3 轮）！升级 VIP 终身卡（仅 ¥49.9），即可享受全站 8 大场景无限次 AI 自由畅聊与巴黎母语对练！');
      return;
    }

    // 随机计算发音与流利度打分
    const fluency = Math.min(98, Math.round(82 + Math.random() * 16));
    const grammar = Math.min(98, Math.round(84 + Math.random() * 14));
    const pronunciation = Math.min(98, Math.round(80 + Math.random() * 18));

    const userMsg: ChatMessage = {
      id: 'msg_user_' + Date.now(),
      sender: 'user',
      name: 'Vous (你)',
      avatar: '🎓',
      fr: text,
      score: { fluency, grammar, pronunciation },
      feedback: fluency > 90 
        ? '发音标准流畅，主谓连读连音自然，用词精准！' 
        : '表达地道清晰！建议注意元音鼻化音（on / an / in）的纯正度。'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsAiReplying(true);

    if (fluency >= 92) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }

    // 模拟 AI 拟人思考回复
    setTimeout(() => {
      setIsAiReplying(false);

      let replyFr = '';
      let replyZh = '';
      let nextSuggestions: string[] = [];
      let grammarTip = '';

      const customReply = SCENARIO_REPLY_REGISTRY[currentScenario.id];
      if (customReply) {
        replyFr = customReply.replyFr;
        replyZh = customReply.replyZh;
        grammarTip = customReply.grammarTip;
        nextSuggestions = customReply.nextSuggestions;
      } else {
        replyFr = 'Parfait ! J\'ai bien compris votre demande. Avez-vous besoin d\'un autre renseignement ou puis-je faire autre chose pour vous aider ?';
        replyZh = '太好了！我完全理解了您的诉求。您还需要其他信息吗，或者我还能帮您做点什么？';
        grammarTip = '礼貌接待用语：Puis-je faire autre chose pour vous aider ?';
        nextSuggestions = [
          'Non merci, c\'est très clair ! Merci pour votre aide précieuse.',
          'Oui, pouvez-vous me préciser les horaires d\'ouverture ?',
          'Merci beaucoup, bonne journée à vous !'
        ];
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
    }, 1200);
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-8">
      {/* 顶部标语 */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCECEF] text-[#80142A] text-xs font-black border border-[#80142A]/20">
            <Bot className="w-3.5 h-3.5 text-[#DDBF78]" />
            <span>巴黎母语级真实语伴 · 1v1 智能对练</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#29354A] tracking-tight flex items-center gap-3">
            <span>AI 口语对练室 (Parler Français)</span>
            <span className="text-xs sm:text-sm px-2.5 py-0.5 rounded-lg bg-rose-50 text-[#80142A] font-bold border border-[#80142A]/30">
              巴黎原声引擎
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            涵盖<strong>巴黎咖啡馆、地铁交通、法式面包房、DELF 考官辩驳与法企面试</strong>，支持跟读打分、双语对照与标准发音示范。
          </p>
        </div>

        {/* 顶部辅助开关 */}
        <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
          <button
            onClick={() => setShowTranslations(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
              showTranslations 
                ? 'bg-[#FCECEF] text-[#80142A] border-[#80142A]/30' 
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}
          >
            {showTranslations ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>中文译文</span>
          </button>
          <button
            onClick={() => setShowPhonetics(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
              showPhonetics 
                ? 'bg-[#FCECEF] text-[#80142A] border-[#80142A]/30' 
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#DDBF78]" />
            <span>国际音标引导</span>
          </button>
          <button
            onClick={() => initScenario(currentScenario)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer border border-slate-200"
            title="重新开启本场景对话"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重置对话</span>
          </button>
        </div>
      </div>

      {/* 场景分类胶囊条 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(cat => {
          const count = cat.id === 'all'
            ? AI_SCENARIOS_DATA.length
            : AI_SCENARIOS_DATA.filter(s => s.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-[#80142A] text-white shadow-xs'
                  : 'bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                activeCategory === cat.id
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 text-slate-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 场景卡片横向轮播或选择 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {filteredScenarios.map(sc => {
          const isSelected = sc.id === currentScenario.id;
          const isFree = sc.id === 'fr_cafe_01';
          const isLocked = !isVip && !isFree;

          return (
            <div
              key={sc.id}
              onClick={() => {
                if (isLocked) {
                  onOpenVipModal?.(`🔒【${sc.title}】为 VIP 专属口语实训场景！升级 VIP 终身卡（仅 ¥49.9），即可畅享 DELF 欧标实战会话、巴黎生活实操、外企面试与经典影视名场面对戏！`);
                  return;
                }
                setSelectedScenarioId(sc.id);
              }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'bg-white border-[#80142A] shadow-md ring-2 ring-[#80142A]/20'
                  : isLocked
                  ? 'bg-slate-50/70 border-slate-200/80 hover:border-amber-300 hover:bg-white text-slate-700'
                  : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xl">{sc.icon}</span>
                  <div className="flex items-center gap-1.5">
                    {isLocked ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-md font-extrabold bg-amber-100 text-amber-900 border border-amber-300/80 flex items-center gap-0.5">
                        <Lock className="w-2.5 h-2.5 text-amber-700" />
                        <span>VIP专属</span>
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded-md font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300/80">
                        免费体验
                      </span>
                    )}
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                      sc.levelTag.includes('B2') 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {sc.levelTag}
                    </span>
                  </div>
                </div>
                <h4 className={`text-xs sm:text-sm font-black leading-snug line-clamp-1 ${
                  isSelected ? 'text-[#80142A]' : 'text-slate-800'
                }`}>
                  {sc.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {sc.description}
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 font-medium border-t border-slate-100 mt-2">
                <span>{sc.categoryLabel}</span>
                {isLocked ? (
                  <span className="text-amber-700 font-bold flex items-center gap-0.5">
                    <Lock className="w-3 h-3" />
                    <span>去解锁</span>
                  </span>
                ) : (
                  <span className="text-[#80142A] font-bold">进入对练 ➜</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 主对话交互舞台 */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col min-h-[560px]">
        {/* 对话舞台顶栏 */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{currentScenario.icon}</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black text-slate-900">
                  {currentScenario.title}
                </h3>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-rose-50 text-[#80142A] font-bold border border-[#80142A]/20">
                  {currentScenario.categoryLabel}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {currentScenario.frenchTitle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#DDBF78]" />
            <span>智能多轮交互</span>
          </div>
        </div>

        {/* 消息滚动区 */}
        <div className="flex-1 p-4 sm:p-6 space-y-4 overflow-y-auto bg-slate-50/40 max-h-[460px]">
          {messages.map(msg => {
            const isAi = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-2xl ${isAi ? 'self-start' : 'self-end ml-auto flex-row-reverse'}`}
              >
                {/* 头像 */}
                <div className="w-9 h-9 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-lg shrink-0">
                  {msg.avatar}
                </div>

                {/* 气泡内容 */}
                <div className="space-y-2">
                  <div className={`flex items-center gap-2 ${isAi ? '' : 'justify-end'}`}>
                    <span className="text-xs font-bold text-slate-700">{msg.name}</span>
                    {isAi && (
                      <button
                        onClick={() => handlePlaySpeech(msg.fr)}
                        className={`p-1 rounded-lg hover:bg-slate-200 transition cursor-pointer ${
                          playingAudioFr === msg.fr ? 'text-[#80142A] animate-pulse' : 'text-slate-500'
                        }`}
                        title="标准法语朗读"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    isAi 
                      ? 'bg-white border border-slate-200 text-slate-800 shadow-xs rounded-tl-xs' 
                      : 'bg-gradient-to-r from-[#80142A] to-[#9E1B32] text-white shadow-sm rounded-tr-xs'
                  }`}>
                    <p className="font-sans font-medium">{msg.fr}</p>

                    {/* 音标 */}
                    {isAi && showPhonetics && msg.phonetic && (
                      <p className="text-xs text-slate-400 font-mono pt-1.5 border-t border-slate-100 mt-1.5">
                        [{msg.phonetic}]
                      </p>
                    )}

                    {/* 中文翻译 */}
                    {isAi && showTranslations && msg.zh && (
                      <p className="text-xs text-slate-500 pt-1.5 border-t border-slate-100 mt-1.5">
                        {msg.zh}
                      </p>
                    )}

                    {/* 语法点拨卡片 */}
                    {isAi && msg.grammarTip && (
                      <div className="mt-2 p-2 rounded-xl bg-[#FCECEF]/60 border border-[#80142A]/20 text-[11px] text-[#80142A] flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 shrink-0 text-[#DDBF78]" />
                        <span>{msg.grammarTip}</span>
                      </div>
                    )}

                    {/* 用户答复即时打分 */}
                    {!isAi && msg.score && (
                      <div className="mt-2.5 pt-2 border-t border-white/20 text-xs space-y-1">
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="font-bold">流利度 {msg.score.fluency}%</span>
                          <span>•</span>
                          <span className="font-bold">语法 {msg.score.grammar}%</span>
                          <span>•</span>
                          <span className="font-bold">发音 {msg.score.pronunciation}%</span>
                        </div>
                        {msg.feedback && (
                          <div className="text-[10px] text-rose-100">
                            💡 {msg.feedback}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 针对上一条 AI 消息推荐的快捷回复胶囊 */}
                  {isAi && msg.suggestedResponses && msg.suggestedResponses.length > 0 && (
                    <div className="space-y-1 pt-1">
                      <div className="text-[10px] font-bold text-slate-400">💡 推荐高频表达（点击直接发送）：</div>
                      <div className="flex flex-col gap-1.5">
                        {msg.suggestedResponses.map((sug, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(sug)}
                            className="text-left text-xs px-3 py-2 rounded-xl bg-white hover:bg-[#FCECEF]/80 text-slate-700 hover:text-[#80142A] border border-slate-200/80 hover:border-[#80142A]/30 transition cursor-pointer shadow-xs flex items-center justify-between group"
                          >
                            <span>{sug}</span>
                            <Send className="w-3 h-3 text-slate-300 group-hover:text-[#80142A] transition shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isAiReplying && (
            <div className="flex items-center gap-2 text-xs text-slate-500 animate-pulse p-2">
              <Bot className="w-4 h-4 text-[#80142A]" />
              <span>巴黎母语 AI 思考中...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* 底部输入控制条 */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 space-y-2">
          {/* Free User Turn Counter Bar */}
          {!isVip && (
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold px-1 pb-1 border-b border-slate-100">
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

          <div className="flex items-center gap-2">
            {/* 麦克风录音按钮 */}
            <button
              onClick={toggleListening}
              className={`p-3 rounded-2xl transition cursor-pointer flex items-center justify-center shrink-0 ${
                isListening 
                  ? 'bg-rose-600 text-white animate-pulse shadow-md ring-4 ring-rose-200' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              title={isListening ? '点击停止识别' : '按住说话（法语实时识别）'}
            >
              {isListening ? <Mic className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* 文本输入框 */}
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder={isListening ? '正在收听法语发音...' : '输入法语回答，或点击上方推荐快捷回复...'}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#80142A] focus:ring-2 focus:ring-[#80142A]/20 transition outline-hidden text-sm text-slate-800 font-sans"
            />

            {/* 发送按钮 */}
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isAiReplying}
              className={`px-5 py-3 rounded-2xl font-black text-sm flex items-center gap-1.5 transition cursor-pointer shadow-xs shrink-0 ${
                inputText.trim() && !isAiReplying
                  ? 'bg-gradient-to-r from-[#80142A] to-[#9E1B32] text-white hover:shadow-md'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>发送</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Free User Speaking VIP Upsell Banner */}
      {!isVip && (
        <div className="bg-gradient-to-r from-[#80142A] via-[#9E1B32] to-[#80142A] rounded-3xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-rose-900/20">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-1.5 justify-center sm:justify-start font-black text-sm">
              <Sparkles className="w-4 h-4 text-[#DDBF78]" />
              <span>当前正在体验【巴黎咖啡馆点餐 · 免费体验（限3轮）】</span>
            </div>
            <p className="text-xs text-white/90 leading-relaxed">
              开通 VIP 终身卡（仅 ¥49.9），即可解锁 <strong>DELF 欧标全等级口语实战会话</strong>、法企职场面试及 24 小时随身巴黎语伴无限轮次沉浸对练！
            </p>
          </div>
          <button
            onClick={() => onOpenVipModal?.('🎙️ 开通 VIP 终身卡（仅 ¥49.9），即可解锁 DELF 欧标全等级口语会话实战、法企职场面试及 24 小时随身巴黎语伴无限轮次沉浸对练！')}
            className="px-5 py-2.5 rounded-2xl bg-white text-[#80142A] hover:bg-rose-50 font-black text-xs shadow-md transition active:scale-98 shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-[#80142A]" />
            <span>解锁全部口语剧本与无限畅聊 (¥49.9)</span>
          </button>
        </div>
      )}
    </div>
  );
};
