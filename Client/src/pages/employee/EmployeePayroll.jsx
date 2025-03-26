import React from "react";
import "../../assets/styles/employeePayroll.css";
import { useState, useEffect } from "react";
import axiosBaseUrl from "../../utils/axios";

const EmployeePayroll = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace this with your actual API call to fetch employee payroll data
    const fetchEmployeePayroll = async () => {
      try {
        const response = await axiosBaseUrl.get("/HR/employees");
        const data = response.data;

        // demo data for testing
        /* const data = {
          fullName: "John Doe",
          title: "Software Developer",
          bankAccount: "1234567890",
          basicSalary: "$5000",
          transportation: "$300",
          contributionToNSSF: "$200",
          medicalCarePlan: "$150",
          incomeTaxes: "$550",
        }; */

        setEmployeeData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEmployeePayroll();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!employeeData) return <div>No data available</div>;

  return (
    <div className="flex flex-column flex-center payroll-details-container">
      <div className="bg-white flex-column justify-between payroll-details">
        <h1>Employee Payroll</h1>
        <p className="employee-payroll-title">
          Full Name:
          <span className="employee-payroll-data">{employeeData.fullName}</span>
        </p>
        <hr />
        <p className="employee-payroll-title">
          Title:{" "}
          <span className="employee-payroll-data">{employeeData.title}</span>
        </p>
        <hr />
        <p className="employee-payroll-title">
          Bank Account:{" "}
          <span className="employee-payroll-data">
            {employeeData.bankAccount}
          </span>
        </p>
        <hr />
        <p className="employee-payroll-title">
          Basic Salary:{" "}
          <span className="employee-payroll-data">
            {employeeData.basicSalary}
          </span>
        </p>
        <hr />
        <p className="employee-payroll-title">
          Transportation:{" "}
          <span className="employee-payroll-data">
            {employeeData.transportation}
          </span>
        </p>
        <hr />
        <p className="employee-payroll-title">
          Contribution to NSSF:{" "}
          <span className="employee-payroll-data">
            {employeeData.contributionToNSSF}
          </span>
        </p>
        <hr />
        <p className="employee-payroll-title">
          Medical Care Plan:{" "}
          <span className="employee-payroll-data">
            {employeeData.medicalCarePlan}
          </span>
        </p>
        <hr />
        <p className="employee-payroll-title">
          Income Taxes (11%):{" "}
          <span className="employee-payroll-data">
            {employeeData.incomeTaxes}
          </span>
        </p>
        <hr />
      </div>
    </div>
  );
};

export default EmployeePayroll;
