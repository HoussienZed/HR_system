import React from "react";
import "../../assets/styles/employeePayroll.css";

const EmployeePayroll = () => {
  return (
    <div className="flex flex-column flex-center payroll-details-container">
      <div className="bg-white flex-column justify-between payroll-details">
        <h1>Employee Payroll</h1>
        <p className="employee-payroll-title">Full Name:</p>
        <hr />
        <p className="employee-payroll-title">Title: </p>
        <hr />
        <p className="employee-payroll-title">Bank Account:</p>
        <hr />
        <p className="employee-payroll-title">Basic Salary:</p>
        <hr />
        <p className="employee-payroll-title">Transportation:</p>
        <hr />
        <p className="employee-payroll-title">Contribution to NSSF:</p>
        <hr />
        <p className="employee-payroll-title">Medical Care Plan: </p>
        <hr />
        <p className="employee-payroll-title">Income Taxes (11%):</p>
        <hr />
      </div>
    </div>
  );
};

export default EmployeePayroll;
