"use client";

import { useState } from "react";
import { Zap, Download, FileText } from "lucide-react";

export default function GerarPeticoes() {
  const [formato, setFormato] = useState<"docx" | "pdf">("docx");

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="font-playfair text-[1.7rem] font-bold mb-1">Gerar Petições com IA</h1>
        <p className="text-[0.83rem] text-muted leading-relaxed">
          Escolha o modelo, defina o caso usando Inteligência Artificial ou selecione partir de dados e escolha o formato.
        </p>
      </div>

      <div className="bg-[#edf7f0] border border-[#b8e0c0] rounded p-3 text-[0.78rem] text-ink leading-relaxed mb-4">
        ✅ <strong>Template Inteligente ativo</strong> — logo e rodapé do escritório incluídos automaticamente em todos os documentos Word gerados.
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Esquerda - Configuração */}
        <div className="space-y-6">
          <div className="bg-white border border-border rounded p-6 shadow-sm">
            <div className="text-[0.66rem] tracking-[0.14em] uppercase text-gold font-semibold mb-3 font-mono flex items-center gap-2 after:content-[''] after:flex-1 after:h-px after:bg-gold-pale">
              Configuração Base
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[0.72rem] font-semibold text-muted mb-1.5 tracking-wider uppercase">Modelo Base de Petição *</label>
                <select className="w-full font-mono text-sm px-3.5 py-2.5 border border-border rounded bg-parchment text-ink focus:border-gold outline-none transition-colors">
                  <option value="">— Selecione um modelo —</option>
                  <option value="1">Ação Monitória - Padrão OAB</option>
                  <option value="2">Execução de Título Extrajudicial</option>
                </select>
              </div>

              <div>
                <label className="block text-[0.72rem] font-semibold text-muted mb-1.5 tracking-wider uppercase">Formato de Saída</label>
                <div className="flex rounded border border-border overflow-hidden">
                  <button 
                    onClick={() => setFormato("docx")}
                    className={`flex-1 text-center py-2 text-[0.72rem] font-semibold uppercase tracking-wider transition-colors ${formato === "docx" ? "bg-gold text-white" : "bg-white text-muted hover:bg-cream"}`}
                  >
                    📝 Word (.docx)
                  </button>
                  <button 
                    onClick={() => setFormato("pdf")}
                    className={`flex-1 text-center py-2 text-[0.72rem] font-semibold uppercase tracking-wider transition-colors border-l border-border ${formato === "pdf" ? "bg-gold text-white" : "bg-white text-muted hover:bg-cream"}`}
                  >
                    📄 PDF
                  </button>
                </div>
                <div className="text-[0.7rem] text-muted mt-1.5">
                  {formato === "docx" ? "Arquivos Word editáveis — compatível com Office, LibreOffice." : "Arquivos PDF formatados prontos para impressão."}
                </div>
              </div>
            </div>
          </div>
          
          <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-[3px] text-[0.8rem] font-semibold tracking-wider uppercase bg-gold text-white hover:bg-gold-light transition-all shadow-md">
            <Zap size={18} /> Gerar com IA
          </button>
        </div>

        {/* Direita - Prompts IA e Preview */}
        <div className="space-y-4">
            <div className="bg-[#FFFBEA] border border-gold rounded p-4">
              <label className="block text-[0.72rem] font-semibold text-[#7a6200] mb-2 tracking-wider uppercase">
                Detalhes do Caso Assistido por IA (Claude 3.5)
              </label>
              <textarea 
                rows={6}
                placeholder="Descreva brevemente os fatos. Ex: Cliente comprou carro na concessionária e veio com defeito no motor..."
                className="w-full font-sans text-sm p-3 border border-[#F5C842] rounded bg-white text-ink outline-none block resize-y"
              ></textarea>
              <div className="mt-2 text-xs text-muted">
                A IA usará o modelo definido e o ajustará de forma robusta e técnica para este caso específico.
              </div>
            </div>

            <div className="bg-white border border-border rounded p-6 shadow-sm min-h-[300px] flex flex-col items-center justify-center text-center">
              <div className="text-muted opacity-50 mb-2">
                <FileText size={48} className="mx-auto" />
              </div>
              <div className="text-sm">A sua petição gerada aparecerá aqui.</div>
            </div>
        </div>
      </div>
    </div>
  );
}
