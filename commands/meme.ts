import { SlashCommandBuilder, Client, CommandInteraction, EmbedBuilder } from "npm:discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Get a random meme"),
    action: async (_client: Client, interaction: CommandInteraction, config: { meme_subreddits: [] }) => {
        const randomSubreddit = config.meme_subreddits[Math.floor(Math.random() * config.meme_subreddits.length)];

        const response = await fetch(`https://www.reddit.com/r/${randomSubreddit}/hot.json?limit=50`);
        if (!response.ok) throw new Error(`Failed to fetch subreddit: ${randomSubreddit}`);

        const data = await response.json();
        const posts = data.data.children;

        const imagePosts = posts.filter((post: any) => post.data.post_hint === "image");
    if (imagePosts.length === 0) throw new Error(`No image posts found in subreddit: ${randomSubreddit}`);


    const randomPost = imagePosts[Math.floor(Math.random() * imagePosts.length)].data;


    const embed = new EmbedBuilder()
    .setTitle(randomPost.title)
    .setDescription(`From subreddit: [r/${randomPost.subreddit}](https://reddit.com/r/${randomPost.subreddit})`)
    .setImage(randomPost.url)
    .setFooter({ text: `Upvotes: ${randomPost.ups}`})

    interaction.reply({ embeds: [embed] })

  }
};
