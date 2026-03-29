import { TextField, MenuItem } from '@mui/material';
import styles from './styles.module.scss';
import * as tokens from '@shiv-bhoomi/design-tokens';

export function FormGroup({ label, error, required, children }: {
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

export function FormInput({ label, register, error, placeholder, type = "text", ...rest }: { label?: string; register: any; error?: any; placeholder?: string; type?: string;[key: string]: any }) {
  return (
    <div className={styles.group}>
      <TextField
        fullWidth
        size="small"
        label={label}
        type={type}
        placeholder={placeholder}
        error={!!error}
        helperText={error?.message}
        variant="outlined"
        {...register}
        {...rest}
      />
    </div>
  );
}

export function FormTextarea({ label, register, error, placeholder, rows = 4, ...rest }: { label?: string; register: any; error?: any; placeholder?: string; rows?: number;[key: string]: any }) {
  return (
    <div className={styles.group}>
      <TextField
        fullWidth
        multiline
        minRows={rows}
        label={label}
        placeholder={placeholder}
        error={!!error}
        helperText={error?.message}
        variant="outlined"
        {...register}
        {...rest}
      />
    </div>
  );
}

export function FormSelect({ label, register, error, options, placeholder, ...rest }: { label?: string; register: any; error?: any; options: any[]; placeholder?: string;[key: string]: any }) {
  return (
    <div className={styles.group}>
      <TextField
        select
        fullWidth
        size="small"
        label={label}
        error={!!error}
        helperText={error?.message}
        variant="outlined"
        defaultValue={rest.defaultValue || ''}
        slotProps={{
          select: {
            native: true, // Native select ensures best compatibility with default RHF register
          }
        }}
        {...register}
        {...rest}
        onChange={(e) => {
          register.onChange(e);
          if (rest.onChange) rest.onChange(e);
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </TextField>
    </div>
  );
}

export function FormColorPicker({ label, register, error, ...rest }: { label?: string; register: any; error?: any;[key: string]: any }) {
  return (
    <div className={styles.group}>
      {label && <label className={styles.group__label}>{label}</label>}
      <div className={styles['color-picker']}>
        <input
          type="color"
          className={styles['color-picker__input']}
          {...register}
          {...rest}
        />
        <input
          type="text"
          className={styles['color-picker__text']}
          {...register}
          placeholder="#000000"
          {...rest}
        />
      </div>
      {error && <span className={styles.group__error}>{error.message}</span>}
    </div>
  );
}
