const { getEmailPermutations } = require("../utils/emailPermutations");
const { verifyEmail } = require("../utils/dns");
const { delay } = require("../utils/throttle");

const findEmail = async (first, last, domain) => {
  const emails = getEmailPermutations(first, last, domain);

  for (const email of emails) {
    const isValid = await verifyEmail(email);
    if (isValid) {
      console.warn(`found this email: ${email}`);
      return email;
    } else {
      // delay to avoid spamming server
      await delay(1000);
    }
  }
  console.warn(`tried these emails: ${emails}, none were valid`);
  return null;
};

module.exports = {
  findEmail,
};
