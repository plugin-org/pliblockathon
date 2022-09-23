import Modal from "react-modal";
import InputWidget from "./widgets/InputWidget";
import RaisedButton from "./widgets/RaisedButton";
import RaisedButtonSecondary from "./widgets/RaisedButtonSecondary";

function ConfirmModalComponent({
  openModal = false,
  closeModal,
  title,
  confirmOnClick,
  cancelOnClick,
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
        <div className="space-y-4 flex flex-col">
          <h1 className="text-2xl text-customBlack font-secondaryTypefaceDmSans">
            {title}
          </h1>
          <RaisedButton buttonName="Confirm" onClickFunction={confirmOnClick} />
          <RaisedButtonSecondary
            buttonName="Cancel"
            onClickFunction={cancelOnClick}
          />
        </div>
      </Modal>
    </div>
  );
}

export default ConfirmModalComponent;
