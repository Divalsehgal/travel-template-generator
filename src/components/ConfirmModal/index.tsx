import React from "react";
import styles from "./styles.module.scss";

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onDiscard: () => void;
    onCancel: () => void;
    confirmLabel?: string;
    discardLabel?: string;
    cancelLabel?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    title,
    message,
    onConfirm,
    onDiscard,
    onCancel,
    confirmLabel = "Save Changes",
    discardLabel = "Discard Changes",
    cancelLabel = "Cancel"
}) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal} role="dialog" aria-modal="true">
                <h3 className={styles.modal__title}>{title}</h3>
                <p className={styles.modal__message}>{message}</p>
                <div className={styles.modal__actions}>
                    <button onClick={onConfirm} className={styles.modal__button_confirm}>
                        {confirmLabel}
                    </button>
                    <button onClick={onDiscard} className={styles.modal__button_discard}>
                        {discardLabel}
                    </button>
                    <button onClick={onCancel} className={styles.modal__button_cancel}>
                        {cancelLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
