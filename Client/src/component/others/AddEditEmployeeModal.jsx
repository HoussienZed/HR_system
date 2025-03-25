import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";

const AddEditEmployeeModal = ({
  title,
  employee,
  setEmployee,
  onSubmit,
  handleCloseModal,
}) => {
  return (
    <Modal handleCloseModal={handleCloseModal} title={title}>
      <div className="flex gap-2">
        <Input
          type="text"
          name="name"
          value={employee.name}
          onChange={(e) => {
            setEmployee({
              ...employee,
              name: e.target.value,
            });
          }}
          placeholder="Employee Name"
          label="Employee Name"
          className={"input-sm"}
        />
        <Input
          type="email"
          name="email"
          value={employee.email}
          onChange={(e) => {
            setEmployee({
              ...employee,
              email: e.target.value,
            });
          }}
          placeholder="Email"
          label="Email"
          className={"input-sm"}
        />
      </div>

      <div className="flex gap-2">
        <Input
          type="text"
          name="gender"
          value={employee.gender}
          onChange={(e) => {
            setEmployee({
              ...employee,
              gender: e.target.value,
            });
          }}
          placeholder="Gender"
          label="Gender"
          className={"input-sm"}
        />
        <Input
          type="text"
          name="status"
          value={employee.status}
          onChange={(e) => {
            setEmployee({
              ...employee,
              status: e.target.value,
            });
          }}
          placeholder="Status"
          label="Status"
          className={"input-sm"}
        />
      </div>

      <div className="flex gap-2">
        <Input
          type="text"
          name="position"
          value={employee.position}
          onChange={(e) => {
            setEmployee({
              ...employee,
              position: e.target.value,
            });
          }}
          placeholder="Position"
          label="Position"
          className={"input-sm"}
        />
        <Input
          type="text"
          name="department"
          value={employee.department}
          onChange={(e) => {
            setEmployee({
              ...employee,
              department: e.target.value,
            });
          }}
          placeholder="Department"
          label="Department"
          className={"input-sm"}
        />
      </div>

      <Input
        type="text"
        name="salary"
        value={employee.salary}
        onChange={(e) => {
          setEmployee({
            ...employee,
            salary: e.target.value,
          });
        }}
        placeholder="Salary"
        label="Salary"
        className={"input-sm"}
      />

      <div className="flex justify-end">
        <Button text="Submit" onClick={onSubmit} />
      </div>
    </Modal>
  );
};

export default AddEditEmployeeModal;
