const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Promisified question method for readline
const question = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

module.exports = {
  rl,
  question,
};
