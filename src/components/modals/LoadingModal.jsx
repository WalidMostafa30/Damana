import Loader from "../layout/Loading/Loader";
import Modal from "./Modal";

const LoadingModal = ({ openModal }) => {
  return (
    <Modal openModal={openModal}>
      <Loader />
    </Modal>
  );
};
export default LoadingModal;
