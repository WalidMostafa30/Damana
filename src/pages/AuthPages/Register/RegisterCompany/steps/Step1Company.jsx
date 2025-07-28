import { CiCirclePlus } from "react-icons/ci";
import MainInput from "../../../../../components/form/MainInput/MainInput";
import { LuFileDigit } from "react-icons/lu";
import { FaEarthAsia } from "react-icons/fa6";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { BsBuildings } from "react-icons/bs";

const Step1Company = ({ formik, getError }) => {
  const partners = formik.values.partners;

  const addPartner = () => {
    const newPartner = {
      full_name: "",
      nationality: "",
      national_passport_number: "",
      address: "",
      phone: "",
      email: "",
    };
    formik.setFieldValue("partners", [...partners, newPartner]);
  };

  const removePartner = (index) => {
    const updated = partners.filter((_, i) => i !== index);
    formik.setFieldValue("partners", updated);
  };

  return (
    <>
      {partners.map((partner, index) => (
        <div key={index} className="mb-6 p-4 rounded-lg">
          <p className="text-primary text-lg font-bold mb-4">
            بيانات الشريك {index + 1}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MainInput
              label="الاسم الرباعي"
              id={`partners.${index}.full_name`}
              name={`partners.${index}.full_name`}
              placeholder="مثال: محمد أحمد علي يوسف"
              value={partner.full_name}
              onChange={formik.handleChange}
              error={getError(`partners.${index}.full_name`)}
              icon={<BsBuildings />}
            />

            <MainInput
              label="الجنسية"
              id={`partners.${index}.nationality`}
              name={`partners.${index}.nationality`}
              placeholder="مثال: مصري"
              value={partner.nationality}
              onChange={formik.handleChange}
              error={getError(`partners.${index}.nationality`)}
              icon={<FaEarthAsia />}
            />

            <MainInput
              label="الرقم الوطني / رقم جواز السفر"
              id={`partners.${index}.national_passport_number`}
              name={`partners.${index}.national_passport_number`}
              placeholder="مثال: A123456789"
              value={partner.national_passport_number}
              onChange={formik.handleChange}
              error={getError(`partners.${index}.national_passport_number`)}
              icon={<LuFileDigit />}
              type="number"
            />

            <MainInput
              label="العنوان"
              id={`partners.${index}.address`}
              name={`partners.${index}.address`}
              placeholder="مثال: شارع النيل، القاهرة"
              value={partner.address}
              onChange={formik.handleChange}
              error={getError(`partners.${index}.address`)}
              icon={<FaEarthAsia />}
            />

            <MainInput
              label="رقم الهاتف"
              type="tel"
              id={`partners.${index}.phone`}
              name={`partners.${index}.phone`}
              placeholder="مثال: 01012345678"
              value={partner.phone}
              onChange={(phone) =>
                formik.setFieldValue(`partners.${index}.phone`, phone)
              }
              error={getError(`partners.${index}.phone`)}
            />

            <MainInput
              label="البريد الإلكتروني"
              id={`partners.${index}.email`}
              name={`partners.${index}.email`}
              placeholder="مثال: owner@example.com"
              value={partner.email}
              onChange={formik.handleChange}
              error={getError(`partners.${index}.email`)}
              icon={<MdOutlineMarkEmailUnread />}
            />
          </div>

          {partners.length > 1 && (
            <button
              type="button"
              onClick={() => removePartner(index)}
              className="text-red-500 mt-2 text-sm"
            >
              حذف الشريك
            </button>
          )}
        </div>
      ))}

      <p
        className="text-secondary text-lg font-bold flex items-center gap-2 hover:brightness-75 cursor-pointer"
        onClick={addPartner}
      >
        <CiCirclePlus className="text-2xl" />
        اضافه شريك جديد
      </p>
    </>
  );
};

export default Step1Company;
