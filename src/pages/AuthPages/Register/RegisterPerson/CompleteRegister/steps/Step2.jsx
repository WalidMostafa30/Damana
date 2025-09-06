import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import MainInput from "../../../../../../components/form/MainInput/MainInput";
import { GoNumber } from "react-icons/go";
import { GiDoubleStreetLights } from "react-icons/gi";
import { FaCity } from "react-icons/fa";
import FormBtn from "../../../../../../components/form/FormBtn";
import { sendAddressOrBankData } from "../../../../../../services/authService";
import { useState } from "react";
import FormError from "../../../../../../components/form/FormError";
import { useNavigate } from "react-router-dom";
import CountrySelect from "../../../../../../components/form/CountrySelect";
import { useTranslation } from "react-i18next";

export default function Step2({ formData, setFormData }) {
  const { t } = useTranslation();
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: sendAddressOrBankData,
    onSuccess: (data, values) => {
      setFormData((prev) => ({ ...prev, ...values }));
      navigate("/");
    },
    onError: (err) => {
      setErrorMsg(
        err?.response?.data?.error_msg || t("pages.Step2.errors.general")
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      address_building_number: formData.address_building_number || "",
      address_street_name: formData.address_street_name || "",
      address_country_id: formData.address_country_id || "",
      address_city_town: formData.address_city_town || "",
    },
    validationSchema: Yup.object({
      address_building_number: Yup.string().required(
        t("pages.Step2.validation.address_building_number_required")
      ),
      address_street_name: Yup.string().required(
        t("pages.Step2.validation.address_street_name_required")
      ),
      address_country_id: Yup.string().required(
        t("pages.Step2.validation.address_country_id_required")
      ),
      address_city_town: Yup.string().required(
        t("pages.Step2.validation.address_city_town_required")
      ),
    }),
    onSubmit: (values) => {
      mutation.mutate({
        form_type: "address",
        address: { ...values },
      });
    },
  });

  const getError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput
          id="address_building_number"
          label={t("pages.Step2.form.address_building_number")}
          name="address_building_number"
          placeholder={t(
            "pages.Step2.form.address_building_number_placeholder"
          )}
          value={formik.values.address_building_number}
          onChange={formik.handleChange}
          error={getError("address_building_number")}
          icon={<GoNumber />}
        />
        <MainInput
          id="address_street_name"
          label={t("pages.Step2.form.address_street_name")}
          name="address_street_name"
          placeholder={t("pages.Step2.form.address_street_name_placeholder")}
          value={formik.values.address_street_name}
          onChange={formik.handleChange}
          error={getError("address_street_name")}
          icon={<GiDoubleStreetLights />}
        />
        <CountrySelect formik={formik} name="address_country_id" />
        <MainInput
          id="address_city_town"
          label={t("pages.Step2.form.address_city_town")}
          name="address_city_town"
          placeholder={t("pages.Step2.form.address_city_town_placeholder")}
          value={formik.values.address_city_town}
          onChange={formik.handleChange}
          error={getError("address_city_town")}
          icon={<FaCity />}
        />
      </div>

      <FormError errorMsg={errorMsg} />

      <FormBtn
        title={t("pages.Step2.form.finish_button")}
        loading={mutation.isPending}
      />
    </form>
  );
}
