# image-captcha
NodeJS captcha image generator. This is a very basic captcha generator. It would be best used on an onion site or related. For clearnet sites, or other more proffesional applications, please look into Cloudflare's hCaptcha.  
<br>
The default image size is 400x200px.



# Installing
##### Install the npm package
```bash
npm install @likogan/image-captcha
```
##### Include the package in your code
```js
const Captcha = require('@likogan/image-captcha');
```



# Basic Use
### Generate a Captcha
To generate a captcha
```js
let newCaptcha = Captcha.genCaptcha();
```

### Turn Captcha to Image
To turn the generated captcha into a PNG image in the applications root directory.
```js
let newCaptcha = Captcha.genCaptcha();
Captcha.genImage(newCaptcha.png, 'image.png');
```
To generate the image in the directory `src/captchas/captcha.png`
```js
Captcha.genImage(newCaptcha.png, 'src/captchas/captcha.png');
```


### Verify Inputted Captcha
To verify if a captcha inputted by a user is valid, we can use the function `verifyCaptcha()`
```js
let newCaptcha = Captcha.genCaptcha();

// This is two of the variables generated from "genCaptcha()"
let captchaToVerify = {
	id: 1677132092166,
  	hash: '$2b$04$tPz8CDNmrip.PSv69RFrvOTbVN072SSUqg9cRrleEsao3KoFXI0hW'
};
let userInput = 'IVPUVK';

if (Captcha.verifyCaptcha(captchaToVerify, userInput)) { // "verifyCaptcha()" returns boolean value
	console.log('Correct input');
} else {
	console.log('Invalid Input');
};
```


# Further Documentation
## genCaptcha()
### Inputs
`genCaptcha()` allows for a json object input to change how it generates the image.
```js
let config = {
	// ## Base Image
	width = 400, // Width of image
	height = 200, // Height of image
	bgColour: "#" + Math.floor(Math.random()*16777215).toString(16), // Background colour. Default is just random
	textColour: null // DO NOT LEAVE AS NULL! The text colour, unless otherwise specific, will be white or black depending on the bgColour. Controls the colour of shapes, lines, and random text seen in image.
	textColourReal: null // DO NOT LEAVE AS NULL! The real text colour, unless otherwise specific, will be the same as textColour. Only controls the colour of the real captcha text in the image.
	// ## Obfuscation
	lineWidth = 3, // Width of randomly genreated lines
	lines: Math.random()*20, // Amount of randomly generated lines
	shapes: Math.random()*20, // Amount of randomly generated shapes
	.shapesSizeMultiplier: 40, // Size multiplier of squares (still random!)
	// ## Text size, length, and rotation
	fontsize: 60, // Size of all text on image
	charLength: 6, // Length of real captcha
	rotatemax: 30, // Maximum (right) rotation - too high makes it very hard to read
	rotatemin: -30, // Minimum (left) rotation - too high makes it very hard to read
	// # Authentication
	hashSalt: 2 // The rounds of the hashed value of the captcha
}

let newCaptcha = Captcha.genCaptcha(config);
```

### Outputs
```json
{
  png: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 01 90 00 00 00 c8 08 06 00 00 00 c6 15 b7 e2 00 00 00 06 62 4b 47 44 00 ff 00 ff 00 ff a0 bd a7 ... 22344 more bytes>,
  text: 'IVPUVK',
  id: 1677132092166,
  hash: '$2b$04$tPz8CDNmrip.PSv69RFrvOTbVN072SSUqg9cRrleEsao3KoFXI0hW'
}
```
`png` The raw data of the generated PNG image. This value can be used alongside `genImage()` to generate the full Captcha image.
`text` The real text of the captcha. *Do not send this to the user!*
`id` A generated ID used in the hash. It's just the current date in milliseconds. Used in `verifyCaptcha()`. Can also be used for your own custom verification method.
`hash` The hash of `text` and `id`. Used for `verifyCaptcha()`

## genCaptchav2()
Identical to genCaptcha(), but uses the following custom config
```js
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
}
```

## genImage()
Generates an image using the returned `png` variable from `genCaptcha()`.
### Inputs
`genImage()` requires two inputs. The captcha data, and the location of the image.
#### Captcha Data
Uses `png` from `genCaptcha()` to generate a PNG image.
```json
{
  png: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 01 90 00 00 00 c8 08 06 00 00 00 c6 15 b7 e2 00 00 00 06 62 4b 47 44 00 ff 00 ff 00 ff a0 bd a7 ... 22344 more bytes>, ..
```
Input the whole object from `genCaptcha()`
```js
let newCaptcha = Captcha.genCaptcha()

Captcha.genImage(newCaptcha.png, 'image.png')
```
#### Image Location
The second input is the image path in a string.
Examples: `image.png` `src/captchas/captcha.png` 

You can even get creative and use other variables to define a better suited path. For example, let's name the captcha image the date/time it was created, and under the web path of `/var/www`. The final path sould look like `/var/www/website/images/captchas/1677132092166.png`
```js
let newCatpcha = genCaptcha()

let location = '`/var/www/website/images/captchas/${newCaptcha.id}.png`
Captcha.genImage(newCaptcha.png, location)
```


##  verifyCaptcha()
This function is very simple. It just comapares the user inputted captcha text, and the generated captcha object.
### Inputs
`verifyCaptcha()` requires two inputs. One of the generated captcha object, and the other of the user inputted captcha text.
#### Captcha Object
```json
{
  id: 1677132092166,
  hash: '$2b$04$tPz8CDNmrip.PSv69RFrvOTbVN072SSUqg9cRrleEsao3KoFXI0hW'
}
```
`verifyCaptcha(newCaptcha, ..)`

#### Guessed Captcha Text
The next is just the guessed captcha text from the user.
```js
let newCaptcha = Captcha.genCaptcha();

// This is two of the variables generated from "genCaptcha()"
let captchaToVerify = {
	id: 1677132092166,
  	hash: '$2b$04$tPz8CDNmrip.PSv69RFrvOTbVN072SSUqg9cRrleEsao3KoFXI0hW'
};
let userInput = 'IVPUVK';

console.log(verifyCaptcha(captchaToVerify, userInput))
```

#### Expire time in Minutes
The time in minutes after which the captcha expires. By default, the captcha will never expire.
```js
let expire = 10 // Expire after 10 minutes

console.log(verifyCaptcha(captcha, userInput, expire))
```
If the expire time is passed, the function will return `false`, even if the captcha was correct.

### Ouputs
`verifyCaptcha()` returns a boolean, true or false, depending on if the captcha is correct or not.
```js
if (Captcha.verifyCaptcha(captcha, userInput, 10)) { // "verifyCaptcha()" returns boolean value
	console.log('Correct input');
} else {
	console.log('Invalid Input');
};
```

# Acknowledgments
### NodeJS modules
canvas [(npm)](https://www.npmjs.com/package/canvas) [(github)](https://github.com/Automattic/node-canvas) - Used for image generation.  
invert-color [(npm)](https://www.npmjs.com/package/invert-color) [(github)](https://github.com/onury/invert-color) - Used to determine if the text on the generated captcha image should be black or white.  
bcrypt [(npm)](https://www.npmjs.com/package/bcrypt) [(github)](https://github.com/kelektiv/node.bcrypt.js) - Used for hashing generated captcha data, and for authenticating captchas

### Fonts
OpenSans by Steve Matteson [(google fonts)](https://fonts.google.com/?query=Steve+Matteson)