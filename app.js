let { genCaptcha, genCaptchav2, genImgFromBuffer } = require('./index.js')

const config = {
    fontsize: 60
}

let captcha = genCaptcha(config)

console.log(captcha)
genImgFromBuffer(captcha.png, "image.png")