module.exports = function(configIn = {}) {
    const invert = require('invert-color')
    // # Variable Initialisation
    // ## Image
    let width = configIn.width || 512;
    let height = configIn.height || 256;
    let bgColour = configIn.bgColour || "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
    let textColour = configIn.textColour || invert(bgColour, true);
    let realTextColour = configIn.realTextColour || textColour
    // ## Obfuscation
    let lineWidth = configIn.lineWidth || 2;
    let lines = configIn.lines || genRandom(15, 40);
    let shapes = configIn.shapes || genRandom(10, 25);
    let shapesSizeMultiplier = configIn.shapesSizeMultiplier || 40
    // ## Text size, length, and rotation
    let fontsize = configIn.fontsize || 80;
    let charLength = configIn.charLength || 6;
    let rotatemax = configIn.rotatemax || 30;
    let rotatemin = configIn.rotatemin || -30;
    // ## Authenitication
    let hashSalt = configIn.hashSalt || 2 // Higher means longer computation time, but more secure hash
    

    // # Dependencies
    //const fs = require('fs');
    const { createCanvas, registerFont } = require('canvas');
    const canvas = createCanvas();
    const bcrypt = require('bcrypt');


    // # Code
    // ## Register the font
    registerFont(__dirname + '/../fonts/OpenSans-Regular.ttf', { family: 'OpenSans' });

    // ## Set size of canvas and background
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = bgColour;
    ctx.fillRect(0, 0, width, height);

    // ## Generate text
    let text = "";
    for (let i = 0; i < charLength; i++) {
        let c = Math.random()*25 + 65;
        let char = String.fromCharCode(c);
        text += char;
    };

    // ## Draw lines
    ctx.strokeStyle = textColour;
    ctx.lineWidth = lineWidth;
    for (let i = 0; i < lines; i++) {
        let x1 = Math.random()*width;
        let y1 = Math.random()*height;
        let x2 = Math.random()*width;
        let y2 = Math.random()*height;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    };

    // ## Draw shapes
    ctx.fillStyle = textColour;
    for (let i = 0; i < shapes; i++) {
        let x = Math.random()*width;
        let y = Math.random()*height;
        let w = Math.random()*shapesSizeMultiplier;
        let h = Math.random()*shapesSizeMultiplier;
        ctx.fillRect(x, y, w, h);
    };

    // ## Draw text
    ctx.fillStyle = realTextColour;
    ctx.font = fontsize + 'px OpenSans';
    for (let i = 0; i < text.length; i++) {
        let x = Math.random()*width;
        let y = Math.random()*height;
        ctx.fillText(text[i], x, y);
    };

    // ## Warp the text
    ctx.save();
    let rotateval = genRandom(rotatemin/90, rotatemax/90)
    // genRandom((fontsize*charLength)*Math.tan(Math.abs(rotateval))+fontsize, height-(fontsize*charLength)*Math.tan(Math.abs(rotateval)))
    let textmetrics = ctx.measureText(text)
    textmetrics.height = textmetrics.actualBoundingBoxAscent + textmetrics.actualBoundingBoxDescent
    let textX = genRandom(0, width-textmetrics.width)
    let textY = genRandom(textmetrics.width*Math.tan(Math.abs(rotateval))+textmetrics.height, height-(textmetrics.width)*Math.tan(Math.abs(rotateval))) // I'm proud of this one
    ctx.translate(textX, textY);
    ctx.rotate(rotateval)
    ctx.fillText(text, 0, 0);
    ctx.restore();

    // ## Save image
    let png = canvas.toBuffer('image/png');
    let id = new Date; id = id.getTime();
    // Hash the answer + id to allow for future authentication
    let hash = bcrypt.hashSync(`${text + id}`, hashSalt)
    return {png, text, id, hash};
}

// ## Generate Random Number between two values
function genRandom(min, max) {
    return Math.random() * (max - min) + min;
};