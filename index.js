let object = {}
module.exports = object;

// # Dependencies
const bcrypt = require('bcrypt');

// # Captcha Generation
// ## generateCaptcha.js
object.genCaptcha = function(config) {
  let genCaptcha = require('./src/generateCaptcha.js');
  return genCaptcha(config);
};

// ## generateCaptchav2.js
object.genCaptchav2 = function() {
  // Generate a background colour. We cannot do this inside var config ...
  // as it's used twice
  let bgColour = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16)});
  const config = {
      // ## Image
      width: 400,
      height: 200,
      bgColour: bgColour,
      realTextColour: bgColour,
      // ## Obfuscation
      lineWidth: 2,
      lines: 100,
      shapes: genRandom(10, 40),
      shapesSizeMultiplier: 40,
      // ## Text size, length, and rotation
      fontsize: 60,
      charLength: 6,
      rotatemax: 20,
      rotatemin: -20
  }

  // run genCaptcha with the custom config.
  return genCaptcha(config)
  // genCaptchaV2 is more of an example of how changing the config can give
  // some creative results.
};

// # Captcha Translation
// ## generateImageFromBuffer.js
object.genImage = function(buf, path) {
  let genImage = require('./src/generateImageFromBuffer.js');
  return genImage(buf, path);
};

// # Captcha Verification
object.verifyCaptcha = function(input, guess, timeout = null) {
  // Convert inputted minutes to milliseconds
  let ms = timeout * 60000
  // Check if that much time has passed
  let date = new Date
  console.log(date.getTime())

  let toReturn = false
  if (date.getTime() - input.id <= ms || timeout === null) {
    toReturn = bcrypt.compareSync(`${guess + input.id}`, input.hash);
  }

  return toReturn
};

// # Internal Functions
// ## GenRandom function
function genRandom(min, max) {
  return Math.random() * (max - min) + min;
};