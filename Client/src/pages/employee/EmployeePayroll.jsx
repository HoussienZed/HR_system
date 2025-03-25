import React from "react";
import "../../assets/styles/employeePayroll.css";

const EmployeePayroll = () => {
  return (
    <div className="flex flex-column flex-center payroll-details-container">
      <div className="bg-white flex-column justify-between payroll-details">
        <h1>Employee Payroll</h1>
        <p>Full Name:</p>
        <hr />
        <p>Title: </p>
        <hr />
        <p>Bank Account:</p>
        <hr />
        <p>Basic Salary:</p>
        <hr />
        <p>Transportation:</p>
        <hr />
        <p>Contribution to NSSF:</p>
        <hr />
        <p>Medical Care Plan: </p>
        <hr />
        <p>Income Taxes (11%):</p>
        <hr />
      </div>
    </div>
  );
};

export default EmployeePayroll;
