import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import SideBar from "./component/layout/side-bar";
import Login from "./pages/Login";
import ProtectedRoutes from "./component/others/ProtectedRoutes/ProtectedRoutes";
import HrProtectedRoutes from "./component/others/ProtectedRoutes/HrProtectedRoutes";
import PayrollDashboard from "./pages/Hr/PayrollDashboard";
import EmployeePayroll from "./pages/employee/EmployeePayroll";
import BenefitsDashboard from "./pages/employee/BenefitsDashboard";
import EditBenefits from "./pages/employee/EditBenefits";
import RetirementCalculator from "./pages/employee/RetirementCalculator";
import Attendance from "./pages/employee/Attendance";

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
                  <SideBar />
                  <Outlet />
                </>
              }
            >
              <Route path="employeepayroll" element={<EmployeePayroll />} />
              <Route path="/attendance" element={<Attendance />} />
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
                    <SideBar />
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
