import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

export interface Modelo {
  id: string;
  user_id: string;
  nome: string;
  tipo: string | null;
  texto: string;
  created_at: string;
  updated_at: string;
}

export function useModelos() {
  const { user } = useAuth();
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [loading, setLoading] = useState(true);

  const isMocked = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("placeholder");

  const fetchModelos = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    if (isMocked) {
      // Mock Data until real Supabase is configured
      const mockModelos: Partial<Modelo>[] = [
        { id: "1", nome: "Petição Inicial - Danos Morais", tipo: "Inicial", created_at: "01/10/2023", texto: "Exemplo de petição..." },
        { id: "2", nome: "Contestação Padrão", tipo: "Contestação", created_at: "15/10/2023", texto: "Sintese dos fatos..." },
      ];
      setModelos(mockModelos as Modelo[]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("modelos")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setModelos(data);
    }
    setLoading(false);
  }, [user, isMocked]);

  const saveModelo = async (modeloData: Partial<Modelo>) => {
    if (!user) return null;
    
    if (isMocked) {
      alert("Ambiente de desenvolvimento: O modelo seria salvo no Supabase aqui!");
      return true;
    }

    const { data, error } = await supabase
      .from("modelos")
      .upsert({
        ...modeloData,
        user_id: user.id,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Erro ao salvar:", error.message);
      return null;
    }

    await fetchModelos();
    return data;
  };

  const deleteModelo = async (id: string) => {
    if (isMocked) {
      setModelos(v => v.filter(m => m.id !== id));
      return true;
    }

    const { error } = await supabase.from("modelos").delete().eq("id", id).eq("user_id", user!.id);
    if (!error) {
      setModelos(v => v.filter(m => m.id !== id));
      return true;
    }
    return false;
  };

  return {
    modelos,
    loading,
    fetchModelos,
    saveModelo,
    deleteModelo
  };
}
