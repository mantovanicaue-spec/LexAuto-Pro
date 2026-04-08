"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function FaqItem({ q, a }: { q: string, a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button 
        onClick={() => setOpen(!open)}
        className="w-full text-left py-4 flex justify-between items-center outline-none"
      >
        <span className="font-semibold text-ink text-[0.95rem]">{q}</span>
        {open ? <ChevronUp className="text-gold" size={20} /> : <ChevronDown className="text-gold" size={20} />}
      </button>
      {open && <p className="text-muted text-[0.85rem] pb-4 leading-relaxed">{a}</p>}
    </div>
  );
}

export default function Ajuda() {
  const faqs = [
    { q: "Como configurar a logo e o rodapé do meu escritório?", a: "Abra a página 'Template Visual' e envie o seu documento com o logotipo oficial e as marcações do rodapé (Word ou PDF). Ele será atrelado diretamente às petições base." },
    { q: "Quais são as variáveis e placeholders disponíveis?", a: "Use tags como {{CLIENTE}}, {{COMARCA}}, {{EXECUTADO}} e {{VALOR_ATUALIZADO}} dentro de seus modelos de petição. Elas serão mescladas aos dados da planilha." },
    { q: "Como uso a geração com IA do Claude?", a: "Vá ao menu 'Gerar Petições'. No card da direita de Inteligência Artificial, resuma o caso do cliente em algumas linhas. O sistema utilizará a técnica jurídica de elaboração acoplada ao LLM para formatar os pedidos dentro do modelo OAB." },
    { q: "Os pagamentos e a assinatura da plataforma são garantidos?", a: "Tudo é orquestrado através de Mercado Pago Payments e dados criptografados salvos com Supabase, o que garante 100% segurança e controle." }
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="mb-6">
        <h1 className="font-playfair text-[1.7rem] font-bold mb-1">Guia de Uso</h1>
        <p className="text-[0.83rem] text-muted leading-relaxed">
          Tire suas dúvidas sobre o funcionamento do LexAuto PRO.
        </p>
      </div>

      <div className="bg-white border border-border rounded p-6 shadow-sm">
        {faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
      </div>
    </div>
  );
}
