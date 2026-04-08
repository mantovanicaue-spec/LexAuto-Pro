"use client";

import { Upload, Database } from "lucide-react";
import Link from "next/link";

export default function ImportarDados() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="font-playfair text-[1.7rem] font-bold mb-1">Importar Dados</h1>
        <p className="text-[0.83rem] text-muted leading-relaxed">
          Envie a planilha com os dados dos clientes e executados (.xlsx ou .csv).
        </p>
      </div>

      <div className="bg-gold-pale border border-[#e0c98a] rounded p-4 text-[0.78rem] text-ink leading-relaxed mb-6">
        <strong>Colunas obrigatórias:</strong>
        <code className="bg-white border border-border px-1 py-0.5 rounded ml-1 font-mono text-[0.7rem] mr-1">comarca</code>
        <code className="bg-white border border-border px-1 py-0.5 rounded font-mono text-[0.7rem] mr-1">cliente</code>
        <code className="bg-white border border-border px-1 py-0.5 rounded font-mono text-[0.7rem] mr-1">executado</code>
        <code className="bg-white border border-border px-1 py-0.5 rounded font-mono text-[0.7rem] mr-1">cpf</code>
        <code className="bg-white border border-border px-1 py-0.5 rounded font-mono text-[0.7rem] mr-1">endereco</code>
        <code className="bg-white border border-border px-1 py-0.5 rounded font-mono text-[0.7rem]">valor</code><br/>
        
        <strong>Colunas opcionais para Atualização de Valores:</strong>
        <code className="bg-white border border-border px-1 py-0.5 rounded ml-1 font-mono text-[0.7rem] mr-1">vencimento</code>
        <code className="bg-white border border-border px-1 py-0.5 rounded font-mono text-[0.7rem] mr-1">multa</code>
        <code className="bg-white border border-border px-1 py-0.5 rounded font-mono text-[0.7rem] mr-1">honorarios</code>
        <code className="bg-white border border-border px-1 py-0.5 rounded font-mono text-[0.7rem]">data da atualizacao</code><br/>
        
        <div className="mt-2 text-gold underline cursor-pointer font-semibold">⬇ Baixar planilha de exemplo</div>
      </div>

      <div className="bg-white border border-border rounded p-6 shadow-sm">
        <div className="text-[0.66rem] tracking-[0.14em] uppercase text-gold font-semibold mb-3 font-mono flex items-center gap-2 after:content-[''] after:flex-1 after:h-px after:bg-gold-pale">
          Arquivo de Dados
        </div>
        
        <button className="w-full border-2 border-dashed border-border rounded p-12 flex flex-col items-center justify-center hover:bg-gold-pale hover:border-gold transition-colors bg-parchment">
          <Database size={40} className="opacity-40 mb-3" />
          <div className="text-[0.83rem] text-muted text-center">
            <strong>Clique</strong> ou arraste a planilha aqui<br/>
            <small>.xlsx · .xls · .csv</small>
          </div>
        </button>
      </div>
    </div>
  );
}
