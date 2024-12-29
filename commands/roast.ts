import { SlashCommandBuilder, Client, CommandInteraction, EmbedBuilder } from "discord.js";


export default {
  data: new SlashCommandBuilder()
    .setName("roast")
    .setDescription("Roast yourself, or someone else")
    .addUserOption(option => 
      option.setName('user')
        .setDescription('User to roast')
        .setRequired(false)),  

  action: async (_client: Client, interaction: CommandInteraction, config: { roasts: string[] }) => {
    
    const userToRoast = interaction.options.getUser('user') || interaction.user;

    
    const randomRoast = config.roasts[Math.floor(Math.random() * config.roasts.length)];

    
    const roastMessage = randomRoast.replace(/{user}/g, userToRoast.toString());

    
    const embed = new EmbedBuilder()
      .setTitle("Roast!")
      .setDescription(roastMessage)
      .setFooter({ text: `Roasted by ${interaction.user.tag}` });

    
    interaction.reply({ embeds: [embed] });
  }
};
