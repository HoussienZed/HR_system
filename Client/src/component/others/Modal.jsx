const Modal = ({ children, handleCloseModal }) => {
  return (
    <div
      className="modal-overlay w-full h-full flex justify-center items-center"
      onClick={handleCloseModal}
    >
      <div className="modal bg-white rounded-lg">{children}</div>
    </div>
  );
};
export default Modal;
