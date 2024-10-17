const { getName, getDomain, askToContinue } = require("./promts");
const { findEmail } = require("./emailSearch");
const { rl } = require("../utils/readline");

const newSearch = async () => {
  try {
    const first = await getName("Please enter first name: ");
    const last = await getName("Please enter last name: ");
    const domain = await getDomain();
    await findEmail(first, last, domain);
  } catch (e) {
    console.warn(`sorry this error occurred: ${e}`);
  }
};

const main = async () => {
  console.log("=== Email Finder ===\n");
  let continueSearching = true;

  while (continueSearching) {
    await newSearch();
    continueSearching = await askToContinue();
    console.log();
  }

  console.log("Thank you for using Email Finder. Goodbye!");
  rl.close();
};

main();
