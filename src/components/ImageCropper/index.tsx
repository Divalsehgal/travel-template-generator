import React, { useState, useRef, useCallback } from 'react';
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import styles from './styles.module.scss';

interface ImageCropperProps {
    imageSrc: string;
    onCropComplete: (croppedImage: string) => void;
    onCancel: () => void;
    /** Aspect ratio: width/height. e.g. 4/3, 1/1, 210/297 (A4). undefined = free crop */
    aspect?: number;
}

/** Canvas-based crop extraction — no external utility needed */
async function extractCroppedImage(
    image: HTMLImageElement,
    pixelCrop: PixelCrop,
    quality = 0.92
): Promise<string> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('2D canvas not supported');

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    return canvas.toDataURL('image/jpeg', quality);
}

/** Helper: start with a centred crop that fills ~90% of the image */
function initCrop(naturalWidth: number, naturalHeight: number, aspect?: number): Crop {
    if (aspect) {
        return centerCrop(
            makeAspectCrop({ unit: '%', width: 90 }, aspect, naturalWidth, naturalHeight),
            naturalWidth,
            naturalHeight
        );
    }
    // Free crop — start with full image selected
    return { unit: '%', x: 5, y: 5, width: 90, height: 90 };
}

const ImageCropper: React.FC<ImageCropperProps> = ({
    imageSrc,
    onCropComplete,
    onCancel,
    aspect,
}) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [isSaving, setIsSaving] = useState(false);

    const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        const { naturalWidth, naturalHeight } = e.currentTarget;
        setCrop(initCrop(naturalWidth, naturalHeight, aspect));
    }, [aspect]);

    const handleSave = useCallback(async () => {
        if (!completedCrop || !imgRef.current) return;
        setIsSaving(true);
        try {
            const result = await extractCroppedImage(imgRef.current, completedCrop);
            onCropComplete(result);
        } catch (err) {
            console.error('Crop failed:', err);
        } finally {
            setIsSaving(false);
        }
    }, [completedCrop, onCropComplete]);

    const canSave = !!completedCrop && completedCrop.width > 0 && completedCrop.height > 0;

    return (
        <div className={styles.cropper}>
            <div className={styles.cropper__header}>
                <span className="material-symbols-outlined">crop</span>
                <span>Crop &amp; Position</span>
            </div>

            <div className={styles.cropper__container}>
                <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={aspect}
                    keepSelection
                    minWidth={50}
                    minHeight={50}
                >
                    <img
                        ref={imgRef}
                        src={imageSrc}
                        alt="Crop source"
                        onLoad={onImageLoad}
                        className={styles.cropper__image}
                    />
                </ReactCrop>
            </div>

            <div className={styles.cropper__hint}>
                Drag to reposition · Handles to resize
                {aspect && ` · Locked to ${Math.round(aspect * 100) / 100}:1`}
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
                    disabled={!canSave || isSaving}
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
