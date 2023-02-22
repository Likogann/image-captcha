module.exports = function() {
    const genCaptcha = require('./generateCaptcha.js')

    bgColour = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16)});
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

    return genCaptcha(config)
}

function genRandom(min, max) {
    return Math.random() * (max - min) + min;
};