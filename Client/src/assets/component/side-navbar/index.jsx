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
} from "lucide-react";
import logo from "../../../assets/logo.png";

const SideNavbar = () => {
  return (
    <nav>
      <ul className="side-navbar-list">
        <li className="side-navbar-logo">
          {<img src={logo} className="hrflow-logo" alt="HR_Flow" />}
        </li>
        <li className="side-navbar-element">
          <LayoutDashboard />
          <Link to="../dashboard">Dashboard</Link>
        </li>
        <li className="side-navbar-element">
          <HandCoins />
          <Link to="../payrolldashboard">Payroll Dashboard</Link>
        </li>
        <li className="side-navbar-element">
          <UserRound />
          <Link to="../employees">Employees</Link>
          <Link />
        </li>
        <li className="side-navbar-element">
          <ScanEye />
          <Link to="../reviews">Reviews</Link>
        </li>
        <li className="side-navbar-element">
          <SquareCheckBig />
          Leave Approval
        </li>
        <li className="side-navbar-element">
          <NotebookText />
          <Link to="../leaveoverview">Leave Overview</Link>
        </li>
        <li className="side-navbar-element">
          <BookText />
          <Link to="../trainingoverview">Training Overview</Link>
        </li>
        <li className="side-navbar-element">
          <Landmark />
          <Link to="../retirementcalculator">Retirement Claculator</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavbar;
