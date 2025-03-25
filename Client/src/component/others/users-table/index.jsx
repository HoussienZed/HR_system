import axiosBaseUrl from "../../../utils/axios";
import "./style.css";
import { CircleX, UserRoundPen } from "lucide-react";

const Users = () => {
  //demo data to fill the table, data should be the response from get all employees api
  const employees = [
    {
      full_name: "ali",
      email: "example@example.com",
      gender: "male",
      position: "manager",
      department: "tech",
      salary: "1500",
      status: "active",
    },
  ];

  /*  const allEmployees = async () => {
    const employees = await axiosBaseUrl.get("/employees");
    return employees.data;
  }; */

  //function to call add employee api
  const handleAdd = () => {};

  //function to handle delete employee api
  const handleDelete = () => {};

  return (
    <div>
      <table className="users-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((user) => (
            <tr key={user.email}>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.position}</td>
              <td>{user.department}</td>
              <td>{user.salary}</td>
              <td>{user.status}</td>
              <td>
                <button className="users-table-btn" onClick={handleAdd}>
                  <UserRoundPen />
                </button>
                <button className="users-table-btn" onClick={handleDelete}>
                  <CircleX />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
