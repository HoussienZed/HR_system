/* import { BrowserRouter } from "react-router-dom"; */
/* import SideNavbar from "../../component/side-navbar"; */
import { BadgeDollarSign } from "lucide-react";

const PayrollDashboard = () => {
  return (
    <>
      <h1>Payroll Dashboard</h1>

      <div className="cards-container">
        <div className="card">
          <h4>Total Salaries Paid</h4>
          <div>
            <p>
              <BadgeDollarSign />
              {handleTotalSAlaries()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PayrollDashboard;
