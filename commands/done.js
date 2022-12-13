const { SlashCommandBuilder } = require(`discord.js`)

module.exports = {
  data: new SlashCommandBuilder()
    .setName('done')
    .addStringOption(option =>
      option.setName('log')
        .setDescription('Log hinzufügen'))
    .setDescription('Log hinzufügen')
}
