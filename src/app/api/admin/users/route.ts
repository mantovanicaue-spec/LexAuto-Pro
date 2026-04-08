import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Utilitário interno para garantir que usamos a Service Role Key (Root Access)
const getAdminSupabase = () => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    );
};

export async function GET(req: Request) {
  try {
    const supabaseAdmin = getAdminSupabase();

    // Num app real de produção com Auth, geralmente checamos o Server Session:
    // const { data: { user } } = await supabaseAdmin.auth.getUser(req.headers.get('Authorization'));
    // if (user?.email !== "mantovanicaue@gmail.com") return NextResponse.json({error: "Unauthorized"}, {status:401});

    // 1. Buscamos todos os perfis (profiles) do banco de dados
    const { data: users, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // 2. Buscamos estatísticas globais
    const { count: modelsCount } = await supabaseAdmin
      .from('modelos')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({ 
      users: users || [], 
      stats: { totalModels: modelsCount || 0 }
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { userId, is_pro } = body;

        const supabaseAdmin = getAdminSupabase();
        
        let plan_expires_at = null;
        if (is_pro) {
            // Se ativou via admin, dá 30 dias de cota
            plan_expires_at = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString();
        }

        const { error } = await supabaseAdmin
            .from('profiles')
            .update({ is_pro, plan_expires_at })
            .eq("id", userId);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
