const { JsonRpcBatchProvider } = require("@ethersproject/providers");
const fetch = require("node-fetch");

//cosas Discord
//cosas telegram
const TelegramBot = require("node-telegram-bot-api");
const { CONNECTING } = require("ws");
const token = 'YourToken'
const bot = new TelegramBot(token, { polling: true });
const telegramChannel = "@YourChannel";


let BalanceResponse = ''
let balance = ''
let arrayEmptyWallets = []
const arrayCosmos = [


  {
    name: "cosmosHub",
    rpc: "https://cosmoshub-lcd.stakely.io",
    wallet: "cosmos1pyssygjaj8mvu3skp7aj4q9m9hj87cnkggyf7c",
    amount: 0.08912655971479501,
  },
  {
    name: "juno",
    rpc: "https://juno-lcd.stakely.io",
    wallet: "juno1pyssygjaj8mvu3skp7aj4q9m9hj87cnk768jey",
    amount: 0.15723270440251572,
  },
  {
    name: "regen",
    rpc: "https://rest.cosmos.directory/regen",
    wallet: "regen1pyssygjaj8mvu3skp7aj4q9m9hj87cnkh204gu",
    amount: 2.705100737951481,
  },
  {
    name: "lum",
    rpc: "https://rest.cosmos.directory/lumnetwork",
    wallet: "lum1pyssygjaj8mvu3skp7aj4q9m9hj87cnkazeqtv",
    amount: 345.90107229332415,

  },
  {
    name: "iris",
    rpc: "https://rest.cosmos.directory/irisnet",
    wallet: "iaa1pyssygjaj8mvu3skp7aj4q9m9hj87cnka2ycuf",
    amount: 45.90735894963963,
  },
  {
    name: "desmos",
    rpc: "https://rest.cosmos.directory/desmos",
    wallet: "desmos1pyssygjaj8mvu3skp7aj4q9m9hj87cnkusfefq",
    amount: 21.037130535394972,
  },
  {
    name: "secret",
    rpc: "https://rest.cosmos.directory/secretnetwork",
    wallet: "secret1pyssygjaj8mvu3skp7aj4q9m9hj87cnk2dsqry",
    amount: 0.4587155963302752,
  },
  {
    name: "sifchain",
    rpc: "https://rest.cosmos.directory/sifchain",
    wallet: "sif1pyssygjaj8mvu3skp7aj4q9m9hj87cnkd4tl3n",
    amount: 13.553073837146265,
  },
  {
    name: "crescent",
    rpc: "https://rest.cosmos.directory/crescent",
    wallet: "cre1pyssygjaj8mvu3skp7aj4q9m9hj87cnkvqhvt4",
    amount: 1.3157,
  },
  {
    name: "bitcanna",
    rpc: "https://rest.cosmos.directory/bitcanna",
    wallet: "bcna1pyssygjaj8mvu3skp7aj4q9m9hj87cnkjc5gk2",
    amount: 43.91357807834182,
  }
]

const arrayEVM = [

  {
    name: "fantom",
    rpc: "https://rpcapi.fantom.network/",
    wallet: "0x0e79065B5F11b5BD1e62B935A600976ffF3754B9",
    amount: "2.569729613050115",
    method: "eth_getBalance",
    params: ["0x0e79065B5F11b5BD1e62B935A600976ffF3754B9", 'latest'],
    id: 1,
  },
  {
    name: "kukoin",
    rpc: "https://rpc-mainnet.kcc.network/",
    wallet: "0x0e79065B5F11b5BD1e62B935A600976ffF3754B9",
    amount: 0.07692307692307693,
    method: "eth_getBalance",
    id: 1,
    params: ["0x0e79065B5F11b5BD1e62B935A600976ffF3754B9", 'latest']
  },
  {
    name: "evmos",
    rpc: "https://evmos-json-rpc.stakely.io/",
    wallet: "0x0e79065B5F11b5BD1e62B935A600976ffF3754B9",
    amount: 0.7142857142857143,
    method: "eth_getBalance",
    id: 1,
    params: ["0x0e79065B5F11b5BD1e62B935A600976ffF3754B9", 'latest']
  },
  {
    name: "fuse",
    rpc: "https://rpc.fuse.io/",
    wallet: "0x0e79065B5F11b5BD1e62B935A600976ffF3754B9",
    amount: 5.915794579949006,
    method: "eth_getBalance",
    id: 1,
    params: ["0x0e79065B5F11b5BD1e62B935A600976ffF3754B9", 'latest']
  },
  {
    name: "harmony",
    rpc: "https://api.s0.t.hmny.io/",
    wallet: "0x0e79065B5F11b5BD1e62B935A600976ffF3754B9",
    amount: 20.74344507135745,
    method: "hmyv2_getBalance",
    id: 1,
    params: ["0x0e79065B5F11b5BD1e62B935A600976ffF3754B9"]
  },
  {
    name: "telos",
    rpc: "https://mainnet.telos.net/evm",
    wallet: "0x0e79065B5F11b5BD1e62B935A600976ffF3754B9",
    amount: 2.874356144223694,
    method: "eth_getBalance",
    id: 9001,
    params: ["0x0e79065B5F11b5BD1e62B935A600976ffF3754B9"]
  },
  {
    name: "aurora",
    rpc: "https://mainnet.aurora.dev",
    wallet: "0x0e79065B5F11b5BD1e62B935A600976ffF3754B9",
    amount: 0.2849002849002849,
    method: "eth_getBalance",
    id: 1,
    params: ["0x0e79065B5F11b5BD1e62B935A600976ffF3754B9", 'latest']
  },
  {
    name: "velas",
    rpc: "https://explorer.velas.com/rpc/",
    wallet: "0x0e79065B5F11b5BD1e62B935A600976ffF3754B9",
    amount: 13.896029904256354,
    method: "eth_getBalance",
    id: 1,
    params: ["0x0e79065B5F11b5BD1e62B935A600976ffF3754B9", 'latest']
  },
  {
    name: "bsc",
    rpc: "https://bsc-dataseed4.binance.org",
    wallet: "0x0e79065B5F11b5BD1e62B935A600976ffF3754B9",
    amount: 0.003444831031037927,
    method: "eth_getBalance",
    id: 1,
    params: ["0x0e79065B5F11b5BD1e62B935A600976ffF3754B9", 'latest']
  },
  {
    name: "avalanche",
    rpc: "https://api.avax.network/ext/bc/C/rpc",
    wallet: "0x0e79065B5F11b5BD1e62B935A600976ffF3754B9",
    amount: 0.03045066991473812,
    method: "eth_getBalance",
    id: 1,
    params: ["0x0e79065B5F11b5BD1e62B935A600976ffF3754B9", 'latest']
  }
]



const all = async () => {

  console.log(arrayCosmos.length + arrayEVM.length + 1)


  //EVM
  for (const array of arrayEVM) {
    let link = array.rpc
    //console.log(array.name)
    let res = await fetch(link, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: array.method,
        params: array.params,
        id: array.id,
      }),
    })

    res = await res.json();
    //console.log(res)
    //console.log(res.result);
    BalanceResponse = res.result
    //console.log(BalanceResponse)


    //Comprobamos si la respuesta está en decimal o en hexadecimal
    try {
      if (Boolean(BalanceResponse.match(/^0x[0-9a-f]+$/i))) {

        balance = parseInt(res.result, 16);
        balance = res.result * 0.000000000000000001;
      } else {
        console.log('dec')
      }
    } catch (error) {
      balance = res.result * 0.000000000000000001;
    }

    //Comprobamos si el balance de la wallet es menor que 1$
    if (balance < array.amount) {
      let response = `Balance en ${array.name} < 1$  Balance: ${balance}`
      arrayEmptyWallets.push(response)
      console.log(`Balance en ${array.name} < 1$  Balance: ${balance}`);
      //return [[`Balance en ${array.name} < 1$  Balance: " + ${balance}`]];
    }
  }




  //CosmosHub


  for (const array of arrayCosmos) {
    console.log(array.name)
    let Link = array.rpc + "/cosmos/bank/v1beta1/balances/" + array.wallet
    let res = await fetch(Link);
    res = await res.json();
    //console.log(res);
    let balance = res.balances[0].amount * 0.000001;
    //console.log(balance);
    //console.log(array.amount)
    if (balance < array.amount) {

      console.log(`Balance en ${array.name} < 1$  Balance: " + ${balance}`);
      let response = `Balance en ${array.name} < 1$  Balance: ${balance}`
      arrayEmptyWallets.push(response)
      //return [[`Balance en ${array.name} < 1$  Balance: " + ${balance}`]];
    }
  }



  //Random (en este caso es SOLANA porque es un poco diferente a las demas EVM)

  console.log("Solana");
  let link = "https://api.mainnet-beta.solana.com";
  let res = await fetch(link, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "getBalance",
      params: ["3EuATT6cASS5ttHKYuGGdJzJKR6wZjs1m33XKJvPCjuL"],
      id: 1
    }),
  });
  //console.log(res);

  let SOLBalance = await res.json()
  //console.log(SOLBalance)
  //console.log(SOLBalance.result.value);

  SOLBalanceValue = SOLBalance.result.value * 0.000000001;
  //console.log(SOLBalanceValue);

  if (SOLBalance < 0.02053388090349076) {
    console.log("Balance en Solana < 1$   Balance: " + SOLBalance);
    let response = "Balance en Solana < 1$   Balance: " + SOLBalance
    arrayEmptyWallets.push(response)

  }



  let text = "FAUCETS A RELLENAR!!!!!!\n\n"
  for (const array of arrayEmptyWallets) {
    text = text + array + "\n"
  }
  text = text + "https://stakely.io/en/faucet";
  console.log(text)

  bot.sendMessage(telegramChannel, text);

  return text
  //return JSON.stringify(arrayEmptyWallets, null, '  ')
}


const cosmosHub = async () => {

  for (const array of arrayCosmos) {
    console.log(array.name)
    let Link = array.rpc + "/cosmos/bank/v1beta1/balances/" + array.wallet
    let res = await fetch(Link);
    res = await res.json();
    //console.log(res);
    let balance = res.balances[0].amount * 0.000001;
    //console.log(balance);
    //console.log(array.amount)
    if (balance < array.amount) {
      console.log(`Balance en ${array.name} < 1$  Balance: " + ${balance}`);
      //return [[`Balance en ${array.name} < 1$  Balance: " + ${balance}`]];
    }
  }
}


const test = async () => {
  console.log("Starting...");
  let evmosLink = "https://evmexplorer.testnet.velas.com/rpc";
  let res = await fetch(evmosLink, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_getBalance",
      params: ["0x0e79065B5F11b5BD1e62B935A600976ffF3754B9",
        "latest"],
      id: 1,
    }),
  });
  console.log(res);
  res = await res.json();
  console.log(res);
  let evmosBalance = parseInt(res.result, 16);
  evmosBalance = evmosBalance * 0.000000000000000001;
  console.log(evmosBalance);

  if (evmosBalance < 0.7142857142857143) {
    console.log("Balance en EVMOS < 1$   Balance: " + evmosBalance);
    return [["Balance en EVMOS < 1$   Balance: " + evmosBalance]];
  }
};



if (process.argv[2] === "all") {
  console.log(process.argv)
  all();
} else if (process.argv[2] === "test") {
  test()
} else if (process.argv[2] === "cosmosHub") {
  cosmosHub()
} else if (process.argv[2] === "EVM") {
  EVM()
}

module.exports = {
  all
}