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
      setToast({
        message: "Geolocation is not supported by your browser",
        success: false,
        visible: true,
      });
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
              message: response.data.message,
              success: false,
              visible: true,
            });
          }
        } catch {
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

  const handleClockOut = async () => {
    try {
      const response = await axiosBaseUrl.post("/Employees/clockOut");
      if (response.data.success) {
        setClockedIn(false);
        localStorage.setItem("clockIn", false);
        setToast({
          message: "You clocked out successfully",
          success: true,
          visible: true,
        });
      }
    } catch {
      setToast("something went wrong", false, true);
    }
  };

  const handleAddingRemoteLocation = async () => {
    if (!navigator.geolocation) {
      setToast({
        message: "Geolocation is not supported by your browser",
        success: false,
        visible: true,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const response = await axiosBaseUrl.post(
            "/Employees/addRemoteLocation",
            {
              latitude: lat,
              longitude: lon,
            }
          );

          if (response.data.success) {
            setToast({
              message: "Remote location added successfully",
              success: true,
              visible: true,
            });
          } else {
            setToast({
              message: response.data.message,
              success: false,
              visible: true,
            });
          }
        } catch {
          setToast({
            message: "something went wrong while adding remote locaiton",
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
        <div className="flex flex-column justify-between gap-8 bg-white rounded-lg px-12 py-12 mt-8">
          <h3 className="h4 font-bold">
            Is your job is remote and don't have a specfic remote location yet ?
          </h3>
          <div className="flex gap-4">
            <p>add a specific remote location:</p>
            <Button text={"submit"} onClick={handleAddingRemoteLocation} />
          </div>
        </div>
        <div className="flex justify-between items-center mt-8">
          <div className="flex flex-column items-end justify-between gap-8 bg-white rounded-lg px-12 py-12">
            <div className="flex gap-16 w-full justify-between items-center">
              <h3>Clock In:</h3>
              <Button
                text={"Clock In"}
                fontSize="body2"
                disabled={clockedIn}
                className={clockedIn ? "disabled" : ""}
                onClick={handleClockIn}
              />
            </div>
            <div className="flex gap-16 w-full justify-between items-center">
              <h3>Clock out:</h3>
              <Button
                text={"Clock Out"}
                fontSize="body2"
                disabled={!clockedIn}
                className={!clockedIn ? "disabled" : ""}
                onClick={handleClockOut}
              />
            </div>
            <div>
              <p>
                {clockedIn
                  ? "✅ You have successfully clocked in."
                  : "🕒 You have not clocked in yet."}
              </p>

              {latitude && longitude && (
                <p className="mt-2">
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
