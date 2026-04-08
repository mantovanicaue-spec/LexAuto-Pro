"use client";

import { Upload, LayoutTemplate } from "lucide-react";

export default function TemplateVisual() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="font-playfair text-[1.7rem] font-bold mb-1">Template Visual</h1>
        <p className="text-[0.83rem] text-muted leading-relaxed">
          Importe seu arquivo Word ou PDF com a logo e o rodapé do escritório. O sistema extrairá cabeçalho, rodapé e as aplicará em todos os documentos gerados.
        </p>
      </div>

      <div className="bg-[#edf7f0] border border-[#b8e0c0] rounded p-4 text-[0.78rem] text-ink leading-relaxed mb-6">
        ✅ <strong>Template Inteligente embutido e ativo.</strong> O modelo <strong>0rthodontic_DENTRIX</strong> está incorporado diretamente ao sistema com logo, rodapé, formatação original e todas as margens. Todos os documentos Word gerados serão <strong>idênticos ao modelo original</strong>.
      </div>

      <div className="bg-white border border-border rounded p-6 shadow-sm">
        <div className="text-[0.66rem] tracking-[0.14em] uppercase text-gold font-semibold mb-3 font-mono flex items-center gap-2 after:content-[''] after:flex-1 after:h-px after:bg-gold-pale">
          Importar Novo Template
        </div>
        
        <button className="w-full border-2 border-dashed border-border rounded p-12 flex flex-col items-center justify-center hover:bg-gold-pale hover:border-gold transition-colors bg-parchment">
          <LayoutTemplate size={40} className="opacity-40 mb-3" />
          <div className="text-[0.83rem] text-muted text-center">
            <strong>Clique</strong> ou arraste seu template aqui<br/>
            <small>.docx (recomendado) · .pdf</small>
          </div>
        </button>
      </div>
    </div>
  );
}
