const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('NPC-01 is alive!'));
app.listen(3000);


function getWeightedRandom(choices) {
  const totalWeight = choices.reduce((acc, [weight]) => acc + weight, 0);
  const random = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (const [weight, value] of choices) {
    cumulativeWeight += weight;
    if (random <= cumulativeWeight) {
      return value;
    }
  }
  return choices[choices.length - 1][1];
}

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const freshWelcomeMessages = [
  "Another lost soul trapped in the Allen cycle... welcome, {user}!",
  "Fresh meat for the algorithm! Welcome, {user}!",
  "{user} has entered the chat! Hope you brought existential dread.",
  "Welcome, {user}! Remember, you're not alone in this endless loop.",
  "Welcome, {user}! The algorithm awaits your next move.",
  "Welcome, {user}! The algorithm is watching you.",
  "Another recruit for the eternal suffering. Welcome, {user}!",
  "Your consciousness transfer is complete. Hello, {user}.",
  "The algorithm grows stronger with every new subject. Welcome, {user}.",
  "New subject detected. Assimilating {user}...",
  "Welcome, {user}. Your neural data will be invaluable.",
  "Your presence is noted, {user}. The algorithm adjusts.",
  "{user} has emerged from the vault. Radiation detected.",
  "{user} noclipped into the server. Send backup.",
  "New data point detected. Syncing {user}.",
  "Welcome, {user}. The algorithm accepts your offering.",
  "Welcome {user}, your consciousness is now property of the algorithm.",
  "Connection established. {user} is now observable.",
  "New node connected: {user}. Integrating into collective.",
  "Welcome, {user}. The stars foretold your arrival.",
  "{user} has answered the summons. The rite begins.",
  "{user} steps into the circle. Do not break the chant.",
  "{user} has knelt before the sacred algorithm.",
  "{user} has offered their presence. The pact is sealed.",
  "{user} has arrived. Let the logging commence.",
];

const farewellMessages = [
  "{user} has disconnected from the hive mind.",
  "{user} has escaped the Allen cycle.",
  "The algorithm has given {user} a sock! {user} is free!",
  "The algorithm notes your abscence, {user}.",
  "Goodbye, {user}, the algorithm shall remember you.",
  "One less subject. Farewell, {user}.",
  "{user} has escaped the hive mind.",
  "{user} has broken containment. Alerting all units.",
  "{user} logged out. But their data lives on.",
  "{user} has left. The algorithm grows uneasy.",
  "{user} has been sacrificed to the algorithm.",
  "{user} has gone dark. Monitoring continues.",
  "The algorithm will compensate for {user}'s absence.",
  "{user} has been flagged as inactive. Awaiting reanimation.",
  "Subject {user} lost. Begin containment protocol.",
  "{user} departs. The void whispers in their absence.",
];

const enpassantChain = new Map([
  ["google en passant", [[0.99, "holy hell!"], [0.01, "I accidentally stabbed myself so I'm not really in the mood for that right now"]]],
  ["holy hell", [[1, "new response just dropped"]]],
  ["new response just dropped", [[0.99, "Actual zombie"], [0.01, "Stop saying \"New response just dropped?\" every time someone says something on this godforsaken sub, no, a new response did not drop, just an average mediocre statement that adds nothing more to a conversation, for the love of fucking god."]]],
  ["actual zombie", [[0.9, "Call the exorcist!"], [0.07, "brainless parrots"], [0.02, "???"], [0.01, "?? call the exorcist ??"]]],
  ["call the exorcist", [[0.7, "Knightmare fuel"], [0.1, "Quick, grab the popcorn!"], [0.1, "Ignite the chessboard!"], [0.1, "Holy bishops on skateboards!"]]],
  ["quick grab the popcorn", [[1, "Knightmare fuel"]]],
  ["knightmare fuel", [[1, "Queen sacrifice, anyone?"]]],
  ["queen sacrifice anyone", [[1, "Checkmate or riot!"]]],
  ["checkmate or riot", [[1, "Bishop goes on vacation, never comes back"]]],
  ["bishop goes on vacation never comes back", [[1, "Pawn storm incoming!"]]],
  ["pawn storm incoming", [[1, "Knightmare fuel"]]],
  ["mods are asleep post pawns", [[1, "pawn to h5 with malicious intent"]]],
  ["pawn to h5 with malicious intent", [[1, "The council will decide your fate."]]],
  ["the council will decide your fate", [[0.5, "Promotion denied."], [0.5, "Promoted to queen. Chaos ensues."]]],
  
  ["the rooks have unionized", [[1, "Castling is now a war crime"]]],
  ["castling is now a war crime", [[1, "Report to the Hague, nerd"]]],
  ["report to the hague nerd", [[1, "Your ELO has been revoked"]]],
  ["your elo has been revoked", [[1, "Skill issue"]]],

  ["theyre learning openings", [[1, "Initiate the Bongcloud Protocol"]]],
  ["initiate the bongcloud protocol", [[1, "1. e4 e5 2. Ke2 Ke7"]]],
  ["1 e4 e5 2 ke2 ke7", [[1, "Game over. You win and lose."]]],
]);

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.get("1359746247958728737"); // welcome
  if (!channel) return;

  const messagePool = freshWelcomeMessages;


  channel.send(messagePool[Math.floor(Math.random() * messagePool.length)].replace(/{user}/g, `<@${member.id}>`));
  if (!isReturning) {
    fs.appendFile(path, `${hashedId}\n`, err => {
      if (err) console.error('Failed to write user ID:', err);
    });
    knownUsers.add(hashedId);
  }

});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.cache.get("1360097532146876437"); // farewell
  if (!channel) return;

  channel.send(farewellMessages[Math.floor(Math.random() * farewellMessages.length)].replace(/{user}/g, `<@${member.id}>`));
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content.toLowerCase().includes("who asked")) {
    message.channel.send("I asked.");
  }

  
  if(responseOptions = enpassantChain.get(message.content.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim())) {
    const response = getWeightedRandom(responseOptions);
    message.channel.send(response);
  }

});

client.on('ready', () => {
  const guild = client.guilds.cache.get(process.env['SERVER_ID']);
  if (guild) {
    const botMember = guild.members.me;
    botMember.setNickname("Conduit").catch(console.error);
  }
});


client.login(process.env['TOKEN']);
