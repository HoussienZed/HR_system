import { useState } from "react";
import Section from "../../component/layout/Section";
import Input from "../../component/others/Input";
import SectionTitle from "../../component/others/SectionTitle";
import Button from "../../component/others/Button";
import AddEditEmployeeModal from "../../component/others/AddEditEmployeeModal";
import UsersTable from "../../component/others/users-table/index";

const Employees = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    gender: "",
    status: "",
    position: "",
    department: "",
    salary: "",
  });
  const [searhedText, setSearchText] = useState("");
  const [isRegisterModalOpen, setIsRegesterModalOpen] = useState(false);

  const resetEmployee = () => {
    setEmployee({
      ...employee,
      name: "",
      email: "",
      gender: "",
      status: "",
      position: "",
      department: "",
      salary: "",
    });
  };

  const handleSearch = () => {
    // do something ...
  };

  const handleOpenRegisterModal = () => {
    setIsRegesterModalOpen(true);
  };

  const handleCloseModal = () => {
    resetEmployee();
    setIsRegesterModalOpen(false);
  };

  const handleRegister = () => {
    // do something ...
  };
  return (
    <Section>
      <SectionTitle>Employees</SectionTitle>
      <div className="flex gap-2 mt-8">
        <Input
          type={"search"}
          name={"search"}
          value={searhedText}
          onChange={(e) => {
            setSearchText(e.target.value);
            handleSearch();
          }}
          placeholder={"Email"}
          className={"input-search"}
        />
        <Button text={"Add Employee"} onClick={handleOpenRegisterModal} />
      </div>

      <div className="mt-8">
        <UsersTable />
      </div>

      {/* Register Modal */}
      {isRegisterModalOpen && (
        <AddEditEmployeeModal
          title={"Register New Employee"}
          employee={employee}
          setEmployee={setEmployee}
          onSubmit={handleRegister}
          handleCloseModal={handleCloseModal}
        />
      )}
    </Section>
  );
};
export default Employees;
