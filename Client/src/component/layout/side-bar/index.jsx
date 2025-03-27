import { Link } from "react-router-dom";
import "./style.css";
import {
  LayoutDashboard,
  SquareCheckBig,
  HandCoins,
  UserRound,
  ScanEye,
  NotebookText,
  BookText,
  Landmark,
  Ambulance,
  Clock8,
} from "lucide-react";
import logo from "../../../assets/logo.png";

const SideBar = ({ navItems = [] }) => {
  const iconComponents = {
    LayoutDashboard: <LayoutDashboard />,
    SquareCheckBig: <SquareCheckBig />,
    HandCoins: <HandCoins />,
    UserRound: <UserRound />,
    ScanEye: <ScanEye />,
    NotebookText: <NotebookText />,
    BookText: <BookText />,
    Landmark: <Landmark />,
    Ambulance: <Ambulance />,
    Clock8: <Clock8 />,
  };

  return (
    <nav className="bg-primary">
      <ul className="side-navbar-list">
        <li className="side-navbar-logo">
          {<img src={logo} className="hrflow-logo" alt="HR_Flow" />}
        </li>
        {navItems.map((item, index) => (
          <li key={index} className="side-navbar-element">
            {iconComponents[item.icon]}
            {item.to ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideBar;
