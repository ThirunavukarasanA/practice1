import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../Utilities/cropImage'; // a utility function defined below
import { Slider } from '@mui/material'; // for zoom control (optional)

const ImageCropUpload = () => {
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImg = await getCroppedImg(image, croppedAreaPixels);
            setCroppedImage(croppedImg);
            // You can now upload this croppedImg
        } catch (e) {
            console.error(e);
        }
    }, [image, croppedAreaPixels]);

    const onFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setImage(reader.result));
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className="p-4">
            <input type="file" accept="image/*" onChange={onFileChange} />

            {image && (
                <div className="relative transition-all w-[450px] h-[450px] mt-4 bg-black">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        cropShape="rect"
                        showGrid={true}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                    />
                </div>
            )}

            {image && (
                <div className="mt-4">
                    <Slider
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        onChange={(e, zoom) => setZoom(zoom)}
                    />
                    <button
                        className="mt-2 border-primary text-primary px-4 py-2 rounded"
                        onClick={showCroppedImage}
                    >
                        Crop & Upload
                    </button>
                </div>
            )}

            {croppedImage && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Cropped Image:</h2>
                    <img src={croppedImage} alt="Cropped" className="w-[450px] h-[450px]" />
                </div>
            )}
        </div>
    );
};

export default ImageCropUpload;
