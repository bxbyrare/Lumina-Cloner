const { ApplicationCommandType } = require("discord.js");
const { owner } = require("../../config.json");

module.exports = {
  name: "painel_cloner",
  description: "[🤖] Envie o painel de clonagem.",
  type: ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    if (interaction.user.id !== owner) {
      return interaction.reply({
        content: "<:no:1409545199461597337> Você não tem permissão para usar este comando.",
        ephemeral: true,
      });
    } 

    try {
      await interaction.reply({
        content: "✅ Sucesso",
        ephemeral: true,
      });

      const BotFoto = "https://cdn.discordapp.com/attachments/1445833065325658123/1451246813691772990/image.png?ex=69457a6b&is=694428eb&hm=e5abf82e90d870a6325713e89851cd15f9a8f4f058d846ee8404efa1ceb4bd85&"

      await interaction.channel.send({
        content: "",
        components: [
          {
            type: 17,
            components: [
              {
                type: 9,
                accessory: {
                  type: 11,
                  media: {
                    url: BotFoto,
                  },
                  description: null,
                  spoiler: false,
                },
                components: [
                  {
                    type: 10,
                    content: `**Cloud Store - Painel de Clonagem**

> Olá Membro! Utilize os botões abaixo para acessar o painel de clonar de Servidor & Site.

**COMO UTILIZAR & DICAS**

> Para clonar um servidor será necessário:

- ID Do Servidor que será Clonado
- ID Do Servidor que será Copiado
- Token de uma conta (DICA: Não recomendo usar sua conta principal)

> A Conta tem que estar nos dois servidores para funcionar. Recomendo também alterar a senha da sua conta para o token resetar.

> Para clonar site apenas será necessário a URL do site.
`,
                  },
                ],
              },
              {
                type: 14,
                spacing: 1,
                divider: true,
              },
              {
                type: 1,
                components: [
                  {
                    type: 2,
                    custom_id: "panel_cloner",
                    label: "Clonar Servidor",
                    style: 2,
                    emoji: {
                      id: "1426559071233773621",
                    },
                  },
                  {
                    type: 2,
                    custom_id: "clonersite",
                    label: "Clonar Site",
                    style: 2,
                    emoji: {
                      id: "1426559071233773621",
                      
                    },
                  },
                  {
                    type: 2,
                    label: "Ajuda?",
                    style: 5,
                    url: "https://discord.com/channels/1425820319238586412/1436475972814770298",
                    emoji: {
                      id: "1425167713973702858",
                      
                    },
                  },                
                ],
              },
              {
                type: 10,
                content: "-# Quem for o engraçadnho de usar o nosso cloner para clonar o nosso servidor vai rodar !",
              },
            ],
          },
        ],
        flags: 32768,
      });

    } catch (error) {
      console.error("Erro:", error);
      if (!interaction.replied) {
        await interaction.reply({
          content: "❌ Vish deu erro aqui pae",
          ephemeral: true,
        });
      }
    }
  }, 
};
