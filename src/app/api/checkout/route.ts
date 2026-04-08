import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, planName, planPrice, email } = body;

    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: "A chave de acesso do Mercado Pago não está configurada no servidor." },
        { status: 500 }
      );
    }

    const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });
    const preference = new Preference(client);

    const backendUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const response = await preference.create({
      body: {
        items: [
          {
            id: planName,
            title: `Assinatura LexAuto PRO - ${planName}`,
            quantity: 1,
            unit_price: Number(planPrice),
            currency_id: "BRL"
          }
        ],
        payer: {
          email: email
        },
        back_urls: {
          success: `${backendUrl}/?payment=success`,
          failure: `${backendUrl}/?payment=failure`,
          pending: `${backendUrl}/?payment=pending`
        },
        auto_return: "approved",
        external_reference: userId, // Passa o ID do usuário oculto para validarmos no webhook
        notification_url: `${backendUrl}/api/webhook` // Webhook
      }
    });

    return NextResponse.json({ 
      init_point: response.init_point, 
      id: response.id 
    });

  } catch (error: any) {
    console.error("Erro no Checkout MercadoPago:", error);
    return NextResponse.json(
      { error: "Falha na criação do pagamento." },
      { status: 500 }
    );
  }
}
