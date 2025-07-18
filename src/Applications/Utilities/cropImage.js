export default function getCroppedImg(imageSrc, pixelCrop) {
    return new Promise((resolve) => {
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 450;
            canvas.height = 450;
            const ctx = canvas.getContext('2d');

            ctx.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                450,
                450
            );

            resolve(canvas.toDataURL('image/jpeg'));
        };
    });
}
