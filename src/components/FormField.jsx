export default function FormField({ label, id, type = 'text', placeholder, error, onChange, ...rest }) {
  return (
    <div className="fg">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        {...rest}
      />
      {error && <div className="ferr show">{error}</div>}
    </div>
  )
}
