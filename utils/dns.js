const net = require("net");
const dns = require("dns").promises;

// Lookup MX records for the domain
const lookupMX = async (domain) => {
  try {
    const addresses = await dns.resolveMx(domain);
    // Sort by priority (lower number means higher priority)
    return addresses.sort((a, b) => a.priority - b.priority);
  } catch (error) {
    throw new Error(
      `Failed to resolve MX records for domain: ${error.message}`
    );
  }
};

// Function to check each MX server and ensure it returns a 2xx status code
const checkMXServer = (mxRecord, email) => {
  return new Promise((resolve) => {
    const client = net.createConnection(25, mxRecord.exchange, () => {
      client.write(`HELO example.com\r\n`); // Use a real domain
      client.write(`MAIL FROM:<noreply@example.com>\r\n`); // Use a real sender
      client.write(`RCPT TO:<${email}>\r\n`);
      client.write(`QUIT\r\n`); // Properly terminate the SMTP session
    });

    let serverResponse = "";

    client.on("data", (data) => {
      serverResponse += data.toString();
    });

    client.on("end", () => {
      // Process the entire response after the connection ends
      const responseLines = serverResponse.split("\n");
      let invalidResponseFound = false;

      for (const line of responseLines) {
        const match = line.match(/^(\d{3})/); // Match 3-digit codes at the start of the line
        if (match) {
          const responseCode = parseInt(match[1], 10);
          if (responseCode >= 500) {
            // If any 5xx code, treat as invalid
            console.log(
              `Invalid response from ${mxRecord.exchange}: ${responseCode}`
            );
            invalidResponseFound = true;
            break; // No need to check further lines
          }
        }
      }

      if (invalidResponseFound) {
        resolve(false);
      } else {
        resolve(true);
      }
    });

    client.on("error", (err) => {
      console.error(`Error with server ${mxRecord.exchange}: ${err.message}`);
      resolve(false); // Treat error as invalid
      client.end();
    });

    // Handle timeout to prevent hanging connections
    client.setTimeout(5000, () => {
      console.error(`Timeout with server ${mxRecord.exchange}`);
      resolve(false);
      client.end();
    });
  });
};

// Main function to verify email by checking all MX servers
const verifyEmail = async (email) => {
  const domain = email.split("@")[1];

  try {
    const mxRecords = await lookupMX(domain);
    if (mxRecords.length === 0) {
      console.log(`No MX records found for domain: ${domain}`);
      return false;
    }

    // Check all MX servers in parallel
    const results = await Promise.all(
      mxRecords.map((mxRecord) => checkMXServer(mxRecord, email))
    );

    // If any server returned false, the email is invalid
    const allValid = results.every((result) => result === true);

    return allValid;
  } catch (error) {
    console.error(`Error verifying email: ${error.message}`);
    return false;
  }
};

module.exports = {
  lookupMX,
  checkMXServer,
  verifyEmail,
};
