import { CiCirclePlus } from "react-icons/ci";
import MainInput from "../../../../../components/form/MainInput/MainInput";
import { BsBuildings } from "react-icons/bs";
import { FaEarthAsia, FaPeopleLine } from "react-icons/fa6";
import { LuFileDigit } from "react-icons/lu";
import { BiShoppingBag } from "react-icons/bi";
import { GrMoney } from "react-icons/gr";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { useTranslation } from "react-i18next";
import FileUploadSection from "../FileUploadSection";
import { LuCalendarDays } from "react-icons/lu";
import { useState } from "react";

const Step2CompanyUpdate = ({ formik, getError, commissionerExcelLink }) => {
  const { t } = useTranslation();

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

  const [managementType, setManagementType] = useState("general_manager");

  const companyManagers = formik.values.companyManagers || [];

  const addCompanyManager = () => {
    const newManager = {
      member_name: "",
      position: "",
      representing_entity: "",
      election_date: "",
      appointment_date: "",
    };
    formik.setFieldValue("companyManagers", [...companyManagers, newManager]);
  };

  // 🔴 حذف مفوض إدارة
  const removeCompanyManager = (index) => {
    const updated = companyManagers.filter((_, i) => i !== index);
    formik.setFieldValue("companyManagers", updated);
  };

  return (
    <>
      {/* نص التفويض */}
      <MainInput
        label={t("pages.step2Company.delegationText.label")}
        id="commissioners_text"
        name="commissioners_text"
        type="textarea"
        value={formik.values.commissioners_text}
        onChange={formik.handleChange}
        error={getError("commissioners_text")}
      />

      {/* اختيار طريقة الإدخال */}
      <div className="mb-6">
        <p className="text-lg font-bold text-primary mb-2">
          {t("pages.step2Company.chooseCommissioners_type")}
        </p>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="commissioners_type"
              value="form"
              checked={formik.values.commissioners_type === "form"}
              onChange={() =>
                formik.setFieldValue("commissioners_type", "form")
              }
              className="accent-primary w-4 h-4"
            />
            <span>{t("pages.step2Company.commissioners_type.form")}</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="commissioners_type"
              value="excel"
              checked={formik.values.commissioners_type === "excel"}
              onChange={() =>
                formik.setFieldValue("commissioners_type", "excel")
              }
              className="accent-primary w-4 h-4"
            />
            <span>{t("pages.step2Company.commissioners_type.excel")}</span>
          </label>
        </div>
      </div>

      {formik.values.commissioners_type === "excel" && (
        <FileUploadSection
          downloadLink={commissionerExcelLink}
          onChange={(file) =>
            formik.setFieldValue("company_commissioner_file", file)
          }
          error={getError("company_commissioner_file")}
          value={formik.values.company_commissioner_file}
        />
      )}

      {/* بيانات المفوضين */}
      {formik.values.commissioners_type === "form" &&
        commissioners.map((comm, index) => (
          <div
            key={index}
            className="mb-6 p-4 rounded-lg border border-neutral-300"
          >
            <p className="text-primary text-lg font-bold mb-4">
              {t("pages.step2Company.commissionerTitle", { index: index + 1 })}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MainInput
                label={t("pages.step2Company.fields.fullName.label")}
                placeholder={t(
                  "pages.step2Company.fields.fullName.placeholder"
                )}
                id={`commissioners.${index}.full_name`}
                name={`commissioners.${index}.full_name`}
                value={comm.full_name}
                onChange={formik.handleChange}
                error={getError(`commissioners.${index}.full_name`)}
                icon={<BsBuildings />}
              />

              <MainInput
                label={t("pages.step2Company.fields.nationality.label")}
                placeholder={t(
                  "pages.step2Company.fields.nationality.placeholder"
                )}
                id={`commissioners.${index}.nationality`}
                name={`commissioners.${index}.nationality`}
                value={comm.nationality}
                onChange={formik.handleChange}
                error={getError(`commissioners.${index}.nationality`)}
                icon={<FaEarthAsia />}
              />

              <MainInput
                label={t(
                  "pages.step2Company.fields.nationalPassportNumber.label"
                )}
                placeholder={t(
                  "pages.step2Company.fields.nationalPassportNumber.placeholder"
                )}
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
                label={t("pages.step2Company.fields.job.label")}
                placeholder={t("pages.step2Company.fields.job.placeholder")}
                id={`commissioners.${index}.job`}
                name={`commissioners.${index}.job`}
                value={comm.job}
                onChange={formik.handleChange}
                error={getError(`commissioners.${index}.job`)}
                icon={<BiShoppingBag />}
              />

              <MainInput
                label={t("pages.step2Company.fields.address.label")}
                placeholder={t("pages.step2Company.fields.address.placeholder")}
                id={`commissioners.${index}.address`}
                name={`commissioners.${index}.address`}
                value={comm.address}
                onChange={formik.handleChange}
                error={getError(`commissioners.${index}.address`)}
                icon={<FaEarthAsia />}
              />

              {/* <MainInput
                label={t("pages.step2Company.fields.type.label")}
                placeholder={t("pages.step2Company.fields.type.placeholder")}
                id={`commissioners.${index}.type`}
                name={`commissioners.${index}.type`}
                value={comm.type}
                onChange={formik.handleChange}
                error={getError(`commissioners.${index}.type`)}
                icon={<FaPeopleLine />}
              /> */}
              <MainInput
                type="select"
                label={t("pages.step2Company.fields.type.label")}
                placeholder={t("pages.step2Company.fields.type.placeholder")}
                id={`commissioners.${index}.type`}
                name={`commissioners.${index}.type`}
                value={comm.type}
                onChange={(e) => {
                  const value = e.target.value;
                  formik.setFieldValue(`commissioners.${index}.type`, value);

                  // لو اختار مالي (option_2) نحذف قيمة top_commissioner ونشيل الخطأ لو موجود
                  if (value === "option_2") {
                    formik.setFieldValue(
                      `commissioners.${index}.top_commissioner`,
                      ""
                    );
                    formik.setFieldError(
                      `commissioners.${index}.top_commissioner`,
                      undefined
                    );
                  }
                }}
                error={getError(`commissioners.${index}.type`)}
                icon={<FaPeopleLine />}
                options={[
                  { value: "option_1", label: "اداري" },
                  { value: "option_2", label: "مالي" },
                  { value: "option_3", label: "قانوني" },
                  { value: "option_4", label: "قضائي" },
                  { value: "option_5", label: "اخرى" },
                ]}
              />

              <MainInput
                label={t("pages.step2Company.fields.topCommissioner.label")}
                placeholder={t(
                  "pages.step2Company.fields.topCommissioner.placeholder"
                )}
                id={`commissioners.${index}.top_commissioner`}
                name={`commissioners.${index}.top_commissioner`}
                value={comm.top_commissioner}
                onChange={formik.handleChange}
                error={
                  comm.type === "option_2"
                    ? "" // لو مالي.. يشيل الفاليديشن
                    : getError(`commissioners.${index}.top_commissioner`)
                }
                icon={<LuFileDigit />}
                disabled={comm.type === "option_2"} // هنا بنعطل الإدخال
              />

              <MainInput
                label={t(
                  "pages.step2Company.fields.commissionerPermissions.label"
                )}
                placeholder={t(
                  "pages.step2Company.fields.commissionerPermissions.placeholder"
                )}
                id={`commissioners.${index}.commissioner_permissions`}
                name={`commissioners.${index}.commissioner_permissions`}
                value={comm.commissioner_permissions}
                onChange={formik.handleChange}
                error={getError(
                  `commissioners.${index}.commissioner_permissions`
                )}
                type="select"
                icon={<GrMoney />}
                options={[
                  {
                    value: "option_1",
                    label: "منفرد",
                  },
                  {
                    value: "option_2",
                    label: "مجتمع مع مفوض آخر",
                  },
                ]}
              />

              <MainInput
                label={t("pages.step2Company.fields.phone.label")}
                placeholder={t("pages.step2Company.fields.phone.placeholder")}
                id={`commissioners.${index}.phone`}
                name={`commissioners.${index}.phone`}
                type="tel"
                value={comm.phone}
                onChange={(phone) =>
                  formik.setFieldValue(`commissioners.${index}.phone`, phone)
                }
                error={getError(`commissioners.${index}.phone`)}
              />

              <MainInput
                label={t("pages.step2Company.fields.email.label")}
                placeholder={t("pages.step2Company.fields.email.placeholder")}
                id={`commissioners.${index}.email`}
                name={`commissioners.${index}.email`}
                type="email"
                value={comm.email}
                onChange={formik.handleChange}
                error={getError(`commissioners.${index}.email`)}
                icon={<MdOutlineMarkEmailUnread />}
              />

              <MainInput
                label={t(
                  "pages.step2Company.fields.delegationPermissions.label"
                )}
                placeholder={t(
                  "pages.step2Company.fields.delegationPermissions.placeholder"
                )}
                id={`commissioners.${index}.delegation_permissions`}
                name={`commissioners.${index}.delegation_permissions`}
                value={comm.delegation_permissions}
                onChange={formik.handleChange}
                error={getError(
                  `commissioners.${index}.delegation_permissions`
                )}
                icon={<GrMoney />}
              />
            </div>

            {commissioners.length > 1 && (
              <button
                type="button"
                onClick={() => removeCommissioner(index)}
                className="text-red-500 mt-2 text-sm"
              >
                {t("pages.step2Company.removeCommissioner")}
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
        {t("pages.step2Company.addCommissioner")}
      </p>

      {/* مفوضي الإدارة */}
      <div className="mt-8">
        <p className="text-primary text-lg font-bold mb-4">
          {t("pages.step2Company.managementCommissionersTitle")}
        </p>

        <div className="mb-6">
          <p className="text-base font-semibold mb-2 text-neutral-700">
            نوع الإدارة:
          </p>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="management_type"
                value="general_manager"
                checked={managementType === "general_manager"}
                onChange={() => {
                  setManagementType("general_manager");
                  // لو اختار مدير عام، خليه يحتفظ بعضو واحد فقط
                  if (companyManagers.length > 1) {
                    formik.setFieldValue("companyManagers", [
                      companyManagers[0],
                    ]);
                  }
                }}
                className="accent-primary w-4 h-4"
              />
              <span>مدير عام</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="management_type"
                value="board_of_directors"
                checked={managementType === "board_of_directors"}
                onChange={() => setManagementType("board_of_directors")}
                className="accent-primary w-4 h-4"
              />
              <span>مجلس إدارة</span>
            </label>
          </div>
        </div>

        {companyManagers.map((manager, index) => (
          <div
            key={index}
            className="mb-6 p-4 rounded-lg border border-neutral-300"
          >
            <p className="text-primary font-semibold mb-3">
              {t("pages.step2Company.managerTitle", { index: index + 1 })}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MainInput
                label="اسم العضو"
                placeholder="اكتب اسم العضو"
                id={`companyManagers.${index}.member_name`}
                name={`companyManagers.${index}.member_name`}
                value={manager.member_name}
                onChange={formik.handleChange}
                error={getError(`companyManagers.${index}.member_name`)}
                icon={<BsBuildings />}
              />

              <MainInput
                label="الصفة"
                placeholder="اكتب الصفة"
                id={`companyManagers.${index}.position`}
                name={`companyManagers.${index}.position`}
                value={manager.position}
                onChange={formik.handleChange}
                error={getError(`companyManagers.${index}.position`)}
                icon={<FaPeopleLine />}
              />

              <MainInput
                label="الجهة التي يمثلها"
                placeholder="اكتب الجهة التي يمثلها"
                id={`companyManagers.${index}.representing_entity`}
                name={`companyManagers.${index}.representing_entity`}
                value={manager.representing_entity}
                onChange={formik.handleChange}
                error={getError(`companyManagers.${index}.representing_entity`)}
                icon={<BsBuildings />}
              />

              <MainInput
                label="تاريخ الانتخاب"
                type="date"
                id={`companyManagers.${index}.election_date`}
                name={`companyManagers.${index}.election_date`}
                value={manager.election_date}
                onChange={formik.handleChange}
                error={getError(`companyManagers.${index}.election_date`)}
                icon={<LuCalendarDays />}
              />

              <MainInput
                label="تاريخ التعيين"
                type="date"
                id={`companyManagers.${index}.appointment_date`}
                name={`companyManagers.${index}.appointment_date`}
                value={manager.appointment_date}
                onChange={formik.handleChange}
                error={getError(`companyManagers.${index}.appointment_date`)}
                icon={<LuCalendarDays />}
              />
            </div>

            {companyManagers.length > 1 && (
              <button
                type="button"
                onClick={() => removeCompanyManager(index)}
                className="text-red-500 mt-2 text-sm"
              >
                حذف العضو
              </button>
            )}
          </div>
        ))}

        {/* زر إضافة عضو إدارة */}
        {managementType !== "general_manager" && (
          <p
            className="text-secondary text-lg font-bold flex items-center gap-2 hover:brightness-75 cursor-pointer"
            onClick={addCompanyManager}
          >
            <CiCirclePlus className="text-2xl" />
            إضافة عضو إدارة جديد
          </p>
        )}
      </div>
    </>
  );
};

export default Step2CompanyUpdate;
