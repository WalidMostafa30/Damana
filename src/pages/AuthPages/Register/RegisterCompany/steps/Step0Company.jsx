import { CgMailOpen } from "react-icons/cg";
import MainInput from "../../../../../components/form/MainInput/MainInput";
import { BsBank, BsBuildings, BsCalendar2Date } from "react-icons/bs";
import { FaRegFileAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { LuFileDigit } from "react-icons/lu";
import { TbWorldWww } from "react-icons/tb";
import { FaEarthAsia } from "react-icons/fa6";
import {
  MdOutlineDriveFileRenameOutline,
  MdOutlineMarkEmailUnread,
} from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import PhoneInput from "../../../../../components/form/PhoneInput";
import { toArabicWord } from "number-to-arabic-words/dist/index-node.js";
import { useTranslation } from "react-i18next";

const Step0Company = ({ formik, getError }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput
          label={t("pages.step0Company.fields.arName.label")}
          id="ar_name"
          name="ar_name"
          placeholder={t("pages.step0Company.fields.arName.placeholder")}
          value={formik.values.ar_name}
          onChange={formik.handleChange}
          error={getError("ar_name")}
          icon={<BsBuildings />}
        />

        <MainInput
          label={t("pages.step0Company.fields.enName.label")}
          id="en_name"
          name="en_name"
          placeholder={t("pages.step0Company.fields.enName.placeholder")}
          value={formik.values.en_name}
          onChange={formik.handleChange}
          error={getError("en_name")}
          icon={<BsBuildings />}
        />

        <MainInput
          label={t("pages.step0Company.fields.commercialArName.label")}
          id="commercial_ar_name"
          name="commercial_ar_name"
          placeholder={t("pages.step0Company.fields.commercialArName.placeholder")}
          value={formik.values.commercial_ar_name}
          onChange={formik.handleChange}
          error={getError("commercial_ar_name")}
          icon={<BsBuildings />}
        />

        <MainInput
          label={t("pages.step0Company.fields.commercialEnName.label")}
          id="commercial_en_name"
          name="commercial_en_name"
          placeholder={t("pages.step0Company.fields.commercialEnName.placeholder")}
          value={formik.values.commercial_en_name}
          onChange={formik.handleChange}
          error={getError("commercial_en_name")}
          icon={<BsBuildings />}
        />

        <MainInput
          label={t("pages.step0Company.fields.registrationType.label")}
          type="select"
          id="registration_type_legal_form"
          name="registration_type_legal_form"
          options={[
            {
              value: t(
                "pages.step0Company.fields.registrationType.options.establishment"
              ),
              label: t(
                "pages.step0Company.fields.registrationType.options.establishment"
              ),
            },
            {
              value: t(
                "pages.step0Company.fields.registrationType.options.jointStock"
              ),
              label: t(
                "pages.step0Company.fields.registrationType.options.jointStock"
              ),
            },
            {
              value: t(
                "pages.step0Company.fields.registrationType.options.limitedLiability"
              ),
              label: t(
                "pages.step0Company.fields.registrationType.options.limitedLiability"
              ),
            },
          ]}
          value={formik.values.registration_type_legal_form}
          onChange={formik.handleChange}
          error={getError("registration_type_legal_form")}
          icon={<FaRegFileAlt />}
        />

        <MainInput
          label={t("pages.step0Company.fields.countryRegistration.label")}
          placeholder={t("pages.step0Company.fields.countryRegistration.placeholder")}
          id="country_registration"
          name="country_registration"
          value={formik.values.country_registration}
          onChange={formik.handleChange}
          error={getError("country_registration")}
          icon={<IoLocationOutline />}
        />

        <MainInput
          label={t("pages.step0Company.fields.registrationAuthority.label")}
          id="registration_authority"
          name="registration_authority"
          placeholder={t(
            "pages.step0Company.fields.registrationAuthority.placeholder"
          )}
          value={formik.values.registration_authority}
          onChange={formik.handleChange}
          error={getError("registration_authority")}
          icon={<BsBank />}
        />

        <MainInput
          label={t("pages.step0Company.fields.commercialRegistrationNumber.label")}
          id="commercial_registration_number"
          name="commercial_registration_number"
          placeholder={t(
            "pages.step0Company.fields.commercialRegistrationNumber.placeholder"
          )}
          value={formik.values.commercial_registration_number}
          onChange={formik.handleChange}
          error={getError("commercial_registration_number")}
          icon={<LuFileDigit />}
        />

        <MainInput
          label={t("pages.step0Company.fields.registrationDate.label")}
          id="registration_date"
          name="registration_date"
          type="date"
          value={formik.values.registration_date}
          onChange={formik.handleChange}
          error={getError("registration_date")}
          icon={<BsCalendar2Date />}
        />

        <MainInput
          label={t("pages.step0Company.fields.nationalNumber.label")}
          id="national_number"
          name="national_number"
          placeholder={t("pages.step0Company.fields.nationalNumber.placeholder")}
          value={formik.values.national_number}
          onChange={formik.handleChange}
          error={getError("national_number")}
          icon={<LuFileDigit />}
        />

        <MainInput
          label={t("pages.step0Company.fields.websiteUrl.label")}
          id="website_url"
          name="website_url"
          placeholder={t("pages.step0Company.fields.websiteUrl.placeholder")}
          value={formik.values.website_url}
          onChange={formik.handleChange}
          error={getError("website_url")}
          icon={<TbWorldWww />}
        />

        <MainInput
          label={t("pages.step0Company.fields.licenseNumber.label")}
          id="license_number"
          name="license_number"
          placeholder={t("pages.step0Company.fields.licenseNumber.placeholder")}
          value={formik.values.license_number}
          onChange={formik.handleChange}
          error={getError("license_number")}
          icon={<LuFileDigit />}
        />

        <MainInput
          label={t("pages.step0Company.fields.address.label")}
          id="address"
          name="address"
          placeholder={t("pages.step0Company.fields.address.placeholder")}
          value={formik.values.address}
          onChange={formik.handleChange}
          error={getError("address")}
          icon={<FaEarthAsia />}
        />

        <MainInput
          label={t("pages.step0Company.fields.email.label")}
          id="email"
          name="email"
          placeholder={t("pages.step0Company.fields.email.placeholder")}
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={getError("email")}
          icon={<MdOutlineMarkEmailUnread />}
        />

        {/* <MainInput
          label="رقم الهاتف"
          id="phone"
          name="phone"
          placeholder="0501234567"
          type="tel"
          value={formik.values.phone}
          onChange={(phone) => formik.setFieldValue("phone", phone)}
          error={getError("phone")}
        /> */}
        <PhoneInput formik={formik} name="phone" combineValue={true} />

        <MainInput
          label={t("pages.step0Company.fields.taxNumber.label")}
          id="tax_number"
          name="tax_number"
          placeholder={t("pages.step0Company.fields.taxNumber.placeholder")}
          value={formik.values.tax_number}
          onChange={formik.handleChange}
          error={getError("tax_number")}
          icon={<LuFileDigit />}
        />

        <MainInput
          label={t("pages.step0Company.fields.capitalEquity.label")}
          id="capital_equity"
          name="capital_equity"
          placeholder={t("pages.step0Company.fields.capitalEquity.placeholder")}
          value={formik.values.capital_equity}
          onChange={formik.handleChange}
          error={getError("capital_equity")}
          icon={<GiReceiveMoney />}
        />

        <MainInput
          label={t("pages.step0Company.fields.signedName.label")}
          id="signed_name"
          name="signed_name"
          placeholder={t("pages.step0Company.fields.signedName.placeholder")}
          value={formik.values.signed_name}
          onChange={formik.handleChange}
          error={getError("signed_name")}
          icon={<MdOutlineDriveFileRenameOutline />}
        />
      </div>

      {formik.values.capital_equity && (
        <p className="text-neutral-500 flex items-center gap-1 mt-3">
          <CgMailOpen className="text-2xl" />
          {toArabicWord(formik.values.capital_equity)}{" "}
          {t("pages.step0Company.capitalInWords")}
        </p>
      )}
    </>
  );
};

export default Step0Company;
