import Modal from "react-modal";
import InputWidget from "./widgets/InputWidget";
import RaisedButton from "./widgets/RaisedButton";

function ModalComponent({
  openModal = false,
  closeModal,
  value,
  onChange,
  onSubmit,
  Component,
}) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div>
      <Modal
        isOpen={openModal}
        onRequestClose={closeModal}
        contentLabel=""
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="space-y-4">
          <div className="flex justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={closeModal}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="flex flex-col space-y-4">
            <InputWidget
              placeholder="FieldName"
              width="w-96"
              type="text"
              value={value}
              onChangeFunction={onChange}
            />
            <RaisedButton buttonName="Add Field" onClickFunction={onSubmit} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalComponent;
