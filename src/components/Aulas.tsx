import React from 'react';
import { PlayCircle, Lock } from 'lucide-react';

export default function Aulas() {
  const lockedLessons = [
    {
      id: 2,
      title: "Aula 2 — Como Escolher Produtos Virais",
      desc: "Descubra os segredos dos produtos de alta conversão e garanta que cada postagem sua chame atenção instantânea.",
    },
    {
      id: 3,
      title: "Aula 3 — Copy de Vendas que Converte",
      desc: "Entenda como montar copies persuasivas usando gatilhos mentais que obrigam o lead a clicar no seu link de afiliado.",
    },
    {
      id: 4,
      title: "Aula 4 — Divulgando nos Grupos do Facebook",
      desc: "Estratégia prática e orgânica de aquisição de clientes sem investir um único centavo em anúncios."
    }
  ];

  return (
    <div className="flex-1 bg-white dark:bg-transparent p-4 sm:p-6 md:p-8 max-w-[1200px] mx-auto w-full font-['Space_Grotesk'] text-left select-none text-[#111111] dark:text-white">
      {/* HEADER */}
      <div className="mb-8">
        <span className="inline-block bg-[#D0011B] text-white text-[10px] font-black px-3 py-1 rounded-md tracking-wider mb-2 uppercase font-['Space_Grotesk'] pb-0.5 shadow-sm">
          Área de Membros
        </span>
        <h1 className="text-[22px] font-black gradient-title leading-tight font-['Space_Grotesk']">
          Suas Aulas
        </h1>
        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-1 font-['Space_Grotesk'] font-medium">
          Aprenda a dominar a Shopee e lucrar como afiliado
        </p>
      </div>

      {/* MÓDULO 1 CARD */}
      <div className="bg-white dark:bg-[#111111] text-gray-900 dark:text-white rounded-[14px] overflow-hidden border border-neutral-200 dark:border-white/5 shadow-md dark:shadow-2xl mb-8">
        {/* Header do módulo */}
        <div className="bg-[#D0011B]/[0.03] dark:bg-[#D0011B]/[0.08] border-b border-neutral-200/70 dark:border-[#D0011B]/15 px-5 py-4 flex flex-wrap items-center gap-2.5 justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-[#D0011B] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider leading-none">
              MÓDULO 1
            </span>
            <h2 className="text-base font-bold font-['Space_Grotesk'] tracking-tight text-gray-900 dark:text-white">
              Primeiros Passos na Shopee
            </h2>
          </div>
          <span className="text-xs text-[#D0011B] font-black dark:text-[#ff4d4d]">
            1/4 Aulas Completadas
          </span>
        </div>

        {/* AULA 1 (Ativa/Disponível) */}
        <div className="p-5 md:p-6 border-b border-neutral-200/70 dark:border-white/[0.04] bg-white dark:bg-[#111111]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 xl:col-span-8">
              {/* Embed do Wistia */}
              <div className="shadow-lg border border-black/5 dark:border-white/[0.05] rounded-xl overflow-hidden bg-black">
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: 10, overflow: 'hidden' }}>
                  <iframe
                    src="https://helenacamposvmm.wistia.com/embed/iframe/u4tp35m7nq"
                    allowFullScreen
                    style={{
                      position: 'absolute', top: 0, left: 0,
                      width: '100%', height: '100%',
                      border: 'none', borderRadius: 10
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between h-full space-y-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20 mb-3 uppercase leading-none">
                  ✅ Disponível
                </span>
                
                <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white font-['Space_Grotesk'] leading-snug">
                  Aula 1 — Como Criar sua Conta como Afiliado Shopee
                </h3>
                
                <p className="text-xs md:text-sm text-gray-500 dark:text-neutral-400 mt-2 font-['Space_Grotesk'] leading-relaxed font-semibold">
                  Aprenda o passo a passo completo para criar sua conta de afiliado na Shopee e começar a ganhar comissões.
                </p>
              </div>

              <div className="pt-2">
                <div className="flex items-center gap-2 p-3 bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.06] rounded-xl">
                  <PlayCircle size={18} className="text-[#D0011B]" />
                  <div className="text-[11px] text-gray-500 dark:text-neutral-400">
                    <p className="font-bold text-gray-900 dark:text-white text-xs">Assistindo Agora</p>
                    <p className="font-medium">Duração sugerida: 12 minutos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PRÓXIMAS AULAS (BLOQUEADAS) */}
        <div className="p-5 md:p-6 bg-neutral-50 dark:bg-black/15">
          <h4 className="text-xs font-black uppercase tracking-widest text-[#D0011B] mb-4">
            Próximas de Módulo 1
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {lockedLessons.map((lesson) => (
              <div 
                key={lesson.id}
                className="relative bg-white dark:bg-[#161616] rounded-xl border border-neutral-200 dark:border-white/[0.05] overflow-hidden flex flex-col justify-between h-56 transition-all duration-300 hover:border-neutral-300 dark:hover:border-white/10 group shadow-xs hover:shadow-md"
              >
                {/* Visual Thumbnail Blocked */}
                <div className="h-28 bg-neutral-200 dark:bg-[#1f1f1f] relative overflow-hidden flex items-center justify-center">
                  {/* Blurry video indicator representation */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-neutral-950 dark:from-black/80 dark:to-[#121212] opacity-70 group-hover:scale-105 transition-transform duration-500" />
                  
                  {/* Central Lock / Overlay */}
                  <div 
                    style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 z-10"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#111111]/80 border border-white/15 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      <Lock size={15} className="text-white" />
                    </div>
                    <span style={{ background: 'rgba(255,255,255,0.06)' }} className="text-[10px] text-neutral-400 font-bold px-2.5 py-0.5 rounded border border-white/5 tracking-wider">
                      Em breve
                    </span>
                  </div>
                </div>

                {/* Lesson Info */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h5 className="text-[13px] font-bold text-gray-900 dark:text-white line-clamp-1 font-['Space_Grotesk']">
                      {lesson.title}
                    </h5>
                    <p className="text-[11px] text-gray-500 dark:text-neutral-400 mt-1 line-clamp-2 md:line-clamp-3 font-['Space_Grotesk'] leading-relaxed font-semibold">
                      {lesson.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
