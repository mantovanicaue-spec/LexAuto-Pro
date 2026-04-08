import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action");
    const dataId = url.searchParams.get("data.id");

    if (action === "payment.created" && dataId) {
      const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "" });
      const payment = new Payment(client);
      const paymentInfo = await payment.get({ id: dataId });

      if (paymentInfo.status === "approved" && paymentInfo.external_reference) {
        // Obter user_id via external_reference
        const userId = paymentInfo.external_reference;

        // Conectar ao Supabase pelo Server via service_role_key para burlar regras RLS
        const supabaseAdmin = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL || "",
          process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
        );

        // Atualiza a tabela "profiles" para marcar is_pro = true
        await supabaseAdmin
          .from("profiles")
          .update({ is_pro: true, plan_expires_at: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString() })
          .eq("id", userId);
      }
    }

    // Mercado Pago exige retorno HTTP 200 de agradecimento sempre.
    return NextResponse.json({ status: "ok" }, { status: 200 });

  } catch (error: any) {
    console.error("Erro no Webhook:", error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
