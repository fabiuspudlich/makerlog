const { EmbedBuilder } = require(`discord.js`)

function errNoVoiceChannel() {
  return new EmbedBuilder()
    .setTitle(`Error`)
    .setDescription(`I couldn't find a voice channel.`)
    .setColor(`#ff0000`)
}

module.exports = {
  errNoVoiceChannel
}
