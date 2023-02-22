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
        lineWidth: 3,
        lines: Math.random()*200,
        shapes: Math.random()*100,
        shapesSizeMultiplier: 80,
        // ## Text size, length, and rotation
        fontsize: 60,
        charLength: 6,
        rotatemax: 20,
        rotatemin: -20
    }

    return genCaptcha(config)
}