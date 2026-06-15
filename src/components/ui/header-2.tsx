'use client';
import React from 'react';
import { Button, buttonVariants } from './button';
import { cn } from '../../lib/utils';
import { useScroll } from './use-scroll';
import { Menu, X, Play, Zap } from 'lucide-react';

interface HeaderProps {
  onEnterLogin: () => void;
}

export function Header({ onEnterLogin }: HeaderProps) {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);

	const links = [
		{
			label: 'Início',
			href: '#',
		},
		{
			label: 'Benefícios',
			href: '#recursos',
		},
		{
			label: 'Premiações',
			href: '#precos',
		},
		{
			label: 'Quem Somos',
			href: '#como-funciona',
		},
		{
			label: 'FAQ',
			href: '#faq',
		},
	];

	return (
		<div className="fixed top-4 left-0 right-0 z-50 mx-auto w-full max-w-[95%] sm:max-w-[90%] md:max-w-none px-2 sm:px-4 md:px-0 pointer-events-none flex flex-col items-center">
			
			{/* FLOATING PILL NAVBAR */}
			<header
				className={cn(
					'pointer-events-auto w-full transition-all duration-300 flex items-center justify-between px-4 sm:px-6 h-11 sm:h-12 md:h-14 rounded-full border shadow-[0_8px_30px_rgb(0,0,0,0.04)]',
					// Mobile & general style base
					'bg-white/94 dark:bg-[#111111]/92 border-white/80 dark:border-white/10 backdrop-blur-[6px] shadow-[0_6px_24px_rgba(208,1,27,0.06)] max-w-[500px]',
					// Desktop styles overriding base dynamically with md: prefix
					scrolled && !open
						? 'md:max-w-[850px] md:bg-white/92 md:dark:bg-[#111111]/92 md:border-neutral-200/30 md:dark:border-white/10 md:backdrop-blur-[6px] md:shadow-[0_12px_32px_rgba(0,0,0,0.05)]'
						: 'md:max-w-[920px] md:bg-white/94 md:dark:bg-[#111111]/94 md:border-neutral-200/10 md:dark:border-white/5 md:backdrop-blur-[4px]'
				)}
			>
				{/* Logo */}
				<a href="#" className="flex items-center gap-1.5 shrink-0 transition-transform active:scale-95">
					<img
						src="https://i.postimg.cc/yxg1xsb5/edd68b75-b6bf-4dcd-af88-7dd1332566ed.png"
						onError={(e) => {
							e.currentTarget.src = "https://i.postimg.cc/yxg1xsb5/edd68b75-b6bf-4dcd-af88-7dd1332566ed.png";
						}}
						alt="ShopSpy Logo"
						className="h-6 sm:h-7 md:h-8 w-auto object-contain"
						referrerPolicy="no-referrer"
					/>
				</a>

				{/* Desktop Menu */}
				<div className="hidden items-center gap-2 md:flex">
					{links.map((link, i) => (
						<a
							key={i}
							className={cn(
								buttonVariants({ variant: 'ghost' }),
								"text-neutral-700 dark:text-neutral-300 hover:text-[#D0011B] hover:bg-neutral-50/50 dark:hover:bg-neutral-900/50 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
							)}
							href={link.href}
						>
							{link.label}
						</a>
					))}
					<Button
						onClick={onEnterLogin}
						className="bg-[#D0011B] text-white hover:bg-[#D0011B]/95 px-5 py-1.5 h-8 rounded-full text-xs font-bold shadow-[0_4px_12px_rgba(208,1,27,0.15)] ml-2 transition-transform active:scale-95 cursor-pointer"
					>
						Entrar
					</Button>
				</div>

				{/* Mobile toggle button */}
				<button
					onClick={() => setOpen(!open)}
					className="md:hidden text-neutral-800 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5 rounded-full w-8 h-8 flex items-center justify-center transition-colors cursor-pointer"
				>
					{open ? <X className="w-5 h-5 text-neutral-900 dark:text-white" /> : <Menu className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />}
				</button>
			</header>

			{/* MOBILE DROPDOWN CARD OVERLAY BELOW NAVBAR */}
			{open && (
				<div
					className="pointer-events-auto w-full max-w-[500px] mt-2 bg-white/95 dark:bg-black/95 backdrop-blur-[8px] border border-white/60 dark:border-white/10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-6 md:hidden animate-in fade-in slide-in-from-top-4 duration-300 flex flex-col items-center gap-4 text-center z-45"
				>
					<ul className="w-full flex flex-col items-center gap-1">
						{links.map((link, idx) => {
							const isSpecial = link.label === "Benefícios";
							return (
								<li key={idx} className="w-full">
									<a
										href={link.href}
										onClick={() => setOpen(false)}
										className={cn(
											"block w-full py-2.5 rounded-full text-sm font-semibold transition-all text-neutral-800 dark:text-neutral-100 hover:text-[#D0011B]/90 dark:hover:text-[#ff4455]",
											isSpecial && "bg-neutral-100/50 dark:bg-neutral-900/40 border border-neutral-200/20 dark:border-white/5 py-3 px-6 mt-1 mb-1 font-bold shadow-sm"
										)}
									>
										{link.label}
									</a>
								</li>
							);
						})}
					</ul>

					<div className="w-full flex flex-col gap-2.5 mt-2">
						{/* Entrar Button */}
						<button
							onClick={() => {
								setOpen(false);
								onEnterLogin();
							}}
							className="w-full bg-[#D0011B] hover:bg-[#D0011B]/90 text-white py-3 px-5 rounded-full font-bold text-sm shadow-[0_8px_20px_rgba(208,1,27,0.2)] transition-all active:scale-[0.98] cursor-pointer"
						>
							Entrar
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

