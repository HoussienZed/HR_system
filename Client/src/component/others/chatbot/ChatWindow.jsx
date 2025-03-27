import { useState } from "react";
import { Send, X } from "lucide-react";
import Input from "../Input";
import axiosBaseUrl from "../../../utils/axios";

const ChatWindow = ({ onClose }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [conservation, setConservation] = useState([]);

  const [toast, setToast] = useState({
    message: "",
    success: true,
    visible: false,
  });

  const sendMessage = async () => {
    try {
      const response = await axiosBaseUrl.post("/askGemini", {
        message: inputMessage,
      });
      if (response.data.success) {
        let ai_reply = response.data.reply;

        setConservation([
          ...conservation,
          {
            userMessage: inputMessage,
            replyMessage: ai_reply,
          },
        ]);

        setInputMessage("");
        console.log(ai_reply);
      } else {
        setToast({
          message: "something went wrong, try again",
          success: false,
          visible: true,
        });
      }
    } catch {
      setToast("something went wrong", false, true);
    }
  };

  return (
    <div className="chatbot-window">
      <div className="bg-primary flex justify-between window-header">
        <h4 className="body2 text-white">🤖 HRFlow Assistant</h4>
        <div className="cursor-pointer" onClick={onClose}>
          <X color="white" />
        </div>
      </div>
      <div className="bg-white flex flex-column justify-between window-body">
        <div className="flex flex-column gap-4 all-past-conservation">
          {conservation.map((item, index) => (
            <div key={index} className="flex flex-column gap-4">
              <div className="w-full flex justify-end">
                {item.userMessage && (
                  <div className="bg-primary px-4 py-4 text-white user-message-sent">
                    {item.userMessage}
                  </div>
                )}
              </div>
              <div className="w-full flex">
                {item.replyMessage && (
                  <div className="bg-tertiary px-4 py-4 text-black reply-message">
                    {item.replyMessage}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="relative">
          <textarea
            type="text"
            className="input-box body2"
            placeholder="Enter your message her"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <div className="send-icon cursor-pointer" onClick={sendMessage}>
            <Send />
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default ChatWindow;
