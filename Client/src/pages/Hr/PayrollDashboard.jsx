/* import { BrowserRouter } from "react-router-dom"; */
/* import SideNavbar from "../../component/side-navbar"; */
import {
  BadgeDollarSign,
  CircleUserRound,
  HandCoins,
  CreditCard,
} from "lucide-react";
import "../../assets/styles/payrollDashboard.css";
import Input from "../../component/others/Input";
import { useState } from "react";

const PayrollDashboard = () => {
  const [email, setEmail] = useState("");
  const handleTotalSalaries = () => {};
  const handleTotalEmployees = () => {};
  const handleTotalIncome = () => {};
  const handleTotalTaxes = () => {};
  return (
    <>
      <div className="flex-column">
        <h1 className="payroll-dashboard-title">Payroll Dashboard</h1>

        <div className="flex gap-4 w-full cards-container">
          <div className="card flex flex-column flex-center gap-8 text-white bg-primary ">
            <h4>Total Salaries Paid</h4>
            <div>
              <p>
                <BadgeDollarSign />
                {handleTotalSalaries()}
              </p>
            </div>
          </div>
          <div className="card flex flex-column flex-center gap-8 text-white bg-primary">
            <h4>Total Employees</h4>
            <div>
              <p>
                <CircleUserRound />
                {handleTotalEmployees()}
              </p>
            </div>
          </div>
          <div className="card flex flex-column flex-center gap-8 text-white bg-primary">
            <h4>Total Income</h4>
            <div>
              <p>
                <HandCoins />
                {handleTotalIncome()}
              </p>
            </div>
          </div>
          <div className="card flex flex-column flex-center gap-8 text-white bg-primary">
            <h4>Total Taxes Deducted</h4>
            <div>
              <p>
                <CreditCard />
                {handleTotalTaxes()}
              </p>
            </div>
          </div>
        </div>
        <div>
          <Input
            type={"email"}
            name={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={"Email"}
            className={"body2"}
          />
        </div>
      </div>
    </>
  );
};

export default PayrollDashboard;
