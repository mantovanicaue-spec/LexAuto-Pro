"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function Upgrade() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!user) return alert("Faça login antes de assinar.");
    setLoading(true);

    try {
      const resp = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
          planName: "PRO_MONTHLY",
          planPrice: 97.90
        })
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error);

      // Redireciona para aba do Mercado Pago
      window.location.href = data.init_point;

    } catch (err: any) {
      alert("Houve um erro: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 text-center max-w-2xl mx-auto pt-6">
        <h1 className="font-playfair text-[2.2rem] font-bold mb-2">Passe para o próximo nível</h1>
        <p className="text-[0.95rem] text-muted leading-relaxed">
          Libere as integrações com a Inteligência Artificial e remova as restrições da sua conta LexAuto.
        </p>
      </div>

      <div className="max-w-md mx-auto bg-white border-2 border-gold rounded-lg p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-gold text-white text-[0.6rem] font-bold tracking-widest px-3 py-1 uppercase rounded-bl-lg">
          Mais Popular
        </div>

        <h3 className="font-playfair text-2xl font-bold text-ink mb-1">LexAuto PRO</h3>
        <p className="text-sm text-muted mb-6">Assinatura Mensal + Acesso Claude AI</p>

        <div className="mb-8">
          <span className="text-4xl font-bold text-ink">R$ 97</span>
          <span className="text-muted text-sm">,90 / mês</span>
        </div>

        <ul className="space-y-3 mb-8">
          <li className="flex gap-3 text-[0.85rem] text-ink"><CheckCircle2 size={18} className="text-green-600 flex-shrink-0" /> Atualização monetária lendo tabelas completas.</li>
          <li className="flex gap-3 text-[0.85rem] text-ink"><Zap size={18} className="text-gold flex-shrink-0" /> Geração Assistida por Inteligência Artificial (Claude 3.5).</li>
          <li className="flex gap-3 text-[0.85rem] text-ink"><CheckCircle2 size={18} className="text-green-600 flex-shrink-0" /> Templates visuais com sua Logo OAB.</li>
          <li className="flex gap-3 text-[0.85rem] text-ink"><ShieldCheck size={18} className="text-[#1a4b8b] flex-shrink-0" /> Nuvem ilimitada de petições no Supabase.</li>
        </ul>

        <button 
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-4 rounded bg-gold text-white font-bold tracking-wider uppercase text-sm hover:bg-gold-light transition-all shadow-md disabled:opacity-50"
        >
          {loading ? "Processando..." : "Assinar com Mercado Pago"}
        </button>

        <p className="text-center text-[0.65rem] text-muted mt-4">
          Pagamento processado direto nos servidores seguros do Mercado Pago.
        </p>
      </div>
    </div>
  );
}
