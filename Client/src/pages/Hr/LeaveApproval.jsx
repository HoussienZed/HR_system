import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axiosBaseUrl from "../../utils/axios";
import EmployeesTable from "../../component/others/users-table";
import { Ban, CircleCheck } from "lucide-react";

const LeaveApproval = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  const columns = [
    { key: "leave_type", header: "Leave Type" },
    { key: "start_date", header: "Start Date" },
    { key: "end_date", header: "End Date" },
    { key: "reason", header: "Reason" },
  ];

  const acceptRequest = async (leaveRequest) => {
    try {
      await axiosBaseUrl.patch(`/HR/${leaveRequest.id}/status`, {
        status: "approved",
      });
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  const rejectRequest = async (leaveRequest) => {
    try {
      await axiosBaseUrl.patch(`/HR/${leaveRequest.id}/status`, {
        status: "rejected",
      });
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  const actions = [
    {
      label: <CircleCheck />,
      handler: (leaveRequest) => {
        acceptRequest(leaveRequest);
      },
    },
    {
      label: <Ban />,
      handler: (leaveRequest) => {
        rejectRequest(leaveRequest);
      },
    },
  ];

  useEffect(() => {
    // Fetch leave requests
    const fetchLeaveRequests = async () => {
      try {
        const response = await axiosBaseUrl.get(`/HR/pending`);
        setLeaveRequests(response.data.data);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchLeaveRequests();
  }, []);

  return (
    <>
      <div className="flex-column container">
        <h1 className="payroll-dashboard-title">Leave Approval</h1>
        <div className="payroll-dashboard-users">
          <EmployeesTable data={leaveRequests} columns={columns} actions={actions} />
        </div>
      </div>
    </>
  );
};

export default LeaveApproval;
