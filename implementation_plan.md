# Transformando o LexAuto PRO em um SaaS (Aplicativo Vendável)

O código atual (tanto o arquivo `.jsx` quanto a versão `.html` presente no workspace) forma um **protótipo excelente**. Ele possui a lógica base e a interface, mas roda inteiramente no lado do cliente (navegador do usuário), salvando dados localmente (`sessionStorage` / `localStorage`) e, no caso da versão JSX, expondo diretamente eventuais chaves de API.

Para transformar esse protótipo em um produto vendável e profissional (SaaS - *Software as a Service*), precisamos focar em 6 pilares: **Segurança, Persistência, Autenticação, Pagamentos, Arquitetura e Deploy.**

## 🚨 Revisão do Usuário Necessária

> [!IMPORTANT]
> Precisamos confirmar algumas premissas antes de começar a codificar, pois alterarão significativamente a estrutura do projeto. Leia as perguntas na seção **Open Questions** abaixo e responda como deseja proceder.

## 1. Arquitetura Proposta (Stack Tecnológico)

* **Frontend:** React com **Next.js** (App Router). O Next.js permite criar rotas de frontend (telas) e rotas de backend (API) no mesmo projeto, facilitando a segurança das chaves de API da Inteligência Artificial.
* **Estilização:** Manteremos o design sofisticado existente, portando o CSS puro/CSS Modules, ou adotando TailwindCSS para facilitar a manutenção.
* **Backend de Dados & Autenticação:** **Supabase** (alternativa open-source ao Firebase). Ele fornecerá o banco de dados PostgreSQL (para salvar os modelos e petições dos usuários na nuvem) e o sistema de login.
* **Pagamentos:** Integração com **Stripe** ou **Asaas** (excelente para o mercado brasileiro - PIX/Boleto) para gerenciar assinaturas mensais ou cobranças avulsas.
* **Geração de Documentos:** Migraremos as lógicas do JSZip e PizZip/docxtemplater do HTML para rodar de forma limpa no Next.js.
* **Hospedagem:** **Vercel** (gratuito e perfeitamente otimizado para Next.js).

---

## 2. Fases da Implementação

### Fase 1: Fundação do App (Setup Next.js & Supabase)
1. Criar o repositório estruturado usando Next.js.
2. Configurar o banco de dados no Supabase (Tabelas: `profiles`, `templates`, `petitions`).
3. Implementar tela de Login/Cadastro (Autenticação). Sem conta, o usuário não acessará a ferramenta.

### Fase 2: Portar a Interface Existente (Frontend)
1. Extrair os componentes do `LexAutoPRO.jsx` e do `lexauto-pro-v7.html`.
2. Criar a estrutura de navegação lateral (Sidebar) e as VIEWS:
   * **Dashboard / Meus Modelos:** Trazendo do Supabase os modelos salvos.
   * **Editor de Modelos:** Integrando o salvamento na nuvem ao invés do `localStorage`.
   * **Gerador Orientado por IA:** Interface para comunicar com a API.
3. Modularizar as funções de criação de PDF e DOCX.

### Fase 3: Segurança da Inteligência Artificial (Backend)
1. Criar uma Rota de API Segura no Next.js (`/api/generate`).
2. Mover a chamada à Anthropic (Claude) para esta rota.
   * **Por quê?** Se a chamada for feita no frontend (como está no `.jsx`), sua chave secreta da API ficará visível, permitindo que qualquer pessoa a roube.

### Fase 4: Monetização (Stripe / Asaas)
1. Criar portal de precificação (Ex: Plano Básico / Plano PRO).
2. Proteger a rota principal do app (Dashboard) para checar se o usuário tem uma assinatura ativa.
3. Implementar Webhooks para liberar o acesso logo após o pagamento.

---

## Open Questions

Para que eu possa começar a montar a estrutura real, preciso que você responda:

> [!WARNING]
> Responda as perguntas abaixo para darmos continuidade:

1. **Você quer que eu inicialize um projeto web real (Next.js ou Vite) nesta mesma pasta (`lexauto-pro-v7`) agora?** Podemos começar portando a interface.
2. **Sistema de Login:** Você já possui preferência por Supabase ou Firebase? (Recomendo Supabase).
3. **Gateway de Pagamento:** Tem preferência por Stripe, Asaas, ou Mercado Pago para gerir as assinaturas no Brasil?

## Verification Plan

Assim que tivermos suas respostas:
1. Em caso de aprovação, inicializarei o ambiente.
2. Rodarei a configuração básica e verificaremos se o app base renderiza as telas do protótipo atual.
