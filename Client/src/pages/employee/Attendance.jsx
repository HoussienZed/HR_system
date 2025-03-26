import SectionTitle from "../../component/others/SectionTitle";
import Section from "../../component/layout/Section";
import attendanceSvg from "../../assets/attendance-svg.svg";
import Button from "../../component/others/Button";
import { useState } from "react";
import axiosBaseUrl from "../../utils/axios";
import { X } from "lucide-react";
import "../../App.css";

const Attendance = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [clockedIn, setClockedIn] = useState(
    localStorage.getItem("clockIn") ? true : false
  );
  const [toast, setToast] = useState({
    message: "",
    success: true,
    visible: false,
  });

  const handleClockIn = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setLatitude(lat);
        setLongitude(lon);

        try {
          const response = await axiosBaseUrl.post("/Employees/clockIn", {
            latitude: lat,
            longitude: lon,
          });

          if (response.data.success) {
            setClockedIn(true);
            localStorage.setItem("clockIn", true);
            setToast({
              message: "Clocked in successfully",
              success: true,
              visible: true,
            });
          } else {
            setToast({
              message: response.data.message + " " + clockedIn,
              success: false,
              visible: true,
            });
          }
        } catch (error) {
          console.error("Clock-in error:", error);
          setToast({
            message: "Something went wrong while clocking in.",
            success: false,
            visible: true,
          });
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setToast({
          message: "Could not get your location.",
          success: false,
          visible: true,
        });
      }
    );
  };

  return (
    <>
      <Section>
        <SectionTitle>Attendance</SectionTitle>
        <div className="flex justify-between items-center mt-8">
          <div className="flex flex-column items-end justify-between gap-8 bg-white rounded-lg px-12 py-12">
            <div className="flex gap-16 w-full justify-between items-center">
              <h3>Clock In:</h3>
              <Button
                text={"Clock In"}
                fontSize="body2"
                onClick={handleClockIn}
                disabled={clockedIn}
                className={clockedIn ? "disabled" : ""}
              />
            </div>
            <div className="flex gap-16 w-full justify-between items-center">
              <h3>Clock out:</h3>
              <Button
                text={"Clock Out"}
                fontSize="body2"
                disabled={!clockedIn}
                className={!clockedIn ? "disabled" : ""}
              />
            </div>
            <div>
              <p className="text-sm text-gray-700">
                {clockedIn
                  ? "✅ You have successfully clocked in today."
                  : "🕒 You have not clocked in yet."}
              </p>

              {latitude && longitude && (
                <p className="text-sm text-gray-500 mt-2">
                  📍 Your location: {latitude.toFixed(5)},{" "}
                  {longitude.toFixed(5)}
                </p>
              )}
            </div>
          </div>
          <div>
            <img src={attendanceSvg} alt="Attendance Illustration" />
          </div>
        </div>
      </Section>

      {/* Toast Notification */}
      {toast.visible && (
        <div
          className={`toast-notification ${
            toast.success ? "toast-success" : "toast-error"
          }`}
        >
          <div className="flex justify-between w-full">
            <h4 className="font-bold">{toast.success ? "Success" : "Error"}</h4>
            <div
              className="flex justify-end cursor-pointer"
              onClick={() => setToast({ ...toast, visible: false })}
            >
              <X />
            </div>
          </div>
          <p className="text-body4">{toast.message}</p>
        </div>
      )}
    </>
  );
};
export default Attendance;
