const Step5Company = ({ formik }) => {
  return (
    <div>
      <p className="my-4 font-bold">إقرار وتعهد</p>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="approval"
          name="approval"
          checked={formik.values.approval}
          onChange={formik.handleChange}
          className="h-10 w-10 border-gray-300 rounded focus:ring-primary-500 accent-primary"
        />
        <label htmlFor="approval" className="leading-6">
          إقرار وتعهد بأن جميع البيانات والوثائق المقدمة أعلاه صحيحة ودقيقة. كما
          أتعهد بتحديث هذه البيانات فور حدوث أي تغيير، وأوافق على الالتزام بجميع
          الشروط والأحكام الخاصة في منصة "ضمانة".
        </label>
      </div>
    </div>
  );
};

export default Step5Company;
