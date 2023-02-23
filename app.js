const { genCaptcha, genCaptchav2, verifyCaptcha, genImgFromBuffer } = require('./index.js');

let captcha = genCaptcha();
console.log(captcha);
genImgFromBuffer(captcha.png, "image.png");

let input = {
    id: 1677131747404,
    hash: '$2b$04$CaKwR/GEoIZhqLGY7ivELent0oyS0JuKyy6vfkQlk.MYsw0xiuOOe'
};

let guess = 'IBDWTE';
console.log(verifyCaptcha(input, guess));