import { useState } from "react";
import ChatIcon from "./ChatIcon";
import ChatWindow from "./ChatWindow";
import "../../../App.css";
import "../../../assets/styles/chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chatbot">
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
      {!isOpen && <ChatIcon onClick={() => setIsOpen(true)} />}
    </div>
  );
};

export default Chatbot;
