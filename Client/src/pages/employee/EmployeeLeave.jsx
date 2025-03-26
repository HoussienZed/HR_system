import React, { useEffect, useState } from "react";
import "../../assets/styles/EmployeeLeave.css";
import axiosBaseUrl from "../../utils/axios";
import EmployeesTable from "../../component/others/users-table";
import { useNavigate } from "react-router";

const EmployeeLeave = () => {
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const navigate = useNavigate();
  const columns = [
    { key: "leave_type", header: "Leave Type" },
    { key: "start_date", header: "Start Date" },
    { key: "end_date", header: "End Date" },
    { key: "status", header: "Status" },
  ];

  useEffect(() => {
    const userId = localStorage.getItem("id");
    const fetchLeaveBalances = async () => {
      try {
        const response = await axiosBaseUrl.get(`/Employees/user/${userId}`);
        setLeaveBalances(response.data.data);
      } catch (error) {
        console.error("Error fetching leave balances:", error);
      }
    };

    // Fetch leave requests
    const fetchLeaveRequests = async () => {
      try {
        const response = await axiosBaseUrl.get(`/Employees/leave-requests/user/${userId}`);
        setLeaveRequests(response.data.data);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchLeaveBalances();
    fetchLeaveRequests();
  }, []);

  //to help get the balance of each type
  const getBalance = (leaveType) => {
    const balance = leaveBalances.find((leave) => leave.leave_type === leaveType);
    return balance ? balance.balance : "N/A";
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="flex-column container">
        <h1 className="payroll-dashboard-title">Leave Balance</h1>

        <div className="flex gap-4 w-full cards-container">
          <div className="card flex flex-column flex-center gap-8 text-white rounded-lg bg-primary ">
            <h4>Annual Leave</h4>
            <div>
              <p>{getBalance("annual")}</p>
            </div>
          </div>
          <div className="card flex flex-column flex-center gap-8 text-white rounded-lg bg-primary">
            <h4>Sick Leave</h4>
            <div>
              <p>{getBalance("sick")}</p>
            </div>
          </div>
          <div className="card flex flex-column flex-center gap-8 text-white rounded-lg bg-primary">
            <h4>Unpaid Leave</h4>
            <div>
              <p>{getBalance("unpaid")}</p>
            </div>
          </div>
          <div className="card flex flex-column flex-center gap-8 text-white rounded-lg bg-primary">
            <h4>Paternity Leave</h4>
            <div>
              <p>{getBalance("paternity")}</p>
            </div>
          </div>
        </div>

        <h1 className="payroll-dashboard-title">Leave History</h1>

        <div className="w-full leave-btn">
          <button onClick={() => navigate("/leaveRequest")}>Request Leave</button>
        </div>
        <div className="payroll-dashboard-users">
          <EmployeesTable data={leaveRequests} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default EmployeeLeave;
