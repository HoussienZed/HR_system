import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axiosBaseUrl from "../../utils/axios";

const LeaveOverview = () => {
  const [leaveBalance, setLeaveBalance] = useState();
  const [upcomingLeaves, setUpcomingLeaves] = useState([]);
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    // Fetch leave requests
    const fetchLeavebalances = async () => {
      try {
        const response = await axiosBaseUrl.get(`/HR/total-type-balance`);
        setLeaveBalance(response.data.data);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    const fetchUpcomingLeave = async () => {
      try {
        const response = await axiosBaseUrl.get(`/HR/upcoming-leaves`);
        setUpcomingLeaves(response.data.data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    const fetchTopUsers = async () => {
      try {
        const response = await axiosBaseUrl.get(`/HR/top-users-leaves`);
        setTopUsers(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching top users:", error);
      }
    };

    fetchTopUsers();
    fetchUpcomingLeave();
    fetchLeavebalances();
  }, []);

  return (
    <div className="flex-column container">
      <h1 className="payroll-dashboard-title">Leave Overview</h1>
      <div className="payroll-dashboard-users mb-4">
        <h3>Team Leave Balance</h3>
      </div>
      <div className="flex gap-4 w-full cards-container">
        {leaveBalance?.length > 0 ? (
          leaveBalance.map((balance, index) => (
            <div
              key={index}
              className="card flex flex-column flex-center gap-8 text-white rounded-lg bg-primary"
            >
              <h4>{balance.leave_type}</h4>
              <div>
                <p>{balance.total_balance}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading</p>
        )}
      </div>
      {/* ------------------------------------------------------------------------ */}
      <div className="payroll-dashboard-users mb-4">
        <h3>Upcoming Leaves</h3>
      </div>
      <div className="flex gap-4 w-full cards-container">
        {upcomingLeaves.length > 0 ? (
          upcomingLeaves.map((leave, index) => (
            <div
              key={index}
              className="card flex flex-column flex-center gap-8 text-white rounded-lg bg-primary"
            >
              <h4>{leave.leave_type}</h4>
              <p>
                {leave.start_date} - {leave.end_date}
              </p>
              <div>
                <p>{leave.status}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* ------------------------------------------------------------------- */}

      <div className="payroll-dashboard-users mb-4">
        <h3>Top Users Leave Summary</h3>
      </div>
      <div className="flex gap-4 w-full cards-container">
        {topUsers.length > 0 ? (
          topUsers.map((user, index) => {
            const totalLeaveBalance = user.leave_balances.reduce(
              (acc, lb) => acc + parseFloat(lb.balance),
              0
            );

            return (
              <div
                key={index}
                className="card flex flex-column flex-center gap-8 text-white rounded-lg bg-primary"
              >
                <h4>{user.full_name}</h4>
                <p>Total Leave Balance: {totalLeaveBalance}</p>
                {user.leave_requests.length > 0 ? (
                  <p>
                    Recent Leave: {user.leave_requests[0].leave_type} (
                    {user.leave_requests[0].start_date})
                  </p>
                ) : (
                  <p>No recent leaves</p>
                )}
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default LeaveOverview;
