let { genCaptcha, genCaptchav2, genImgFromBuffer } = require('./index.js')
let captcha = genCaptchav2()

console.log(captcha)
genImgFromBuffer(captcha.png, "image.png")