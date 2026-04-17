const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

const app = express();
app.get('/', (req, res) => res.send('Bot online'));
app.listen(3000);

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const TOKEN = process.env.TOKEN;

let turni = [];

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  // /creaturno
  if (interaction.commandName === 'creaturno') {
    const nome = interaction.options.getString('nome');

    turni.push({ nome, utenti: [] });

    await interaction.reply(`✅ Turno creato: **${nome}**`);
  }

  // /turni
  if (interaction.commandName === 'turni') {
    if (turni.length === 0)
      return interaction.reply("Nessun turno disponibile");

    let msg = "📅 Turni:\n";
    turni.forEach((t, i) => {
      msg += `${i + 1}. ${t.nome} (${t.utenti.length} persone)\n`;
    });

    await interaction.reply(msg);
  }

  // /join
  if (interaction.commandName === 'join') {
    const num = interaction.options.getInteger('numero') - 1;

    if (!turni[num])
      return interaction.reply("Turno non valido");

    turni[num].utenti.push(interaction.user.username);

    await interaction.reply(`✔️ Ti sei unito a **${turni[num].nome}**`);
  }
});

client.once('ready', () => {
  console.log(`Bot online come ${client.user.tag}`);
});

client.login(TOKEN);
