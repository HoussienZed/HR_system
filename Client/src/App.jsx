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
import { getUserType } from "./utils/getUserType";

const App = () => {
  const type = getUserType();
  const hrSidebarItems = [
    { icon: "LayoutDashboard", label: "Dashboard", to: "../dashboard" },
    {
      icon: "HandCoins",
      label: "Payroll Dashboard",
      to: "../payrolldashboard",
    },
    { icon: "UserRound", label: "Employees", to: "../employees" },
    { icon: "ScanEye", label: "Reviews", to: "../reviews" },
    { icon: "SquareCheckBig", label: "Leave Approval", to: "../leaveapproval" },
    { icon: "NotebookText", label: "Leave Overview", to: "../leaveoverview" },
    { icon: "BookText", label: "Training Overview", to: "../trainingoverview" },
    {
      icon: "Landmark",
      label: "Retirement Calculator",
      to: "../retirementcalculator",
    },
  ];

  const employeeSidebarItems = [
    { icon: "SquareCheckBig", label: "Leaves", to: "../employeeleaves" },
    {
      icon: "BookText",
      label: "Training Portal",
      to: "../trainingportal",
    },
    { icon: "HandCoins", label: "Payroll", to: "../employeepayroll" },
    { icon: "Ambulance", label: "Benefits", to: "../benefitsdashboard" },
    {
      icon: "Landmark",
      label: "Retirement Calculator",
      to: "../retirementcalculator",
    },
  ];

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/*Public route for the landing page */}
          <Route path="/" element={<Login />} />

          {/*protected routes, only users access */}
          <Route element={<ProtectedRoutes />}>
            <Route
              element={
                <>
                  {/* <SideBar navItems={employeeSidebarItems} /> */}
                  <SideBar
                    navItems={
                      type === "hr" ? hrSidebarItems : employeeSidebarItems
                    }
                  />
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
                    <SideBar navItems={hrSidebarItems} />
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
