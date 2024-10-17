const isValidName = (name) => {
  const regex = /^[a-z]+([-'][a-z]+)*$/;
  return regex.test(name);
};

module.exports = {
  isValidName,
};
