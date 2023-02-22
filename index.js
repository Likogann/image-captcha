module.exports = { genCaptcha, genCaptchav2, genImgFromBuffer };

// generateCaptchav1.js
function genCaptcha(config) {
  let genCaptcha = require('./src/generateCaptcha.js');
  return genCaptcha(config);
};

// generateCaptchav2.js
function genCaptchav2(config) {
  let genCaptchav2 = require('./src/generateCaptchav2.js');
  return genCaptchav2(config);
};

// generateImageFromBuffer.js
function genImgFromBuffer(buf, path) {
  let genImgFromBuffer = require('./src/generateImageFromBuffer.js');
  return genImgFromBuffer(buf, path);
};