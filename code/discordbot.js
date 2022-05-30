const Discord = require('discord.js')
//const Faucet = require('StakelyFaucetBalancesBot.js')
const Faucet = require('./StakelyFaucetBalancesBot.js');
//dotenv.config()

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
    if (message.content === '/faucet') {
        await message.reply({
            content: await Faucet.all()
        })
    }
})

client.login('YourToken')