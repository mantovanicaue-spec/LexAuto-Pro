"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ShieldAlert, Users, Database, Clock, Zap, ToggleRight, ToggleLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  
  const [clientes, setClientes] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalModels: 0 });
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    // Redireciona se terminar o loading do Auth e não for admin
    if (!loading && !isAdmin) {
      router.push("/");
    }
  }, [isAdmin, loading, router]);

  useEffect(() => {
    if (isAdmin) {
      fetchAdminData();
    }
  }, [isAdmin]);

  const fetchAdminData = async () => {
    try {
      // Usaremos um Mock temporário se for ambiente de desenvolvimento sem chaves:
      if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("placeholder")) {
        setStats({ totalModels: 42 });
        setClientes([
          { id: "uuid-1", email: "advogado.mestre@oab.br", created_at: "2024-01-10T10:00:00Z", is_pro: true, plan_expires_at: "2024-02-10T10:00:00Z" },
          { id: "uuid-2", email: "cliente.teste@escritorio.com", created_at: "2024-01-15T14:30:00Z", is_pro: false, plan_expires_at: null },
        ]);
        setIsLoadingData(false);
        return;
      }

      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (res.ok) {
        setClientes(data.users || []);
        setStats(data.stats || { totalModels: 0 });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const toggleProStatus = async (userId: string, currentProStatus: boolean) => {
    const newStatus = !currentProStatus;
    
    // Atualização otimista na tela
    setClientes(prev => prev.map(c => c.id === userId ? { ...c, is_pro: newStatus } : c));

    if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("placeholder")) {
      return alert("Status alternado de forma simulada no ambiente de dev.");
    }

    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, is_pro: newStatus })
      });
      if (!res.ok) throw new Error("Erro ao salvar status");
    } catch (err) {
       alert("Erro ao alterar privilégios do usuário.");
       // Revert otimista
       setClientes(prev => prev.map(c => c.id === userId ? { ...c, is_pro: currentProStatus } : c));
    }
  };

  if (loading || (!isAdmin && isLoadingData)) return <div className="p-8 text-muted">Protegendo área administrativa...</div>;

  return (
    <div className="space-y-6">
      <div className="mb-6 border-b border-border pb-4">
        <h1 className="font-playfair text-[1.7rem] font-bold mb-1 flex items-center gap-3">
          <ShieldAlert className="text-red-800" size={28} /> Central do Administrador
        </h1>
        <p className="text-[0.83rem] text-muted leading-relaxed">
          Monitoramento macro da plataforma LexAuto PRO. Visão restrita Mestre.
        </p>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
         <div className="bg-white border-l-4 border-gold border-y border-r border-[#e5dfd3] shadow-sm rounded-r p-5 flex items-center justify-between">
           <div>
              <div className="text-[0.68rem] tracking-wider uppercase font-semibold text-muted mb-1">Total de Clientes Diários</div>
              <div className="text-3xl font-black font-playfair text-ink">{clientes.length}</div>
           </div>
           <div className="text-gold opacity-20"><Users size={48} /></div>
         </div>
         <div className="bg-white border-l-4 border-[#1a4b8b] border-y border-r border-[#e5dfd3] shadow-sm rounded-r p-5 flex items-center justify-between">
           <div>
              <div className="text-[0.68rem] tracking-wider uppercase font-semibold text-muted mb-1">Modelos na Nuvem</div>
              <div className="text-3xl font-black font-playfair text-ink">{stats.totalModels}</div>
           </div>
           <div className="text-[#1a4b8b] opacity-20"><Database size={48} /></div>
         </div>
         <div className="bg-white border-l-4 border-green-600 border-y border-r border-[#e5dfd3] shadow-sm rounded-r p-5 flex items-center justify-between">
           <div>
              <div className="text-[0.68rem] tracking-wider uppercase font-semibold text-muted mb-1">Receita Ativa Mensal</div>
              <div className="text-3xl font-black font-playfair text-ink">
                R$ {clientes.filter(c => c.is_pro).length * 97.90}
              </div>
           </div>
           <div className="text-green-600 opacity-20"><Zap size={48} /></div>
         </div>
      </div>

      {/* Lista de Usuários */}
      <div className="bg-white border border-border shadow-sm rounded overflow-hidden">
         <div className="bg-[#fcfbf9] border-b border-border px-5 py-3 text-[0.7rem] tracking-wider uppercase font-semibold text-ink">
           Gerenciamento de Assinaturas (Tabela Profiles)
         </div>
         <table className="w-full text-left border-collapse">
           <thead>
             <tr className="border-b border-border bg-parchment text-[0.75rem] text-muted">
               <th className="py-3 px-5 font-semibold">Conta / E-mail</th>
               <th className="py-3 px-5 font-semibold">Registro Base</th>
               <th className="py-3 px-5 font-semibold">Vencimento Destaque</th>
               <th className="py-3 px-5 font-semibold text-right">Controle Manual de Acesso</th>
             </tr>
           </thead>
           <tbody>
             {clientes.map(cliente => (
               <tr key={cliente.id} className="border-b border-cream hover:bg-[#fcfbf9] transition-colors">
                 <td className="py-4 px-5 text-[0.8rem] text-ink font-semibold">{cliente.email || 'Usuário Sem Email'}</td>
                 <td className="py-4 px-5 text-[0.8rem] text-muted flex items-center gap-1.5">
                    <Clock size={14} /> {new Date(cliente.created_at).toLocaleDateString("pt-BR")}
                 </td>
                 <td className="py-4 px-5 text-[0.8rem]">
                   {cliente.is_pro ? (
                     <span className="bg-[#e8f5e9] text-[#2e7d32] border border-[#a5d6a7] px-2 py-0.5 rounded font-mono text-[0.65rem] tracking-wider">
                       PRO ATIVO ATÉ {cliente.plan_expires_at ? new Date(cliente.plan_expires_at).toLocaleDateString("pt-BR") : "MENSAL"}
                     </span>
                   ) : (
                     <span className="bg-[#ffebee] text-[#c62828] border border-[#ffcdd2] px-2 py-0.5 rounded font-mono text-[0.65rem] tracking-wider">
                       CONTA GRATUITA LIMITADA
                     </span>
                   )}
                 </td>
                 <td className="py-4 px-5 text-right">
                   <button 
                     onClick={() => toggleProStatus(cliente.id, cliente.is_pro)}
                     className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-[3px] text-[0.68rem] font-bold tracking-wider uppercase transition-colors border ${
                       cliente.is_pro 
                        ? 'border-red-300 text-red-700 bg-red-50 hover:bg-red-100' 
                        : 'border-gold text-gold bg-gold-pale hover:bg-gold hover:text-white'
                     }`}
                   >
                     {cliente.is_pro ? (
                       <><ToggleLeft size={16} /> Revogar Permissões</>
                     ) : (
                       <><ToggleRight size={16} /> Ativar Assinatura PRO</>
                     )}
                   </button>
                 </td>
               </tr>
             ))}
             {clientes.length === 0 && (
                <tr><td colSpan={4} className="py-8 text-center text-muted text-sm">Nenhum cliente cadastrado no banco de dados ainda.</td></tr>
             )}
           </tbody>
         </table>
      </div>

    </div>
  );
}
