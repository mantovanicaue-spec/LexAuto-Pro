"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Folder, Plus, FileText, ChevronRight } from "lucide-react";
import { useModelos } from "@/hooks/useModelos";

export default function Home() {
  const { modelos, loading, fetchModelos } = useModelos();

  useEffect(() => {
    fetchModelos();
  }, [fetchModelos]);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="font-playfair text-[1.7rem] font-bold mb-1">Meus Modelos de Petição</h1>
        <p className="text-[0.83rem] text-muted leading-relaxed">
          Gerencie seus modelos salvos. Clique em um para editar ou usar na geração.
        </p>
      </div>

      <div className="mb-6">
        <Link 
          href="/editor"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[3px] text-[0.76rem] font-semibold tracking-wider uppercase bg-gold text-white hover:bg-gold-light transition-all"
        >
          <Plus className="w-4 h-4" /> Novo Modelo
        </Link>
      </div>

      {modelos.length === 0 ? (
        <div className="border-2 border-dashed border-border rounded p-16 text-center bg-[#fdfcf8] text-muted">
          <div className="text-5xl mb-4 opacity-40 flex justify-center">
            <Folder size={48} />
          </div>
          <div className="font-bold text-lg mb-2 font-playfair text-ink">Nenhum modelo salvo</div>
          <p className="text-sm mb-6">Crie seu primeiro modelo clicando em "+ Novo Modelo".</p>
          <Link 
            href="/editor"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[3px] text-[0.76rem] font-semibold tracking-wider uppercase bg-gold text-white hover:bg-gold-light transition-all"
          >
            <Plus className="w-4 h-4" /> Criar Primeiro Modelo
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {modelos.map((modelo) => (
              <div key={modelo.id} className="bg-white border border-border rounded p-5 hover:border-gold hover:shadow-md transition-all flex flex-col gap-2">
                <div className="font-semibold text-[0.87rem]">{modelo.nome}</div>
                {modelo.tipo && <span className="inline-block bg-gold-pale text-gold font-semibold text-[0.62rem] px-2 py-0.5 rounded tracking-wider uppercase self-start">{modelo.tipo}</span>}
                <div className="text-[0.72rem] text-muted line-clamp-3 leading-relaxed mt-1">
                  {modelo.texto}
                </div>
                
                <div className="flex gap-2 mt-3 pt-3 border-t border-cream">
                  <Link href={`/editor?id=${modelo.id}`} className="px-3 py-1.5 border border-border rounded text-[0.68rem] font-semibold text-ink hover:text-gold hover:border-gold transition-colors flex items-center gap-1">
                    <FileText size={12} /> Editar
                  </Link>
                  <div className="flex-1"></div>
                  <button className="text-[0.68rem] text-muted hover:text-red-600 transition-colors">
                    🗑 Excluir
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
