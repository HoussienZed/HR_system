import axiosBaseUrl from "../../../utils/axios";
import "./style.css";

const EmployeesTable = ({ employees, actions }) => {
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
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.full_name}</td>
              <td>{employee.email}</td>
              <td>{employee.gender}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>{employee.salary}</td>
              <td>{employee.status}</td>
              <td>
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => action.handler(employee)}
                    className="users-table-btn"
                  >
                    {action.label}
                  </button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesTable;
