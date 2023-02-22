const { genCaptcha, genCaptchav2, genImgFromBuffer } = require('./index.js')

let captcha = genCaptcha()
console.log(captcha)
genImgFromBuffer(captcha.png, "image.png")