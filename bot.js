const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// Bot settings
let bot = mineflayer.createBot({
  host: 'wernotsane.aternos.me',  // Your server IP
  port: 56435,                    // Your server port
  username: 'BotName',            // Bot's username
});

// Reconnect function if the bot disconnects
bot.on('end', () => {
  console.log('Bot disconnected, reconnecting...');
  setTimeout(connectBot, 5000); // Try reconnecting after 5 seconds
});

// Function to reconnect the bot
function connectBot() {
  bot = mineflayer.createBot({
    host: 'wernotsane.aternos.me',
    port: 56435,
    username: 'BotName',
  });
}

// Optional: login if your server requires a password
bot.on('login', () => {
  console.log('Bot logged in!');
  bot.chat('/register botpassword botpassword'); // If registration is required
  bot.chat('/login botpassword');               // If login is required
});

// Error handler to keep bot from crashing
bot.on('error', (err) => console.log('Bot error:', err));

// Express server to keep Glitch from idling
app.get('/', (req, res) => res.send('Bot is running!'));

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Wake-up server active on port ' + listener.address().port);
});
