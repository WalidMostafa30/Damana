import { FaUserTie } from "react-icons/fa6";
import MainInput from "../../../../../components/form/MainInput/MainInput";
import { IoCloseCircleOutline } from "react-icons/io5";

const Step6CompanyCommissioner = ({ formik, getError }) => {
  const login_commissioners = formik.values.login_commissioners || [];
  const handleCommissionerSelect = (e) => {
    const commissionerName = e.target.value;
    if (!commissionerName) return;

    const current = login_commissioners;
    if (!current.includes(commissionerName)) {
      formik.setFieldValue("login_commissioners", [
        ...current,
        commissionerName,
      ]);
    }
  };

  const handleRemoveCommissioner = (name) => {
    const current = login_commissioners;
    formik.setFieldValue(
      "login_commissioners",
      current.filter((u) => u !== name)
    );
  };

  return (
    <div className="mt-6">
      <MainInput
        label="اختر المفوضين"
        id="commissioners_select"
        type="select"
        value=""
        onChange={handleCommissionerSelect}
        options={[
          { label: "اختر مفوض", value: "" },
          ...formik.values.commissioners.map((c) => ({
            label: c.full_name,
            value: c.full_name,
          })),
        ]}
        icon={<FaUserTie />}
      />

      {/* عرض المفوضين المختارين */}
      <div className="mt-4 flex flex-wrap gap-2">
        {login_commissioners.map((name, idx) => (
          <div
            key={idx}
            className="p-2 rounded-lg bg-secondary/10 flex items-center gap-2"
          >
            <span>{name}</span>
            <button
              type="button"
              className="text-error-100 text-2xl cursor-pointer"
              onClick={() => handleRemoveCommissioner(name)}
            >
              <IoCloseCircleOutline />
            </button>
          </div>
        ))}
      </div>

      {getError("login_commissioners") && (
        <p className="text-error-100">{getError("login_commissioners")}</p>
      )}
    </div>
  );
};
export default Step6CompanyCommissioner;
