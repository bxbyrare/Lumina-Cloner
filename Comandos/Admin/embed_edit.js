const { ApplicationCommandType, ApplicationCommandOptionType } = require("discord.js");
const { owner } = require("../../config.json");

module.exports = {
    name: "editar_painel",
    description: "[🤖] Edita o painel de clonagem (formato de componente de texto).",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "id_mensagem",
            description: "O ID da mensagem do painel que você deseja editar.",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "titulo",
            description: "O novo título do painel (ex: FLUX FORN - CLONER).",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "descricao_curta",
            description: "A descrição curta principal (abaixo do título).",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "rodape",
            description: "O novo texto de rodapé (abaixo dos botões).",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
    ],

    run: async (client, interaction) => {
        // ... (Verificação de owner, deferReply, e obtenção de options) ...
        if (interaction.user.id !== owner) {
            return interaction.reply({
                content: "<:no:1409545199461597337> Você não tem permissão para usar este comando.",
                ephemeral: true,
            });
        }
        await interaction.deferReply({ ephemeral: true });

        const mensagemId = interaction.options.getString("id_mensagem");
        const novoTitulo = interaction.options.getString("titulo");
        const novaDescricaoCurta = interaction.options.getString("descricao_curta");
        const novoRodape = interaction.options.getString("rodape");

        try {
            const mensagem = await interaction.channel.messages.fetch(mensagemId).catch(() => null);

            if (!mensagem) {
                return interaction.editReply({ content: "<:no:1409545199461597337> Mensagem não encontrada neste canal." });
            }
            
            const componentesExistentes = mensagem.components;

            if (!componentesExistentes || componentesExistentes.length === 0) {
                return interaction.editReply({
                    content: "<:no:1409545199461597337> Esta mensagem não é um painel de clonagem válido (sem componentes).",
                });
            }

            // Usamos uma cópia dos componentes existentes para modificá-los
            let componentesNovos = JSON.parse(JSON.stringify(componentesExistentes));
            
            // --- Variáveis de Conteúdo (Baseado no seu painel original) ---
            
            // O conteúdo principal é o grande bloco de texto
            const TEXTO_DICAS = "\n\n**COMO UTILIZAR & DICAS**\n\n> Para clonar um servidor será necessário:\n\n- ID Do Servidor que será Clonado\n- ID Do Servidor que será Copiado\n- Token de uma conta (DICA: Não recomendo usar sua conta principal)\n\n> A Conta tem que estar nos dois servidores para funcionar. Recomendo também alterar a senha da sua conta para o token resetar.\n\n> Para clonar site apenas será necessário a URL do site.\n\n**AVISO:** Não tente clonar sites grandes, o bot ainda não suporta sites grandes ou muito complexos, clone apenas portfólio e etc.";

            // Tenta obter o título e descrição existente para usar como fallback
            const conteudoExistente = componentesExistentes[0]?.components[0]?.components[0]?.content || "";
            let tituloExistente = conteudoExistente.match(/\*\*(.*?)\*\*/)?.[1] || "16M - CLONER";
            let descricaoExistente = conteudoExistente.includes('>') ? conteudoExistente.split('\n\n')[1] : "> Olá Membro! Utilize os botões abaixo para acessar o painel de clonar de Servidor & Site.";

            // 1. Monta o novo Conteúdo Principal (Type 10)
            const tituloFinal = novoTitulo || tituloExistente;
            const descricaoFinal = novaDescricaoCurta || descricaoExistente;
            
            let novoConteudo = `**${tituloFinal}**\n\n${descricaoFinal}${TEXTO_DICAS}`;

            // 2. Edita o texto principal (Type 10)
            if (componentesNovos[0]?.components[0]?.components[0]?.type === 10) {
                componentesNovos[0].components[0].components[0].content = novoConteudo;
            }

            // 3. Edita o rodapé (Type 10), que deve ser o último componente
            // Mantém o rodapé existente se não houver novo
            const rodapeFinal = novoRodape ? `-# ${novoRodape}` : (componentesExistentes[0]?.components[3]?.content || "Quem for o engraçadnho de usar o nosso cloner para clonar o nosso servidor vai rodar !");
            
            if (componentesNovos[0]?.components[3]?.type === 10) {
                componentesNovos[0].components[3].content = rodapeFinal;
            }

            // 4. Edita a mensagem
            await mensagem.edit({
                content: "", // A mensagem de texto principal fica vazia
                components: componentesNovos,
            });

            return interaction.editReply({
                content: "✅ Painel de clonagem editado com sucesso.",
            });

        } catch (error) {
            console.error("Erro ao editar o painel:", error);
            return interaction.editReply({
                content: `❌ Erro ao editar o painel. Detalhes: \`${error.message}\``,
            });
        }
    },
};