"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Save, ClipboardList, ArrowLeft, Upload, Edit3, FileText, CheckCircle2 } from "lucide-react";
import { useModelos } from "@/hooks/useModelos";

export default function EditorModelos() {
  const router = useRouter();
  const { saveModelo } = useModelos();
  const [tab, setTab] = useState<"digitar" | "importar">("digitar");
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [texto, setTexto] = useState("");

  const varsBasicas = [
    "{{COMARCA}}", "{{CLIENTE}}", "{{EXECUTADO}}", "{{CPF}}", "{{ENDERECO}}",
    "{{VALOR}}", "{{VALOR_EXTENSO}}", "{{DATA}}"
  ];

  const varsAtualizacao = [
    "{{VALOR_ATUALIZADO}}", "{{VALOR_ATUALIZADO_EXTENSO}}", "{{VALOR_JUROS}}",
    "{{VALOR_MULTA}}", "{{VALOR_HONORARIOS}}", "{{DATA_VENCIMENTO}}", "{{DATA_ATUALIZACAO}}"
  ];

  const inserirTag = (tag: string) => {
    setTexto((prev) => prev + tag + " ");
  };

  const handleSave = async () => {
    if (!nome.trim() || !texto.trim()) {
      alert("Preencha o nome e o texto do modelo.");
      return;
    }
    const success = await saveModelo({ nome, tipo, texto });
    if (success) {
      router.push("/");
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="font-playfair text-[1.7rem] font-bold mb-1">Novo Modelo</h1>
        <p className="text-[0.83rem] text-muted leading-relaxed">
          Crie ou edite um modelo. Use as variáveis dinâmicas onde quiser que os dados sejam substituídos.
        </p>
      </div>

      <div className="bg-white border border-border rounded p-6 shadow-sm">
        <div className="text-[0.66rem] tracking-[0.14em] uppercase text-gold font-semibold mb-3 font-mono flex items-center gap-2 after:content-[''] after:flex-1 after:h-px after:bg-gold-pale">
          Identificação
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[0.72rem] font-semibold text-muted mb-1.5 tracking-wider uppercase">Nome do Modelo *</label>
            <input 
              type="text" 
              placeholder="Ex: Execução Extrajudicial — Padrão" 
              className="w-full font-mono text-sm px-3.5 py-2.5 border border-border rounded bg-parchment text-ink focus:border-gold outline-none transition-colors"
              value={nome}
              onChange={e => setNome(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[0.72rem] font-semibold text-muted mb-1.5 tracking-wider uppercase">Tipo de Ação</label>
            <input 
              type="text" 
              placeholder="Ex: Execução, Monitória, Cível..." 
              className="w-full font-mono text-sm px-3.5 py-2.5 border border-border rounded bg-parchment text-ink focus:border-gold outline-none transition-colors"
              value={tipo}
              onChange={e => setTipo(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-border rounded p-6 shadow-sm">
        <div className="text-[0.66rem] tracking-[0.14em] uppercase text-gold font-semibold mb-3 font-mono flex items-center gap-2 after:content-[''] after:flex-1 after:h-px after:bg-gold-pale">
          Texto do Modelo
        </div>

        <div className="flex border-b border-border mb-4">
          <button 
            className={`px-4 py-2 text-[0.72rem] font-semibold tracking-wider uppercase transition-colors border-b-2 -mb-px ${tab === "digitar" ? "text-gold border-gold" : "text-muted border-transparent hover:text-ink"}`}
            onClick={() => setTab("digitar")}
          >
            <span className="flex items-center gap-1.5"><Edit3 size={14}/> Digitar / Colar</span>
          </button>
          <button 
            className={`px-4 py-2 text-[0.72rem] font-semibold tracking-wider uppercase transition-colors border-b-2 -mb-px ${tab === "importar" ? "text-gold border-gold" : "text-muted border-transparent hover:text-ink"}`}
            onClick={() => setTab("importar")}
          >
            <span className="flex items-center gap-1.5"><FileText size={14}/> Importar .docx / .txt</span>
          </button>
        </div>

        {tab === "digitar" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="text-[0.65rem] text-muted self-center font-mono mr-1">Inserir:</span>
              {varsBasicas.map(v => (
                <button key={v} onClick={() => inserirTag(v)} className="bg-gold-pale border border-[#e0c98a] rounded-sm px-2 py-0.5 font-mono text-[0.68rem] text-gold hover:bg-gold hover:text-white transition-colors select-none">
                  {v}
                </button>
              ))}
              {varsAtualizacao.map(v => (
                <button key={v} onClick={() => inserirTag(v)} className="bg-[#f0faf3] border border-[#a8d5a2] rounded-sm px-2 py-0.5 font-mono text-[0.68rem] text-[#2e7d32] hover:bg-[#2e7d32] hover:text-white transition-colors select-none">
                  {v}
                </button>
              ))}
              <button onClick={() => inserirTag("{{VALOR_ORIGINAL}}")} className="bg-[#fdf8ec] border border-[#c8a84b] rounded-sm px-2 py-0.5 font-mono text-[0.68rem] text-[#7a5c00] hover:bg-[#7a5c00] hover:text-white transition-colors select-none">
                {`{{VALOR_ORIGINAL}}`}
              </button>
            </div>
            
            <textarea 
              rows={22} 
              placeholder="Digite ou cole o texto do modelo aqui..."
              className="w-full font-mono text-sm px-3.5 py-3 border border-border rounded bg-parchment text-ink focus:border-gold outline-none transition-colors resize-y leading-relaxed"
              value={texto}
              onChange={e => setTexto(e.target.value)}
            ></textarea>
          </div>
        )}

        {tab === "importar" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
             <div className="bg-gold-pale border border-[#e0c98a] rounded p-3 text-[0.78rem] text-ink leading-relaxed mb-4">
                <strong>Formatos aceitos:</strong> .docx (Word), .txt<br/>
                O texto será extraído. Após importar, posicione as <strong>variáveis dinâmicas</strong> nos lugares corretos e salve.
             </div>
             
             <button className="w-full border-2 border-dashed border-border rounded p-8 flex flex-col items-center justify-center hover:bg-gold-pale hover:border-gold transition-colors bg-parchment">
                <Upload size={32} className="opacity-40 mb-2" />
                <div className="text-[0.83rem] text-muted">
                  <strong>Clique</strong> ou arraste o arquivo aqui<br/>
                  <small>.docx · .txt</small>
                </div>
             </button>
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-6 items-center">
        <button 
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[3px] text-[0.76rem] font-semibold tracking-wider uppercase bg-gold text-white hover:bg-gold-light transition-all shadow-sm"
        >
          <Save size={16} /> Salvar Modelo
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[3px] text-[0.76rem] font-semibold tracking-wider uppercase border-2 border-transparent bg-transparent text-muted hover:border-border hover:bg-white transition-all">
          <ClipboardList size={16} /> Inserir Exemplo
        </button>
        
        <div className="flex-1"></div>

        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[3px] text-[0.76rem] font-semibold tracking-wider uppercase bg-transparent text-muted border-2 border-transparent hover:border-red-500 hover:text-red-600 transition-all">
          <ArrowLeft size={16} /> Voltar
        </Link>
      </div>
    </div>
  );
}
