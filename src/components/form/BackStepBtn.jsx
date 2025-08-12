import { ImArrowRight } from "react-icons/im";

const BackStepBtn = ({ step, goBack }) => {
  return (
    <>
      {step > 0 && (
        <button
          type="button"
          className="text-neutral-500 hover:text-secondary flex items-center gap-1 cursor-pointer"
          onClick={goBack}
        >
          <ImArrowRight />
          الرجوع للخلف
        </button>
      )}
    </>
  );
};

export default BackStepBtn;
