const Discord = require('discord.js')
const dotenv = require('dotenv')
import 'C:\Users\nicol\Desktop\solidity\StakelyFaucetBalancesBot.js';
dotenv.config()

const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    console.log('the bot is ready')
})

client.on('messageCreate', async (message) => {
    if (message.content === 'ping') {
        await message.reply({
            content: all()
        })
    }
})

client.login('OTgwMTU5MDc4MDE1ODQ4NDY4.Gsj_qI.MRoc4mgF6egZTL2GapEBoCUbWjl_74QTHe9v_k')