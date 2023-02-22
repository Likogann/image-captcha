module.exports = { genCaptcha, genCaptchav2, genImgFromBuffer };

// generateCaptcha.js
function genCaptcha(config) {
  let genCaptcha = require('./src/generateCaptcha.js');
  return genCaptcha(config);
};

// generateCaptchav2.js
function genCaptchav2() {
  let genCaptchav2 = require('./src/generateCaptchav2.js');
  return genCaptchav2();
};

// generateImageFromBuffer.js
function genImgFromBuffer(buf, path) {
  let genImgFromBuffer = require('./src/generateImageFromBuffer.js');
  return genImgFromBuffer(buf, path);
};