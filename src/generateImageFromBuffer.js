const fs = require('fs');

module.exports = function(buf, path) {
  fs.writeFile(path, buf, function(err) {
    if (err) throw(err);
  });

  return null
};