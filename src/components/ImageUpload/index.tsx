import { useState, useRef } from 'react';
import ImageCropper from '../ImageCropper';
import styles from './styles.module.scss';

export default function ImageUpload({ value, onChange, label = "Upload Image", aspect = 4 / 3 }) {
  const [preview, setPreview] = useState(value || null);
  const [loading, setLoading] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // Increased limit for raw image before crop
      alert('Image size should be less than 5MB');
      return;
    }

    setLoading(true);

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        setShowCropper(true);
        setLoading(false);
      };
      reader.onerror = () => {
        alert('Error reading file');
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error reading image:', error);
      alert('Error reading image');
      setLoading(false);
    }
  };

  const handleCropComplete = (croppedImage) => {
    setPreview(croppedImage);
    onChange(croppedImage);
    setShowCropper(false);
    // Do NOT clear imageSrc so we can re-crop the original
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    // Do NOT clear imageSrc in case they just wanted to close the modal without saving
    // Unless they haven't cropped at all yet?
    // If they cancel on the FIRST upload, we should probably keep the file selected but maybe not preview?
    // Actually, if they cancel, we probably shouldn't do anything destructive.
  };

  const handleReCrop = () => {
    // If we have an original imageSrc (from recent upload), use it.
    // If not (existing saved image), use the current preview/value as the source
    // (though re-cropping a cropped image isn't ideal, it's better than nothing).
    if (!imageSrc && preview) {
      setImageSrc(preview);
    }
    setShowCropper(true);
  };

  const handleRemove = () => {
    setPreview(null);
    onChange('');
    setImageSrc(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.upload}>
      {showCropper && (imageSrc || preview) && (
        <ImageCropper
          imageSrc={imageSrc || preview}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
          aspect={aspect}
        />
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={styles.upload__input}
      />

      {preview ? (
        <div className={styles.upload__preview}>
          <img src={preview} alt="Preview" className={styles['upload__preview-img']} />
          <div className={styles['upload__preview-overlay']}>
            <button
              type="button"
              className={styles['upload__preview-btn']}
              onClick={handleReCrop}
            >
              <span className="material-symbols-outlined">crop</span>
              Crop
            </button>
            <button
              type="button"
              className={styles['upload__preview-btn']}
              onClick={handleClick}
            >
              <span className="material-symbols-outlined">edit</span>
              Change
            </button>
            <button
              type="button"
              className={styles['upload__preview-btn--danger']}
              onClick={handleRemove}
            >
              <span className="material-symbols-outlined">delete</span>
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className={styles.upload__button}
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined">hourglass_empty</span>
              Loading...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">add_photo_alternate</span>
              {label}
            </>
          )}
        </button>
      )}
    </div>
  );
}
