import { useId } from 'react';
export default function Field({ label, hint, multiline, children, ...props }) {
  const generatedId = useId();
  const id = props.id || generatedId;
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {children ||
        (multiline ? (
          <textarea {...props} id={id} aria-describedby={hint ? `${id}-hint` : undefined} />
        ) : (
          <input {...props} id={id} aria-describedby={hint ? `${id}-hint` : undefined} />
        ))}
      {hint && <small id={`${id}-hint`}>{hint}</small>}
    </div>
  );
}
