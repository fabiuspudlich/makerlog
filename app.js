require(`dotenv`).config()
//var environment = process.env.NODE_ENV
const SHODAN_TOKEN = process.env.SHODAN_TOKEN
const CLIENT_ID = process.env.CLIENT_ID
const TRACKING_CHANNEL_NAME = process.env.TRACKING_CHANNEL_NAME

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

"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = "secretkey23456";
const moment = require('moment')

const app = express(); 
const router = express.Router();
app.use(cors())

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb' }))

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const http = require('http');
const httpserver = http.createServer(app);

var coffee_routes = require('./coffee_routes');

app.use('/', coffee_routes);

router.get('/', (req, res) => {
    res.status(200).send('This is an server');
});

app.use(router);

const publicDirectoryPath = path.join(__dirname, 'public')
app.use(express.static(publicDirectoryPath))




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

module.exports = {
  server: app
}
