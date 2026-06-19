import React, { useState, useEffect } from 'react';
import { 
  Video, 
  ExternalLink,
  Download,
  Flame,
  Search,
  Zap,
  ShoppingBag,
  Film,
  Sparkles,
  Play,
  RotateCcw,
  Home,
  User,
  Utensils,
  Dumbbell,
  Palmtree,
  Heart,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  FileText,
  Volume2,
  Tv,
  Eye,
  Sliders,
  Copy,
  Plus,
  X,
  Smile,
  Laugh,
  Volume1,
  Bell,
  Battery,
  Snowflake,
  Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { Product } from '../types';
import { products } from '../data/products';
import { CopyButton } from './ui/CopyButton';

interface FindGroupProps {
  onNotification: (message: string) => void;
  product: Product | null;
  onNavigateToProducts: () => void;
}

const generateVideoPrompt = (
  product: Product, 
  scenario: string, 
  duration: string, 
  style: string, 
  type: string, 
  instructions: string,
  selectedCamera: string,
  selectedInfluencer: { nome: string; genero: string } | null,
  customSpeech: string,
  selectedTone: string,
  selectedVoiceType: string,
  selectedTonality: string
) => {
  const cameraMap: Record<string, string> = {
    'frente': 'straight front-facing camera angle, full body visible, product held facing camera',
    'selfie': 'selfie-style angle, person holding camera up, casual authentic feel',
    'maos': 'close-up hands-only shot, no face visible, hands interacting naturally with product',
  };

  const influencerDesc = selectedInfluencer
    ? `Avatar/Influencer: ${selectedInfluencer.nome} (${selectedInfluencer.genero}). Use the provided reference image for this character.`
    : 'No specific influencer — focus on product only.';

  const speechDesc = customSpeech
    ? `Avatar speech: "${customSpeech}". Voice tone: ${selectedTone}, ${selectedVoiceType} voice, ${selectedTonality} tonality.`
    : `Avatar speech: AI-generated naturally. Voice tone: ${selectedTone || 'animated'}, ${selectedVoiceType || 'feminine'} voice.`;

  return `=== SHOPPYSPY CREATOR LAB - PROFESSIONAL PROMPT FOR FLOW VEO3 ===

[GENERAL SETTINGS]
Duration: ${duration} total
Format: Vertical 9:16 | Resolution: 1080x1920px | Frame Rate: 24fps
Platform: TikTok / Reels / Shorts | Style: Authentic UGC, ${style.toLowerCase()}, hyperrealistic, cinematic quality, high-end commercial ad

[PRODUCT BEING SHOWN]
Name: ${product.nome}
Category: ${product.categoria}
Price: ${product.preco}
Key selling points: high quality, great value, fast delivery

[CAMERA STYLE]
${cameraMap[selectedCamera] || 'front-facing'}

[CHARACTER INFO]
${influencerDesc}

[SPEECH & VOICE]
${speechDesc}

[ENVIRONMENT / SETTING]
Setting: ${scenario}
Lighting: Bright, even, professional TikTok-optimized studio product lighting.
No harsh shadows. Clean and premium background that perfectly complements the product.
Camera: Smooth cinematic camera pans, slow macro lens zooms, high-definition.

[SCENARIO / STORYBOARD]
- Take 1: Majestic establishing shot showcasing the exact product "${product.nome}" resting elegantly in a ${scenario.toLowerCase()} setting. Cinematic slow-motion camera pan.
- Take 2: Extreme close-up macro lens detail shot, highlighting the fine texture, premium materials, and exact physical look of "${product.nome}".
- Take 3: ${type} demonstration of how "${product.nome}" works/behaves on its own in the setting, with no people on screen. Focus completely on the item's functions.
- Take 4: Dynamic 360-degree rotation of the product "${product.nome}" with gorgeous lighting reflections reflecting off its surface.
- Take 5: Final high-end aesthetic product showcase of "${product.nome}" with clean, premium floating on-screen product card showing price "${product.preco}".

[ADDITIONAL VEO3 INSTRUCTIONS]
- Make every frame visually engaging and scroll-stopping
- Ensure product "${product.nome}" is ALWAYS crystal clear, clearly visible, and perfectly lit
- Avoid generic placeholders — render specifically "${product.nome}"
- Optimize for high-performance mobile e-commerce viewing
- Custom Instructions: ${instructions || 'IA Decidir / Seguir roteiro padrão'}

[GOAL]
Primary goal: Drive purchases
Secondary goal: Maximum video completion rate and shares
Target audience: Brazilian users interested in ${product.categoria}

=== END OF SHOPPYSPY CREATOR LAB PROMPT ===`;
};

const generateHashtags = (categoria: string, nome: string): string => {
  const base = '#shopee #oferta #compraonline #afiliado #shopeebrasil';
  const categoryTags: Record<string, string> = {
    'Moda': '#moda #look #estilo #ootd #fashion #tendencia',
    'Casa': '#casa #decoracao #organizacao #lar #casaorganizada',
    'Eletrônicos': '#tecnologia #eletronicos #gadgets #tech',
    'Beleza': '#beleza #skincare #autocuidado #beauty',
    'Ferramentas': '#ferramentas #diy #reforma #construcao',
  };
  return `${base} ${categoryTags[categoria] || '#produto #viral'}`;
};

const generateCopy = (product: Product, variation: number = 0): string => {
  const preco = product.preco;
  const nome = product.nome;
  const categoria = product.categoria;
  const vendas = product.vendas;
  const avaliacao = product.avaliacao;

  let especificacao = '';
  let beneficios: string[] = [];

  if (categoria === 'Beleza') {
    especificacao = 'Ideal para rotinas de beleza, autocuidado e bem-estar. Testado dermatologicamente.';
    beneficios = [
      'Ingredientes selecionados e de alta performance.',
      'Excelente absorção e resultado prolongado.',
      'Embalagem prática para transporte e armazenamento.'
    ];
  } else if (categoria === 'Eletrônicos') {
    especificacao = 'Construção robusta com chips inteligentes e conexão estável de baixa latência.';
    beneficios = [
      'Bateria interna recarregável com gerenciamento avançado de energia.',
      'Compatibilidade de conexão moderna, estável e intuitiva.',
      'Design ergonômico focado em conforto para uso prolongado.'
    ];
  } else if (categoria === 'Casa') {
    especificacao = 'Utensílio para otimização de espaço, conforto térmico, decoração ou organização doméstica.';
    beneficios = [
      'Material de alta resistência e fácil higienização cotidiana.',
      'Design elegante que combina perfeitamente com qualquer ambiente comercial ou doméstico.',
      'Funcionalidade aprimorada para simplificar as suas tarefas diárias.'
    ];
  } else if (categoria === 'Ferramentas') {
    especificacao = 'Ferramentas produzidas em materiais duráveis de liga metálica reforçada de alta durabilidade.';
    beneficios = [
      'Cabos com revestimento antiderrapante para total controle durante o manuseio.',
      'Precisão milimétrica em ajustes e manutenção preventiva.',
      'Praticidade integrada adequada tanto para uso profissional quanto para hobby.'
    ];
  } else {
    // Moda ou outros
    especificacao = 'Confecção de alta qualidade com costuras reforçadas e toque macio ao contato direto.';
    beneficios = [
      'Tecido leve e respirável ideal para as mais diversas ocasiões.',
      'Modelagem moderna que proporciona excelente caimento e ajuste.',
      'Alta durabilidade de cor e fibra mesmo após múltiplos ciclos de uso.'
    ];
  }

  const cleanNome = nome.split(' ').slice(0, 4).join(' ');

  const options = [
    // Var 0 (Padrão)
    `ℹ️ VISÃO GERAL:
O ${nome} é amplamente reconhecido pela sua eficiência e aceitação de mercado. Projetado com foco estrutural na qualidade dos materiais e ergonomia de uso, este item atende de maneira excelente todas as finalidades na divisão de ${categoria}.

🛠️ ESPECIFICAÇÕES TÉCNICAS E DETALHES:
• Indicação: Adequado para uso rotineiro, com base nas principais demandas dos consumidores.
• Construção: Desenvolvido com matérias-primas inspecionadas visando segurança de uso.
• Características físicas: ${especificacao}
• Desempenho comercial: Classificação estimada de ${avaliacao}/5.0 baseada em mais de ${vendas} avaliações reais.

✨ PRINCIPAIS BENEFÍCIOS DO PRODUTO:
1. ${beneficios[0]}
2. ${beneficios[1]}
3. ${beneficios[2]}

📦 CONTEÚDO DA EMBALAGEM PADRÃO:
• 1x ${cleanNome} (Unidade Completa)
• 1x Manual ou Folheto Técnico Informativo`,

    // Var 1 (Urgência e desejo)
    `🔥 ACHADINHO VIRAL DA SHOPEE que você precisa ver! 😱

Se você é fã de praticidade, dá uma olhada no ${nome}. Ele se destaca em ${categoria} pela sua incrível performance e design ergonômico.

Por que se tornou um Best-Seller?
✅ ${beneficios[0]}
✅ ${beneficios[1]}
✅ ${beneficios[2]}

📈 Mais de ${vendas} unidades vendidas e avaliado em ${avaliacao}/5.0 estrelas! Corre no link para garantir o seu antes que acabe o estoque promocional! 🛒✨`,

    // Var 2 (História e Solução de Problemas)
    `🚨 Pare tudo o que você está fazendo e olhe esse achado! 👇

Muitas pessoas sofrem procurando boas alternativas para a categoria ${categoria}. É aí que o ${nome} entra para salvar a sua rotina!

O que você ganha com ele no seu dia a dia:
🎯 Otimização e sofisticação: ${especificacao}
🎯 Benefício exclusivo: ${beneficios[0]}
🎯 Confiabilidade de marcas líderes.

Deixe sua rotina muito mais prática e inteligente. Clique no meu link de afiliado e saiba mais! 🚀`,

    // Var 3 (Review Sincero)
    `💡 REVIEW COMPLETO E SINCERO: O ${nome} realmente vale a pena? 🤔

Fizemos uma análise detalhada deste produto da categoria ${categoria} que está dominando as redes sociais ultimamente.

✔️ PONTOS FORTES:
- ${beneficios[1]}
- Acabamento de primeira qualidade.
- Excelente relação custo-benefício (Preço atual: ${preco}).

❌ PONTOS FRACOS:
- Estoque acaba muito rápido de tão popular!

Conclusão: Nota ${avaliacao}/5.0. Com mais de ${vendas} vendas e feedbacks positivos, é uma compra super inteligente e segura! link direto na bio! 📦`,

    // Var 4 (Tom UGC Feminino / Descontraído)
    `💅 Gente, estou chocada com essa maravilha que comprei na Shopee! 😍✨

Sério, o ${cleanNome} virou meu favorito da vida na categoria ${categoria}! Não consigo mais viver sem.

Olha só por que vale cada centavo:
🌸 ${beneficios[0]}
🌸 ${beneficios[2]}
🌸 Super prático de usar e carregar.

O preço está maravilhoso (${preco}) e já tem mais de ${vendas} avaliações excelentes na loja! Deixei o link pra vocês pegarem com desconto nos comentários/perfil! 👇💖`,

    // Var 5 (Passo a passo / Como usar)
    `📦 GUIA RÁPIDO: Como transformar sua rotina com o ${cleanNome}!

Quer saber por que esse produto está viralizando tanto em ${categoria}? Aqui está o segredo:

Passo 1: Ele oferece ${especificacao}
Passo 2: Você desfruta do benefício número um: ${beneficios[1]}
Passo 3: A durabilidade é garantida por conta dos materiais premium de fabricação.

⭐ Avaliação Geral dos Clientes: ${avaliacao}/5.0 (Excelente!)
Aproveite o preço promocional agora mesmo! link ativo na descrição!`,

    // Var 6 (Foco Econômico e Descontos)
    `💸 ALERTA DE MENOR PREÇO DO ANO na Shopee! 💰

O queridinho do momento, ${nome}, está com um preço simplesmente imbatível hoje!

Se você estava esperando o momento certo para investir em ${categoria}, a hora é agora:
🔴 Economia garantida e frete facilitado.
🔴 Super recomendado: ${beneficios[0]}
🔴 Qualidade duradoura: ${beneficios[2]}

Mais de ${vendas} compradores inteligentes já aproveitaram. Não fique de fora desse fluxo! 👇🔗 Link direto na bio!`,

    // Var 7 (Foco em Curiosidade & Viralidade)
    `👀 O segredo que os grandes influencers não te contam sobre o ${cleanNome}...

Por que este produto de ${categoria} está em alta em todos os feeds de vídeo?

1️⃣ Tem a estrutura ideal: ${especificacao}
2️⃣ Facilita suas tarefas: ${beneficios[1]}
3️⃣ É lindo, moderno e muito durável!

Com mais de ${vendas} clientes satisfeitos, ele provou ser um sucesso definitivo! Garanta já o seu clicando no meu link oficial antes que esgote! ⚡🏃‍♂️`,

    // Var 8 (Tom Autoridade / Profissional)
    `💼 RECOMENDAÇÃO PROFISSIONAL: ${nome} em Destaque.

Para quem busca excelência e máximo desempenho na seção de ${categoria}, o ${nome} apresenta resultados acima da média.

Esquema Técnico Recomendado:
• Destaque Ergonômico: ${beneficios[0]}
• Durabilidade e Resistência: ${beneficios[2]}
• Desempenho Comprovado: avaliado com score de ${avaliacao}/5.0 estrelas.

Adquira de forma segura através do link homologado oficial. ➡️ CLIQUE PARA ACESSAR`,

    // Var 9 (Unboxing e Primeiras Impressões)
    `🎁 Primeiras Impressões do ${nome}! ✨

Acabou de chegar e eu já estou impressionado com a apresentação deste utensílio de ${categoria}.

O que vem na caixa:
📦 1x ${cleanNome} de alta resistência
📦 Manual completo com dicas de conservação

Principais diferenciais logo de cara:
• Sensação de toque e material premium: ${especificacao}
• Super prático: ${beneficios[1]}

Valeu muito a pena! Nota 10/10. Deixei o link seguro da loja oficial pra vocês! 👇💨`,

    // Var 10 (Minimalista e Elegante)
    `✨ Sofisticação e Praticidade: ${nome}.

Para quem valoriza detalhes elegantes e alta utilidade em ${categoria}:

• Design inteligente e otimizado: ${especificacao}
• Benefício central: ${beneficios[0]}
• Satisfação garantida de ${avaliacao} estrelas.

Descubra como elevar o padrão do seu dia a dia. Link disponível no perfil. 🔗`,

    // Var 11 (FAQ / Perguntas Frequentes)
    `❓ Dúvidas frequentes sobre o famoso ${cleanNome} da Shopee:

1. O produto é resistente?
Sim! O ${nome} foi estruturado para longas jornadas de uso e possui especificações premium.

2. Quais as maiores vantagens registradas pelos clientes?
• ${beneficios[1]}
• ${beneficios[2]}

3. Já tem muitas pessoas usando?
Sim, mais de ${vendas} unidades vendidas com classificação média de ${avaliacao} estrelas!

Aproveite o preço especial em ${categoria}! Compre pelo link com total segurança! 👇`
  ];

  return options[variation % options.length];
};

const scenarios = [
  { label: "Ambiente doméstico", icon: Home },
  { label: "Na loja / Varejo", icon: ShoppingBag },
  { label: "Ao ar livre", icon: Palmtree },
  { label: "Cuidados pessoais", icon: Heart },
  { label: "À mesa / Jantar", icon: Utensils },
  { label: "Academia / Fitness", icon: Dumbbell },
  { label: "Mão segurando (UGC)", icon: User },
  { label: "Personalizado", icon: Sparkles }
];

const cameraStyles = [
  { id: 'frente', label: 'De Frente', desc: 'Mostre o produto de frente para a câmera', image: 'https://i.postimg.cc/02RHpcf5/Chat-GPT-Image-24-de-abr-de-2026-10-28-34.png' },
  { id: 'selfie', label: 'Selfie', desc: 'Estilo selfie, faça uma selfie com o produto', image: 'https://i.postimg.cc/sDd0pwcV/Chat-GPT-Image-24-de-abr-de-2026-10-28-49.png' },
  { id: 'maos', label: 'Mãos', desc: 'Aproxime as mãos interagindo com o produto', image: 'https://i.postimg.cc/jqJFwGzT/Chat-GPT-Image-24-de-abr-de-2026-10-28-53.png' },
];

const influencers = [
  { id: 'h1', nome: 'Lucas', genero: 'Homem', image: 'https://i.postimg.cc/Pv4T3fNK/Full-body-portrait-of-a-202606111328.jpg' },
  { id: 'h2', nome: 'Pedro', genero: 'Homem', image: 'https://i.postimg.cc/RJR4sCqQ/Full-body-portrait-of-a-202606111328-(1).jpg' },
  { id: 'h3', nome: 'Gabriel', genero: 'Homem', image: 'https://i.postimg.cc/LgRm3g44/Full-body-portrait-of-a-202606111328-(3).jpg' },
  { id: 'h4', nome: 'Rafael', genero: 'Homem', image: 'https://i.postimg.cc/p5xPJ5VP/Full-body-portrait-of-a-202606111328-(6).jpg' },
  { id: 'f1', nome: 'Ana', genero: 'Mulher', image: 'https://i.postimg.cc/N2YQk2GX/Full-body-portrait-of-a-202606111328-(2).jpg' },
  { id: 'f2', nome: 'Julia', genero: 'Mulher', image: 'https://i.postimg.cc/9wVcYwXm/Full-body-portrait-of-a-202606111328-(4).jpg' },
  { id: 'f3', nome: 'Camila', genero: 'Mulher', image: 'https://i.postimg.cc/RJ9vLJCZ/Full-body-portrait-of-a-202606111328-(5).jpg' },
  { id: 'f4', nome: 'Bruna', genero: 'Mulher', image: 'https://i.postimg.cc/bD1zn9hB/Full-body-portrait-of-a-202606111328-(7).jpg' },
  { id: 'f5', nome: 'Fernanda', genero: 'Mulher', image: 'https://i.postimg.cc/tn5pSR7N/Full-body-portrait-of-an-202606111328.jpg' },
];

const durations = [
  { label: "1 take", detail: "8s", value: "15 segundos" },
  { label: "2 takes", detail: "16s", value: "30 segundos" },
  { label: "3 takes", detail: "24s", value: "60 segundos" },
  { label: "4 takes", detail: "32s", value: "90 segundos" },
  { label: "5 takes", detail: "40s", value: "120 segundos" }
];

const styles = [
  "Cinematográfico",
  "Estilo TikTok",
  "Reels Instagram",
  "Minimalista",
  "Vibrante e colorido",
  "Escuro e premium"
];

const types = [
  "Apresentação do produto",
  "Demonstração de uso",
  "Antes e depois",
  "Review rápido",
  "Oferta relâmpago"
];

type StepId = 1 | 2 | 3 | 4 | 5 | 6; // 1: Produto, 2: Produção, 3: Config, 4: Fala, 5: Revisão, 6: Resultado

export default function FindGroup({ onNotification, product: propProduct, onNavigateToProducts }: FindGroupProps) {
  const [currentStep, setCurrentStep] = useState<StepId>(() => {
    const saved = localStorage.getItem('shopspy_findgroup_step');
    const parsed = saved ? parseInt(saved, 10) : 1;
    return (parsed >= 1 && parsed <= 6 ? parsed : 1) as StepId;
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedScenario, setSelectedScenario] = useState(() => {
    return localStorage.getItem('shopspy_findgroup_scenario') || "";
  });
  const [selectedDuration, setSelectedDuration] = useState(() => {
    return localStorage.getItem('shopspy_findgroup_duration') || "";
  });
  const [selectedStyle, setSelectedStyle] = useState(() => {
    return localStorage.getItem('shopspy_findgroup_style') || "";
  });
  const [selectedType, setSelectedType] = useState(() => {
    return localStorage.getItem('shopspy_findgroup_type') || "";
  });
  const [instructionsText, setInstructionsText] = useState(() => {
    return localStorage.getItem('shopspy_findgroup_instructions') || "";
  });
  const [customScenarioText, setCustomScenarioText] = useState(() => {
    return localStorage.getItem('shopspy_findgroup_custom_scenario') || "";
  });
  const [isSelectProductModalOpen, setIsSelectProductModalOpen] = useState(false);
  const [searchProductQuery, setSearchProductQuery] = useState("");

  const favoritedProducts = React.useMemo(() => {
    try {
      const favIds = JSON.parse(localStorage.getItem('shopspy_favorites') || '[]');
      return products.filter(p => favIds.includes(p.id));
    } catch { return []; }
  }, []);

  const filteredProducts = React.useMemo(() => {
    if (!searchProductQuery.trim()) return favoritedProducts;
    return favoritedProducts.filter(p => 
      p.nome.toLowerCase().includes(searchProductQuery.toLowerCase()) ||
      p.categoria.toLowerCase().includes(searchProductQuery.toLowerCase())
    );
  }, [favoritedProducts, searchProductQuery]);

  // New camera, influencer and avatar speech states
  const [isRegisteringCustomProduct, setIsRegisteringCustomProduct] = useState(false);
  const [customProductName, setCustomProductName] = useState("");
  const [customProductImage, setCustomProductImage] = useState("");

  const handleSaveCustomProduct = () => {
    if (!customProductName.trim()) {
      onNotification("⚠️ Digite o nome do produto!");
      return;
    }
    const customProd: Product = {
      id: 9999 + Date.now(),
      ranking: 999,
      categoria: "Personalizado",
      nome: customProductName.trim(),
      preco: "Preço sob consulta",
      precoOriginal: "",
      desconto: "",
      avaliacao: 5.0,
      vendas: "0",
      comissao: "0%",
      imagem: customProductImage.trim() || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=150&q=80",
      link: "https://shopee.com.br",
      scoreViral: 100
    };
    setSelectedProduct(customProd);
    setIsRegisteringCustomProduct(false);
    setCurrentStep(2);
    onNotification(`Produto próprio "${customProd.nome}" registrado com sucesso! 📦`);
  };

  const [isRegisteringCustomAvatar, setIsRegisteringCustomAvatar] = useState(false);
  const [customAvatarName, setCustomAvatarName] = useState("");
  const [customAvatarImage, setCustomAvatarImage] = useState("");
  const [customAvatarGender, setCustomAvatarGender] = useState<'Homem' | 'Mulher'>('Homem');
  const [customAvatarsList, setCustomAvatarsList] = useState<{ id: string; nome: string; genero: string; image: string }[]>(() => {
    const saved = localStorage.getItem('shopspy_custom_avatars');
    return saved ? JSON.parse(saved) : [];
  });
  const allInfluencers = [...customAvatarsList, ...influencers];

  const [selectedCamera, setSelectedCamera] = useState(() => {
    return localStorage.getItem('shopspy_findgroup_camera') || "";
  });
  const [selectedInfluencer, setSelectedInfluencer] = useState<{ id: string; nome: string; genero: string; image: string } | null>(() => {
    const saved = localStorage.getItem('shopspy_findgroup_influencer');
    return saved ? JSON.parse(saved) : null;
  });
  const [selectedTone, setSelectedTone] = useState(() => {
    return localStorage.getItem('shopspy_findgroup_tone') || "";
  });
  const [selectedVoiceType, setSelectedVoiceType] = useState(() => {
    return localStorage.getItem('shopspy_findgroup_voice_type') || "";
  });
  const [selectedTonality, setSelectedTonality] = useState(() => {
    return localStorage.getItem('shopspy_findgroup_tonality') || "";
  });
  const [customSpeech, setCustomSpeech] = useState(() => {
    return localStorage.getItem('shopspy_findgroup_speech') || "";
  });
  const [influencerGenderFilter, setInfluencerGenderFilter] = useState<'Todos' | 'Homens' | 'Mulheres'>('Todos');
  const [copyVariationIndex, setCopyVariationIndex] = useState(0);

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('shopspy_findgroup_step', String(currentStep));
  }, [currentStep]);

  useEffect(() => {
    localStorage.setItem('shopspy_findgroup_scenario', selectedScenario);
  }, [selectedScenario]);

  useEffect(() => {
    localStorage.setItem('shopspy_findgroup_duration', selectedDuration);
  }, [selectedDuration]);

  useEffect(() => {
    localStorage.setItem('shopspy_findgroup_style', selectedStyle);
  }, [selectedStyle]);

  useEffect(() => {
    localStorage.setItem('shopspy_findgroup_type', selectedType);
  }, [selectedType]);

  useEffect(() => {
    localStorage.setItem('shopspy_findgroup_instructions', instructionsText);
  }, [instructionsText]);

  useEffect(() => {
    localStorage.setItem('shopspy_findgroup_custom_scenario', customScenarioText);
  }, [customScenarioText]);

  useEffect(() => {
    localStorage.setItem('shopspy_findgroup_camera', selectedCamera);
  }, [selectedCamera]);

  useEffect(() => {
    if (selectedInfluencer) {
      localStorage.setItem('shopspy_findgroup_influencer', JSON.stringify(selectedInfluencer));
    } else {
      localStorage.removeItem('shopspy_findgroup_influencer');
    }
  }, [selectedInfluencer]);

  useEffect(() => {
    localStorage.setItem('shopspy_findgroup_tone', selectedTone);
  }, [selectedTone]);

  useEffect(() => {
    localStorage.setItem('shopspy_findgroup_voice_type', selectedVoiceType);
  }, [selectedVoiceType]);

  useEffect(() => {
    localStorage.setItem('shopspy_findgroup_tonality', selectedTonality);
  }, [selectedTonality]);

  useEffect(() => {
    localStorage.setItem('shopspy_findgroup_speech', customSpeech);
  }, [customSpeech]);

  useEffect(() => {
    if (selectedProduct) {
      localStorage.setItem('shopspy_findgroup_selected_product_id', String(selectedProduct.id));
    }
  }, [selectedProduct]);

  const actualScenario = ((selectedScenario === "✨ Personalizado" || selectedScenario === "Personalizado") && customScenarioText.trim())
    ? customScenarioText.trim()
    : selectedScenario;

  const [isLoading, setIsLoading] = useState(false);
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [isDownloadingImage, setIsDownloadingImage] = useState(false);
  const [isDownloadingAvatar, setIsDownloadingAvatar] = useState(false);
  const [isPromptExpanded, setIsPromptExpanded] = useState(true);
  const [isGeneratingSpeech, setIsGeneratingSpeech] = useState(false);

  const generateSpeechWithAI = async () => {
    if (!selectedProduct) {
      onNotification("⚠️ Selecione um produto primeiro!");
      return;
    }
    
    setIsGeneratingSpeech(true);
    onNotification("🤖 A IA está elaborando sua fala ideal...");

    try {
      const apiKey = (process.env.GEMINI_API_KEY as string) || "";
      if (!apiKey) {
        setTimeout(() => {
          const fallback = `Olá pessoal! Vocês já conhecem o novo ${selectedProduct.nome}? Ele é perfeito para ${selectedProduct.categoria.toLowerCase()} e é um dos itens mais pedidos da Shopee. Ele se destaca pela qualidade incomparável e praticidade. Garanta já o seu clicando no link antes que acabe o estoque!`;
          setCustomSpeech(fallback);
          setIsGeneratingSpeech(false);
          onNotification("Fala gerada com roteiro inteligente local (chave API não configurada)! ✨");
        }, 800);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Crie uma fala curta e de alta conversão para publicidade em vídeo UGC no TikTok/Instagram para o produto "${selectedProduct.nome}" na categoria "${selectedProduct.categoria}".
      Contexto/Cenário do vídeo: "${actualScenario}".
      Tom da fala selecionado: "${selectedTone}".
      Gênero do influenciador: "${selectedInfluencer?.genero || 'Geral'}".
      Tipo de voz: "${selectedVoiceType}".
      Tonalidade da voz: "${selectedTonality}".
      Instruções adicionais: "${instructionsText || 'Nenhuma'}".
      A fala deve ser natural, espontânea, carismática e conter um forte Call To Action (chamada para ação) curto para o público brasileiro. Escreva apenas o texto falado de no máximo 2 ou 3 frases.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
      });

      const speech = response.text?.trim() || "";
      if (speech) {
        setCustomSpeech(speech.replace(/^"|"$/g, ''));
        onNotification("Fala gerada pela IA com sucesso! ⚡");
      } else {
        throw new Error("Resposta em branco");
      }
    } catch (error) {
      console.error("Gemini text generation failed:", error);
      const fallback = `Olá pessoal! Vocês já conhecem o novo ${selectedProduct.nome}? Ele é perfeito para ${selectedProduct.categoria.toLowerCase()} e é um dos itens mais pedidos da Shopee. Ele se destaca pela qualidade incomparável e praticidade. Garanta já o seu clicando no link antes que acabe o estoque!`;
      setCustomSpeech(fallback);
      onNotification("Erro na IA. Geramos uma fala padrão otimizada para o produto! 👍");
    } finally {
      setIsGeneratingSpeech(false);
    }
  };

  const generateMergePrompt = (productImg: string, avatarImg: string) => {
    return `Merge these two images: 1. Product Image: ${productImg} 2. Avatar Image: ${avatarImg}. Maintain high consistency for both. Cinematic lighting, professional product photography.`;
  };

  const handleDownloadAvatar = () => {
    if (selectedInfluencer?.image) {
      window.open(selectedInfluencer.image, '_blank');
    }
  };

  // Initialize selected product
  useEffect(() => {
    if (propProduct) {
      setSelectedProduct(propProduct);
      localStorage.setItem('shopspy_findgroup_selected_product_id', String(propProduct.id));
    } else {
      const savedProductId = localStorage.getItem('shopspy_findgroup_selected_product_id');
      if (savedProductId) {
        const found = products.find(p => String(p.id) === savedProductId);
        if (found) {
          setSelectedProduct(found);
          return;
        }
      }
      if (products.length > 0) {
        setSelectedProduct(products[0]);
      }
    }
  }, [propProduct]);

  const handleNextStep = () => {
    if (currentStep === 1 && !selectedProduct) {
      onNotification("⚠️ Selecione um produto para avançar!");
      return;
    }
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as StepId);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as StepId);
    }
  };

  const handleStartGeneration = () => {
    if (!selectedProduct) {
      onNotification("⚠️ Selecione um produto primeiro!");
      return;
    }
    setIsLoading(true);
    setLoaderProgress(0);

    let startTimestamp = Date.now();
    const simulationDuration = 1500; // 1.5 seconds loader

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimestamp;
      const progressPercent = Math.min(Math.floor((elapsed / simulationDuration) * 100), 100);
      setLoaderProgress(progressPercent);

      if (progressPercent >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          setCurrentStep(6); // Go to results (Step 6)
          onNotification("Vídeo e prompt gerados com sucesso! ⚡");
        }, 120);
      }
    }, 25);
  };

  const downloadProductImage = async () => {
    if (!selectedProduct) return;
    const filename = `${selectedProduct.nome.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.webp`;
    try {
      setIsDownloadingImage(true);
      onNotification("Iniciando download da imagem...");
      const response = await fetch(selectedProduct.imagem);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
      onNotification("Imagem salva com sucesso! 📸");
    } catch (err) {
      console.warn("Direct blob download failed, trying CORS proxy fallback:", err);
      try {
        const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(selectedProduct.imagem)}`;
        const response = await fetch(proxyUrl);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
        onNotification("Imagem salva com sucesso! 📸");
      } catch (proxyErr) {
        console.warn("CORS proxy download failed too, using tab fallback:", proxyErr);
        onNotification("Download alternativo iniciado em nova aba...");
        window.open(selectedProduct.imagem, '_blank');
      }
    } finally {
      setIsDownloadingImage(false);
    }
  };

  const downloadInfluencerImage = async () => {
    if (!selectedInfluencer) return;
    const filename = `avatar_${selectedInfluencer.nome.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.webp`;
    try {
      setIsDownloadingAvatar(true);
      onNotification("Iniciando download do avatar...");
      
      const imageUrl = selectedInfluencer.image;
      if (imageUrl.startsWith('data:')) {
        // Local base64 image data can be directly downloaded
        const a = document.createElement('a');
        a.href = imageUrl;
        a.download = `avatar_${selectedInfluencer.nome.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        onNotification("Imagem do avatar salva com sucesso! 📸");
        return;
      }

      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
      onNotification("Imagem do avatar salva com sucesso! 📸");
    } catch (err) {
      console.warn("Direct blob download failed, trying CORS proxy fallback:", err);
      try {
        const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(selectedInfluencer.image)}`;
        const response = await fetch(proxyUrl);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
        onNotification("Imagem do avatar salva com sucesso! 📸");
      } catch (proxyErr) {
        console.warn("CORS proxy download failed too, using tab fallback:", proxyErr);
        onNotification("Download alternativo iniciado em nova aba...");
        window.open(selectedInfluencer.image, '_blank');
      }
    } finally {
      setIsDownloadingAvatar(false);
    }
  };

  // Stepper Header helper
  const renderStepper = () => {
    const stepsList = [
      { id: 1, label: 'Produto' },
      { id: 2, label: 'Produção' },
      { id: 3, label: 'Config' },
      { id: 4, label: 'Fala & Voz' },
      { id: 5, label: 'Revisão' }
    ];

    return (
      <div className="flex items-center md:justify-center gap-1.5 sm:gap-4 py-4 px-2 select-none overflow-x-auto no-scrollbar scroll-smooth">
        {stepsList.map((st, idx) => {
          const isActive = currentStep === st.id;
          const isCompleted = currentStep > st.id;
          
          return (
            <React.Fragment key={st.id}>
              {idx > 0 && (
                <div 
                  className={`h-0.5 min-w-[12px] sm:min-w-[24px] md:w-10 rounded transition-colors duration-300 flex-shrink-0 ${
                    currentStep >= st.id ? 'bg-[#D0011B]' : 'bg-neutral-200 dark:bg-white/[0.08]'
                  }`} 
                />
              )}
              <div 
                onClick={() => {
                  if (st.id === 1 || selectedProduct) {
                    if (currentStep !== 6) setCurrentStep(st.id as StepId);
                  }
                }}
                className="flex flex-col items-center gap-1 cursor-pointer group flex-shrink-0"
              >
                <div 
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all duration-300 border-2 ${
                    isActive 
                      ? 'bg-[#D0011B] text-white border-[#D0011B] scale-110' 
                      : isCompleted 
                        ? 'bg-[#D0011B]/15 text-[#D0011B] border-[#D0011B]' 
                        : 'bg-transparent text-[#D0011B]/60 border-[#D0011B]/30 hover:border-[#D0011B] hover:text-[#D0011B]'
                  }`}
                >
                  {st.id}
                </div>
                <span 
                  className={`text-[9px] sm:text-[10px] font-bold transition-colors duration-300 whitespace-nowrap ${
                    isActive 
                      ? 'text-[#D0011B]' 
                      : 'text-[#D0011B]/70 hover:text-[#D0011B]'
                  }`}
                >
                  {st.label}
                </span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex-1 bg-gray-50 dark:bg-[#0a0a0a] p-4 sm:p-6 custom-scrollbar overflow-y-auto font-sans min-h-screen text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header (Muted except results) */}
        {currentStep !== 6 && (
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center gap-1 bg-[#D0011B] text-white text-[9px] uppercase font-black px-2.5 py-1 rounded-full shadow-sm tracking-wide">
                Gerador de Vídeo IA
              </span>
            </div>
            <h1 className="text-[20px] sm:text-[22px] font-black gradient-title leading-tight">
              Crie vídeos virais para seus produtos
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-white/50">
              Escolha o produto, cenário e duração — gere um prompt profissional para o Google Flow
            </p>
          </div>
        )}

        {/* STEPPER METADATA */}
        {currentStep !== 6 && !isLoading && renderStepper()}

        {/* LOADING SCREEN */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center p-12 px-6 bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-2xl shadow-xl">
            <style>{`
              @keyframes rotate-loader {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              .animate-rotate-custom {
                animation: rotate-loader 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
              }
            `}</style>

            <div className="relative w-20 h-20 bg-gray-50 dark:bg-white/[0.03] rounded-full flex items-center justify-center border border-black/5 dark:border-white/[0.08] mb-7">
              <div className="absolute w-[112%] h-[112%] rounded-full border-2 border-transparent border-t-[#D0011B] border-b-gray-300 dark:border-b-white animate-rotate-custom" />
              <div className="absolute w-[140px] h-[140px] bg-[radial-gradient(circle,rgba(0,0,0,0.02)_0%,transparent_70%)] blur-[25px] -z-10" />
              <Video size={22} className="text-[#D0011B]" />
            </div>

            <div className="text-[15px] font-semibold text-gray-900 dark:text-white mb-1.5">Sintetizando Criativos...</div>
            <div className="text-[12px] text-gray-500 dark:text-white/50 text-center">Escrevendo prompt cinematográfico e adaptando material para o Google Flow...</div>

            <div className="w-[280px] h-1.5 bg-gray-100 dark:bg-white/[0.08] rounded-full overflow-hidden my-5">
              <div 
                className="h-full bg-[#D0011B] rounded-full transition-all duration-400"
                style={{ width: `${loaderProgress}%` }}
              />
            </div>

            <div className="text-[26px] font-bold text-gray-900 dark:text-white tabular-nums">
              {loaderProgress}%
            </div>
          </div>
        )}

        {/* STEPPER PAGES */}
        {!isLoading && (
          <AnimatePresence mode="wait">
            
            {/* STEP 1: PRODUTO */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-[14px] p-5 sm:p-6 space-y-5 shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-black/[0.04] dark:border-white/[0.04]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#D0011B] text-white flex items-center justify-center text-[10px] font-black">
                        1
                      </span>
                      <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                        Selecione um produto
                      </h2>
                    </div>
                    <p className="text-[11px] text-gray-400 dark:text-white/30 uppercase font-bold tracking-wider">
                      MEUS FAVORITOS
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => {
                        setIsSelectProductModalOpen(true);
                        setIsRegisteringCustomProduct(false);
                      }}
                      className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#D0011B] hover:text-[#D0011B]/95 font-bold transition-all bg-[#D0011B]/5 hover:bg-[#D0011B]/10 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-lg border border-[#D0011B]/20 cursor-pointer"
                    >
                      <Plus size={13} className="stroke-[2.5]" />
                      <span>Adicionar produto (Produtos Virais)</span>
                    </button>
                    <button
                      onClick={() => setIsRegisteringCustomProduct(!isRegisteringCustomProduct)}
                      className={`flex items-center gap-1.5 text-[11px] sm:text-xs font-bold transition-all px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-lg border cursor-pointer ${
                        isRegisteringCustomProduct 
                          ? 'bg-[#D0011B] border-[#D0011B] text-white' 
                          : 'bg-neutral-100 dark:bg-white/[0.04] border-neutral-200 dark:border-white/[0.08] text-neutral-700 dark:text-white/80 hover:bg-neutral-200 dark:hover:bg-white/[0.08]'
                      }`}
                    >
                      <Plus size={13} className="stroke-[2.5]" />
                      <span>Cadastrar produto próprio</span>
                    </button>
                  </div>
                </div>

                {isRegisteringCustomProduct && (
                  <div className="p-4 rounded-xl border border-[#D0011B]/20 bg-[#D0011B]/[0.02] space-y-3.5 animate-fade-in">
                    <h3 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      <ShoppingBag size={14} className="text-[#D0011B]" />
                      Cadastrar Produto Próprio
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-neutral-400 dark:text-white/40 uppercase tracking-wide">
                          Nome do Produto *
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Refletor Solar Premium 100W"
                          value={customProductName}
                          onChange={(e) => setCustomProductName(e.target.value)}
                          className="w-full bg-neutral-50 dark:bg-white/[0.02] border border-neutral-300 dark:border-white/[0.08] rounded-xl p-3 text-xs font-bold focus:outline-none focus:border-[#D0011B] focus:ring-1 focus:ring-[#D0011B]/40 text-gray-900 dark:text-white transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-neutral-400 dark:text-white/40 uppercase tracking-wide">
                          Selecione uma imagem para o Produto *
                        </label>
                        <div 
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e: any) => {
                              const file = e.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setCustomProductImage(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            };
                            input.click();
                          }}
                          className="w-full bg-neutral-50 dark:bg-white/[0.02] border-2 border-dashed border-neutral-300 dark:border-white/[0.08] rounded-xl p-3 text-xs font-bold text-gray-400 dark:text-white/30 cursor-pointer hover:border-[#D0011B] transition-all flex items-center justify-center gap-2"
                        >
                          {customProductImage ? (
                            <div className="flex items-center gap-2 text-green-500">
                              <CheckCircle2 size={14} />
                              <span className="truncate max-w-[120px]">Imagem selecionada</span>
                            </div>
                          ) : (
                            <>
                              <Upload size={14} />
                              <span>Escolher Arquivo</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2.5 pt-1">
                      <button
                        onClick={() => setIsRegisteringCustomProduct(false)}
                        className="px-4 py-2 border border-neutral-300 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-white/[0.04] text-neutral-700 dark:text-neutral-300 text-xs font-bold rounded-lg transition-all"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleSaveCustomProduct}
                        className="px-4 py-2 bg-[#D0011B] hover:bg-[#D0011B]/95 text-white text-xs font-bold rounded-lg transition-all shadow-sm"
                      >
                        Avançar com produto próprio
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
                  {favoritedProducts.length === 0 ? (
                    <div className="col-span-2 py-10 flex flex-col items-center justify-center text-center space-y-3 opacity-40">
                      <Heart size={32} />
                      <p className="text-sm font-bold">Nenhum produto favorito encontrado.</p>
                    </div>
                  ) : (
                    favoritedProducts.map((p) => {
                      const isSelected = selectedProduct?.id === p.id;
                      return (
                        <div
                          key={p.id}
                          onClick={() => setSelectedProduct(p)}
                          className={`p-3 rounded-[12px] cursor-pointer transition-all border flex items-center gap-3 relative overflow-hidden ${
                            isSelected 
                              ? 'border-[#D0011B] bg-[#D0011B]/[0.06]' 
                              : 'border-neutral-200 dark:border-white/[0.06] hover:border-neutral-300 dark:hover:border-white/10 bg-transparent'
                          }`}
                        >
                          <div className="w-[44px] h-[44px] rounded-lg overflow-hidden flex-shrink-0 border border-black/10 dark:border-white/10">
                            <img 
                              src={p.imagem} 
                              alt={p.nome} 
                              className="w-full h-full object-cover" 
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-gray-900 dark:text-white truncate leading-tight">
                              {p.nome}
                            </div>
                            <div className="text-[10px] uppercase font-bold text-gray-400 dark:text-white/40 mt-1">
                              {p.categoria} · {p.preco}
                            </div>
                          </div>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-[#D0011B] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                              ✓
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                  <div />
                  <button
                    onClick={handleNextStep}
                    disabled={!selectedProduct}
                    className="btn-custom !py-2.5 !px-6 !text-xs font-black tracking-wide relative overflow-hidden flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <span>Próximo</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: PRODUÇÃO (CENÁRIO, ESTILO DE CÂMERA E ESCOLHA O INFLUENCIADOR) */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-[14px] p-5 sm:p-6 space-y-7 shadow-lg"
              >
                {/* Cenário do vídeo */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#D0011B] text-white flex items-center justify-center text-[10px] font-black">
                      2
                    </span>
                    <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                      Cenário do vídeo <span className="text-[11px] text-neutral-400 dark:text-white/30 font-normal py-0.5 px-2 bg-neutral-100 dark:bg-white/[0.04] rounded ml-1.5">Opcional</span>
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {scenarios.map((sc) => {
                      const isSelected = selectedScenario === sc.label;
                      return (
                        <div
                          key={sc.label}
                          onClick={() => setSelectedScenario(sc.label)}
                          className={`p-4 rounded-xl cursor-pointer transition-all flex flex-col items-center justify-center text-center gap-2 relative ${
                            isSelected
                              ? 'bg-[#D0011B] text-white border-transparent shadow-[0_4px_12px_rgba(208,1,27,0.2)]'
                              : 'bg-neutral-100 dark:bg-white/[0.04] text-neutral-600 dark:text-white/70 border border-neutral-200 dark:border-white/[0.08] hover:bg-neutral-200 dark:hover:bg-white/[0.08]'
                          }`}
                        >
                          <sc.icon size={22} className={isSelected ? "text-white" : "text-[#D0011B]"} />
                          <span className="text-[11px] font-bold tracking-tight">
                            {sc.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {(selectedScenario === "✨ Personalizado" || selectedScenario === "Personalizado") && (
                    <div className="mt-2 space-y-1.5 animate-fade-in">
                      <label className="text-[10px] sm:text-[11px] font-bold text-neutral-400 dark:text-white/40 uppercase tracking-wider block">
                        Qual cenário deseja para o seu vídeo?
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Quarto gamer com luzes roxas, escritório de madeira, praia tropical, etc..."
                        value={customScenarioText}
                        onChange={(e) => setCustomScenarioText(e.target.value)}
                        className="w-full bg-neutral-50 dark:bg-white/[0.02] border border-neutral-300 dark:border-white/[0.08] rounded-xl p-3 text-xs font-bold focus:outline-none focus:border-[#D0011B] focus:ring-1 focus:ring-[#D0011B]/50 text-gray-900 dark:text-white transition-all placeholder:text-gray-400 dark:placeholder:text-white/20"
                      />
                    </div>
                  )}
                </div>

                <div className="border-t border-black/[0.06] dark:border-white/[0.06]" />

                {/* Estilo de câmera */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#D0011B] text-white flex items-center justify-center text-[10px] font-black">
                      3
                    </span>
                    <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                      Estilo de câmera
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {cameraStyles.map((cam) => {
                      const isSelected = selectedCamera === cam.id;
                      return (
                        <div
                          key={cam.id}
                          onClick={() => setSelectedCamera(cam.id)}
                          className={`p-3 rounded-xl cursor-pointer transition-all border flex flex-col gap-2.5 relative overflow-hidden ${
                            isSelected
                              ? 'border-[#D0011B] bg-[#D0011B]/[0.02]'
                              : 'border-neutral-200 dark:border-white/[0.06] bg-transparent hover:border-neutral-300 dark:hover:border-white/10'
                          }`}
                        >
                          <div className="aspect-[4/3] rounded-lg overflow-hidden border border-black/[0.08] bg-neutral-100 dark:bg-white/5">
                            <img
                              src={cam.image}
                              alt={cam.label}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="text-left">
                            <div className="text-xs font-bold text-gray-900 dark:text-white">
                              {cam.label}
                            </div>
                            <div className="text-[10px] text-gray-400 dark:text-white/40 mt-1 leading-normal font-medium">
                              {cam.desc}
                            </div>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#D0011B] flex items-center justify-center text-white text-[10px] font-bold">
                              ✓
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-black/[0.06] dark:border-white/[0.06]" />

                {/* Escolha o Influenciador */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-black/[0.04] dark:border-white/[0.04]">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#D0011B] text-white flex items-center justify-center text-[10px] font-black">
                        4
                      </span>
                      <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                        Escolha o Influenciador
                      </h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsRegisteringCustomAvatar(!isRegisteringCustomAvatar)}
                        className={`flex items-center gap-1.5 text-[11px] sm:text-xs font-bold transition-all px-3 py-1.5 sm:px-3 sm:py-2 rounded-lg border cursor-pointer ${
                          isRegisteringCustomAvatar 
                            ? 'bg-[#D0011B] border-[#D0011B] text-white' 
                            : 'bg-neutral-100 dark:bg-white/[0.04] border-neutral-200 dark:border-white/[0.08] text-neutral-700 dark:text-white/80 hover:bg-neutral-200 dark:hover:bg-white/[0.08]'
                        }`}
                      >
                        <Plus size={13} className="stroke-[2.5]" />
                        <span>Enviar Avatar</span>
                      </button>

                      <div className="flex items-center gap-1 bg-neutral-100 dark:bg-white/[0.04] p-1 rounded-lg border border-black/5 dark:border-white/[0.05]">
                        {(['Todos', 'Homens', 'Mulheres'] as const).map((genderTab) => (
                          <button
                            key={genderTab}
                            type="button"
                            onClick={() => setInfluencerGenderFilter(genderTab)}
                            className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                              influencerGenderFilter === genderTab
                                ? 'bg-[#D0011B] text-white shadow-sm'
                                : 'text-neutral-500 hover:text-black dark:hover:text-white'
                            }`}
                          >
                            {genderTab}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {isRegisteringCustomAvatar && (
                    <div className="p-4 rounded-xl border border-[#D0011B]/20 bg-[#D0011B]/[0.02] space-y-3.5 animate-fade-in my-3">
                      <h3 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                        <Upload className="text-[#D0011B]" size={14} />
                        Enviar Avatar Personalizado
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans">
                        {/* Name input */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-neutral-400 dark:text-white/40 uppercase tracking-wide block">
                            Nome do Avatar *
                          </label>
                          <input
                            type="text"
                            placeholder="Ex: Amanda, Gabriel..."
                            value={customAvatarName}
                            onChange={(e) => setCustomAvatarName(e.target.value)}
                            className="w-full bg-neutral-50 dark:bg-white/[0.02] border border-neutral-300 dark:border-white/[0.08] rounded-xl p-3 text-xs font-bold focus:outline-none focus:border-[#D0011B] focus:ring-1 focus:ring-[#D0011B]/40 text-gray-900 dark:text-white transition-all font-sans"
                          />
                        </div>

                        {/* Gender input */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-neutral-400 dark:text-white/40 uppercase tracking-wide block">
                            Gênero *
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {(['Homem', 'Mulher'] as const).map((genderOption) => {
                              const isSelected = customAvatarGender === genderOption;
                              return (
                                <button
                                  type="button"
                                  key={genderOption}
                                  onClick={() => setCustomAvatarGender(genderOption)}
                                  className={`py-2 px-1 text-[11px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                                    isSelected
                                      ? 'bg-[#D0011B] border-[#D0011B] text-white font-extrabold shadow-sm'
                                      : 'bg-neutral-50 dark:bg-white/[0.02] border-neutral-200 dark:border-white/[0.08] text-neutral-600 dark:text-white/70 hover:bg-neutral-100 dark:hover:bg-white/10'
                                  }`}
                                >
                                  {genderOption}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* File Upload / Image Link input */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-neutral-400 dark:text-white/40 uppercase tracking-wide block">
                            Ou URL da Imagem (Opcional)
                          </label>
                          <input
                            type="text"
                            placeholder="Link da imagem (opcional)"
                            value={customAvatarImage}
                            onChange={(e) => setCustomAvatarImage(e.target.value)}
                            className="w-full bg-neutral-50 dark:bg-white/[0.02] border border-neutral-300 dark:border-white/[0.08] rounded-xl p-3 text-xs font-bold focus:outline-none focus:border-[#D0011B] focus:ring-1 focus:ring-[#D0011B]/40 text-gray-900 dark:text-white transition-all font-sans"
                          />
                        </div>
                      </div>

                      {/* File Dropzone Area */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-neutral-400 dark:text-white/40 uppercase tracking-wide block">
                          Selecione / Arraste um arquivo de imagem (Recomendado):
                        </label>
                        <div 
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files?.[0];
                            if (file && file.type.startsWith('image/')) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                if (event.target?.result) {
                                  setCustomAvatarImage(event.target.result as string);
                                  onNotification("Imagem importada com sucesso! 📸");
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="border-2 border-dashed border-neutral-300 dark:border-white/15 hover:border-[#D0011B] dark:hover:border-[#D0011B] bg-neutral-50/50 dark:bg-white/[0.01] rounded-xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5"
                          onClick={() => {
                            const fileInput = document.createElement('input');
                            fileInput.type = 'file';
                            fileInput.accept = 'image/*';
                            fileInput.onchange = (e: any) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  if (event.target?.result) {
                                    setCustomAvatarImage(event.target.result as string);
                                    onNotification("Imagem selecionada com sucesso! 📸");
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            };
                            fileInput.click();
                          }}
                        >
                          {customAvatarImage ? (
                            <div className="flex items-center gap-3 justify-center">
                              <img src={customAvatarImage} className="w-12 h-12 rounded-full object-cover border border-neutral-200 dark:border-white/10" alt="Pre-visualização" />
                              <span className="text-[11px] text-green-500 font-bold">Imagem Carregada com sucesso! ✓</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center py-2">
                              <Upload size={18} className="text-[#D0011B] mb-1.5" />
                              <span className="text-xs font-bold text-neutral-600 dark:text-neutral-300">
                                Clique para escolher ou arraste uma foto aqui
                              </span>
                              <span className="text-[9px] text-neutral-400">Suporta JPG, PNG, WEBP</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex justify-end gap-2 pt-1 font-sans">
                        <button
                          type="button"
                          onClick={() => {
                            setIsRegisteringCustomAvatar(false);
                            setCustomAvatarName("");
                            setCustomAvatarImage("");
                          }}
                          className="text-neutral-500 font-bold px-4 py-2 hover:bg-neutral-100 dark:hover:bg-white/5 rounded-lg text-xs cursor-pointer"
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!customAvatarName.trim()) {
                              onNotification("⚠️ Insira o nome do avatar!");
                              return;
                            }
                            const finalImg = customAvatarImage.trim() || 'https://i.postimg.cc/N2YQk2GX/Full-body-portrait-of-a-202606111328-(2).jpg';
                            const newAvatar = {
                              id: `custom_${Date.now()}`,
                              nome: customAvatarName.trim(),
                              genero: customAvatarGender,
                              image: finalImg
                            };
                            const updatedList = [newAvatar, ...customAvatarsList];
                            setCustomAvatarsList(updatedList);
                            localStorage.setItem('shopspy_custom_avatars', JSON.stringify(updatedList));
                            setSelectedInfluencer(newAvatar);
                            setIsRegisteringCustomAvatar(false);
                            setCustomAvatarName("");
                            setCustomAvatarImage("");
                            onNotification(`Avatar próprio "${newAvatar.nome}" adicionado e selecionado! 🎉`);
                          }}
                          className="bg-[#D0011B] text-white font-bold px-5 py-2 hover:bg-[#D0011B]/95 rounded-lg text-xs cursor-pointer"
                        >
                          Cadastrar e Selecionar
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[420px] overflow-y-auto custom-scrollbar pr-1 py-1" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))' }}>
                    {allInfluencers
                      .filter((inf) => {
                        if (influencerGenderFilter === 'Homens') return inf.genero === 'Homem';
                        if (influencerGenderFilter === 'Mulheres') return inf.genero === 'Mulher';
                        return true;
                      })
                      .map((inf) => {
                        const isSelected = selectedInfluencer?.id === inf.id;
                        return (
                          <div
                            key={inf.id}
                            onClick={() => setSelectedInfluencer(inf)}
                            className={`p-3 rounded-2xl cursor-pointer transition-all duration-300 border flex flex-col gap-2.5 relative overflow-hidden select-none group/avatar ${
                              isSelected
                                ? 'border-[#D0011B]/80 bg-gradient-to-b from-[#D0011B]/[0.06] to-[#D0011B]/[0.01] shadow-[0_12px_24px_rgba(208,1,27,0.12)] scale-[1.03]'
                                : 'border-neutral-200/80 dark:border-white/[0.06] bg-neutral-50/20 dark:bg-white/[0.01] hover:bg-neutral-50/70 dark:hover:bg-white/[0.03] hover:border-neutral-300 dark:hover:border-white/15 shadow-sm hover:scale-[1.01]'
                            }`}
                          >
                            <div className="aspect-[3/4] rounded-xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-neutral-100 dark:bg-white/5 relative">
                              <img
                                src={inf.image}
                                alt={inf.nome}
                                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/avatar:scale-110"
                                referrerPolicy="no-referrer"
                                style={{ imageRendering: 'high-quality', objectPosition: 'top center' }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 pointer-events-none" />
                            </div>
                            <div className="text-center font-sans">
                              <div className="text-[12px] font-extrabold text-gray-900 dark:text-white truncate tracking-tight">
                                {inf.nome}
                              </div>
                              <div className="mt-1 flex justify-center">
                                <span className={`text-[9.5px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full ${
                                  inf.genero === 'Mulher'
                                    ? 'bg-rose-100/70 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400'
                                    : 'bg-indigo-100/70 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400'
                                }`}>
                                  {inf.genero}
                                </span>
                              </div>
                            </div>
                            {isSelected && (
                              <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#D0011B] flex items-center justify-center text-white text-[10px] font-bold shadow-[0_4px_12px_rgba(208,1,27,0.4)] border border-white/25">
                                ✓
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                  <button
                    onClick={handlePrevStep}
                    className="btn-custom !py-2.5 !px-5 !text-xs font-black tracking-wide relative overflow-hidden flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft size={13} />
                    <span>Anterior</span>
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="btn-custom !py-2.5 !px-6 !text-xs font-black tracking-wide relative overflow-hidden flex items-center gap-1.5"
                  >
                    <span>Próximo</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: CONFIGURAÇÕES E AJUSTES (DURAÇÃO, INSTRUÇÕES, ESTILO VISUAL, TIPO) */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-[14px] p-5 sm:p-6 space-y-7 shadow-lg"
              >
                {/* 1. Duração do vídeo */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#D0011B] text-white flex items-center justify-center text-[10px] font-black">
                      5
                    </span>
                    <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                      Duração do vídeo
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
                    {durations.map((du) => {
                      const isSelected = selectedDuration === du.value;
                      return (
                        <div
                          key={du.label}
                          onClick={() => setSelectedDuration(du.value)}
                          className={`p-3 rounded-lg cursor-pointer transition-all flex flex-col items-center justify-center text-center relative ${
                            isSelected
                              ? 'bg-[#D0011B] text-white border-transparent shadow-[0_4px_12px_rgba(208,1,27,0.2)]'
                              : 'bg-neutral-100 dark:bg-white/[0.04] text-neutral-600 dark:text-white/70 border border-neutral-200 dark:border-white/[0.08] hover:bg-neutral-200 dark:hover:bg-white/[0.08]'
                          }`}
                        >
                          <Film size={16} className={`mb-1 ${isSelected ? "text-white" : "text-[#D0011B]"}`} />
                          <span className="text-[11px] font-bold">
                            {du.label}
                          </span>
                          <span className={`text-[9px] ${isSelected ? "text-white/80" : "text-gray-400 dark:text-white/40"} font-medium`}>
                            {du.detail} ({du.value})
                          </span>
                          {isSelected && (
                            <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center text-[#D0011B] text-[8px] font-bold">
                              ✓
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-gray-400 dark:text-white/30 italic">
                    Cada take é uma cena estruturada. Mais takes = roteiro e prompt mais complexo e completo.
                  </p>
                </div>

                <div className="border-t border-black/[0.06] dark:border-white/[0.06]" />

                {/* 2. Instruções do Vídeo (Opcional) */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#D0011B] text-white flex items-center justify-center text-[10px] font-black">
                      6
                    </span>
                    <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                      Instruções do vídeo <span className="text-[11px] text-neutral-400 dark:text-white/30 font-normal py-0.5 px-2 bg-neutral-100 dark:bg-white/[0.04] rounded ml-1.5">Opcional</span>
                    </h2>
                  </div>

                  <div className="space-y-3">
                    <textarea
                      placeholder="Ex: Mostrar o produto sendo usado, falar sobre o benefício principal..."
                      value={instructionsText}
                      onChange={(e) => setInstructionsText(e.target.value)}
                      rows={4}
                      className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-black/10 dark:border-white/[0.08] rounded-xl p-4 text-xs font-bold focus:outline-none focus:border-[#D0011B] focus:ring-2 focus:ring-[#D0011B]/15 text-gray-900 dark:text-white transition-all placeholder:text-gray-400"
                    />

                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.04] space-y-2.5 font-sans">
                      <div className="text-[11px] font-extrabold text-[#D0011B] uppercase tracking-wider">
                        Exemplos
                      </div>
                      <ul className="text-xs space-y-2 text-gray-600 dark:text-neutral-400 font-bold">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D0011B]" />
                          <span>Mostrar o produto de perto</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D0011B]" />
                          <span>Falar o nome do produto</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D0011B]" />
                          <span>Demonstrar o uso</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D0011B]" />
                          <span>Citar o preço ou promoção</span>
                        </li>
                      </ul>
                      <div className="pt-2 border-t border-black/[0.05] dark:border-white/[0.05] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-sans">
                          A IA decide automaticamente o roteiro
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-black/[0.06] dark:border-white/[0.06]" />

                {/* 3. Estilo visual */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white">
                    Estilo visual
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {styles.map((st) => {
                      const isSelected = selectedStyle === st;
                      return (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setSelectedStyle(st)}
                          className={`px-3 py-2 rounded-lg text-xs font-bold tracking-tight transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#D0011B] text-white border-transparent shadow-[0_4px_12px_rgba(208,1,27,0.2)]'
                              : 'bg-neutral-100 dark:bg-white/[0.04] text-neutral-600 dark:text-white/70 border border-neutral-200 dark:border-white/[0.08] hover:bg-neutral-200 dark:hover:bg-white/[0.08]'
                          }`}
                        >
                          {st}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-black/[0.06] dark:border-white/[0.06]" />

                {/* 4. Tipo do Vídeo */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white">
                    Tipo do Vídeo
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {types.map((ty) => {
                      const isSelected = selectedType === ty;
                      return (
                        <button
                          key={ty}
                          type="button"
                          onClick={() => setSelectedType(ty)}
                          className={`px-3 py-2 rounded-lg text-xs font-bold tracking-tight transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#D0011B] text-white border-transparent shadow-[0_4px_12px_rgba(208,1,27,0.2)]'
                              : 'bg-neutral-100 dark:bg-white/[0.04] text-neutral-600 dark:text-white/70 border border-neutral-200 dark:border-white/[0.08] hover:bg-neutral-200 dark:hover:bg-white/[0.08]'
                          }`}
                        >
                          {ty}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                  <button
                    onClick={handlePrevStep}
                    className="btn-custom !py-2.5 !px-5 !text-xs font-black tracking-wide relative overflow-hidden flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft size={13} />
                    <span>Anterior</span>
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="btn-custom !py-2.5 !px-6 !text-xs font-black tracking-wide relative overflow-hidden flex items-center gap-1.5"
                  >
                    <span>Próximo</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: FALA E VOZ DO AVATAR */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-[14px] p-5 sm:p-6 space-y-7 shadow-lg"
              >
                {/* 7. Tom da fala */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#D0011B] text-white flex items-center justify-center text-[10px] font-black">
                      7
                    </span>
                    <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                      Tom da fala
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { value: 'Animado', detail: 'Energia alta, entusiasmado', icon: Flame },
                      { value: 'Calmo', detail: 'Tranquilo, confiante', icon: Smile },
                      { value: 'Urgente', detail: 'Senso de oportunidade', icon: Zap },
                      { value: 'Divertido', detail: 'Leve, bem-humorado', icon: Laugh }
                    ].map((toneObj) => {
                      const isSelected = selectedTone === toneObj.value;
                      const IconComp = toneObj.icon;
                      return (
                        <div
                          key={toneObj.value}
                          onClick={() => setSelectedTone(toneObj.value)}
                          className={`p-3 rounded-xl cursor-pointer transition-all flex flex-col items-center justify-center text-center gap-1.5 border relative ${
                            isSelected
                              ? 'bg-[#D0011B]/[0.03] border-[#D0011B] text-gray-900 dark:text-white shadow-sm'
                              : 'bg-neutral-50 dark:bg-white/[0.02] border-neutral-200 dark:border-white/[0.08] text-neutral-500 hover:border-neutral-300 dark:hover:border-white/10'
                          }`}
                        >
                          <IconComp size={18} className={isSelected ? "text-[#D0011B]" : "text-neutral-400"} />
                          <div>
                            <span className="text-[11px] font-bold block text-gray-900 dark:text-white">
                              {toneObj.value}
                            </span>
                            <span className="text-[9px] text-gray-400 dark:text-white/45 font-medium leading-tight">
                              {toneObj.detail}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#D0011B] flex items-center justify-center text-white text-[9px] font-bold">
                              ✓
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-black/[0.06] dark:border-white/[0.06]" />

                {/* 8. Tipo de voz */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#D0011B] text-white flex items-center justify-center text-[10px] font-black">
                      8
                    </span>
                    <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                      Tipo de voz
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    {[
                      { value: 'Feminina', icon: User },
                      { value: 'Masculina', icon: User }
                    ].map((voiceObj) => {
                      const isSelected = selectedVoiceType === voiceObj.value;
                      const IconComp = voiceObj.icon;
                      return (
                        <div
                          key={voiceObj.value}
                          onClick={() => setSelectedVoiceType(voiceObj.value)}
                          className={`p-4 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-3 border relative ${
                            isSelected
                              ? 'bg-[#D0011B]/[0.03] border-[#D0011B] text-gray-900 dark:text-white shadow-sm'
                              : 'bg-neutral-50 dark:bg-white/[0.02] border-neutral-200 dark:border-white/[0.08] text-neutral-500 hover:border-neutral-300 dark:hover:border-white/10'
                          }`}
                        >
                          <IconComp size={18} className={isSelected ? "text-[#D0011B]" : "text-neutral-400"} />
                          <span className="text-xs font-bold text-gray-900 dark:text-white">
                            {voiceObj.value}
                          </span>
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#D0011B] flex items-center justify-center text-white text-[9px] font-bold">
                              ✓
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-black/[0.06] dark:border-white/[0.06]" />

                {/* 9. Tonalidade */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#D0011B] text-white flex items-center justify-center text-[10px] font-black">
                      9
                    </span>
                    <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                      Tonalidade
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                    {[
                      { value: 'Grave', icon: Volume2 },
                      { value: 'Médio', icon: Volume1 },
                      { value: 'Agudo', icon: Bell },
                      { value: 'Doce', icon: Heart },
                      { value: 'Energético', icon: Zap },
                      { value: 'Sério', icon: Snowflake }
                    ].map((tonObj) => {
                      const isSelected = selectedTonality === tonObj.value;
                      const IconComp = tonObj.icon;
                      return (
                        <div
                          key={tonObj.value}
                          onClick={() => setSelectedTonality(tonObj.value)}
                          className={`p-3 rounded-xl cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 border text-center relative ${
                            isSelected
                              ? 'bg-[#D0011B]/[0.03] border-[#D0011B] text-gray-900 dark:text-white shadow-sm'
                              : 'bg-neutral-50 dark:bg-white/[0.02] border-neutral-200 dark:border-white/[0.08] text-neutral-500 hover:border-neutral-300 dark:hover:border-white/10'
                          }`}
                        >
                          <IconComp size={16} className={isSelected ? "text-[#D0011B]" : "text-neutral-400"} />
                          <span className="text-[11px] font-bold text-gray-900 dark:text-white">
                            {tonObj.value}
                          </span>
                          {isSelected && (
                            <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#D0011B] flex items-center justify-center text-white text-[8px] font-bold">
                              ✓
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-black/[0.06] dark:border-white/[0.06]" />

                {/* 10. Fala do avatar */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#D0011B] text-white flex items-center justify-center text-[10px] font-black">
                        10
                      </span>
                      <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                        <span>Fala do avatar</span>
                        <span className="text-[10px] py-0.5 px-2 font-normal rounded bg-neutral-100 dark:bg-white/[0.04] text-neutral-400">
                          Opcional
                        </span>
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={generateSpeechWithAI}
                      disabled={isGeneratingSpeech || !selectedProduct}
                      className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#D0011B] to-[#ff3333] hover:brightness-105 disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-all active:scale-95 shrink-0"
                    >
                      {isGeneratingSpeech ? (
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Sparkles size={13} className="animate-pulse" />
                      )}
                      <span>Gerar com IA</span>
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-semibold text-neutral-400 leading-tight block">
                      Deixe em branco para a IA criar automaticamente de acordo com as configurações especificadas.
                    </span>
                    <textarea
                      placeholder="Deixe em branco para a IA criar automaticamente..."
                      value={customSpeech}
                      onChange={(e) => setCustomSpeech(e.target.value)}
                      rows={4}
                      className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-black/10 dark:border-white/[0.08] rounded-xl p-4 text-xs font-bold focus:outline-none focus:border-[#D0011B] focus:ring-2 focus:ring-[#D0011B]/15 text-gray-900 dark:text-white transition-all placeholder:text-gray-400 dark:placeholder:text-white/20"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                  <button
                    onClick={handlePrevStep}
                    className="btn-custom !py-2.5 !px-5 !text-xs font-black tracking-wide relative overflow-hidden flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft size={13} />
                    <span>Anterior</span>
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="btn-custom !py-2.5 !px-6 !text-xs font-black tracking-wide relative overflow-hidden flex items-center gap-1.5"
                  >
                    <span>Próximo</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: REVISÃO */}
            {currentStep === 5 && selectedProduct && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-[14px] p-5 sm:p-6 space-y-5 shadow-lg animate-fade-in"
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                    Revisão — confira suas escolhas
                  </h2>
                </div>

                <div className="space-y-4 p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.04] text-xs">
                  
                  <div className="flex justify-between items-center py-2 border-b border-black/[0.05] dark:border-white/[0.05]">
                    <span className="font-semibold text-neutral-400">✦ Produto:</span>
                    <span className="font-bold text-gray-900 dark:text-white truncate max-w-[200px] sm:max-w-md">{selectedProduct.nome}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-black/[0.05] dark:border-white/[0.05]">
                    <span className="font-semibold text-neutral-400">✦ Cenário:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{actualScenario}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-black/[0.05] dark:border-white/[0.05]">
                    <span className="font-semibold text-neutral-400">✦ Câmera:</span>
                    <span className="font-bold text-gray-900 dark:text-white capitalize">{selectedCamera}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-black/[0.05] dark:border-white/[0.05]">
                    <span className="font-semibold text-neutral-400">✦ Influenciador:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{selectedInfluencer?.nome || 'Nenhum'}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-black/[0.05] dark:border-white/[0.05]">
                    <span className="font-semibold text-neutral-400">✦ Fala do avatar:</span>
                    <span className="font-bold text-gray-900 dark:text-white truncate max-w-[150px]" title={customSpeech}>
                      {customSpeech ? `"${customSpeech}"` : 'Decide automático'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-black/[0.05] dark:border-white/[0.05]">
                    <span className="font-semibold text-neutral-400">✦ Tom & Voz:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{selectedTone} ({selectedVoiceType} / {selectedTonality})</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-black/[0.05] dark:border-white/[0.05]">
                    <span className="font-semibold text-neutral-400">✦ Duração do vídeo:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{selectedDuration}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-black/[0.05] dark:border-white/[0.05]">
                    <span className="font-semibold text-neutral-400">✦ Estilo visual:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{selectedStyle}</span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-neutral-400">✦ Tipo de vídeo:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{selectedType}</span>
                  </div>

                </div>

                <div className="pt-2">
                  <button
                    onClick={handleStartGeneration}
                    className="btn-custom w-full cursor-pointer animate-pulse-custom !text-xs sm:!text-sm !py-3.5 !rounded-xl flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Zap size={15} />
                    <span>Gerar Prompt Creator Lab</span>
                  </button>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={handlePrevStep}
                    className="btn-custom !py-2.5 !px-5 !text-xs font-black tracking-wide relative overflow-hidden flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft size={13} />
                    <span>Anterior</span>
                  </button>
                  <div />
                </div>
              </motion.div>
            )}

            {/* STEP 6: RESULTADO (VIBRANT STACK) */}
            {currentStep === 6 && selectedProduct && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                
                {/* Result Indicator Header */}
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] shadow-md">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="text-green-500" size={20} />
                    <div>
                      <h2 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                        Material de Vídeo sintetizado
                      </h2>
                      <p className="text-[11px] text-gray-500 dark:text-white/40">
                        Copie o material e utilize-o no Google Flow VEO3
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentStep(1);
                    }}
                    className="border border-neutral-300 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-white/[0.04] text-neutral-700 dark:text-neutral-300 text-[11px] font-bold py-2 px-3.5 rounded-lg transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw size={12} />
                    <span>Nova Variação</span>
                  </button>
                </div>

                {/* 6.1: Criativo Visual Card */}
                <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-[124px] h-[124px] rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-sm bg-neutral-100 dark:bg-white/5 flex-shrink-0">
                    <img 
                      src={selectedProduct.imagem} 
                      alt={selectedProduct.nome} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 space-y-4 w-full">
                    <div>
                      <span className="text-[9px] font-black tracking-[0.1em] bg-blue-600/10 text-blue-500 px-2 py-1 rounded uppercase">
                        Criativo Visual
                      </span>
                      <h3 className="text-xs font-bold text-gray-900 dark:text-white mt-2 leading-tight">
                        {selectedProduct.nome}
                      </h3>
                      <p className="text-[10px] text-gray-500 dark:text-white/40 mt-1 leading-none font-semibold">
                        {selectedProduct.categoria} · {selectedProduct.preco}
                      </p>
                    </div>
                    
                    <button
                      onClick={downloadProductImage}
                      disabled={isDownloadingImage}
                      className="w-full sm:w-auto bg-[#D0011B] hover:bg-[#D0011B]/95 disabled:opacity-50 text-white font-bold py-2.5 px-6 rounded-full transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 text-xs shadow-lg shadow-[#D0011B]/20 cursor-pointer"
                    >
                      {isDownloadingImage ? (
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Download size={13} />
                      )}
                      <span>{isDownloadingImage ? 'Baixando...' : 'Baixar Imagem'}</span>
                    </button>
                  </div>
                </div>

                {/* 6.1b: Avatar Referência Card */}
                {selectedInfluencer && (
                  <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-[120px] h-[160px] rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-sm bg-neutral-100 dark:bg-white/5 flex-shrink-0">
                      <img 
                        src={selectedInfluencer.image} 
                        alt={selectedInfluencer.nome} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        style={{ imageRendering: 'high-quality', objectPosition: 'top center' }}
                      />
                    </div>
                    <div className="flex-1 space-y-4 w-full">
                      <div>
                        <span className="text-[9px] font-black tracking-[0.1em] bg-purple-600/10 text-purple-500 px-2 py-1 rounded uppercase">
                          Avatar / Influenciador de Referência
                        </span>
                        <h3 className="text-xs font-bold text-gray-900 dark:text-white mt-2 leading-tight">
                          {selectedInfluencer.nome}
                        </h3>
                        <p className="text-[10px] text-gray-500 dark:text-white/40 mt-1 leading-none font-semibold">
                          Gênero: {selectedInfluencer.genero} · Imagem de Referência para IA
                        </p>
                      </div>
                      
                      <button
                        onClick={handleDownloadAvatar}
                        className="w-full sm:w-auto bg-[#D0011B] hover:bg-[#D0011B]/95 text-white font-bold py-2.5 px-6 rounded-full transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 text-xs shadow-lg shadow-[#D0011B]/20 cursor-pointer"
                      >
                        <Download size={13} />
                        <span>Baixar Avatar</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* 6.1c: Prompt para Mesclar Imagens Card */}
                {selectedProduct && selectedInfluencer && (
                  <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-2xl p-5 shadow-lg space-y-4">
                    <span className="text-[9px] font-black tracking-[0.1em] bg-indigo-600/10 text-indigo-500 px-2 py-1 rounded uppercase">
                      Prompt para Mesclar Imagens (IA)
                    </span>
                    <div className="text-[11px] leading-relaxed text-gray-700 dark:text-white/80 bg-gray-50 dark:bg-[#0a0a0a] rounded-lg p-4 whitespace-pre-wrap border border-black/5 dark:border-white/5 font-mono">
                      {generateMergePrompt(selectedProduct.imagem, selectedInfluencer.image)}
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generateMergePrompt(selectedProduct.imagem, selectedInfluencer.image));
                        onNotification("Prompt de mesclagem copiado! 📋");
                      }}
                      className="btn-custom w-full !py-2.5 !px-5 !text-xs font-black tracking-wide relative overflow-hidden flex items-center justify-center gap-1.5"
                    >
                      <Copy size={13} />
                      <span>Copiar Prompt de Mescla</span>
                    </button>
                  </div>
                )}

                {/* 6.2: Google Flow Prompt Card */}
                <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-2xl p-5 shadow-lg space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-black tracking-[0.1em] bg-red-600/10 text-[#D0011B] px-2 py-1 rounded uppercase">
                      Prompt Gerado
                    </span>
                    <button 
                      onClick={() => setIsPromptExpanded(!isPromptExpanded)}
                      className="text-[11px] text-gray-400 hover:text-gray-600 dark:hover:text-white/80 font-bold cursor-pointer"
                    >
                      {isPromptExpanded ? 'Recolher' : 'Expandir'}
                    </button>
                  </div>

                  {isPromptExpanded && (
                    <div className="space-y-4">
                      <div className="text-[12px] leading-relaxed text-gray-700 dark:text-white/80 bg-gray-50 dark:bg-[#0a0a0a] rounded-lg p-4 whitespace-pre-wrap max-h-[300px] overflow-y-auto custom-scrollbar border border-black/5 dark:border-white/5 font-mono">
                        {generateVideoPrompt(
                          selectedProduct,
                          actualScenario,
                          selectedDuration,
                          selectedStyle,
                          selectedType,
                          instructionsText,
                          selectedCamera,
                          selectedInfluencer,
                          customSpeech,
                          selectedTone,
                          selectedVoiceType,
                          selectedTonality
                        )}
                      </div>
                      
                      <div className="pt-1">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(generateVideoPrompt(
                              selectedProduct,
                              actualScenario,
                              selectedDuration,
                              selectedStyle,
                              selectedType,
                              instructionsText,
                              selectedCamera,
                              selectedInfluencer,
                              customSpeech,
                              selectedTone,
                              selectedVoiceType,
                              selectedTonality
                            ));
                            onNotification("Prompt copiado para a área de transferência! 📋");
                          }}
                          className="btn-custom w-full !py-2.5 !px-5 !text-xs font-black tracking-wide relative overflow-hidden flex items-center justify-center gap-1.5"
                        >
                          <Copy size={13} />
                          <span>Copiar Prompt</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 6.3: Descrição do Produto + Hashtags Card */}
                <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-2xl p-5 shadow-lg space-y-6">
                  
                  {/* Descrição do produto */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black tracking-[0.1em] bg-[#D0011B]/10 text-[#D0011B] dark:text-[#ff4444] px-2 py-1 rounded uppercase">
                          Descrição do Produto
                        </span>
                        <span className="text-[10px] font-bold text-gray-500 dark:text-white/50">
                          (Variação {copyVariationIndex + 1}/12)
                        </span>
                      </div>
                      <CopyButton value={generateCopy(selectedProduct, copyVariationIndex)} size={11} />
                    </div>
                    <div className="text-[12px] leading-relaxed text-gray-700 dark:text-white/80 bg-gray-50 dark:bg-[#0a0a0a] rounded-lg p-4 whitespace-pre-wrap max-h-[160px] overflow-y-auto custom-scrollbar border border-black/5 dark:border-white/5 font-semibold">
                      {generateCopy(selectedProduct, copyVariationIndex)}
                    </div>
                    <div className="pt-1 flex justify-end">
                      <button
                        onClick={() => {
                          const nextIdx = (copyVariationIndex + 1) % 12;
                          setCopyVariationIndex(nextIdx);
                          onNotification(`Gerada Variação ${nextIdx + 1}! ⚡`);
                        }}
                        className="btn-custom !py-2 !px-4.5 !text-xs font-black tracking-wide relative overflow-hidden flex items-center gap-1.5"
                      >
                        🔄 Nova variação
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-black/[0.06] dark:border-white/[0.06] my-2" />

                  {/* Hashtags recomendadas */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-black tracking-[0.1em] bg-neutral-200 dark:bg-white/[0.08] text-neutral-500 dark:text-white/60 px-2 py-1 rounded uppercase">
                        Hashtags recomendadas
                      </span>
                      <CopyButton value={generateHashtags(selectedProduct.categoria, selectedProduct.nome)} size={11} />
                    </div>
                    <div className="text-[12px] leading-relaxed text-[#D0011B] dark:text-[#ff4444] font-bold bg-neutral-50 dark:bg-neutral-900/50 rounded-lg p-4 whitespace-pre-wrap custom-scrollbar border border-black/5 dark:border-white/5">
                      {generateHashtags(selectedProduct.categoria, selectedProduct.nome)}
                    </div>
                  </div>

                </div>

                {/* 6.4: Crie o Vídeo com IA Card */}
                <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-neutral-800/80 rounded-2xl p-6 text-gray-900 dark:text-white space-y-5 shadow-lg">
                  <div className="flex gap-2.5 items-start">
                    <Sparkles className="text-[#D0011B] mt-0.5 shrink-0" size={16} />
                    <div className="space-y-0.5">
                      <h3 className="text-sm font-black text-gray-900 dark:text-white">Crie o Vídeo com IA</h3>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">Cole o prompt gerado no Google Flow VEO3 para criar seu vídeo</p>
                    </div>
                  </div>

                  <button
                    onClick={() => window.open('https://labs.google/fx/pt/tools/flow', '_blank')}
                    className="max-w-[260px] w-full mx-auto bg-neutral-50 dark:bg-[#18181a] border border-black/5 dark:border-neutral-800/60 hover:bg-neutral-100 dark:hover:bg-[#202025] rounded-xl py-3 px-4 flex items-center justify-center text-center transition-all active:scale-[0.99] group cursor-pointer"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-xl bg-[#D0011B]/10 border border-[#D0011B]/15 flex items-center justify-center text-[#D0011B] mb-2 shrink-0">
                        <Tv size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-[#D0011B] dark:group-hover:text-[#ff4444] transition-colors flex items-center gap-1 justify-center">
                          <span>Flow VEO3</span>
                          <ExternalLink size={11} className="text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                        </h4>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium leading-tight">Gera vídeos de alta qualidade com IA</p>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Return/Reset configuration button */}
                <button
                  onClick={() => {
                    setCurrentStep(1);
                  }}
                  className="btn-custom w-full !py-3 !px-5 !text-xs font-black tracking-wide relative overflow-hidden flex items-center justify-center gap-2 cursor-pointer"
                >
                  Voltar e ajustar configurações
                </button>

              </motion.div>
            )}

          </AnimatePresence>
        )}

      </div>

      {/* SELECT PRODUCT MODAL */}
      <AnimatePresence>
        {isSelectProductModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-[#111111] border border-black/15 dark:border-white/[0.08] w-full max-w-xl rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-black/5 dark:border-white/[0.05]">
                <div className="flex items-center gap-2 text-[#D0011B]">
                  <Flame size={18} className="animate-pulse text-[#D0011B]" />
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    Selecionar de Produtos Virais
                  </h3>
                </div>
                <button
                  onClick={() => setIsSelectProductModalOpen(false)}
                  className="p-1.5 rounded-lg bg-neutral-100 dark:bg-white/5 text-neutral-500 hover:text-black dark:hover:text-white cursor-pointer transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Product search box */}
              <div className="p-4 overflow-y-auto custom-scrollbar flex-1 space-y-2.5">
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-2">
                  Escolha um dos {products.length} produtos de alta conversão:
                </p>
                <div className="grid grid-cols-1 gap-2.5">
                  {favoritedProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-black/5 dark:border-white/5 rounded-2xl bg-neutral-50/50 dark:bg-white/[0.01]">
                      <Heart size={32} className="text-gray-300 dark:text-white/10 mb-3" />
                      <p className="text-xs font-bold text-gray-400 dark:text-white/30 text-center">
                        Você ainda não tem produtos favoritos.
                      </p>
                    </div>
                  ) : filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-gray-400 dark:text-white/30 font-bold text-xs">
                      Nenhum favorito encontrado para "{searchProductQuery}"
                    </div>
                  ) : (
                    filteredProducts.map((p) => {
                      const isSelected = selectedProduct?.id === p.id;
                      return (
                        <div
                          key={p.id}
                          onClick={() => {
                            setSelectedProduct(p);
                            setIsSelectProductModalOpen(false);
                            onNotification(`Produto "${p.nome}" selecionado! 📦`);
                          }}
                          className={`p-3 rounded-xl cursor-pointer transition-all border flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'border-[#D0011B] bg-[#D0011B]/[0.05]'
                              : 'border-neutral-200 dark:border-white/[0.04] bg-neutral-50/50 dark:bg-white/[0.01] hover:border-neutral-300 dark:hover:border-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-[48px] h-[48px] rounded-lg overflow-hidden flex-shrink-0 border border-black/5">
                              <img
                                src={p.imagem}
                                alt={p.nome}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                                {p.nome}
                              </h4>
                              <p className="text-[10px] text-gray-400 dark:text-white/40 mt-1 font-semibold uppercase tracking-wider">
                                Categoria: {p.categoria}
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-[11px] font-black text-[#D0011B]">
                              {p.preco}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
