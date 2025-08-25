import { CiCirclePlus } from "react-icons/ci";
import MainInput from "../../../../../components/form/MainInput/MainInput";
import { BsBuildings } from "react-icons/bs";
import { FaEarthAsia, FaPeopleLine } from "react-icons/fa6";
import { LuFileDigit } from "react-icons/lu";
import { BiShoppingBag } from "react-icons/bi";
import { GrMoney } from "react-icons/gr";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import PhoneInput from "../../../../../components/form/PhoneInput";

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
              placeholder={"الاسم الرباعي"}
              id={`commissioners.${index}.full_name`}
              name={`commissioners.${index}.full_name`}
              value={comm.full_name}
              onChange={formik.handleChange}
              error={getError(`commissioners.${index}.full_name`)}
              icon={<BsBuildings />}
            />

            <MainInput
              label="الجنسية"
              placeholder={"الجنسية"}
              id={`commissioners.${index}.nationality`}
              name={`commissioners.${index}.nationality`}
              value={comm.nationality}
              onChange={formik.handleChange}
              error={getError(`commissioners.${index}.nationality`)}
              icon={<FaEarthAsia />}
            />

            <MainInput
              label="رقم الهوية / جواز السفر"
              placeholder={"رقم الهوية / جواز السفر"}
              id={`commissioners.${index}.national_passport_number`}
              name={`commissioners.${index}.national_passport_number`}
              value={comm.national_passport_number}
              onChange={formik.handleChange}
              error={getError(
                `commissioners.${index}.national_passport_number`
              )}
              icon={<LuFileDigit />}
            />

            <MainInput
              label="الوظيفة"
              placeholder={"الوظيفة"}
              id={`commissioners.${index}.job`}
              name={`commissioners.${index}.job`}
              value={comm.job}
              onChange={formik.handleChange}
              error={getError(`commissioners.${index}.job`)}
              icon={<BiShoppingBag />}
            />

            <MainInput
              label="العنوان"
              placeholder={"العنوان"}
              id={`commissioners.${index}.address`}
              name={`commissioners.${index}.address`}
              value={comm.address}
              onChange={formik.handleChange}
              error={getError(`commissioners.${index}.address`)}
              icon={<FaEarthAsia />}
            />

            <MainInput
              label="نوع التفويض"
              placeholder={"نوع التفويض"}
              id={`commissioners.${index}.type`}
              name={`commissioners.${index}.type`}
              value={comm.type}
              onChange={formik.handleChange}
              error={getError(`commissioners.${index}.type`)}
              icon={<FaPeopleLine />}
            />

            <MainInput
              label="أعلى مفوض"
              placeholder={"أعلى مفوض"}
              id={`commissioners.${index}.top_commissioner`}
              name={`commissioners.${index}.top_commissioner`}
              value={comm.top_commissioner}
              onChange={formik.handleChange}
              error={getError(`commissioners.${index}.top_commissioner`)}
              icon={<LuFileDigit />}
            />

            <MainInput
              label="صلاحيات المفوض"
              placeholder={"صلاحيات المفوض"}
              id={`commissioners.${index}.commissioner_permissions`}
              name={`commissioners.${index}.commissioner_permissions`}
              value={comm.commissioner_permissions}
              onChange={formik.handleChange}
              error={getError(
                `commissioners.${index}.commissioner_permissions`
              )}
              icon={<GrMoney />}
            />

            <MainInput
              label="رقم الهاتف"
              placeholder={"رقم الهاتف"}
              id={`commissioners.${index}.phone`}
              name={`commissioners.${index}.phone`}
              type="tel"
              value={comm.phone}
              onChange={(phone) =>
                formik.setFieldValue(`commissioners.${index}.phone`, phone)
              }
              error={getError(`commissioners.${index}.phone`)}
            />
            {/* <PhoneInput
              formik={formik}
              name={`commissioners.${index}.phone`}
              combineValue={true}
            /> */}

            <MainInput
              label="البريد الإلكتروني"
              placeholder={"البريد الإلكتروني"}
              id={`commissioners.${index}.email`}
              name={`commissioners.${index}.email`}
              type="email"
              value={comm.email}
              onChange={formik.handleChange}
              error={getError(`commissioners.${index}.email`)}
              icon={<MdOutlineMarkEmailUnread />}
            />

            <MainInput
              label="صلاحيات التفويض"
              placeholder={"صلاحيات التفويض"}
              id={`commissioners.${index}.delegation_permissions`}
              name={`commissioners.${index}.delegation_permissions`}
              value={comm.delegation_permissions}
              onChange={formik.handleChange}
              error={getError(`commissioners.${index}.delegation_permissions`)}
              icon={<GrMoney />}
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
          <MainInput
            label="الاسم الرباعي"
            placeholder="الاسم الرباعي"
            id="managementCommissioners.full_name"
            name="managementCommissioners.full_name"
            value={formik.values.managementCommissioners.full_name}
            onChange={formik.handleChange}
            error={getError("managementCommissioners.full_name")}
            icon={<BsBuildings />}
          />

          <MainInput
            label="الجنسية"
            placeholder="الجنسية"
            id="managementCommissioners.nationality"
            name="managementCommissioners.nationality"
            value={formik.values.managementCommissioners.nationality}
            onChange={formik.handleChange}
            error={getError("managementCommissioners.nationality")}
            icon={<FaEarthAsia />}
          />

          <MainInput
            label="رقم الهوية / جواز السفر"
            placeholder="رقم الهوية / جواز السفر"
            id="managementCommissioners.national_passport_number"
            name="managementCommissioners.national_passport_number"
            value={
              formik.values.managementCommissioners.national_passport_number
            }
            onChange={formik.handleChange}
            error={getError("managementCommissioners.national_passport_number")}
            icon={<LuFileDigit />}
          />

          <MainInput
            label="العنوان"
            placeholder="العنوان"
            id="managementCommissioners.address"
            name="managementCommissioners.address"
            value={formik.values.managementCommissioners.address}
            onChange={formik.handleChange}
            error={getError("managementCommissioners.address")}
            icon={<FaEarthAsia />}
          />

          <MainInput
            label="نوع التفويض"
            placeholder="نوع التفويض"
            id="managementCommissioners.type"
            name="managementCommissioners.type"
            value={formik.values.managementCommissioners.type}
            onChange={formik.handleChange}
            error={getError("managementCommissioners.type")}
            icon={<FaPeopleLine />}
          />

          <MainInput
            label="أعلى مفوض"
            placeholder="أعلى مفوض"
            id="managementCommissioners.top_commissioner"
            name="managementCommissioners.top_commissioner"
            value={formik.values.managementCommissioners.top_commissioner}
            onChange={formik.handleChange}
            error={getError("managementCommissioners.top_commissioner")}
            icon={<LuFileDigit />}
          />

          <MainInput
            label="صلاحيات المفوض"
            placeholder="صلاحيات المفوض"
            id="managementCommissioners.commissioner_permissions"
            name="managementCommissioners.commissioner_permissions"
            value={
              formik.values.managementCommissioners.commissioner_permissions
            }
            onChange={formik.handleChange}
            error={getError("managementCommissioners.commissioner_permissions")}
            icon={<GrMoney />}
          />

          <MainInput
            label="رقم الهاتف"
            placeholder="رقم الهاتف"
            type="tel"
            id="managementCommissioners.phone"
            name="managementCommissioners.phone"
            value={formik.values.managementCommissioners.phone}
            onChange={(phone) =>
              formik.setFieldValue("managementCommissioners.phone", phone)
            }
            error={getError("managementCommissioners.phone")}
          />
          {/* <PhoneInput
            formik={formik}
            name="managementCommissioners.phone"
            combineValue={true}
          /> */}

          <MainInput
            label="البريد الإلكتروني"
            placeholder="البريد الإلكتروني"
            type="email"
            id="managementCommissioners.email"
            name="managementCommissioners.email"
            value={formik.values.managementCommissioners.email}
            onChange={formik.handleChange}
            error={getError("managementCommissioners.email")}
            icon={<MdOutlineMarkEmailUnread />}
          />

          <MainInput
            label="صلاحيات التفويض"
            placeholder="صلاحيات التفويض"
            id="managementCommissioners.delegation_permissions"
            name="managementCommissioners.delegation_permissions"
            value={formik.values.managementCommissioners.delegation_permissions}
            onChange={formik.handleChange}
            error={getError("managementCommissioners.delegation_permissions")}
            icon={<GrMoney />}
          />
        </div>
      </div>
    </>
  );
};

export default Step2Company;
