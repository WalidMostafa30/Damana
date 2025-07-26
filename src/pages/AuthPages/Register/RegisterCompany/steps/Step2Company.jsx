import { CiCirclePlus } from "react-icons/ci";
import MainInput from "../../../../../components/form/MainInput/MainInput";

const Step2Company = ({ formik, getError }) => {
  const commissioners = formik.values.commissioners;

  const addCommissioner = () => {
    const newCommissioner = {
      full_name: "",
      nationality: "",
      national_passport_number: "",
      job: "",
      address: "",
      type: "",
      top_commissioner: "",
      commissioner_permissions: "",
      phone: "",
      email: "",
      delegation_permissions: "",
    };
    formik.setFieldValue("commissioners", [...commissioners, newCommissioner]);
  };

  const removeCommissioner = (index) => {
    const updated = commissioners.filter((_, i) => i !== index);
    formik.setFieldValue("commissioners", updated);
  };

  return (
    <>
      {/* نص التفويض */}
      <MainInput
        label="نص التفويض كما هو في السجل التجاري"
        id="commissioners_text"
        name="commissioners_text"
        type="textarea"
        value={formik.values.commissioners_text}
        onChange={formik.handleChange}
        error={getError("commissioners_text")}
      />

      {/* بيانات المفوضين */}
      {commissioners.map((comm, index) => (
        <div
          key={index}
          className="mb-6 p-4 rounded-lg border border-neutral-300"
        >
          <p className="text-primary text-lg font-bold mb-4">
            بيانات المفوض {index + 1}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MainInput
              label="الاسم الرباعي"
              id={`commissioners.${index}.full_name`}
              name={`commissioners.${index}.full_name`}
              value={comm.full_name}
              onChange={formik.handleChange}
              error={getError(`commissioners.${index}.full_name`)}
            />

            <MainInput
              label="الجنسية"
              id={`commissioners.${index}.nationality`}
              name={`commissioners.${index}.nationality`}
              value={comm.nationality}
              onChange={formik.handleChange}
              error={getError(`commissioners.${index}.nationality`)}
            />

            <MainInput
              label="رقم الهوية / جواز السفر"
              id={`commissioners.${index}.national_passport_number`}
              name={`commissioners.${index}.national_passport_number`}
              value={comm.national_passport_number}
              onChange={formik.handleChange}
              error={getError(
                `commissioners.${index}.national_passport_number`
              )}
            />

            <MainInput
              label="الوظيفة"
              id={`commissioners.${index}.job`}
              name={`commissioners.${index}.job`}
              value={comm.job}
              onChange={formik.handleChange}
              error={getError(`commissioners.${index}.job`)}
            />

            <MainInput
              label="العنوان"
              id={`commissioners.${index}.address`}
              name={`commissioners.${index}.address`}
              value={comm.address}
              onChange={formik.handleChange}
              error={getError(`commissioners.${index}.address`)}
            />

            <MainInput
              label="نوع التفويض"
              id={`commissioners.${index}.type`}
              name={`commissioners.${index}.type`}
              value={comm.type}
              onChange={formik.handleChange}
              error={getError(`commissioners.${index}.type`)}
            />

            <MainInput
              label="أعلى مفوض"
              id={`commissioners.${index}.top_commissioner`}
              name={`commissioners.${index}.top_commissioner`}
              value={comm.top_commissioner}
              onChange={formik.handleChange}
              error={getError(`commissioners.${index}.top_commissioner`)}
            />

            <MainInput
              label="صلاحيات المفوض"
              id={`commissioners.${index}.commissioner_permissions`}
              name={`commissioners.${index}.commissioner_permissions`}
              value={comm.commissioner_permissions}
              onChange={formik.handleChange}
              error={getError(
                `commissioners.${index}.commissioner_permissions`
              )}
            />

            <MainInput
              label="رقم الهاتف"
              id={`commissioners.${index}.phone`}
              name={`commissioners.${index}.phone`}
              value={comm.phone}
              onChange={formik.handleChange}
              error={getError(`commissioners.${index}.phone`)}
            />

            <MainInput
              label="البريد الإلكتروني"
              id={`commissioners.${index}.email`}
              name={`commissioners.${index}.email`}
              type="email"
              value={comm.email}
              onChange={formik.handleChange}
              error={getError(`commissioners.${index}.email`)}
            />

            <MainInput
              label="صلاحيات التفويض"
              id={`commissioners.${index}.delegation_permissions`}
              name={`commissioners.${index}.delegation_permissions`}
              value={comm.delegation_permissions}
              onChange={formik.handleChange}
              error={getError(`commissioners.${index}.delegation_permissions`)}
            />
          </div>

          {commissioners.length > 1 && (
            <button
              type="button"
              onClick={() => removeCommissioner(index)}
              className="text-red-500 mt-2 text-sm"
            >
              حذف المفوض
            </button>
          )}
        </div>
      ))}

      {/* زر إضافة مفوض */}
      <p
        className="text-secondary text-lg font-bold flex items-center gap-2 hover:brightness-75 cursor-pointer"
        onClick={addCommissioner}
      >
        <CiCirclePlus className="text-2xl" />
        إضافة مفوض جديد
      </p>

      {/* مفوضي الإدارة (managementCommissioners) */}
      <div className="mt-8 p-4 rounded-lg border border-neutral-300">
        <p className="text-primary text-lg font-bold mb-4">مفوضي الإدارة</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(formik.values.managementCommissioners).map((key) => (
            <MainInput
              key={key}
              label={key}
              id={`managementCommissioners.${key}`}
              name={`managementCommissioners.${key}`}
              value={formik.values.managementCommissioners[key]}
              onChange={formik.handleChange}
              error={getError(`managementCommissioners.${key}`)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Step2Company;
