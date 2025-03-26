import React, { useState } from "react";
import axiosBaseUrl from "../../utils/axios";
import Input from "../../component/others/Input";
import Button from "../../component/others/Button";
import "../../assets/styles/EmployeeLeave.css";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const LeaveRequest = () => {
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    user_id: id,
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const leaveTypes = ["annual", "sick", "unpaid", "maternity", "paternity"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosBaseUrl.post("/Employees/leave-request", form);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <section className="container login_signup_section flex flex-column">
      <div className="leave-return leave-return">
        <button onClick={() => navigate("/employeeleaves")}>Request Leave</button>
      </div>
      <form className="bg-primary body2">
        <h2 className="text-white h2">Leave Request</h2>
        <select
          name="leave_type"
          value={form.leave_type}
          onChange={(e) => {
            setForm({
              ...form,
              leave_type: e.target.value,
            });
          }}
          className="body2 w-full leave-type p-2 rounded border border-gray-300"
        >
          <option value="" disabled>
            Select Leave Type
          </option>
          {leaveTypes.map((leaveType) => (
            <option key={leaveType} value={leaveType}>
              {leaveType.charAt(0).toUpperCase() + leaveType.slice(1)}
            </option>
          ))}
        </select>
        <Input
          type={"date"}
          name={"start_date"}
          value={form.start_date}
          onChange={(e) => {
            setForm({
              ...form,
              start_date: e.target.value,
            });
          }}
          placeholder={"startDate"}
          className={"body2"}
        />
        <Input
          type={"date"}
          name={"end_date"}
          value={form.end_date}
          onChange={(e) => {
            setForm({
              ...form,
              end_date: e.target.value,
            });
          }}
          placeholder={"endDate"}
          className={"body2"}
        />
        <Input
          type={"text"}
          name={"reason"}
          value={form.reason}
          onChange={(e) => {
            setForm({
              ...form,
              reason: e.target.value,
            });
          }}
          placeholder={"reason"}
          className={"body2"}
        />
        <Button
          text={"Submit"}
          onClick={handleSubmit}
          className={"w-full"}
          bgColor="bg-secondary"
          textColor="text-white"
        />
      </form>
    </section>
  );
};

export default LeaveRequest;
