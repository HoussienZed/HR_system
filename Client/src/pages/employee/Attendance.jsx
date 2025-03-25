import SectionTitle from "../../component/others/SectionTitle";
import Section from "../../component/layout/Section";
import attendanceSvg from "../../assets/attendance-svg.svg";
import Button from "../../component/others/Button";
import UsersTable from "../../component/others/users-table/index";
import Input from "../../component/others/Input";
import { useState } from "react";

let protocol = "http://";
let host = "localhost:8080";
let path = "/hr-system/server/login";

const url = protocol + host + path;

const Attendance = () => {
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleInsertion = async (e) => {
    // e.preventDefault();
    // const form = new FormData();
    // form.append("location", location);
    // try {
    //   const response = await axios.post(
    //     url,
    //     {
    //       location,
    //     },
    //     {
    //       headers: {
    //         Accept: "application/json",
    //       },
    //     }
    //   );
    //   if (response.data.success == true) {
    //     localStorage.setItem("id", response.data.user.id);
    //     localStorage.setItem("full_name", response.data.user.full_name);
    //     localStorage.setItem("token", response.data.user.token);
    //     navigate("/Home");
    //   } else {
    //     console.log("Login failed:", response.data.message);
    //   }
    // } catch (error) {
    //   console.error("Error during login:", error);
    // }
  };

  return (
    <>
      <Section>
        <SectionTitle>Attendance</SectionTitle>
        <form className="bg-primary body2">
          <Input
            type={"text"}
            name={"location"}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={"location"}
            className={"body2"}
            label={"Enter Location"}
          />
          <Button
            text={"Insert Location"}
            onClick={handleInsertion}
            className={"w-full"}
            bgColor="bg-secondary"
            textColor="text-white"
          />
        </form>
        <div className="flex justify-between items-center mt-8">
          <div className="flex flex-column items-end justify-between gap-8 bg-white rounded-lg px-12 py-12">
            <div className="flex gap-16 w-full justify-between items-center">
              <h3>Clock In:</h3>
              <Button text={"Clock In"} fontSize="body2" />
            </div>
            <div className="flex gap-16 w-full justify-between items-center">
              <h3>Clock out:</h3>
              <Button text={"Clock Out"} fontSize="body2" />
            </div>
            <p>Still not clocked in</p>
          </div>
          <div>
            <img src={attendanceSvg} alt="Attendance Illustration" />
          </div>
        </div>
        {/* <div className="mt-8">
          <UsersTable />
        </div> */}
      </Section>
    </>
  );
};
export default Attendance;
