"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Se estivermos mockados
    if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("placeholder")) {
      router.push("/");
      return;
    }

    const { error: signUpError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment px-4">
      <div className="bg-white border border-border shadow-2xl rounded p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="font-playfair text-3xl font-black text-gold tracking-wider mb-2">
            Lex<span className="text-ink font-normal">Auto</span>
            <sup className="text-[0.6rem] bg-gold text-white px-1.5 ml-1 rounded-[2px] tracking-widest font-mono align-super">
              PRO
            </sup>
          </div>
          <p className="text-sm text-muted">Inteligência Artificial para Advogados.</p>
        </div>

        {error && (
          <div className="bg-[#fdebea] border border-[#f5b3b3] text-[#8b2020] text-xs p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[0.72rem] font-semibold text-muted mb-1.5 tracking-wider uppercase">E-mail Corporativo</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full font-sans text-sm px-3.5 py-3 border border-border rounded bg-parchment text-ink focus:border-gold outline-none transition-colors"
              placeholder="seu.nome@escritorio.adv.br"
            />
          </div>
          <div>
             <label className="block text-[0.72rem] font-semibold text-muted mb-1.5 tracking-wider uppercase">Senha</label>
             <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full font-sans text-sm px-3.5 py-3 border border-border rounded bg-parchment text-ink focus:border-gold outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-[3px] text-sm font-semibold tracking-wider uppercase bg-gold text-white hover:bg-gold-light transition-all shadow-md mt-2 disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Acessar Plataforma"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-muted">
           Ainda não tem conta? <a href="#" className="text-gold font-semibold underline">Fazer assinatura</a>
        </div>
      </div>
    </div>
  );
}
