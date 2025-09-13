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

const Step2Company = ({ formik, getError, commissionerExcelLink }) => {
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

              <MainInput
                label={t("pages.step2Company.fields.type.label")}
                placeholder={t("pages.step2Company.fields.type.placeholder")}
                id={`commissioners.${index}.type`}
                name={`commissioners.${index}.type`}
                value={comm.type}
                onChange={formik.handleChange}
                error={getError(`commissioners.${index}.type`)}
                icon={<FaPeopleLine />}
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
                error={getError(`commissioners.${index}.top_commissioner`)}
                icon={<LuFileDigit />}
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
                icon={<GrMoney />}
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
      <div className="mt-8 p-4 rounded-lg border border-neutral-300">
        <p className="text-primary text-lg font-bold mb-4">
          {t("pages.step2Company.managementCommissionersTitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MainInput
            label={t("pages.step2Company.fields.fullName.label")}
            placeholder={t("pages.step2Company.fields.fullName.placeholder")}
            id="managementCommissioners.full_name"
            name="managementCommissioners.full_name"
            value={formik.values.managementCommissioners.full_name}
            onChange={formik.handleChange}
            error={getError("managementCommissioners.full_name")}
            icon={<BsBuildings />}
          />

          <MainInput
            label={t("pages.step2Company.fields.nationality.label")}
            placeholder={t("pages.step2Company.fields.nationality.placeholder")}
            id="managementCommissioners.nationality"
            name="managementCommissioners.nationality"
            value={formik.values.managementCommissioners.nationality}
            onChange={formik.handleChange}
            error={getError("managementCommissioners.nationality")}
            icon={<FaEarthAsia />}
          />

          <MainInput
            label={t("pages.step2Company.fields.nationalPassportNumber.label")}
            placeholder={t(
              "pages.step2Company.fields.nationalPassportNumber.placeholder"
            )}
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
            label={t("pages.step2Company.fields.address.label")}
            placeholder={t("pages.step2Company.fields.address.placeholder")}
            id="managementCommissioners.address"
            name="managementCommissioners.address"
            value={formik.values.managementCommissioners.address}
            onChange={formik.handleChange}
            error={getError("managementCommissioners.address")}
            icon={<FaEarthAsia />}
          />

          <MainInput
            label={t("pages.step2Company.fields.type.label")}
            placeholder={t("pages.step2Company.fields.type.placeholder")}
            id="managementCommissioners.type"
            name="managementCommissioners.type"
            value={formik.values.managementCommissioners.type}
            onChange={formik.handleChange}
            error={getError("managementCommissioners.type")}
            icon={<FaPeopleLine />}
          />

          <MainInput
            label={t("pages.step2Company.fields.topCommissioner.label")}
            placeholder={t(
              "pages.step2Company.fields.topCommissioner.placeholder"
            )}
            id="managementCommissioners.top_commissioner"
            name="managementCommissioners.top_commissioner"
            value={formik.values.managementCommissioners.top_commissioner}
            onChange={formik.handleChange}
            error={getError("managementCommissioners.top_commissioner")}
            icon={<LuFileDigit />}
          />

          <MainInput
            label={t("pages.step2Company.fields.commissionerPermissions.label")}
            placeholder={t(
              "pages.step2Company.fields.commissionerPermissions.placeholder"
            )}
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
            label={t("pages.step2Company.fields.phone.label")}
            placeholder={t("pages.step2Company.fields.phone.placeholder")}
            type="tel"
            id="managementCommissioners.phone"
            name="managementCommissioners.phone"
            value={formik.values.managementCommissioners.phone}
            onChange={(phone) =>
              formik.setFieldValue("managementCommissioners.phone", phone)
            }
            error={getError("managementCommissioners.phone")}
          />

          <MainInput
            label={t("pages.step2Company.fields.email.label")}
            placeholder={t("pages.step2Company.fields.email.placeholder")}
            type="email"
            id="managementCommissioners.email"
            name="managementCommissioners.email"
            value={formik.values.managementCommissioners.email}
            onChange={formik.handleChange}
            error={getError("managementCommissioners.email")}
            icon={<MdOutlineMarkEmailUnread />}
          />

          <MainInput
            label={t("pages.step2Company.fields.delegationPermissions.label")}
            placeholder={t(
              "pages.step2Company.fields.delegationPermissions.placeholder"
            )}
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
