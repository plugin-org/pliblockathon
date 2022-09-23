import Modal from "react-modal";
import InputWidget from "./widgets/InputWidget";
import RaisedButton from "./widgets/RaisedButton";
import RaisedButtonSecondary from "./widgets/RaisedButtonSecondary";

function ModalComponent({
  openModal = false,
  closeModal,
  secretValue,
  passwordValue,
  onChangeSecret,
  onChangePassword,
  onSubmit,
  remarks = false,
  remarksValue,
  onChangeRemarks,
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
        <div className="space-y-4 w-[25rem]">
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
            {remarks ? (
              <InputWidget
                placeholder="Reason for Rejection"
                width="w-full"
                type="text"
                value={remarksValue}
                onChangeFunction={onChangeRemarks}
              />
            ) : (
              <></>
            )}
            <InputWidget
              placeholder="Secret Key"
              width="w-96"
              type="password"
              value={secretValue}
              onChangeFunction={onChangeSecret}
            />
            <InputWidget
              placeholder="Password"
              width="w-96"
              type="password"
              value={passwordValue}
              onChangeFunction={onChangePassword}
            />

            <div className="w-full flex space-x-2">
              <RaisedButton
                buttonName="Continue"
                onClickFunction={onSubmit}
                width="w-full"
              />
              <RaisedButtonSecondary
                buttonName="Cancel"
                onClickFunction={closeModal}
                width="w-full"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalComponent;
