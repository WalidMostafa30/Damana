import { ImArrowRight } from "react-icons/im";
import { useTranslation } from "react-i18next";

const BackStepBtn = ({ step, goBack }) => {
  const { t } = useTranslation();

  return (
    <>
      {step > 0 && (
        <button
          type="button"
          className="text-neutral-500 hover:text-secondary flex items-center gap-1 cursor-pointer"
          onClick={goBack}
        >
          <ImArrowRight className="ltr:rotate-180 rtl:rotate-0"/>
          {t("components.form.backStepBtn")}
        </button>
      )}
    </>
  );
};

export default BackStepBtn;
