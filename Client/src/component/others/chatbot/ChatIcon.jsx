import chatbotSvg from "../../../assets/chatbot.svg";

const ChatIcon = ({ onClick }) => {
  return (
    <div onClick={onClick} className="chatbot-icon">
      <img src={chatbotSvg} alt="Chatbot Icon" />
    </div>
  );
};

export default ChatIcon;
