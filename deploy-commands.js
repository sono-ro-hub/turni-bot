const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const commands = [
  new SlashCommandBuilder()
    .setName('creaturno')
    .setDescription('Crea un turno')
    .addStringOption(option =>
      option.setName('nome')
        .setDescription('Nome turno')
        .setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName('turni')
    .setDescription('Mostra turni'),

  new SlashCommandBuilder()
    .setName('join')
    .setDescription('Unisciti a un turno')
    .addIntegerOption(option =>
      option.setName('numero')
        .setDescription('Numero turno')
        .setRequired(true)
    )
].map(c => c.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log("Registrazione comandi...");
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );
    console.log("Comandi registrati!");
  } catch (err) {
    console.error(err);
  }
})();
