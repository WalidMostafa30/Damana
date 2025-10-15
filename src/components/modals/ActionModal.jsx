import successIcon from "../../assets/icons/correct-icon.png";
import errorIcon from "../../assets/icons/error-icon.png";
import warningIcon from "../../assets/icons/warning-icon.png";
import protectIcon from "../../assets/icons/protect-icon.png";
import Modal from "./Modal";

const ActionModal = ({
  openModal,
  setOpenModal,
  closeBtn = false,
  msg,
  icon = "success",
  primaryBtn, // ممكن تكون undefined أو null
  dangerBtn,
  lightBtn,
  size = "medium",
  textCenter = false,
}) => {
  return (
    <Modal
      openModal={openModal}
      setOpenModal={setOpenModal}
      closeBtn={closeBtn}
      size={size}
    >
      {icon && (
        <img
          src={
            icon === "success"
              ? successIcon
              : icon === "error"
              ? errorIcon
              : icon === "protect"
              ? protectIcon
              : warningIcon
          }
          alt="icon"
          loading="lazy"
          className="w-24 lg:w-32 mx-auto"
        />
      )}

      {msg && (
        <div
          className="text-lg font-bold flex flex-col items-center gap-2"
          style={{ textAlign: textCenter ? "center" : "start" }}
        >
          {msg}
        </div>
      )}

      <div className="flex flex-col lg:flex-row flex-wrap gap-2 lg:gap-4">
        {primaryBtn?.text && (
          <button
            className="mainBtn small2 flex-1"
            onClick={primaryBtn?.action}
            disabled={!primaryBtn?.action}
          >
            {primaryBtn.text}
          </button>
        )}

        {dangerBtn?.text && (
          <button
            className="mainBtn small2 danger flex-1"
            onClick={dangerBtn?.action}
            disabled={!dangerBtn?.action}
          >
            {dangerBtn.text}
          </button>
        )}

        {lightBtn?.text && (
          <button
            className="mainBtn small2 light flex-1"
            onClick={lightBtn?.action}
            disabled={!lightBtn?.action}
          >
            {lightBtn.text}
          </button>
        )}
      </div>
    </Modal>
  );
};

export default ActionModal;
