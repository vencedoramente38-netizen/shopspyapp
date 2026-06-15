"use client";

interface FeaturedSectionStatsProps {
  onEnterLogin: () => void;
}

export default function FeaturedSectionStats({ onEnterLogin }: FeaturedSectionStatsProps) {
  return (
    <section className="w-full max-w-6xl mx-auto text-left py-24 px-4 bg-white font-sans">
      <div>
        <div className="text-center mb-12 flex flex-col items-center">
          <span className="inline-block border border-[#D0011B]/20 rounded-full px-4 py-1.5 text-[11px] font-black text-[#D0011B] mb-4 tracking-[0.2em] uppercase bg-[#D0011B]/5">
            Quem Usa, Aprova
          </span>
          <h2 className="text-2.5xl sm:text-4xl font-extrabold text-[#111111] max-w-md mx-auto leading-tight">
            Centenas de afiliados já estão lucrando com o TikShopfy
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 mb-16 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100/85 hover:border-[#D0011B]/15 hover:bg-neutral-50/50 transition-all text-center">
            <p className="text-4xl font-black text-[#D0011B] tracking-tight font-sans">2.500+</p>
            <p className="text-neutral-500 font-bold text-xs sm:text-sm mt-2 uppercase tracking-wide">Usuários ativos</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#D0011B]/5 border border-[#D0011B]/10 hover:border-[#D0011B]/20 transition-all text-center">
            <p className="text-4xl font-black text-[#D0011B] tracking-tight font-sans">R$ 938K+</p>
            <p className="text-neutral-600 font-bold text-xs sm:text-sm mt-2 uppercase tracking-wide">Faturados pelos usuários</p>
          </div>
          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100/85 hover:border-[#D0011B]/15 hover:bg-neutral-50/50 transition-all text-center">
            <p className="text-4xl font-black text-[#D0011B] tracking-tight font-sans">98%</p>
            <p className="text-neutral-500 font-bold text-xs sm:text-sm mt-2 uppercase tracking-wide">Satisfação</p>
          </div>
        </div>
      </div>
    </section>
  );
}
