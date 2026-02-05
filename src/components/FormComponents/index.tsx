import styles from './styles.module.scss';

export function FormGroup({ label, error, required, children }:{
  label?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.group}>
      {label && (
        <label className={styles.group__label}>
          {label} {required && '*'}
        </label>
      )}
      {children}
      {error && (
        <span className={styles.group__error}>
          {error}
        </span>
      )}
    </div>
  );
}

export function FormRow({ children, columns = 3 }: { children: React.ReactNode; columns?: number }) {
  return (
    <div className={styles.row} data-columns={columns}>
      {children}
    </div>
  );
}

export function FormInput({ label, register, error, placeholder, type = "text", ...rest }: { label?: string; register: any; error?: { message: string }; placeholder?: string; type?: string; [key: string]: any }) {
  return (
    <div className={styles.group}>
      {label && <label className={styles.group__label}>{label}</label>}
      <input
        type={type}
        className={styles.input}
        {...register}
        placeholder={placeholder}
        {...rest}
      />
      {error && <span className={styles.group__error}>{error.message}</span>}
    </div>
  );
}

export function FormTextarea({ label, register, error, placeholder, rows = 4, ...rest }: { label?: string; register: any; error?: { message: string }; placeholder?: string; rows?: number; [key: string]: any }) {
  return (
    <div className={styles.group}>
      {label && <label className={styles.group__label}>{label}</label>}
      <textarea
        className={styles.textarea}
        {...register}
        placeholder={placeholder}
        rows={rows}
        {...rest}
      />
      {error && <span className={styles.group__error}>{error.message}</span>}
    </div>
  );
}

export function FormSelect({ label, register, error, options, placeholder, ...rest }) {
  return (
    <div className={styles.group}>
      {label && <label className={styles.group__label}>{label}</label>}
      <select className={styles.select} {...register} {...rest}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.group__error}>{error.message}</span>}
    </div>
  );
}

export function FormColorPicker({ label, register, error, ...rest }: { label?: string; register: any; error?: { message: string }; [key: string]: any }) {
  return (
    <div className={styles.group}>
      {label && <label className={styles.group__label}>{label}</label>}
      <div className={styles.colorPicker}>
        <input
          type="color"
          className={styles.colorPicker__input}
          {...register}
          {...rest}
        />
        <input
          type="text"
          className={styles.colorPicker__text}
          {...register}
          placeholder="#000000"
          {...rest}
        />
      </div>
      {error && <span className={styles.group__error}>{error.message}</span>}
    </div>
  );
}
