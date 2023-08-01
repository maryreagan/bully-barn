import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

    const CropImage = () => {
        const [image, setImage] = useState(null);
        const [crop, setCrop] = useState({ aspect: 1 / 1 }); // Set the aspect ratio for the crop area
        const [croppedImage, setCroppedImage] = useState(null);

        const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () => setImage(reader.result));
            reader.readAsDataURL(e.target.files[0]);
        }
        };

        const onImageLoaded = (img) => {
        // You can perform any operations after the image has been loaded here, if needed.
        };

        const onCropComplete = (crop) => {
        makeClientCrop(crop);
        };

        const makeClientCrop = async (crop) => {
        if (image && crop.width && crop.height) {
            const croppedImageUrl = await getCroppedImg(image, crop);
            setCroppedImage(croppedImageUrl);
        }
        };

        const getCroppedImg = (imageSrc, crop) => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = imageSrc;
            image.onload = async () => {
            const canvas = document.createElement("canvas");
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx = canvas.getContext("2d");

            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );

            const croppedImageUrl = canvas.toDataURL("image/jpeg");
            resolve(croppedImageUrl);
            };
            image.onerror = (error) => {
            reject(error);
            };
        });
        };

        const downloadImage = () => {
        if (croppedImage) {
            const link = document.createElement("a");
            link.download = "cropped_image.jpeg";
            link.href = croppedImage;
            link.click();
        }
        };

        return (
            <div>
            <input type="file" onChange={onSelectFile} />
            {image && (
                <ReactCrop
                src={image}
                crop={crop}
                onImageLoaded={onImageLoaded}
                onComplete={onCropComplete}
                onChange={(c) => setCrop(c)}
                />
            )}
            {croppedImage && (
                <div>
                <img src={croppedImage} alt="Cropped" />
                <button onClick={downloadImage}>Download Cropped Image</button>
                </div>
            )}
            </div>

        );
    };

    export default CropImage;

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /*
    
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
    */
