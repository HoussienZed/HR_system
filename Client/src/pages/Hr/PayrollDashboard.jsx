import {
  BadgeDollarSign,
  CircleUserRound,
  HandCoins,
  CreditCard,
} from "lucide-react";
import "../../assets/styles/payrollDashboard.css";
import Input from "../../component/others/Input";
import { useState, useEffect } from "react";
import EmployeesTable from "../../component/others/users-table";
import Button from "../../component/others/Button";
import axios from "axios";
import axiosBaseUrl from "../../utils/axios";
import { UserRoundPen } from "lucide-react";

const PayrollDashboard = () => {
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);

  const columns = [
    { key: "full_name", header: "Employee Name" },
    { key: "email", header: "Email" },
    { key: "gender", header: "Gender" },
    { key: "position", header: "Position" },
    { key: "department", header: "Department" },
    { key: "salary", header: "Salary" },
    { key: "status", header: "Status" },
  ];

  /*Demo data for testing 
  const employees = [
    {
      id: 1,
      full_name: "ali",
      email: "example@example.com",
      gender: "male",
      position: "manager",
      department: "tech",
      salary: "1500",
      status: "active",
    },
    {
      id: 2,
      full_name: "aop",
      email: "example@example.com",
      gender: "male",
      position: "manager",
      department: "tech",
      salary: "1500",
      status: "active",
    },
    {
      id: 3,
      full_name: "aloli",
      email: "example@example.com",
      gender: "male",
      position: "manager",
      department: "tech",
      salary: "1500",
      status: "active",
    },
  ]; */

  const actions = [
    {
      label: <UserRoundPen />,
      handler: (employee) => alert("editing employee"),
    },
  ];

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await axiosBaseUrl.get("/HR/employees");
      setEmployees(response.data);
      setLoading(false);
    };
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    employee.full_name.toLowerCase().includes(search.toLowerCase())
  );

  /* const handleTotalSalaries = async () => {
    const response = await axiosBaseUrl.get("/employees");
    const employees = response.data;

    let totalSalaries = 0;

    for (const employee of employees) {
      totalSalaries += employee.Salary || 0; //sets semployee,salary to zer if not defined
    }

    return totalSalaries;
  };

  const handleTotalEmployees = async () => {
    const response = await axiosBaseUrl.get("/employees");
    const employees = response.data;

    return employees.length;
  };

  const handleTotalIncome = async () => {
    const response = await axiosBaseUrl.get("/income");
    const income = response.data;

    let totalIncome = 0;

    for (const item of income) {
      totalIncome += item.amount || 0; //sets semployee,salary to zer if not defined
    }

    return totalIncome;
  };

  const handleTotalTaxes = async () => {
    const response = await axiosBaseUrl.get("/taxes");
    const taxes = response.data;

    let totalTaxes = 0;

    for (const tax of taxes) {
      totalTaxes += tax.amount || 0; //sets semployee,salary to zer if not defined
    }

    return totalTaxes;
  };
 */
  const handleViewMyPayroll = () => {};
  return (
    <>
      <div className="flex-column">
        <h1 className="payroll-dashboard-title">Payroll Dashboard</h1>

        <div className="flex gap-4 w-full cards-container">
          <div className="card flex flex-column flex-center gap-8 text-white rounded-lg bg-primary ">
            <h4>Total Salaries Paid</h4>
            <div>
              <p>
                <BadgeDollarSign />
                {/* {handleTotalSalaries()} */}
              </p>
            </div>
          </div>
          <div className="card flex flex-column flex-center gap-8 text-white rounded-lg bg-primary">
            <h4>Total Employees</h4>
            <div>
              <p>
                <CircleUserRound />
                {/* {handleTotalEmployees()} */}
              </p>
            </div>
          </div>
          <div className="card flex flex-column flex-center gap-8 text-white rounded-lg bg-primary">
            <h4>Total Income</h4>
            <div>
              <p>
                <HandCoins />
                {/* {handleTotalIncome()} */}
              </p>
            </div>
          </div>
          <div className="card flex flex-column flex-center gap-8 text-white rounded-lg bg-primary">
            <h4>Total Taxes Deducted</h4>
            <div>
              <p>
                <CreditCard />
                {/* {handleTotalTaxes()} */}
              </p>
            </div>
          </div>
        </div>
        <div>
          <Input
            type={"text"}
            name={"searchBar"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={"Search Employee by Name"}
            className={"body2 rounded-lg payroll-dashboard-search"}
          />
        </div>
        <div className="payroll-dashboard-users">
          <EmployeesTable
            data={filteredEmployees}
            columns={columns}
            actions={actions}
          />
        </div>
        <div className="flex justify-end w-full">
          <Button
            text="My Payroll"
            onClick={handleViewMyPayroll}
            className={"payroll-dashboard-view"}
            textColor="text-white"
          />
        </div>
      </div>
    </>
  );
};

export default PayrollDashboard;
