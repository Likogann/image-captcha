# image-captcha
NodeJS captcha image generator. This is a very basic captcha generator. It would be best used on an onion site or related. For clearnet sites, or other more proffesional applications, please look into Cloudflare's hCaptcha.  
<br>
The default image size is 400x200px.

#### Installing
```bash
npm install @likogan/image-captcha
```
#### Including
```js
const { genCaptcha, genCaptchav2, genImgFromBuffer } = require('@likogan/image-captcha')
```

# Generating a Captcha
To generate a captcha, run the `genCaptcha()` or `genCaptchav2()` function.
```js
let captcha = genCaptcha()
```
When generating a Captcha, the function will return the PNG buffer, and the content of the captcha.
```json
{
  png: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 01 90 00 00 00 c8 08 06 00 00 00 c6 15 b7 e2 00 00 00 06 62 4b 47 44 00 ff 00 ff 00 ff a0 bd a7 ... 7120 more bytes>,
  text: 'YYASBK',
  id: 1677038050778
}
```
*The ID is irrelevant*, it's generated as an easier way to tag an ID to an image for future authentication. The ID is just the current unix time. Doing this allows for easier captcha expiring, and means the user doesn't have to create their own ID system.

## Translating Buffer to PNG
The PNG buffer of the captcha, and the desired image path are required. Passing those two variables will result in an image being written.
```js
genImgFromBuffer(captcha.png, "./image.png")
```

## Captcha v2
CaptchaV2 uses significantly more resources, but is significantly harder to read. CaptchaV2 generates the text to be the same colour as the background, using the random lines and boxes to reveal the text. CaptchaV2 uses identical code to `genCaptcha()`, it just uses a different configuration.

## Custom Image Generation
You can change everything about the captcha generation. The following variables are accepted. If the variable isn't included, it will use the default value.
```js
// ## Base Image
let configIn.width = 400;
let configIn.height = 200;
let configIn.bgColour = "#" + Math.floor(Math.random()*16777215).toString(16);
// ## Obfuscation
let configIn.lineWidth = 3;
let configIn.lines = Math.random()*200;  // Math.random()*200;
let configIn.shapes = Math.random()*200; // Math.random()*200;
let configIn.shapesSizeMultiplier = 80
// ## Text size, length, and rotation
let configIn.fontsize = 40;
let configIn.charLength = 6;
let configIn.rotatemax = 20;
let configIn.rotatemin = -20;
```
After defining the new config, input that into the `genCaptcha()` function.  
*`genCaptchav2()` doesn't accept custom configs. It is a custom config!*
```js
let captcha = genCaptcha(configIn)
```

# Examples
The code below will generate a captcha, print the captcha info to console, then print the output to `image.png`.
```js
const { genCaptcha, genCaptchav2, genImgFromBuffer } = require('./index.js')

let captcha = genCaptcha()
console.log(captcha)
genImgFromBuffer(captcha.png, "image.png")
```

# Acknowledgments
### NodeJS modules
canvas [(npm)](https://www.npmjs.com/package/canvas) [(github)](https://github.com/Automattic/node-canvas) - Used for image generation.  
invert-color [(npm)](https://www.npmjs.com/package/invert-color) [(github)](https://github.com/onury/invert-color) - Used to determine if the text on the generated captcha image should be black or white.  

### Fonts
OpenSans by Steve Matteson [(google fonts)](https://fonts.google.com/?query=Steve+Matteson)