    const getCroppedImg = (imageSrc, pixelCrop) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = URL.createObjectURL(imageSrc);
        image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const maxSize = 800; // Set a maximum size for the cropped image

        canvas.width = Math.min(image.width, maxSize);
        canvas.height = Math.min(image.height, maxSize);

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const width = pixelCrop.width * scaleX;
        const height = pixelCrop.height * scaleY;
        const x = pixelCrop.x * scaleX;
        const y = pixelCrop.y * scaleY;

        ctx.drawImage(image, x, y, width, height, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
            resolve(blob);
        }, 'image/jpeg', 1);
        };
        image.onerror = reject;
    });
    };

    export default getCroppedImg;
