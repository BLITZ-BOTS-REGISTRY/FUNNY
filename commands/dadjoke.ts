import { SlashCommandBuilder, Client, CommandInteraction, EmbedBuilder } from "npm:discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("dadjoke")
    .setDescription("Get a random dad joke"),
    action: async (_client: Client, interaction: CommandInteraction,) => {
      
        const response = await fetch("https://icanhazdadjoke.com/", {
            headers: {
              "Accept": "application/json", 
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch dad joke.");
          }
      
          const data = await response.json();

          interaction.reply({ content: `${data.joke}`})
  }
};
