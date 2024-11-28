import { createCanvas, loadImage } from "canvas";

const generateWelcomeImage = async (username: string, avatarUrl: string) => {
    try {
        const canvas = createCanvas(700, 250);
        const ctx = canvas.getContext("2d");
    
        const background = await loadImage("https://t3.ftcdn.net/jpg/06/57/87/96/360_F_657879643_IPq8qL0Dgz6n4IzzPzI8K1grEi8KgLY1.jpg");
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
        ctx.font = 'bold 36px Arial'; // Make sure the font is set before drawing the text
        ctx.fillStyle = '#ffffff'; // Set the fill color
        ctx.textAlign = 'left'; // Align the text to the left
        ctx.textBaseline = 'middle'; // Set the baseline so the text is vertically centered
        ctx.fillText(`Welcome ${username}`, 250, 125);
        const avatar = await loadImage(avatarUrl);
    
        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatar, 25, 25, 200, 200);
    
    
        const attachment = canvas.toBuffer("image/png");

        return attachment;
    } catch (error) {
        console.error(error);
    }
}

export default generateWelcomeImage;