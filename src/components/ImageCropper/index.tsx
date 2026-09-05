import React, { useState, useCallback } from 'react';
import Cropper, { type Area, type Point } from 'react-easy-crop';
import getCroppedImg, { padImage } from '../../utils/cropImage';
import styles from './styles.module.scss';

interface ImageCropperProps {
    imageSrc: string;
    onCropComplete: (croppedImage: string) => void;
    onCancel: () => void;
    /** Aspect ratio: width/height. e.g. 4/3, 1/1, 210/297 (A4). undefined = free crop */
    aspect?: number;
    format?: string;
    maxWidth?: number;
    padding?: number;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
    imageSrc,
    onCropComplete,
    onCancel,
    aspect = 1,
    format = 'image/png',
    maxWidth = 1200,
    padding = 10,
}) => {
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [processedImage, setProcessedImage] = useState<string>(imageSrc);

    React.useEffect(() => {
        const processImage = async () => {
            if (padding > 0) {
                try {
                    const padded = await padImage(imageSrc, padding);
                    setProcessedImage(padded);
                } catch (e) {
                    console.error('Error padding image:', e);
                    setProcessedImage(imageSrc);
                }
            } else {
                setProcessedImage(imageSrc);
            }
        };
        processImage();
    }, [imageSrc, padding]);

    const onCropChange = (crop: Point) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom: number) => {
        setZoom(zoom);
    };

    const onCropCompleteInternal = useCallback((_area: Area, pixelArea: Area) => {
        setCroppedAreaPixels(pixelArea);
    }, []);

    const handleSave = useCallback(async () => {
        if (!croppedAreaPixels) return;
        setIsSaving(true);
        try {
            const croppedImage = await getCroppedImg(
                processedImage,
                croppedAreaPixels,
                0,
                { horizontal: false, vertical: false },
                format,
                0.8,
                maxWidth
            );
            if (croppedImage) {
                onCropComplete(croppedImage);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsSaving(false);
        }
    }, [croppedAreaPixels, processedImage, format, maxWidth, onCropComplete]);


    return (
        <div className={styles.cropper}>
            <div className={styles.cropper__header}>
                <span className="material-symbols-outlined">crop</span>
                <span>Crop &amp; Position</span>
            </div>

            <div className={styles.cropper__container}>
                <div className={styles.cropper__wrapper}>
                    <Cropper
                        image={processedImage}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspect}
                        onCropChange={onCropChange}
                        onCropComplete={onCropCompleteInternal}
                        onZoomChange={onZoomChange}
                    />
                </div>
            </div>

            <div className={styles.cropper__controls}>
                <div className={styles.cropper__slider_container}>
                    <span className="material-symbols-outlined">zoom_out</span>
                    <input
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        onChange={(e) => {
                            setZoom(Number(e.target.value));
                        }}
                        className={styles.cropper__slider}
                    />
                    <span className="material-symbols-outlined">zoom_in</span>
                </div>
                <div className={styles.cropper__hint}>
                    Drag to reposition · Scroll or use slider to zoom
                </div>
            </div>

            <div className={styles.cropper__actions}>
                <button
                    type="button"
                    onClick={onCancel}
                    className={styles['cropper__button--secondary']}
                    disabled={isSaving}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleSave}
                    className={styles['cropper__button--primary']}
                    disabled={isSaving}
                >
                    <span className="material-symbols-outlined">
                        {isSaving ? 'hourglass_empty' : 'check'}
                    </span>
                    {isSaving ? 'Saving...' : 'Crop & Save'}
                </button>
            </div>
        </div>
    );
};

export default ImageCropper;

