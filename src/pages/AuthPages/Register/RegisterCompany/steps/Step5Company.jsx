const Step5Company = ({ formik, getError }) => {
  return (
    <div>
      <p className="my-4 font-bold">إقرار وتعهد</p>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="acknowledgement"
          name="acknowledgement"
          checked={formik.values.acknowledgement}
          onChange={(e) =>
            formik.setFieldValue("acknowledgement", e.target.checked)
          }
          className="h-10 w-10 border-gray-300 rounded focus:ring-primary-500 accent-primary"
        />
        <label htmlFor="acknowledgement" className="leading-6">
          إقرار وتعهد بأن جميع البيانات والوثائق المقدمة أعلاه صحيحة ودقيقة. كما
          أتعهد بتحديث هذه البيانات فور حدوث أي تغيير، وأوافق على الالتزام بجميع
          الشروط والأحكام الخاصة في منصة "ضمانة".
        </label>
      </div>
      {getError("acknowledgement") && (
        <p className="text-error-100 mt-2">{getError("acknowledgement")}</p>
      )}
    </div>
  );
};

export default Step5Company;
