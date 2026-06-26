import React, { useState, useMemo } from 'react';
import { 
  Play, 
  Check, 
  Sparkles, 
  User, 
  Compass, 
  Copy, 
  Download, 
  ExternalLink,
  ChevronLeft,
  Search,
  Hash,
  ShoppingBag,
  Flame,
  Award,
  Video,
  ArrowRight,
  RefreshCw,
  Film,
  Camera,
  Layers,
  MapPin,
  CheckCircle2,
  TrendingUp,
  Sliders,
  Sparkle,
  RotateCcw,
  Tv,
  Heart,
  ImagePlus,
  Type
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { products as initialProducts } from '../data/products';
import { Product } from '../types';
import { CopyButton } from './ui/CopyButton';
import { ErrorBoundary } from './ui/ErrorBoundary';

interface VideoTemplatesProps {
  onNotification: (msg: string) => void;
  selectedDefaultProduct?: Product | null;
}

interface Template {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  fallbackUrl: string;
  specs: string[];
}

interface Avatar {
  id: string;
  nome: string;
  genero: 'Homem' | 'Mulher';
  image: string;
  description: string;
  style: string;
}

interface Scenario {
  id: string;
  name: string;
  description: string;
}

export default function VideoTemplates(props: VideoTemplatesProps) {
  return (
    <ErrorBoundary>
      <VideoTemplatesInternal {...props} />
    </ErrorBoundary>
  );
}

function VideoTemplatesInternal({ onNotification, selectedDefaultProduct }: VideoTemplatesProps) {
  // Templates configuration
  const templates: Template[] = [
    {
      id: 'frente-corpo-todo',
      title: 'Frente Corpo Todo',
      description: 'Modelo de corpo inteiro apresentando a peça de frente. Ideal para vestuário, caimento e look completo.',
      videoUrl: 'https://i.imgur.com/qTKNFk7.mp4',
      fallbackUrl: 'https://i.imgur.com/qTKNFk7.png',
      specs: ['Enquadramento 9:16 vertical completo', 'Apresentação frontal', 'Demonstração de caimento real']
    },
    {
      id: 'de-perfil',
      title: 'De Perfil (Sefil)',
      description: 'Ângulo lateral e rotação parcial. Perfeito para evidenciar silhueta, detalhes de costura e design.',
      videoUrl: 'https://i.imgur.com/pzAZvyD.mp4',
      fallbackUrl: 'https://i.imgur.com/pzAZvyD.png',
      specs: ['Foco em costuras e curvas', 'Giro em câmera lenta', 'Detalhes tridimensionais do produto']
    },
    {
      id: 'frente-com-as-maos',
      title: 'Frente com as Mãos',
      description: 'Foco de meia-distância com interação manual ativa. Ideal para cosméticos, embalagens, joias e toques detalhados.',
      videoUrl: 'https://i.imgur.com/vxLQjge.mp4',
      fallbackUrl: 'https://i.imgur.com/vxLQjge.png',
      specs: ['Close-up nas mãos da modelo', 'Demonstração activa de textura/toque', 'Gesto explicativo e dinâmico']
    }
  ];

  // Avatars data synced perfectly with FindGroup.tsx influencers list (with premium photo assets)
  const avatars: Avatar[] = [
    { id: 'f1', nome: 'Ana', genero: 'Mulher', image: 'https://i.postimg.cc/N2YQk2GX/Full-body-portrait-of-a-202606111328-(2).jpg', description: 'Visual blogueira de e-commerce e moda casual', style: 'Chic Brazilian female influencer, stylish outfit, high-end content creator, bright smile' },
    { id: 'f2', nome: 'Julia', genero: 'Mulher', image: 'https://i.postimg.cc/9wVcYwXm/Full-body-portrait-of-a-202606111328-(4).jpg', description: 'Modelo jovem e elegante de postura refinada', style: 'Elegant Brazilian female model, chique style, professional studio look' },
    { id: 'f3', nome: 'Camila', genero: 'Mulher', image: 'https://i.postimg.cc/RJ9vLJCZ/Full-body-portrait-of-a-202606111328-(5).jpg', description: 'Estilo fitness, dinâmico e enérgico', style: 'Enthusiastic female model in sports attire, active vibe, energetic presentation' },
    { id: 'f4', nome: 'Bruna', genero: 'Mulher', image: 'https://i.postimg.cc/bD1zn9hB/Full-body-portrait-of-a-202606111328-(7).jpg', description: 'Delicada, ideal para cosméticos e estética', style: 'Natural beauty female model, clean look, focused on detailed skin care routine' },
    { id: 'f5', nome: 'Fernanda', genero: 'Mulher', image: 'https://i.postimg.cc/tn5pSR7N/Full-body-portrait-of-an-202606111328.jpg', description: 'Estilo contemporâneo de alto impacto', style: 'Confident business casual female model, modern look, engaging friendly presence' },
    { id: 'h1', nome: 'Lucas', genero: 'Homem', image: 'https://i.postimg.cc/Pv4T3fNK/Full-body-portrait-of-a-202606111328.jpg', description: 'Jovem comunicativo, estilo casual moderno', style: 'Trendy young Brazilian man, stylish casual streetwear, talking confidently to camera' },
    { id: 'h2', nome: 'Pedro', genero: 'Homem', image: 'https://i.postimg.cc/RJR4sCqQ/Full-body-portrait-of-a-202606111328-(1).jpg', description: 'Modelo jovem com visual carismático e simpático', style: 'Friendly smiling young man, relaxed look, natural gestures, professional studio' },
    { id: 'h3', nome: 'Gabriel', genero: 'Homem', image: 'https://i.postimg.cc/LgRm3g44/Full-body-portrait-of-a-202606111328-(3).jpg', description: 'Estilo tecnológico, entusiasta e expressivo', style: 'Tech-savvy young model, highly expressive, high energy presentation style' },
    { id: 'h4', nome: 'Rafael', genero: 'Homem', image: 'https://i.postimg.cc/p5xPJ5VP/Full-body-portrait-of-a-202606111328-(6).jpg', description: 'Estética fitness e esportiva contemporânea', style: 'Athletic build male model, friendly supportive smile, clean studio layout' }
  ];

  // Scenarios data
  const scenarios: Scenario[] = [
    { id: 'quarto-moderno', name: 'Quarto Moderno Decorado', description: 'Fundo doméstico aconchegante com iluminação suave em LED quente e decorações minimalistas.' },
    { id: 'estudio-minimalista', name: 'Estúdio Minimalista Clean', description: 'Fundo infinito neutro e claro, estética industrial de alto luxo e excelente difusão de luz.' },
    { id: 'rua-urbana', name: 'Ambiente Urbano / Ao Ar Livre', description: 'Cenário externo realista com desfoque de fundo (bokeh), luz solar natural e vibes de rua alegre.' },
    { id: 'sala-luxuosa', name: 'Sala de Estar Sofisticada', description: 'Mobiliário escandinavo moderno, cortinas finas e plantas ornamentais estéticas.' },
    { id: 'closet-chique', name: 'Espelho do Closet Elegante', description: 'Foco moderno de provador com iluminação frontal tipo estúdio, espelhos e armários organizados.' },
    { id: 'personalized', name: 'Personalizado', description: 'Escreva seu próprio cenário detalhado para o vídeo.' }
  ];

  // State Management
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [step, setStep] = useState<'selection' | 'config' | 'result'>('selection');
  const [configStep, setConfigStep] = useState<1 | 2 | 3 | 4>(1);
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [runtimeError, setRuntimeError] = useState<string | null>(null);
  
  const [searchProductQuery, setSearchProductQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [customScenarioText, setCustomScenarioText] = useState('');
  const [genderFilter, setGenderFilter] = useState<'Todos' | 'Homem' | 'Mulher'>('Todos');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloadingImage, setIsDownloadingImage] = useState(false);
  const [isDownloadingAvatar, setIsDownloadingAvatar] = useState(false);
  const [isPromptExpanded, setIsPromptExpanded] = useState(true);
  const [isCustomProductMode, setIsCustomProductMode] = useState(false);
  const [customProductImage, setCustomProductImage] = useState<string | null>(null);

  // New IA Speech States
  const [speechText, setSpeechText] = useState('');
  const [isGeneratingSpeech, setIsGeneratingSpeech] = useState(false);

  // Safe product selection handler
  const handleSelectProduct = (product: Product) => {
    try {
      setSelectedProduct(product);
      setIsCustomProductMode(false);
      setCustomProductImage(null);
      setStep('config');
      setConfigStep(1);
    } catch (err) {
      console.error('Erro ao selecionar produto:', err);
      setRuntimeError('Erro ao selecionar produto. Tente novamente.');
    }
  };

  // Safe avatar selection handler
  const handleSelectAvatar = (avatar: Avatar) => {
    try {
      setSelectedAvatar(avatar);
    } catch (err) {
      console.error('Erro ao selecionar avatar:', err);
      setRuntimeError('Erro ao selecionar avatar. Tente novamente.');
    }
  };

  // FAVORITOS + BUSCA logic
  const getFavoritedProducts = (): Product[] => {
    try {
      const favIds = JSON.parse(localStorage.getItem('shopspy_favorites') || '[]');
      return initialProducts.filter(p => favIds.includes(p.id));
    } catch {
      return [];
    }
  };

  const favoritedProducts = getFavoritedProducts();

  const filteredProducts = useMemo(() => {
    return favoritedProducts.filter(p => 
      p.nome.toLowerCase().includes(searchProductQuery.toLowerCase()) ||
      p.categoria.toLowerCase().includes(searchProductQuery.toLowerCase())
    );
  }, [searchProductQuery, favoritedProducts]);

  // Filter avatars based on gender selection
  const filteredAvatars = useMemo(() => {
    if (genderFilter === 'Todos') return avatars;
    const filtered = avatars.filter(av => av.genero === genderFilter);
    return filtered;
  }, [genderFilter]);

  // Handle template selection
  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setConfigStep(1);
    setStep('config');
  };

  // Render sequential sub-step indicator (Matches Criar UGC visual stepper style)
  const renderStepper = () => {
    const stepsList = [
      { id: 1, label: 'Produto' },
      { id: 2, label: 'Modelo/Avatar' },
      { id: 3, label: 'Cenário' },
      { id: 4, label: 'Voz da IA' }
    ];

    return (
      <div className="flex items-center justify-center gap-1.5 sm:gap-4 py-4 px-2 select-none overflow-x-auto no-scrollbar scroll-smooth">
        {stepsList.map((st, idx) => {
          const isActive = configStep === st.id;
          const isCompleted = configStep > st.id;
          
          return (
            <React.Fragment key={st.id}>
              {idx > 0 && (
                <div 
                  className={`h-0.5 min-w-[12px] sm:min-w-[24px] md:w-10 rounded transition-colors duration-300 flex-shrink-0 ${
                    configStep >= st.id ? 'bg-[#D0011B]' : 'bg-neutral-200 dark:bg-white/[0.08]'
                  }`} 
                />
              )}
              <div 
                onClick={() => {
                  if (st.id === 1 || selectedProduct) {
                    setConfigStep(st.id as 1 | 2 | 3 | 4);
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

  // Direct image downloader helper functions
  const downloadProductImage = async () => {
    if (!selectedProduct) return;
    const filename = `${selectedProduct.nome.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`;
    try {
      setIsDownloadingImage(true);
      onNotification("Iniciando download da imagem...");
      
      const imageUrl = selectedProduct.imagem;
      
      if (imageUrl.startsWith('data:')) {
        const a = document.createElement('a');
        a.href = imageUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        onNotification("Imagem do criativo salva com sucesso! 📸");
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
      onNotification("Imagem do criativo salva com sucesso! 📸");
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
        onNotification("Imagem do criativo salva com sucesso! 📸");
      } catch (proxyErr) {
        console.warn("CORS proxy download failed too, using tab fallback:", proxyErr);
        // Fallback direct download in new tab
        const a = document.createElement('a');
        a.href = selectedProduct.imagem;
        a.target = '_blank';
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        onNotification("Download iniciado em aba adicional.");
      }
    } finally {
      setIsDownloadingImage(false);
    }
  };

  const downloadAvatarImage = async () => {
    if (!selectedAvatar) return;
    try {
      setIsDownloadingAvatar(true);
      onNotification("Iniciando download do avatar...");
      
      const imageUrl = selectedAvatar.image;
      const filename = `avatar_${selectedAvatar.nome.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`;

      const response = await fetch(imageUrl, { mode: 'cors' });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      onNotification("Avatar salvo com sucesso! 📸");
    } catch {
      onNotification("Download alternativo iniciado em nova aba...");
      window.open(selectedAvatar.image, '_blank');
    } finally {
      setIsDownloadingAvatar(false);
    }
  };

  // Generate Prompt & hashtags
  const generatedData = useMemo(() => {
    if (!selectedTemplate || !selectedProduct) return { englishPrompt: '' };

    const cleanProductName = selectedProduct.nome || 'Produto';
    const shortCategory = selectedProduct.categoria || 'Geral';
    const avatarNome = selectedAvatar?.nome || 'Modelo';
    const avatarStyle = selectedAvatar?.style || 'Professional model, stylish outfit';
    const avatarGenero = selectedAvatar?.genero || 'model';

    let templateEnglishDesc = '';
    if (selectedTemplate.id === 'frente-corpo-todo') {
      templateEnglishDesc = '9:16 aesthetic full body showcase shot, directly facing the camera. The model is standing proudly and showcasing the product with detailed physical gestures';
    } else if (selectedTemplate.id === 'de-perfil') {
      templateEnglishDesc = '9:16 lateral portrait shot, rotating smoothly and elegantly to show exquisite stitchings, design traits, and premium product lines';
    } else {
      templateEnglishDesc = '9:16 high visual dynamic micro close-up shot focusing on hands interacting, unboxing or touching the product lovingly with detailed focus';
    }

    const engPrompt = `=== SHOPEE UGC VIDEO GENERATION PROMPT FOR GOOGLE FLOW VEO3 ===

[SHOT TYPE & COMPOSITION]:
- Format: 9:16 high-conversion vertical video optimized for Shopee Video, TikTok, and Instagram Reels.
- Camera Style & Movement: ${selectedTemplate.title} (${selectedTemplate.description}). ${templateEnglishDesc}. Beautiful slow-motion panning, ultra-smooth transition, high organic engagement look.
- Resolution & Quality: Real-world photorealistic 8K UHD, premium commercial cinematic grading, studio-caliber rendering, 60fps luxury look.

[MODEL / AVATAR PRESENTATION]:
- Name & Tone: ${avatarNome}.
- Style Description: ${avatarStyle}.
- Visuals: Perfect symmetrical facial features, neat modern styling, highly expressive talking-to-camera presentation, charismatic and welcoming smile, natural fluid body gestures.

[ENVIRONMENT & SCENARIO]:
- Scene setting: ${selectedScenario?.id === 'personalized' ? 'Custom Scenario' : (selectedScenario?.name || 'Studio')}. Detailed description: ${selectedScenario?.id === 'personalized' ? customScenarioText : (selectedScenario?.description || 'Clean studio background')}.
- Lighting: Professional studio key lights, soft ambient fill, warm rim lighting accents, gorgeous realistic background bokeh, accurate soft shadows.

[PRODUCT INTEGRATION & SALES CTAs]:
- Target Product: "${cleanProductName}"
- Product Category: "${shortCategory}" (Product Price: ${selectedProduct.preco})
- Interaction: The model explicitly holds, rotates, and demonstrates the features of "${cleanProductName}" with great happiness and confidence, ensuring the product's details and label are readable and look pristine under the camera focus.`;

    const productDescription = `🌟 NOVIDADE! 🌟\n\nConfira o(a) ${cleanProductName} que acaba de chegar! 🚀\n\n✅ Alta Qualidade\n✅ Design Moderno\n✅ Melhor Custo-Benefício\n\nGaranta o seu agora! 🛍️\n\n#Shopee #UGC #Criativo #Marketing #Vendas`;

    const mergePrompt = `You have two separate images that need to be merged into one seamless professional photo:

IMAGE A: A product photo of "${cleanProductName}"
IMAGE B: A full body photo of a person (${avatarGenero} named ${avatarNome})

MERGE TASK:
Place the person from Image B naturally holding, wearing or interacting with the product from Image A.

TECHNICAL INSTRUCTIONS:
- Extract the person from Image B using precise masking
- Extract the product from Image A
- Composite them together in a natural pose
- Match the lighting direction and color temperature of both images
- Add realistic shadows under the product where the hands touch it
- Blend edges smoothly — no harsh cutouts visible
- Keep the background from Image B
- The product must be sharp and clearly visible
- Final result should look like one single professional photograph taken in the same moment

QUALITY: Commercial photography standard, ready for social media advertising.
OUTPUT FORMAT: Single JPG image, 9:16 aspect ratio.`;

    return {
      englishPrompt: engPrompt,
      productDescription: productDescription,
      mergePrompt: mergePrompt
    };
  }, [selectedTemplate, selectedProduct, selectedAvatar, selectedScenario, customScenarioText]);

  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onNotification(`Copiado: ${label}!`);
  };

  const handleGenerateSpeech = () => {
    if (!selectedProduct) {
      onNotification("⚠️ Selecione um produto primeiro!");
      return;
    }
    const speech = `Olha que fantástico esse ${selectedProduct.nome}! De ${selectedProduct.precoOriginal} por apenas ${selectedProduct.preco}! É a sua chance de garantir um item de ${selectedProduct.categoria} com qualidade Premium. Já são mais de ${selectedProduct.vendas} vendidos! Acesse agora pelo link!`;
    setSpeechText(speech);
    onNotification("Fala gerada com sucesso! ⚡");
  };

  // Start prompt generation process
  const handleGeneratePrompt = () => {
    setIsLoading(true);
    setLoaderProgress(0);
    
    const duration = 2500; // 2.5 seconds Simulation
    const startTimestamp = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimestamp;
      const progressPercent = Math.min(Math.floor((elapsed / duration) * 105), 100);
      setLoaderProgress(progressPercent);
      
      if (progressPercent >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          setStep('result');
          onNotification('Prompt estruturado com sucesso! ⚡');
        }, 150);
      }
    }, 40);
  };

  return (
    <div className="flex-1 w-full max-w-[1240px] mx-auto px-4 py-6 md:py-8 select-none transition-colors duration-300">
      {/* Error boundary UI */}
      {runtimeError && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center justify-between gap-3">
          <span className="text-xs font-bold text-red-600 dark:text-red-400">{runtimeError}</span>
          <button onClick={() => setRuntimeError(null)} className="text-red-400 hover:text-red-600 text-xs font-black px-2 py-1 rounded">✕ Fechar</button>
        </div>
      )}
      
      {/* Dynamic Header */}
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/5 dark:border-white/[0.06] pb-5">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-black bg-rose-500/10 text-[#D0011B] px-2.5 py-1 rounded-md mb-2 inline-block">
            Estúdio UGC - Flow
          </span>
          <h2 className="text-2xl md:text-3xl font-black gradient-title tracking-tight flex items-center gap-2">
            Templates de Vídeo <Video className="text-[#D0011B]" size={24} />
          </h2>
          <p className="text-xs md:text-sm text-gray-500 dark:text-white/45 mt-1 leading-normal">
            Selecione um formato de gravação ultra-conversivo para gerar o prompt perfeito e acelerar suas postagens no Shopee Vídeo.
          </p>
        </div>
        
        {step !== 'selection' && (
          <button 
            onClick={() => setStep(step === 'result' ? 'config' : 'selection')}
            className="flex items-center gap-1.5 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-white/[0.05] rounded-xl border border-black/5 dark:border-white/[0.08] text-xs font-bold text-gray-700 dark:text-white/80 cursor-pointer transition-all self-start md:self-auto"
          >
            <ChevronLeft size={16} /> Voltar
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        
        {/* STEP 1: Video Format Templates Selection Grid */}
        {step === 'selection' && (
          <motion.div
            key="step-selection"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {templates.map((tpl) => (
              <div 
                key={tpl.id}
                className="flex flex-col bg-white dark:bg-[#111111] rounded-2xl border border-black/5 dark:border-white/[0.08] overflow-hidden shadow-xs dark:shadow-none hover:border-[#D0011B]/40 dark:hover:border-white/20 transition-all duration-300 group"
              >
                {/* 9:16 Video Player Container */}
                <div className="relative aspect-[9/16] w-full bg-black/95 flex flex-col justify-between overflow-hidden cursor-pointer">
                  {/* Glowing Overlay */}
                  <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 pointer-events-none" />
                  
                  {/* Floating Specs Badges */}
                  <div className="absolute top-3 left-4 right-4 z-20 flex flex-wrap gap-1.5 pointer-events-none">
                    <span className="text-[9px] font-black uppercase tracking-wider bg-[#D0011B] text-white px-2 py-1 rounded shadow-xs">
                      Formato 9:16
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-wider bg-black/60 backdrop-blur-md text-white/95 px-2 py-1 rounded shadow-xs">
                      Ideal para Reels/TikTok
                    </span>
                  </div>

                  {/* HTML5 Loops Video */}
                  <video 
                    src={tpl.videoUrl}
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover select-none pointer-events-none filter brightness-[0.88]"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback visual indicator if video network loading times out
                      const container = e.currentTarget.parentElement;
                      if (container) {
                        e.currentTarget.style.display = 'none';
                        const fallbackImg = document.createElement('img');
                        fallbackImg.src = tpl.fallbackUrl;
                        fallbackImg.className = 'w-full h-full object-cover filter brightness-90 animate-pulse';
                        container.appendChild(fallbackImg);
                      }
                    }}
                  />

                  {/* Format details summary inside overlay bottom */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
                    <h3 className="text-base font-black text-white tracking-tight flex items-center gap-1.5">
                      <Film size={16} className="text-[#D0011B]" />
                      {tpl.title}
                    </h3>
                    <p className="text-[11px] text-white/75 line-clamp-2 mt-1 leading-normal">{tpl.description}</p>
                  </div>
                </div>

                {/* Specs or Highlights list details */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-5 border-t border-black/5 dark:border-white/[0.04]">
                  <div className="space-y-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#D0011B] dark:text-[#ff4444] flex items-center gap-1">
                      <Sliders size={12} /> Recursos do Formato:
                    </p>
                    <ul className="space-y-1.5">
                      {tpl.specs.map((item, index) => (
                        <li key={index} className="text-xs text-gray-600 dark:text-white/50 flex items-start gap-1.5 leading-tight">
                          <CheckCircle2 size={13} className="text-[#D0011B] mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button inside card footer - Styled identically to landing page button */}
                  <button 
                    onClick={() => handleSelectTemplate(tpl)}
                    className="btn-custom w-full select-none !text-xs sm:!text-sm !py-3 !rounded-xl cursor-pointer"
                  >
                    <span>Usar Template</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* STEP 2: UGC Configuration Wizard */}
        {step === 'config' && selectedTemplate && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Template Header Card */}
            {!isLoading && (
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="inline-flex items-center gap-1 bg-[#D0011B] text-white text-[9px] uppercase font-black px-2.5 py-1 rounded-full shadow-sm tracking-wide">
                    Template: {selectedTemplate.title}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-white/50">
                  {selectedTemplate.description}
                </p>
              </div>
            )}

            {/* Stepper Header */}
            {!isLoading && renderStepper()}

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

            {!isLoading && (
              <AnimatePresence mode="wait">
                
                {/* SUB-STEP 1: PRODUCT SELECTION */}
                {configStep === 1 && (
                  <motion.div
                    key="config-step-1"
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
                            Selecione o produto viral
                          </h2>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsCustomProductMode(!isCustomProductMode)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider transition-all ${
                            isCustomProductMode 
                              ? 'bg-[#D0011B] text-white border-[#D0011B] shadow-lg shadow-[#D0011B]/20' 
                              : 'bg-white dark:bg-white/[0.03] text-gray-600 dark:text-white/60 border-black/5 dark:border-white/[0.08] hover:border-[#D0011B]'
                          }`}
                        >
                          <ImagePlus size={14} />
                          <span>{isCustomProductMode ? 'Escolher da Lista' : 'Criar Customizado'}</span>
                        </button>
                      </div>
                    </div>

                    {!isCustomProductMode ? (
                      <>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                            <Search size={16} />
                          </div>
                          <input 
                            type="text" 
                            value={searchProductQuery}
                            onChange={(e) => setSearchProductQuery(e.target.value)}
                            placeholder="Pesquisar entre seus favoritos..."
                            className="w-full pl-9 pr-4 py-3 text-xs bg-neutral-100 dark:bg-white/[0.03] text-gray-900 dark:text-white border border-black/5 dark:border-white/[0.08] rounded-xl focus:border-[#D0011B]/40 focus:outline-none focus:ring-1 focus:ring-[#D0011B]/35 transition-all"
                          />
                        </div>

                        {favoritedProducts.length === 0 ? (
                          <div style={{ textAlign: 'center', padding: 24, color: 'rgba(255,255,255,0.4)', gridColumn: 'span 2' }}>
                            <Heart size={32} style={{ marginBottom: 8, margin: '0 auto' }} />
                            <p style={{ fontSize: 14 }}>Você ainda não favoritou nenhum produto.</p>
                          </div>
                        ) : filteredProducts.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-10 text-gray-400 dark:text-white/30">
                            <Search size={24} className="mb-2 opacity-20" />
                            <p className="text-[11px] font-bold">Nenhum favorito encontrado para "{searchProductQuery}"</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
                            {filteredProducts.map((prod) => {
                              const isSelected = selectedProduct?.id === prod.id && !isCustomProductMode;
                              return (
                                <div 
                                  key={prod.id}
                                  onClick={() => {
                                    setSelectedProduct(prod);
                                    setIsCustomProductMode(false);
                                  }}
                                  className={`flex items-center gap-3 p-3 rounded-[12px] cursor-pointer transition-all border relative overflow-hidden ${
                                    isSelected 
                                      ? 'border-[#D0011B] bg-[#D0011B]/[0.06]' 
                                      : 'border-neutral-200 dark:border-white/[0.06] hover:border-neutral-300 dark:hover:border-white/10 bg-transparent'
                                  }`}
                                >
                                  <img 
                                    src={prod.imagem} 
                                    alt={prod.nome} 
                                    className="w-11 h-11 object-cover rounded-lg border border-black/5 dark:border-white/10 shrink-0" 
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-gray-900 dark:text-white truncate leading-tight">
                                      {prod.nome}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1 text-[9px] text-gray-400 dark:text-white/45 font-bold">
                                      <span className="text-[#D0011B]">{prod.preco}</span>
                                      <span>•</span>
                                      <span className="text-emerald-500 dark:text-emerald-400">Comissão: {prod.comissao}</span>
                                    </div>
                                  </div>
                                  {isSelected && (
                                    <div className="w-5 h-5 rounded-full bg-[#D0011B] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                                      ✓
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#D0011B] block ml-1">
                              Imagem do Produto (Upload)
                            </label>
                            <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-black/5 dark:border-white/10 rounded-2xl cursor-pointer hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-all overflow-hidden bg-neutral-100 dark:bg-white/[0.03] group relative">
                              {customProductImage ? (
                                <>
                                  <img 
                                    src={customProductImage} 
                                    className="w-full h-full object-contain" 
                                    alt="Preview" 
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <div className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider">
                                      <RefreshCw size={14} /> Trocar Imagem
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <div className="flex flex-col items-center gap-3">
                                  <div className="w-12 h-12 rounded-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center shadow-lg">
                                    <ImagePlus size={22} className="text-[#D0011B]" />
                                  </div>
                                  <div className="text-center">
                                    <p className="text-[11px] font-black text-gray-900 dark:text-white uppercase tracking-wider">Clique para Upload</p>
                                    <p className="text-[9px] text-gray-400 dark:text-white/30 font-bold mt-1">PNG, JPG ou WEBP (Máx. 5MB)</p>
                                  </div>
                                </div>
                              )}
                              <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      const base64 = reader.result as string;
                                      setCustomProductImage(base64);
                                      const newProd: Product = {
                                        id: 99999,
                                        nome: 'Produto Customizado',
                                        imagem: base64,
                                        preco: 'R$ 0,00',
                                        precoOriginal: 'R$ 0,00',
                                        desconto: '0%',
                                        ranking: 0,
                                        avaliacao: 5,
                                        vendas: '0',
                                        link: '#',
                                        scoreViral: 0,
                                        comissao: 'R$ 0,00',
                                        categoria: 'Customizado'
                                      };
                                      handleSelectProduct(newProd);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                      <button
                        onClick={() => setStep('selection')}
                        className="btn-custom !py-2.5 !px-5 !text-xs font-black tracking-wide relative overflow-hidden flex items-center gap-1.5"
                      >
                        Voltar para Galeria
                      </button>
                      <button
                        onClick={() => setConfigStep(2)}
                        disabled={!selectedProduct}
                        className="btn-custom !py-2.5 !px-6 !text-xs font-black tracking-wide relative overflow-hidden flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <span>Próximo</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* SUB-STEP 2: AVATAR SELECTION */}
                {configStep === 2 && (
                  <motion.div
                    key="config-step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-[14px] p-5 sm:p-6 space-y-5 shadow-lg"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-black/[0.04] dark:border-white/[0.04]">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#D0011B] text-white flex items-center justify-center text-[10px] font-black">
                          2
                        </span>
                        <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                          Escolha o Influenciador / Avatar AI
                        </h2>
                      </div>
                      
                      <div className="flex items-center gap-1 bg-neutral-100 dark:bg-white/[0.04] p-1 rounded-lg border border-black/5 dark:border-white/[0.06]">
                        {(['Todos', 'Mulher', 'Homem'] as const).map(g => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setGenderFilter(g)}
                            className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${genderFilter === g ? 'bg-[#D0011B] text-white shadow-xs' : 'text-gray-500 dark:text-white/50 hover:text-black dark:hover:text-white'}`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[480px] overflow-y-auto custom-scrollbar pr-1 pb-2">
                      {filteredAvatars.map((av) => {
                        const isSelected = selectedAvatar?.id === av.id;
                        return (
                          <div 
                            key={av.id}
                            onClick={() => handleSelectAvatar(av)}
                            className={`flex flex-col p-3 rounded-[16px] cursor-pointer transition-all border relative overflow-hidden group/card shadow-xs hover:shadow-md ${
                              isSelected 
                                ? 'border-[#D0011B] bg-[#D0011B]/[0.06] shadow-[#D0011B]/10' 
                                : 'border-neutral-200 dark:border-white/[0.06] hover:border-[#D0011B]/40 dark:hover:border-[#D0011B]/40 bg-white dark:bg-[#151515]'
                            }`}
                          >
                            {/* Larger visual display container */}
                            <div className="aspect-[3/4] w-full rounded-xl overflow-hidden border border-black/5 dark:border-white/10 shrink-0 bg-neutral-100 relative mb-3">
                              <img 
                                src={av.image} 
                                alt={av.nome} 
                                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/card:scale-105" 
                                style={{ imageRendering: 'high-quality', objectPosition: 'top center' }}
                              />
                              <div className="absolute top-2 left-2">
                                <span className="text-[9px] font-black tracking-wide px-2 py-0.5 bg-black/60 backdrop-blur-md text-white rounded-full">
                                  {av.genero}
                                </span>
                              </div>
                              {isSelected && (
                                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#D0011B] flex items-center justify-center text-white text-[10px] font-bold shadow-lg animate-pop">
                                  ✓
                                </div>
                              )}
                            </div>
                            
                            {/* Metadata */}
                            <div className="min-w-0 flex-1 flex flex-col justify-between">
                              <div>
                                <p className="text-xs sm:text-sm font-black truncate text-gray-900 dark:text-white mb-0.5">
                                  {av.nome}
                                </p>
                                <p className="text-[10px] text-gray-500 dark:text-white/40 leading-tight line-clamp-2">
                                  {av.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                      <button
                        onClick={() => setConfigStep(1)}
                        className="btn-custom !py-2.5 !px-5 !text-xs font-black tracking-wide relative overflow-hidden flex items-center gap-1.5"
                      >
                        Voltar
                      </button>
                      <button
                        onClick={() => setConfigStep(3)}
                        disabled={!selectedAvatar}
                        className="btn-custom !py-2.5 !px-6 !text-xs font-black tracking-wide relative overflow-hidden flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <span>Próximo</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* SUB-STEP 3: SCENARIO SELECTION */}
                {configStep === 3 && (
                  <motion.div
                    key="config-step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-[14px] p-5 sm:p-6 space-y-5 shadow-lg"
                  >
                    <div className="flex items-center gap-2 pb-1 border-b border-black/[0.04] dark:border-white/[0.04]">
                      <span className="w-5 h-5 rounded-full bg-[#D0011B] text-white flex items-center justify-center text-[10px] font-black">
                        3
                      </span>
                      <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                        Selecione o cenário / background
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {scenarios.map((sc) => {
                        const isSelected = selectedScenario.id === sc.id;
                        return (
                          <div 
                            key={sc.id}
                            onClick={() => setSelectedScenario(sc)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all text-left flex flex-col justify-between h-24 select-none ${
                              isSelected 
                                ? 'bg-[#D0011B]/8 dark:bg-[#D0011B]/15 border-[#D0011B]/40 shadow-xs' 
                                : 'border-black/5 dark:border-white/[0.06] hover:bg-neutral-50 dark:hover:bg-white/[0.02]'
                            }`}
                          >
                            <p className={`text-xs font-black ${isSelected ? 'text-[#D0011B] dark:text-white' : 'text-gray-800 dark:text-white/90'}`}>{sc.name}</p>
                            <p className="text-[10px] text-gray-400 dark:text-white/35 mt-1 leading-snug line-clamp-2">{sc.description}</p>
                          </div>
                        );
                      })}
                    </div>

                    {selectedScenario?.id === 'personalized' && (
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Type size={16} className="text-[#D0011B]" />
                          <label className="text-[10px] font-black uppercase tracking-widest text-[#D0011B]">
                            Descreva seu Cenário Customizado
                          </label>
                        </div>
                        <textarea
                          value={customScenarioText}
                          onChange={(e) => setCustomScenarioText(e.target.value)}
                          placeholder="Ex: Sala moderna iluminada com luz do sol, sofá branco ao fundo, plantas tropicais..."
                          className="w-full h-32 p-4 text-xs bg-neutral-100 dark:bg-white/[0.03] text-gray-900 dark:text-white border border-black/5 dark:border-white/[0.08] rounded-xl focus:border-[#D0011B]/40 focus:outline-none focus:ring-1 focus:ring-[#D0011B]/35 transition-all resize-none shadow-inner"
                        />
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                      <button
                        onClick={() => setConfigStep(2)}
                        className="btn-custom !py-2.5 !px-5 !text-xs font-black tracking-wide relative overflow-hidden flex items-center gap-1.5"
                      >
                        Voltar
                      </button>
                      <button
                        onClick={() => setConfigStep(4)}
                        disabled={!selectedScenario || (selectedScenario.id === 'personalized' && !customScenarioText.trim())}
                        className="btn-custom !py-2.5 !px-6 !text-xs font-black tracking-wide relative overflow-hidden flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <span>Próximo</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* SUB-STEP 4: AI SPEECH GENERATION (Voz de Conversa Real) */}
                {configStep === 4 && (
                  <motion.div
                    key="config-step-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-[14px] p-5 sm:p-6 space-y-5 shadow-lg"
                  >
                    <div className="flex items-center gap-2 pb-1 border-b border-black/[0.04] dark:border-white/[0.04]">
                      <span className="w-5 h-5 rounded-full bg-[#D0011B] text-white flex items-center justify-center text-[10px] font-black">
                        4
                      </span>
                      <div className="space-y-0.5">
                        <h2 className="text-sm font-bold text-gray-900 dark:text-white">Voz de Conversa Real</h2>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Gere o roteiro de fala para o seu avatar com nossa IA</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-neutral-50 dark:bg-white/[0.02] border border-black/5 dark:border-white/[0.08] rounded-xl p-4">
                        <textarea
                          value={speechText}
                          onChange={(e) => setSpeechText(e.target.value)}
                          placeholder="Clique em 'Gerar com IA' ou digite sua própria fala..."
                          className="w-full h-32 bg-transparent text-xs text-gray-900 dark:text-white focus:outline-none resize-none font-medium leading-relaxed"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={handleGenerateSpeech}
                          disabled={isGeneratingSpeech}
                          className="flex-1 bg-neutral-900 dark:bg-white text-white dark:text-black font-black py-3 px-6 rounded-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 text-xs cursor-pointer disabled:opacity-50"
                        >
                          {isGeneratingSpeech ? (
                            <RefreshCw size={14} className="animate-spin" />
                          ) : (
                            <Sparkles size={14} />
                          )}
                          <span>{isGeneratingSpeech ? 'Gerando...' : 'Gerar com IA'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                      <button
                        onClick={() => setConfigStep(3)}
                        className="btn-custom !py-2.5 !px-5 !text-xs font-black tracking-wide relative overflow-hidden flex items-center gap-1.5"
                      >
                        Voltar
                      </button>
                      <button
                        onClick={handleGeneratePrompt}
                        className="btn-custom !py-2.5 !px-6 !text-xs font-black tracking-wide relative overflow-hidden flex items-center gap-1.5"
                      >
                        <Sparkles size={13} />
                        <span>Gerar Prompt Final</span>
                      </button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            )}
          </div>
        )}

        {/* STEP 3: Optimized Interactive Result Interface (Aligns 100% with FindGroup.tsx Result page) */}
        {step === 'result' && selectedTemplate && selectedProduct && (
          <motion.div
            key="step-result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 max-w-4xl mx-auto"
          >
            {/* Result Indicator Header */}
            <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] shadow-md-custom">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="text-green-500" size={20} />
                <div>
                  <h2 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                    Material de Vídeo sintetizado
                  </h2>
                  <p className="text-[11px] text-gray-500 dark:text-white/40">
                    Copie o seu prompt e utilize-o no Google Flow VEO3
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setStep('selection');
                  setConfigStep(1);
                }}
                className="border border-neutral-300 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-white/[0.04] text-neutral-700 dark:text-neutral-300 text-[11px] font-bold py-2 px-3.5 rounded-lg transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw size={12} />
                <span>Nova Variação</span>
              </button>
            </div>

            {/* Criativo Visual Card */}
            <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-center gap-6">
              <div className="w-[124px] h-[124px] rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-sm bg-neutral-100 dark:bg-white/5 flex-shrink-0 flex items-center justify-center">
                <img 
                  src={selectedProduct.imagem} 
                  alt={selectedProduct.nome} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 space-y-3 w-full text-center sm:text-left">
                <div>
                  <h3 className="text-sm font-black text-gray-900 dark:text-white leading-tight">
                    {selectedProduct.nome}
                  </h3>
                  <div className="flex items-center justify-center sm:justify-start gap-2.5 mt-1.5 font-bold uppercase tracking-wider">
                    <span className="text-[11px] text-[#D0011B]">{selectedProduct.preco}</span>
                    <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-white/10" />
                    <span className="text-[11px] text-emerald-500">{selectedProduct.comissao} de comissão</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <button
                    onClick={downloadProductImage}
                    disabled={isDownloadingImage}
                    className="w-full sm:w-auto bg-[#D0011B] hover:bg-[#D0011B]/95 disabled:opacity-50 text-white font-black py-2.5 px-6 rounded-full transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 text-[11px] shadow-lg shadow-[#D0011B]/20 cursor-pointer uppercase tracking-wider"
                  >
                    {isDownloadingImage ? (
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Download size={13} />
                    )}
                    <span>{isDownloadingImage ? 'Baixando...' : 'Baixar Imagem'}</span>
                  </button>
                  <button
                    onClick={() => {
                      const textToCopy = `${selectedProduct.nome} - ${selectedProduct.preco} - ${selectedProduct.comissao} de comissão`;
                      navigator.clipboard.writeText(textToCopy);
                      onNotification("Informações copiadas! 📋");
                    }}
                    className="w-full sm:w-auto bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-white font-black py-2.5 px-6 rounded-full transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 text-[11px] cursor-pointer uppercase tracking-wider"
                  >
                    <Copy size={13} />
                    <span>Copiar Info</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Descrição do Produto Card */}
            <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-2xl p-5 shadow-lg space-y-4">
              <span className="text-[9px] font-black tracking-[0.1em] bg-emerald-600/10 text-emerald-500 px-2 py-1 rounded uppercase">
                Descrição do Produto — APENAS O NOME
              </span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'white', marginBottom: 4 }}>
                  {selectedProduct?.nome}
                </p>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ color: '#D0011B', fontWeight: 700, fontSize: 14 }}>{selectedProduct?.preco}</span>
                  <span style={{ background: 'rgba(208,1,27,0.1)', color: '#D0011B', borderRadius: 9999, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>
                    {selectedProduct?.comissao} comissão
                  </span>
                </div>
                <div className="mt-2 flex justify-start">
                  <CopyButton value={selectedProduct?.nome || ''} />
                </div>
              </div>
            </div>

            {/* Avatar Referência Card */}
            {selectedAvatar && (
              <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-center gap-6">
                <div className="w-[124px] h-[124px] rounded-xl overflow-hidden border border-black/5 dark:border-white/10 shadow-sm bg-neutral-100 dark:bg-white/5 flex-shrink-0">
                  <img 
                    src={selectedAvatar.image} 
                    alt={selectedAvatar.nome} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 space-y-4 w-full">
                  <div>
                    <span className="text-[9px] font-black tracking-[0.1em] bg-purple-600/10 text-purple-500 px-2 py-1 rounded uppercase">
                      Avatar / Influenciador de Referência
                    </span>
                    <h3 className="text-xs font-bold text-gray-900 dark:text-white mt-2 leading-tight">
                      {selectedAvatar.nome}
                    </h3>
                    <p className="text-[10px] text-gray-500 dark:text-white/40 mt-1 leading-none font-semibold">
                      Gênero: {selectedAvatar.genero} · Imagem de Referência para IA
                    </p>
                  </div>
                  
                  <button
                    onClick={downloadAvatarImage}
                    disabled={isDownloadingAvatar}
                    className="w-full sm:w-auto bg-[#D0011B] hover:bg-[#D0011B]/95 disabled:opacity-50 text-white font-bold py-2.5 px-6 rounded-full transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 text-xs shadow-lg shadow-[#D0011B]/20 cursor-pointer"
                  >
                    {isDownloadingAvatar ? (
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Download size={13} />
                    )}
                    <span>{isDownloadingAvatar ? 'Baixando...' : 'Baixar Imagem do Avatar'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Prompt para Mesclar Imagens Card */}
            <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-black tracking-[0.1em] bg-orange-600/10 text-orange-500 px-2 py-1 rounded uppercase">
                  Prompt para Mesclar Imagens (Midjourney / Flux)
                </span>
                <button 
                  onClick={() => handleCopyToClipboard(generatedData.mergePrompt!, "Prompt de Mesclagem")}
                  className="flex items-center gap-1.5 px-3 py-1 bg-neutral-100 dark:bg-white/[0.05] rounded-lg text-[10px] font-bold text-gray-600 dark:text-white/60 hover:text-[#D0011B] transition-colors"
                >
                  <Copy size={12} />
                  <span>Copiar Prompt</span>
                </button>
              </div>
              <div className="p-4 bg-neutral-50 dark:bg-black/20 rounded-xl border border-black/5 dark:border-white/5 text-[11px] leading-relaxed text-gray-500 dark:text-white/40 font-mono italic">
                {generatedData.mergePrompt}
              </div>
            </div>

            {/* Google Flow Prompt Card (Enormous English Prompt) */}
            <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-black tracking-[0.1em] bg-red-600/10 text-[#D0011B] px-2.5 py-1 rounded uppercase">
                  Prompt Flow AI (Inglês)
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
                  <div className="text-[12px] leading-relaxed text-gray-750 dark:text-white/85 bg-gray-50 dark:bg-[#0a0a0a] rounded-lg p-4 whitespace-pre-wrap max-h-[450px] overflow-y-auto custom-scrollbar border border-black/5 dark:border-white/5 font-mono">
                    {generatedData.englishPrompt}
                  </div>
                  
                  <div className="pt-1 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleCopyToClipboard(generatedData.englishPrompt, "Prompt Inglês")}
                      className="btn-custom !py-2.5 !px-5 !text-xs font-black tracking-wide relative overflow-hidden flex items-center gap-1.5"
                    >
                      <Copy size={13} />
                      <span>Copiar Prompt Flow AI (Inglês)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 6.4: Crie o Vídeo com IA Card (Identical to FindGroup.tsx Card format) */}
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
                <div className="flex flex-col items-center text-center font-sans">
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
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
