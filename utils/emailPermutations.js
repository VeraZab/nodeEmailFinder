const getEmailPermutations = (first, last, domain) => {
  return [
    `${first}.${last}@${domain}`,
    `${first[0]}${last}@${domain}`,
    `${first}${last}@${domain}`,
    `${first}.${last[0]}@${domain}`,
    `${first[0]}.${last}@${domain}`,
    `${first[0]}${last[0]}@${domain}`,
    `${first}@${domain}`,
    `${last}@${domain}`,
    `${first}_${last}@${domain}`,
    `${first[0]}_${last}@${domain}`,
    `${first}-${last}@${domain}`,
    `${first[0]}-${last}@${domain}`,
    `${last}.${first}@${domain}`,
    `${last}${first}@${domain}`,
    `${last}.${first[0]}@${domain}`,
    `${last}${first[0]}@${domain}`,
    `${first[0]}.${last[0]}@${domain}`,
    `${first[0]}_${last[0]}@${domain}`,
    `${first[0]}-${last[0]}@${domain}`,
  ];
};

module.exports = {
  getEmailPermutations,
};
