require(`dotenv`).config()
const SHODAN_TOKEN = process.env.SHODAN_TOKEN
const CLIENT_ID = process.env.CLIENT_ID
const TRACKING_CHANNEL_NAME = process.env.TRACKING_CHANNEL_NAME
const SHODAN_API = process.env.SHODAN_API

const fs = require('node:fs')
const path = require('node:path')
const { SlashCommandBuilder, Routes } = require('discord.js')
const { REST } = require('@discordjs/rest')
const { Client, EmbedBuilder, GatewayIntentBits } = require(`discord.js`);
const InvitesTracker = require('@androz2091/discord-invites-tracker');
const responseTemplates = require('./embeds'); // discord embed messages
const setServer = require('./server-setup/setup-server'); // client, tracker, rest setup
const { joinVoiceChannel, VoiceConnectionStatus, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const axios = require('axios');

const commands = []
const commandFiles = fs
  .readdirSync(path.join(__dirname, `commands`))
  .filter((file) => file.endsWith(`.js`))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  console.log(command)
  commands.push(command.data.toJSON())
}

(async () => {
  try {
    console.log(`Started refreshing application (/) commands.`)
    setServer.rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands })
      .then(console.log(`Successfully reloaded application (/) commands. 
        Registered ${commands.length} commands.`))

  } catch (error) {
    console.error(error)
  }
})()

setServer.client.on(`interactionCreate`, async (interaction) => {
  if (!interaction.isCommand()) return

  if (interaction.commandName === `done`) {

    let log = interaction.options.getString(`log`)
    console.log(log)
    
    const embed = responseTemplates.searchIpResp(data.city)
    await interaction.reply({ embeds: [embed] })

  }
})

setServer.client.on(`ready`, () => {
  console.log(`Logged in as ${setServer.client.user.tag}!`)
})

setServer.client.login(SHODAN_TOKEN)
