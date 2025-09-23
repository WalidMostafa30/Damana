import { useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { LuCircleUserRound } from "react-icons/lu";
import DetailsCard from "../../../components/common/DetailsCard";
import MainInput from "../../../components/form/MainInput/MainInput";
import FormBtn from "../../../components/form/FormBtn";
import PhoneInput from "../../../components/form/PhoneInput";
import { useTranslation } from "react-i18next";
import FormError from "../../../components/form/FormError";
import { getUserInfo } from "../../../services/authService";
import LoadingModal from "../../../components/modals/LoadingModal";

const Step1 = ({ goNext, formData, setFormData }) => {
  const { t } = useTranslation();
  const [errorMsg, setErrorMsg] = useState("");
  const [disabledPhone, setDisabledPhone] = useState(true);

  const data = [
    {
      label: t("pages.addDamana.step1.vehicle.registrationNumber"),
      value: formData.registration_number,
    },
    {
      label: t("pages.addDamana.step1.vehicle.plate"),
      value: `${formData.plate_number} - ${formData.plate_code}`,
    },
    {
      label: t("pages.addDamana.step1.vehicle.vehicleType"),
      value: formData.vehicle_type,
    },
    {
      label: t("pages.addDamana.step1.vehicle.vehicleClass"),
      value: formData.vehicle_class,
    },
    { label: t("pages.addDamana.step1.vehicle.color"), value: formData.color },
    {
      label: t("pages.addDamana.step1.vehicle.chassisNumber"),
      value: formData.chassis_number,
    },
    {
      label: t("pages.addDamana.step1.vehicle.manufactureYear"),
      value: formData.manufacture_year,
    },
    {
      label: t("pages.addDamana.step1.vehicle.licenseExpiry"),
      value: formData.license_expiry_date,
    },
    {
      label: t("pages.addDamana.step1.vehicle.licensingCenter"),
      value: formData.licensing_center,
    },
    {
      label: t("pages.addDamana.step1.vehicle.engineNumber"),
      value: formData.engine_number,
    },
    {
      label: t("pages.addDamana.step1.vehicle.engineCapacity"),
      value: formData.engine_capacity,
    },
    {
      label: t("pages.addDamana.step1.vehicle.loadCapacity"),
      value: formData.load_capacity,
    },
    {
      label: t("pages.addDamana.step1.vehicle.netWeight"),
      value: formData.net_weight,
    },
    {
      label: t("pages.addDamana.step1.vehicle.cargoCapacity"),
      value: formData.cargo_capacity,
    },
    {
      label: t("pages.addDamana.step1.vehicle.estimatedValue"),
      value: formData.estimated_value,
    },
    {
      label: t("pages.addDamana.step1.vehicle.registrationType"),
      value: formData.registration_type,
    },
    {
      label: t("pages.addDamana.step1.vehicle.vehicleClassification"),
      value: formData.vehicle_classification,
    },
  ];

  // ✅ Mutation لجلب بيانات المستخدم
  const userInfoMutation = useMutation({
    mutationFn: (payload) => getUserInfo(payload),
    onSuccess: (data) => {
      console.log("User Info:", data);
      formik.values.buyer_full_mobile = data?.data?.full_mobile || "";
      setFormData((prev) => ({
        ...prev,
        ...data,
      }));
    },
    onError: (error) => {
      setDisabledPhone(false);
      console.error("Failed to fetch user info:", error);
    },
  });

  const mutation = useMutation({
    mutationFn: async (payload) => {
      console.log(payload);
    },
    onSuccess: () => {
      setFormData((prev) => ({
        ...prev,
        buyer_national_number: formik.values.buyer_national_number,
        buyer_full_mobile: formik.values.buyer_full_mobile,
      }));
      setErrorMsg("");
      goNext();
    },
    onError: (error) => {
      setErrorMsg(
        error?.response?.data?.error_msg || t("pages.addDamana.step1.errorMsg")
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      buyer_national_number: formData.buyer_national_number || "",
      buyer_full_mobile: formData.buyer_full_mobile || "",
    },
    validationSchema: Yup.object({
      buyer_national_number: Yup.string()
        .required(t("pages.addDamana.step1.buyer.nationalNumber.required"))
        .min(9, t("pages.addDamana.step1.buyer.nationalNumber.minLength")),
      buyer_full_mobile: Yup.string().required(
        t("pages.addDamana.step1.buyer.phone.required")
      ),
    }),
    onSubmit: (values) => {
      setErrorMsg("");
      mutation.mutate({ ...formData, ...values });
    },
  });

  // 👇 استدعاء الـ mutation لما يسيب الحقل
  const handleNationalNumberBlur = (e) => {
    formik.handleBlur(e);
    const value = e.target.value;

    if (!value || value.length < 9) {
      formik.setFieldError(
        "buyer_national_number",
        t("pages.addDamana.step1.buyer.nationalNumber.minLength")
      );
      return;
    }

    userInfoMutation.mutate({ national_number: value }); // 👈 استدعاء mutation هنا
  };

  const getError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";

  const pageTitle = (title) => (
    <h3 className="lg:text-xl font-bold text-white bg-primary p-2 pe-4 mb-2 rounded-e-3xl w-fit">
      {title}
    </h3>
  );

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <h3 className="text-xl lg:text-2xl font-bold text-primary">
        {t("pages.addDamana.step1.title")}
      </h3>

      <div>
        {pageTitle(t("pages.addDamana.step1.buyer.sectionTitle"))}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MainInput
            id="buyer_national_number"
            label={t("pages.addDamana.step1.buyer.nationalNumber.label")}
            placeholder={t(
              "pages.addDamana.step1.buyer.nationalNumber.placeholder"
            )}
            name="buyer_national_number"
            value={formik.values.buyer_national_number}
            onChange={formik.handleChange}
            onBlur={handleNationalNumberBlur}
            error={getError("buyer_national_number")}
            icon={<LuCircleUserRound />}
          />

          <PhoneInput
            formik={formik}
            name="buyer_full_mobile"
            combineValue
            disabled={disabledPhone}
          />
        </div>
      </div>

      {!formData.is_owner && (
        <div>
          {pageTitle(t("pages.addDamana.step1.owner.sectionTitle"))}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MainInput
              id="owner_national_number"
              label={t("pages.addDamana.step1.owner.nationalNumber.label")}
              placeholder={t(
                "pages.addDamana.step1.owner.nationalNumber.placeholder"
              )}
              name="owner_national_number"
              value={formData.owner_national_number}
              icon={<LuCircleUserRound />}
              disabled
            />

            <MainInput
              type="tel"
              id="owner_full_mobile"
              name="owner_full_mobile"
              placeholder={t("pages.addDamana.step1.owner.phone.placeholder")}
              label={t("pages.addDamana.step1.owner.phone.label")}
              value={formData.owner_full_mobile}
              disabled
            />
          </div>
        </div>
      )}

      <div>
        {pageTitle(t("pages.addDamana.step1.vehicle.sectionTitle"))}
        <DetailsCard data={data} col={2} blur={!formData.is_owner} />
      </div>

      <FormError errorMsg={errorMsg} />

      {!getError("buyer_national_number") && (
        <FormBtn
          title={t("pages.addDamana.step1.submit")}
          loading={mutation.isPending}
        />
      )}

      <LoadingModal openModal={userInfoMutation.isPending} />
    </form>
  );
};

export default Step1;
