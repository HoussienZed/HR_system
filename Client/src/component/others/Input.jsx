const Input = ({
  label,
  label_className,
  type,
  name,
  value,
  onChange,
  placeholder,
  className,
  required,
}) => {
  const classNames = className;
  const label_classNames = label_className;
  return label ? (
    <div className="w-full">
      <label htmlFor={name} className={`${label_classNames}`}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${classNames}`}
        required={required}
      />
    </div>
  ) : (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${classNames}`}
      required={required}
    />
  );
};

export default Input;
