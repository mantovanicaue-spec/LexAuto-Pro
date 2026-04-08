"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Folder, PenTool, LayoutTemplate, Database, Calculator, Zap, HelpCircle } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { section: "Modelos" },
    { href: "/", label: "Meus Modelos", icon: Folder },
    { href: "/editor", label: "Editor de Modelo", icon: PenTool },
    { href: "/template", label: "Template Visual", icon: LayoutTemplate },
    { section: "Geração" },
    { href: "/dados", label: "Importar Dados", icon: Database },
    { href: "/atualizacao", label: "Atualização de Valores", icon: Calculator },
    { href: "/gerar", label: "Gerar Petições", icon: Zap },
    { section: "Ajuda" },
    { href: "/ajuda", label: "Guia de Uso", icon: HelpCircle },
    { section: "Conta" },
    { href: "/upgrade", label: "Upgrade para PRO", icon: Zap },
  ];

  return (
    <nav className="fixed top-[54px] bottom-0 left-0 w-[272px] bg-[#181612] border-r border-[#2a2720] flex flex-col overflow-y-auto z-40">
      <div className="h-px bg-[#2a2720] my-3"></div>
      
      {navItems.map((item, idx) => {
        if (item.section) {
          return (
            <div key={idx} className="px-4 py-2 mt-2 text-[0.6rem] tracking-[0.15em] uppercase text-[#555] font-mono">
              {item.section}
            </div>
          );
        }

        const isActive = pathname === item.href;
        const Icon = item.icon!;

        return (
          <Link
            key={idx}
            href={item.href!}
            className={`flex items-center gap-2.5 px-5 py-2.5 text-sm font-medium transition-all border-l-4 ${
              isActive 
                ? "bg-[#1d1b14] text-gold border-gold" 
                : "text-[#999] border-transparent hover:bg-[#22201a] hover:text-white"
            }`}
          >
            <Icon className="w-4 h-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
