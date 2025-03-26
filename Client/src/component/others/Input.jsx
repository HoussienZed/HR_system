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
  const classNames = className + " input-text text-black rounded-lg text-black";
  const label_classNames = label_className;
  return label ? (
    <div className="w-full flex flex-column">
      <label htmlFor={name} className={`font-bold ${label_classNames}`}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-2 ${classNames}`}
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
