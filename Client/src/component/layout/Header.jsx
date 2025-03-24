import { Link } from "react-router-dom";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="bg-primary flex justify-between items-center container header">
      <Link className="text-white font-bold body1 logo" to={"/"}>
        Golry
      </Link>
      <Nav />
    </header>
  );
};
export default Header;
