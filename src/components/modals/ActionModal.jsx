import successIcon from "./icons/correct-icon.png";
import errorIcon from "./icons/error-icon.png";
import warningIcon from "./icons/warning-icon.png";
import Modal from "./Modal";

const ActionModal = ({
  openModal,
  setOpenModal,
  msg,
  icon = "success",
  primaryBtn = { text: "", action: () => {} },
  dangerBtn = { text: "", action: () => {} },
}) => {
  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      {icon && (
        <img
          src={
            icon === "success"
              ? successIcon
              : icon === "error"
              ? errorIcon
              : warningIcon
          }
          alt="icon"
          loading="lazy"
          className="w-24 lg:w-32 mx-auto"
        />
      )}

      {msg && <p className="text-lg font-bold text-center">{msg}</p>}

      <div className="flex flex-wrap gap-2 lg:gap-4">
        {primaryBtn.text && (
          <button
            className={`mainBtn flex-1`}
            onClick={() => primaryBtn.action()}
            disabled={!primaryBtn.action}
          >
            {primaryBtn.text}
          </button>
        )}
        {dangerBtn.text && (
          <button
            className={`mainBtn danger flex-1`}
            onClick={() => dangerBtn.action()}
            disabled={!dangerBtn.action}
          >
            {dangerBtn.text}
          </button>
        )}
      </div>
    </Modal>
  );
};

export default ActionModal;
