"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { Menu, X } from "lucide-react";

// Create a context so sub-components can access scrolled state if they want
const NavbarContext = createContext<{ scrolled: boolean }>({ scrolled: false });

export function Navbar({ children, className }: { children: React.ReactNode; className?: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <NavbarContext.Provider value={{ scrolled }}>
      <motion.nav
        initial={false}
        animate={{
          y: scrolled ? 12 : 24,
          width: scrolled ? "90%" : "95%",
          maxWidth: scrolled ? "820px" : "960px",
          backgroundColor: scrolled ? "rgba(15, 15, 15, 0.92)" : "rgba(255, 255, 255, 0.82)",
          borderColor: scrolled ? "rgba(208, 1, 27, 0.25)" : "rgba(0, 0, 0, 0.08)",
          boxShadow: scrolled 
            ? "0 20px 40px -15px rgb(0 0 0 / 0.6), 0 0 20px 1px rgba(208, 1, 27, 0.08)" 
            : "0 10px 25px -5px rgb(0 0 0 / 0.03), 0 4px 12px -4px rgb(0 0 0 / 0.02)",
        }}
        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
        className={cn(
          "fixed top-0 left-1/2 -translate-x-1/2 z-[100]",
          "border rounded-[24px] px-6 py-3.5 flex flex-col justify-center backdrop-blur-xl",
          className
        )}
      >
        <div className="w-full flex flex-col">{children}</div>
      </motion.nav>
    </NavbarContext.Provider>
  );
}

export function NavBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("hidden lg:flex w-full items-center justify-between gap-4", className)}>
      {children}
    </div>
  );
}

export function NavItems({
  items,
  className,
}: {
  items: { name: string; link: string }[];
  className?: string;
}) {
  const { scrolled } = useContext(NavbarContext);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("flex items-center gap-1 sm:gap-2", className)}>
      {items.map((item, idx) => (
        <a
          key={`nav-item-${idx}`}
          href={item.link}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          className={cn(
            "relative px-4 py-2 rounded-full text-[13px] xl:text-[14px] font-medium transition-colors duration-200 whitespace-nowrap",
            scrolled 
              ? "text-neutral-400 hover:text-white" 
              : "text-neutral-600 hover:text-neutral-900"
          )}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                layoutId="navbar-hover-bg"
                className={cn(
                  "absolute inset-0 rounded-full -z-10",
                  scrolled ? "bg-white/10" : "bg-neutral-100"
                )}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
          <span>{item.name}</span>
        </a>
      ))}
    </div>
  );
}

export function MobileNav({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col lg:hidden w-full relative", className)}>
      {children}
    </div>
  );
}

export function NavbarLogo({ children, className }: { children?: React.ReactNode; className?: string }) {
  const { scrolled } = useContext(NavbarContext);
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {children || (
        <img
          src="https://i.postimg.cc/yxg1xsb5/edd68b75-b6bf-4dcd-af88-7dd1332566ed.png"
          onError={(e) => {
            e.currentTarget.src = "https://i.postimg.cc/yxg1xsb5/edd68b75-b6bf-4dcd-af88-7dd1332566ed.png";
          }}
          alt="ShopSpy Logo"
          className={cn(
            "h-8 sm:h-10 w-auto object-contain transition-all duration-300",
            scrolled ? "brightness-200 animate-pulse-subtle" : ""
          )}
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
}

export function NavbarButton({
  children,
  variant,
  className,
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}) {
  const { scrolled } = useContext(NavbarContext);
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-5 py-2 text-sm font-bold transition-all duration-200 active:scale-95 whitespace-nowrap cursor-pointer",
        variant === "primary"
          ? "bg-[#D0011B] text-white hover:bg-[#D0011B]/90 shadow-[0_4px_14px_rgba(208,1,27,0.35)]"
          : scrolled 
            ? "bg-white/10 text-neutral-200 hover:bg-white/15 border border-white/5"
            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200/50",
        className
      )}
    >
      {children}
    </button>
  );
}

export function MobileNavHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center justify-between w-full", className)}>
      {children}
    </div>
  );
}

export function MobileNavToggle({
  isOpen,
  onClick,
  className,
}: {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}) {
  const { scrolled } = useContext(NavbarContext);
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-2 rounded-xl border transition-colors duration-200 focus:outline-none cursor-pointer",
        scrolled 
          ? "text-neutral-400 hover:text-white bg-white/5 border-white/5" 
          : "text-neutral-600 hover:text-neutral-900 bg-neutral-100 border-neutral-200",
        className
      )}
    >
      {isOpen ? <X size={20} /> : <Menu size={20} />}
    </button>
  );
}

export function MobileNavMenu({
  isOpen,
  onClose,
  children,
  className,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const { scrolled } = useContext(NavbarContext);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={cn(
            "w-full overflow-hidden flex flex-col gap-4 pt-4 pb-2 mt-3",
            scrolled ? "border-t border-white/10" : "border-t border-black/5",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
