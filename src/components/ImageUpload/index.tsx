import { useState, useRef } from 'react';
import styles from './styles.module.scss';

export default function ImageUpload({ value, onChange, label = "Upload Image" }) {
  const [preview, setPreview] = useState(value || null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB');
      return;
    }

    setLoading(true);

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setPreview(base64String);
        onChange(base64String);
        setLoading(false);
      };
      reader.onerror = () => {
        alert('Error reading file');
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.upload}>
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
              Uploading...
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
