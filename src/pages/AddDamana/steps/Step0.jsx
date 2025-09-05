import { useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import MainInput from "../../../components/form/MainInput/MainInput";
import { FaIdCard } from "react-icons/fa";
import { CiCreditCard2 } from "react-icons/ci";
import ActionModal from "../../../components/modals/ActionModal";
import FormError from "../../../components/form/FormError";
import FormBtn from "../../../components/form/FormBtn";
import { checkByRegN } from "../../../services/damanaServices";
import PhoneInput from "../../../components/form/PhoneInput";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Step0 = ({ goNext, formData, setFormData }) => {
  const [openModal, setOpenModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { profile } = useSelector((state) => state.profile);

  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: async (payload) => {
      return await checkByRegN({
        registration_number: payload.registration_number,
        is_owner: payload.is_owner,
        owner_national_number: payload.owner_national_number,
      });
    },
    onSuccess: (data) => {
      setFormData((prev) => ({
        ...prev,
        ...data,
        registration_number: data.registration_number,
      }));

      setErrorMsg("");
      goNext();
    },
    onError: (error) => {
      setErrorMsg(error?.response?.data?.error_msg || "حدث خطأ أثناء الإرسال");
    },
  });

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validationSchema: Yup.object({
      registration_number: Yup.string().required(
        t("pages.addDamana.step0.registrationNumber.required")
      ),
      is_owner: Yup.boolean()
        .oneOf([true, false], t("pages.addDamana.step0.isOwnerRequired"))
        .required(t("pages.addDamana.step0.isOwnerRequired")),
      owner_national_number: Yup.string().when("is_owner", {
        is: false,
        then: (schema) =>
          schema.required(
            t("pages.addDamana.step0.ownerNationalNumber.required")
          ),
      }),
      owner_full_mobile: Yup.string().when("is_owner", {
        is: false,
        then: (schema) =>
          schema.required(t("pages.addDamana.step0.ownerFullMobile.required")),
      }),
    }),
    onSubmit: (values) => {
      setErrorMsg("");
      setFormData((prev) => ({ ...prev, ...values }));
      mutation.mutate(values);
    },
  });

  const getError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";

  const modalMsg = (
    <>
      <h3 className="text-lg lg:text-2xl font-bold">تفويض بمشاركة البيانات</h3>
      {/* <p className="text-sm lg:text-base">
        أنا الموقع أدناه بصفتي الشخصية عميل لدى ضمانة , أصرح لكم وأوافق على قيام
        البنك العربي وشركة ضمانة بالاستعلام عن البيانات الشخصية العائدة لي
        ومعالجتها من خلال استخدام خدمات واجهة برمجة التطبيقات المفتوحة APIs
        المتوفرة من خلال نظام الربط البيني الحكومي , لأغراض التحقق من ملكية
        المركبة, كما أوافق على قيام البنك العربي بمعالجة بياناتي الشخصية بما
        يشمل الاسم، تاريخ الميلاد، العنوان، ورقم هوية الأحوال المدنية الخاص بي
        لأغراض تنفيذ الحوالات أو لأي غرض آخر لازم لغايات الامتثال بالقوانين
        والأنظمة والتعليمات واللوائح المعمول بها في المملكة. يبقى هذا التفويض
        مستمراً ومنتجا لأثاره دون قيد او شرط طيلة فترة عملية بيع المركبة، وذلك
        ضمن نطاق الاستخدام القانوني المصرّح به ويخضع في جميع الأوقات للرقابة
        الداخلية والتدقيق في البنك العربي
      </p> */}
    </>
  );

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-primary">
            {t("pages.addDamana.step0.title")}
          </h3>

          {profile?.account_type === "company" && (
            <div>
              <label className="block mb-2 font-semibold">
                {t("pages.addDamana.step0.isOwnerLabel")}
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="is_owner"
                    checked={formik.values.is_owner === true}
                    onChange={() => formik.setFieldValue("is_owner", true)}
                    className="w-5 h-5 accent-primary cursor-pointer"
                  />
                  {t("pages.addDamana.step0.yes")}
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="is_owner"
                    checked={formik.values.is_owner === false}
                    onChange={() => formik.setFieldValue("is_owner", false)}
                    className="w-5 h-5 accent-primary cursor-pointer"
                  />
                  {t("pages.addDamana.step0.no")}
                </label>
              </div>
              {getError("is_owner") && (
                <div className="text-error mt-1">{getError("is_owner")}</div>
              )}
            </div>
          )}
        </div>

        <img
          src="https://qa.edamana.live/assets/images/car_lmage.png"
          alt="car"
          loading="lazy"
          className="w-32 md:w-52"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput
          id={"registration_number"}
          label={t("pages.addDamana.step0.registrationNumber.label")}
          placeholder={t(
            "pages.addDamana.step0.registrationNumber.placeholder"
          )}
          name="registration_number"
          type="number"
          value={formik.values.registration_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={getError("registration_number")}
          icon={<CiCreditCard2 />}
        />

        {profile?.account_type === "company" &&
          formik.values.is_owner === false && (
            <>
              <MainInput
                label={t("pages.addDamana.step0.ownerNationalNumber.label")}
                id={"owner_national_number"}
                placeholder={t(
                  "pages.addDamana.step0.ownerNationalNumber.placeholder"
                )}
                name="owner_national_number"
                type="number"
                value={formik.values.owner_national_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={getError("owner_national_number")}
                icon={<FaIdCard />}
              />

              <PhoneInput
                formik={formik}
                name="owner_full_mobile"
                combineValue
              />
            </>
          )}
      </div>

      <p className="font-semibold">
        {t("pages.addDamana.step0.agreementText")}{" "}
        <span
          onClick={() => setOpenModal(true)}
          className="underline text-secondary cursor-pointer ms-1"
        >
          {t("pages.addDamana.step0.agreementLink")}
        </span>
      </p>

      <ActionModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        closeBtn
        msg={modalMsg}
        icon="protect"
        primaryBtn={{
          text: t("pages.addDamana.step0.modalPrimaryBtn"),
          action: () => setOpenModal(false),
        }}
      />

      <FormError errorMsg={errorMsg} />
      <FormBtn
        title={t("pages.addDamana.step0.submit")}
        loading={mutation.isPending}
      />
    </form>
  );
};

export default Step0;
