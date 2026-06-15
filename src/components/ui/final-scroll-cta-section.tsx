"use client";
import React from "react";
import { Button } from "./button";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

interface FinalScrollCTASectionProps {
  onEnterLogin: () => void;
}

export default function FinalScrollCTASection({ onEnterLogin }: FinalScrollCTASectionProps) {
  return (
    <div className="relative w-full rounded-[32px] overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-black py-16 sm:py-24 px-4 sm:px-6 md:px-12 text-center border border-neutral-800 shadow-2xl my-16">
      {/* Premium static subtle grid overlay & radial glow instead of wavy background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(120,119,198,0.15),transparent)]" />
      
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-3xl font-light text-white tracking-tight leading-tight sm:leading-none">
          Pronto para encontrar seu <span className="bg-gradient-to-r from-red-500 via-orange-400 to-amber-300 bg-clip-text text-transparent font-normal">próximo produto campeão</span>?
        </h2>
        
        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-neutral-450 font-light mt-4 max-w-2xl leading-relaxed">
          Entre no ShopSpy e descubra o que acontece quando mineração avançada de dados encontra inteligência artificial sob medida para suas vendas.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
          <Button
            onClick={onEnterLogin}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-white hover:bg-neutral-100 text-black px-8 py-7 md:px-10 md:py-8 text-base md:text-lg font-medium transition-all hover:scale-105 active:scale-95 duration-300 shadow-[0_12px_44px_rgba(255,255,255,0.15)] cursor-pointer"
          >
            Criar conta
            <ArrowRight className="h-5 w-5 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            onClick={onEnterLogin}
            variant="outline"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full border border-neutral-700 bg-transparent hover:bg-neutral-950 text-white px-8 py-7 md:px-10 md:py-8 text-base md:text-lg font-medium transition-all hover:scale-105 active:scale-95 duration-300 cursor-pointer"
          >
            Já tenho conta
          </Button>
        </div>

        {/* Checkmarks / Feature List */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10 border-t border-neutral-900 pt-8 w-full">
          <div className="flex items-center gap-2.5 text-neutral-300 text-xs sm:text-sm font-semibold select-none group">
            <Zap className="h-4.5 w-4.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Copies em segundos</span>
          </div>
          <div className="flex items-center gap-2.5 text-neutral-300 text-xs sm:text-sm font-semibold select-none group">
            <ShieldCheck className="h-4.5 w-4.5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>Dados 100% validados</span>
          </div>
          <div className="flex items-center gap-2.5 text-neutral-300 text-xs sm:text-sm font-semibold select-none group">
            <CheckCircle2 className="h-4.5 w-4.5 text-sky-400 group-hover:scale-110 transition-transform" />
            <span>Atualizações diárias</span>
          </div>
        </div>
      </div>
    </div>
  );
}
