import { X } from "lucide-react";

const Modal = ({ children, handleCloseModal, title, className }) => {
  return (
    <div className="modal-overlay w-full h-full flex justify-center items-center px-8 py-8">
      <div
        className={`modal bg-white rounded-lg flex flex-column gap-4 ${className}`}
      >
        <div
          className="bg-white flex justify-end cursor-pointer"
          onClick={handleCloseModal}
        >
          <X />
        </div>
        <h4 className="h3 mb-4 relative flex flex-center">{title}</h4>
        {children}
      </div>
    </div>
  );
};
export default Modal;
