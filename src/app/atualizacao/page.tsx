"use client";

import { Calculator } from "lucide-react";

export default function Atualizacao() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="font-playfair text-[1.7rem] font-bold mb-1">Atualização de Valores</h1>
        <p className="text-[0.83rem] text-muted leading-relaxed">
          Correção monetária conforme TJSP — multa e honorários lidos diretamente da planilha por linha.
        </p>
      </div>

      <div className="bg-white border border-border rounded p-6 shadow-sm">
        <div className="text-[0.66rem] tracking-[0.14em] uppercase text-gold font-semibold mb-3 font-mono flex items-center gap-2 after:content-[''] after:flex-1 after:h-px after:bg-gold-pale">
          ⚙️ Parâmetro Global
        </div>
        
        <div className="flex flex-col md:flex-row items-end gap-4">
          <div className="flex-1">
            <label className="block text-[0.72rem] font-semibold text-muted mb-1.5 tracking-wider uppercase">
              Juros de Mora TJSP (% a.m.)
            </label>
            <input 
              type="number" 
              defaultValue="1.00"
              step="0.01"
              min="0"
              className="w-full font-mono text-sm px-3.5 py-2.5 border border-border rounded bg-parchment text-ink focus:border-gold outline-none transition-colors max-w-[250px]"
            />
            <div className="text-[0.72rem] text-muted mt-1.5">Aplica-se a todos os registros importados da planilha.</div>
          </div>
          
          <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[3px] text-[0.76rem] font-semibold tracking-wider uppercase bg-gold text-white hover:bg-gold-light transition-all shadow-sm whitespace-nowrap">
            <Calculator size={16} /> Calcular Atualização
          </button>
        </div>
      </div>
      
      <div className="bg-[#f0faf3] border border-[#d4edda] rounded p-4 text-[0.8rem] text-ink leading-relaxed">
        <strong>📋 Colunas lidas da planilha (por linha):</strong><br/>
        <code className="font-mono text-[0.75rem]">valor</code> → Valor principal | <code className="font-mono text-[0.75rem]">vencimento</code> → Data base do débito | <code className="font-mono text-[0.75rem]">multa</code> → Multa (%) | <code className="font-mono text-[0.75rem]">honorarios</code> → Honorários (%)<br/><br/>
        <strong>Fórmula de Atualização Aplicada:</strong><br/>
        <span className="font-mono text-[0.75rem]">Final = Principal Correção Monetária TJSP + Multa + Honorários Advocatícios.</span>
      </div>
    </div>
  );
}
