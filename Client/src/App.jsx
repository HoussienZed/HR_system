import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import SideNavbar from "./assets/component/side-navbar";
import Login from "./assets/pages/Login";
import ProtectedRoutes from "./assets/component/ProtectedRoutes";
import HrProtectedRoutes from "./assets/component/HrProtectedRoutes";
import PayrollDashboard from "./assets/pages/PayrollDashboard";
import EmployeePayroll from "./assets/pages/EmployeePayroll";
import BenefitsDashboard from "./assets/pages/BenefitsDashboard";
import EditBenefits from "./assets/pages/EditBenefits";
import RetirementCalculator from "./assets/pages/RetirementCalculator";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/*Public route for the landing page */}
          <Route path="/login" element={<Login />} />

          {/*protected routes, only users access */}
          <Route element={<ProtectedRoutes />}>
            <Route
              element={
                <>
                  <SideNavbar />
                  <Outlet />
                </>
              }
            >
              <Route path="employeepayroll" element={<EmployeePayroll />} />
              <Route
                path="/benefitsdashboard"
                element={<BenefitsDashboard />}
              />
              <Route path="/editbenefits" element={<EditBenefits />} />
              <Route
                path="/retirementcalculator"
                element={<RetirementCalculator />}
              />
            </Route>

            {/*routes for HRs access only */}
            <Route element={<HrProtectedRoutes />}>
              <Route
                element={
                  <>
                    <SideNavbar />
                    <Outlet />
                  </>
                }
              >
                <Route
                  path="/payrolldashboard"
                  element={<PayrollDashboard />}
                ></Route>
              </Route>
            </Route>
          </Route>
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
