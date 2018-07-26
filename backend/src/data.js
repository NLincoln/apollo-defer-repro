const casual = require("casual");

const generateUser = attrs => ({
  id: casual.uuid,
  name: casual.full_name,
  ...attrs
});

const generateAccount = attrs => ({
  id: casual.uuid
});

exports.users = Array.from({ length: 50 }).map(generateUser);

exports.accounts = Array.from({ length: 10 }).map(generateAccount);
