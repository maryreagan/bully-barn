import React from 'react';
import Cropper from 'react-easy-crop';
import {Slider} from '@mui/material'

function ImageCropper({ image, crop, zoom, onCropChange, onZoomChange, onCropComplete }) {
return (
<div className="cropper-container">
    <h3>Crop the Image</h3>
    <div className="cropper">
    <Cropper
        image={URL.createObjectURL(image)}
        crop={crop}
        zoom={zoom}
        aspect={4 / 3}
        onCropChange={onCropChange}
        onZoomChange={onZoomChange}
        onCropComplete={onCropComplete}
    />
    </div>
    <div className="zoom-slider">
    <Slider
        value={zoom}
        min={1}
        max={3}
        step={0.1}
        aria-labelledby="Zoom"
        onChange={(e, zoom) => onZoomChange(zoom)}
    />
    </div>
</div>
);
}

export default ImageCropper;
