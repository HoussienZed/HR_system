import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  let isLoggedIn = localStorage.getItem("id") ? true : false;

  let logout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("first_name");
    navigate("/");
  };

  return (
    <nav>
      <ul className="flex justify-end list-none text-white body2">
        {isLoggedIn ? (
          <li>
            <Link to="/" onClick={logout}>
              Logout
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
