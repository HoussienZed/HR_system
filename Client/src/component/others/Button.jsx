import { Link } from "react-router-dom";

const Button = ({
  text,
  path,
  onClick,
  className,
  link_className,
  bgColor = "bg-primary",
  textColor = "text-white",
  fontSize = "body3",
}) => {
  const classNames =
    className + " " + bgColor + " " + textColor + " " + fontSize;
  const link_classNames = link_className;
  return (
    <>
      {path ? (
        <button
          className={`btn flex flex-center ${classNames}`}
          onClick={onClick}
          type="submit"
        >
          <Link to={path} className={`${link_classNames}`}>
            {text}
          </Link>
        </button>
      ) : (
        <button
          className={`btn flex flex-center ${classNames}`}
          onClick={onClick}
        >
          <p>{text}</p>
        </button>
      )}
    </>
  );
};
export default Button;
