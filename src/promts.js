const validator = require("validator");
const { question } = require("../utils/readline");
const { isValidName } = require("../utils/validation");

const getName = async (prompt) => {
  let name = "";

  // Continue looping until a non-empty, trimmed first name is entered
  while (true) {
    name = await question(prompt);

    // Trim the input to remove leading/trailing whitespace
    name = name.trim().toLocaleLowerCase();

    if (name) {
      if (!isValidName(name)) {
        console.log("Name contains invalid characters. Please try again.\n");
      } else {
        break;
      }
    } else {
      // Invalid input, inform the user and reprompt
      console.log("Name cannot be empty. Please try again.\n");
    }
  }

  return name;
};

const getDomain = async () => {
  let domain = "";

  // Continue looping until a non-empty, trimmed first name is entered
  while (true) {
    domain = await question("Please enter domain: ");

    // Trim the input to remove leading/trailing whitespace
    domain = domain.trim().toLocaleLowerCase();

    if (domain) {
      if (!validator.isFQDN(domain)) {
        console.log("Must be a valid domain. Please try again.\n");
      } else {
        break;
      }
    } else {
      // Invalid input, inform the user and reprompt
      console.log("Name cannot be empty. Please try again.\n");
    }
  }

  return domain;
};

// Function to ask the user if they want to perform another search
const askToContinue = async () => {
  while (true) {
    const answer = await question(
      "Do you want to perform another search? (y/n): "
    );
    const normalized = answer.trim().toLowerCase();
    if (normalized === "y" || normalized === "yes") {
      return true;
    } else if (normalized === "n" || normalized === "no") {
      return false;
    } else {
      console.log("Please answer with 'y' or 'n'.\n");
    }
  }
};

module.exports = {
  getDomain,
  getName,
  askToContinue,
};
