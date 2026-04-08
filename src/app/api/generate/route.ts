import { NextResponse } from "next/server";
import { Anthropic } from "@anthropic-ai/sdk";

// Crie uma nova variável de ambiente no seu Coolify ou Vercel chamada ANTHROPIC_API_KEY
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "", // Chave oculta (somente servidor)
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, modeloBase } = body;

    // Verificação de segurança primária
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "A chave API da Inteligência Artificial não está configurada no servidor." },
        { status: 500 }
      );
    }

    if (!prompt) {
      return NextResponse.json(
        { error: "O contexto do caso (prompt) é obrigatório." },
        { status: 400 }
      );
    }

    const systemContext = `Você é um advogado sênior especialista em direito brasileiro. Sua missão é redigir o esqueleto textual e os pedidos fundamentados de uma petição no formato Word/Texto. 
Você utilizará linguagem jurídica de altíssima qualidade. 
Se for repassado um "modeloBase", utilize o padrão estrutural fornecido e adapte os fatos especificamente para o problema repassado no prompt. Não inclua conversas ou saudações, apenas o corpo técnico jurídico, usando blocos para manter a mesma lógica de TAGS originais como {{CLIENTE}} e {{COMARCA}} caso julgue necessário.`;

    const userMessage = modeloBase 
      ? `Modelo Estrutural Desejado:\n\n${modeloBase}\n\nFatos específicos do Novo Caso do Cliente:\n\n${prompt}`
      : `Por favor, crie uma petição baseada nos fatos a seguir:\n\n${prompt}`;

    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022", // Usando o Claude 3.5 exigido 
      max_tokens: 3000,
      temperature: 0.1, // Temperatura baixa para garantir termos firmes e precisão legal
      system: systemContext,
      messages: [
        {
          role: "user",
          content: userMessage
        }
      ]
    });

    // Validar se mensagem é string para evitar crash de typing
    const responseText = message.content[0].type === 'text' 
      ? message.content[0].text 
      : "A IA não conseguiu gerar em formato de texto.";

    return NextResponse.json({ result: responseText });

  } catch (error: any) {
    console.error("Erro na API de Geração da Anthropic:", error);
    return NextResponse.json(
      { error: "Houve um erro de comunicação com o serviço de Inteligência Artificial." },
      { status: 500 }
    );
  }
}
