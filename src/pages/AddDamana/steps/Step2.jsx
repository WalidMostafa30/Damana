import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { LuChevronDown, LuHandCoins } from "react-icons/lu";
import { CiDiscount1 } from "react-icons/ci";
import { FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DetailsCard from "../../../components/common/DetailsCard";
import MainInput from "../../../components/form/MainInput/MainInput";
import {
  checkCoupon,
  createVehicleTransfer,
  getCommission,
} from "../../../services/damanaServices";
import FormBtn from "../../../components/form/FormBtn";
import FormError from "../../../components/form/FormError";
import ActionModal from "../../../components/modals/ActionModal";
import LoadingModal from "../../../components/modals/LoadingModal";
import CopyToClipboard from "../../../components/common/CopyToClipboard";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Step2 = ({ formData, setFormData }) => {
  const { t } = useTranslation();
  const [errorMsg, setErrorMsg] = useState("");
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponErrorMsg, setCouponErrorMsg] = useState("");
  const [couponServer, setCouponServer] = useState(null);
  const [details, setDetails] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [damanaData, setDamanaData] = useState("");

    const { data: appConfig } = useSelector((state) => state.appConfig);
  

  const navigate = useNavigate();

  const commission_on_options = [
    {
      value: "buyer",
      label: t("pages.addDamana.step2.commissionOn.options.buyer"),
    },
    {
      value: "seller",
      label: t("pages.addDamana.step2.commissionOn.options.seller"),
    },
    {
      value: "equally",
      label: t("pages.addDamana.step2.commissionOn.options.equally"),
    },
  ];

  const formatNumber = (num) => {
    if (num === null || num === undefined || num === "") return "-";
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(num);
  };

  // ✅ تحقق الكوبون
  const couponMutation = useMutation({
    mutationFn: async (code) => await checkCoupon(code),
    onSuccess: (data) => {
      setCouponServer(data);
      setCouponErrorMsg("");
    },
    onError: (error) => {
      setCouponServer(null);
      setCouponErrorMsg(
        error?.response?.data?.error_msg ||
          t("pages.addDamana.step2.discount.invalid")
      );
    },
  });

  // ✅ حساب العمولة
  const commissionMutation = useMutation({
    mutationFn: async (payload) => await getCommission(payload),
    onSuccess: (data) => {
      const newDetails = [
        {
          label: t("pages.addDamana.step2.details.vehiclePrice"),
          value: `${formatNumber(data.vehicle_price)} دينار أردني`,
        },
        {
          label: t("pages.addDamana.step2.details.commission"),
          value:
            formik.values.commission_on === "buyer"
              ? `${formatNumber(data.commission_value)} دينار ${t(
                  "pages.addDamana.step2.commissionOn.options.buyer"
                )}`
              : formik.values.commission_on === "seller"
              ? `${formatNumber(data.commission_value)} دينار ${t(
                  "pages.addDamana.step2.commissionOn.options.seller"
                )}`
              : `${formatNumber(data.commission_value / 2)} دينار ${t(
                  "pages.addDamana.step2.commissionOn.options.seller"
                )} و ${formatNumber(data.commission_value / 2)} دينار ${t(
                  "pages.addDamana.step2.commissionOn.options.buyer"
                )}`,
        },
        {
          label: t("pages.addDamana.step2.details.total"),
          value: `${formatNumber(
            data.vehicle_price_with_commission
          )} دينار أردني`,
        },
        {
          label: t("pages.addDamana.step2.details.dueToSeller"),
          value: `${formatNumber(data.due_to_seller)} دينار أردني`,
        },
      ];

      if (data.discount && data.discount > 0) {
        newDetails.splice(2, 0, {
          label: t("pages.addDamana.step2.details.discountCode"),
          value: formik.values.code,
        });
        newDetails.splice(3, 0, {
          label: t("pages.addDamana.step2.details.discountValue"),
          value: `${formatNumber(data.discount)}${
            data.discount_type === "percentage" ? "%" : " دينار"
          }`,
        });
      }

      if (data.transfer_commission > 0) {
        newDetails.splice(4, 0, {
          label: t("pages.addDamana.step2.details.transferCommission"),
          value: `${formatNumber(data.transfer_commission)} دينار أردني`,
        });
      }

      setFormData({
        ...formData,
        broker_commission_value: data.broker_commission_value,
      });
      setDetails(newDetails);
    },
  });

  // ✅ إرسال طلب إنشاء الضمانة
  const createVehicleTransferMutation = useMutation({
    mutationFn: async (payload) => await createVehicleTransfer(payload),
    onSuccess: (data) => {
      setDamanaData(data);
      setOpenModal(true);
    },
    onError: (error) => {
      setErrorMsg(
        error?.response?.data?.error_msg || t("pages.addDamana.step2.errorMsg")
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      vehicle_price: formData.vehicle_price || "",
      commission_on: formData.commission_on || "",
      code: formData.code || "",
      transfer_commission: formData.transfer_commission || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      vehicle_price: Yup.string().required(
        t("pages.addDamana.step2.vehiclePrice.required")
      ),
      commission_on: Yup.string().required(
        t("pages.addDamana.step2.commissionOn.required")
      ),
      transfer_commission: Yup.string().required(
        t("pages.addDamana.step2.transfer.required")
      ),
    }),
    onSubmit: (values) => {
      setErrorMsg("");

      setFormData((prev) => ({ ...prev, ...values }));

      createVehicleTransferMutation.mutate({
        registration_number: formData.registration_number,
        buyer_national_number: formData.buyer_national_number,
        buyer_full_mobile: formData.buyer_full_mobile,
        vehicle_price: values.vehicle_price,
        commission_on: values.commission_on,
        code: values.code,
        transfer_type: values.transfer_commission,
        is_owner: formData.is_owner ? 1 : 0,
        owner_national_number: formData.owner_national_number,
        owner_full_mobile: formData.owner_full_mobile,
        broker_commission_value: formData.broker_commission_value,
      });
    },
  });

  const getError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";

  const triggerCommission = (extra = {}) => {
    if (formik.values.vehicle_price && formik.values.commission_on) {
      commissionMutation.mutate({
        vehicle_price: formik.values.vehicle_price,
        commission_on: formik.values.commission_on,
        code: formik.values.code,
        transfer_type: formik.values.transfer_commission,
        ...extra,
      });
    }
  };

  useEffect(() => {
    if (
      formik.values.commission_on &&
      formik.values.transfer_commission &&
      formik.values.vehicle_price
    ) {
      triggerCommission();
    }
  }, [formik.values.commission_on, formik.values.transfer_commission]);

  useEffect(() => {
    if (couponServer) {
      triggerCommission({ code: couponServer.code });
    }
  }, [couponServer]);

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <h3 className="text-xl lg:text-2xl font-bold text-primary">
        {t("pages.addDamana.step2.title")}
      </h3>

      {/* سعر المركبة + العمولة */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput
          label={t("pages.addDamana.step2.vehiclePrice.label")}
          placeholder={t("pages.addDamana.step2.vehiclePrice.placeholder")}
          id="vehicle_price"
          type="number"
          name="vehicle_price"
          icon={<FaMoneyBillWave />}
          value={formik.values.vehicle_price}
          onChange={formik.handleChange}
          onBlur={(e) => {
            formik.handleBlur(e);
            triggerCommission();
          }}
          error={getError("vehicle_price")}
        />

        <MainInput
          label={t("pages.addDamana.step2.commissionOn.label")}
          placeholder={t("pages.addDamana.step2.commissionOn.placeholder")}
          type="select"
          id="commission_on"
          name="commission_on"
          options={[
            {
              value: "",
              label: t("pages.addDamana.step2.commissionOn.placeholder"),
            },
            ...commission_on_options,
          ]}
          icon={<LuHandCoins />}
          value={formik.values.commission_on}
          onChange={formik.handleChange}
          error={getError("commission_on")}
        />
      </div>

      {/* كود الخصم */}
      <div className="md:w-1/2">
        <button
          type="button"
          className="flex justify-between items-center w-full cursor-pointer"
          onClick={() => setShowCoupon(!showCoupon)}
        >
          <p className="lg:text-lg font-bold">
            {t("pages.addDamana.step2.discount.toggle")}
          </p>
          <LuChevronDown
            className={`text-xl transition-transform duration-300 ${
              showCoupon ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`transition-all duration-500 overflow-hidden ${
            showCoupon ? "max-h-[500px] mt-3" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-2 p-1">
            <MainInput
              label={t("pages.addDamana.step2.discount.label")}
              placeholder={t("pages.addDamana.step2.discount.placeholder")}
              type="text"
              name="code"
              id="code"
              icon={<CiDiscount1 />}
              value={formik.values.code}
              onChange={(e) => {
                formik.handleChange(e);
                setCouponServer(null);
              }}
              onBlur={formik.handleBlur}
              error={getError("code")}
            />

            <div
              className={`transition-all duration-500 overflow-hidden ${
                couponServer?.discount || couponErrorMsg
                  ? "max-h-20"
                  : "max-h-0"
              }`}
            >
              {couponServer?.discount && (
                <p className="text-success font-bold">
                  {t("pages.addDamana.step2.discount.success", {
                    value: couponServer.discount,
                    unit:
                      couponServer.discount_type === "percentage"
                        ? "%"
                        : " دينار",
                  })}
                </p>
              )}
              <FormError errorMsg={couponErrorMsg} />
            </div>

            {formik.values.code && (
              <FormBtn
                title={t("pages.addDamana.step2.discount.btn")}
                type="button"
                loading={couponMutation.isPending}
                onClick={() => couponMutation.mutate(formik.values.code)}
              />
            )}
          </div>
        </div>
      </div>

      {/* صرف الضمانة */}
      <h3 className="text-xl lg:text-2xl font-bold text-primary">
        {t("pages.addDamana.step2.transfer.title")}
      </h3>
      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="transfer_commission"
            value="ACH"
            checked={formik.values.transfer_commission === "ACH"}
            onChange={formik.handleChange}
            className="w-5 h-5 accent-primary"
          />
          {t("pages.addDamana.step2.transfer.options.ACH")}
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="transfer_commission"
            value="RTGS"
            checked={formik.values.transfer_commission === "RTGS"}
            onChange={formik.handleChange}
            className="w-5 h-5 accent-primary"
          />
          {t("pages.addDamana.step2.transfer.options.RTGS", {
            fees: appConfig?.settings?.rtgs_fees,
          })}
        </label>
      </div>

      {details.length > 0 && <DetailsCard data={details} />}
      <FormError errorMsg={errorMsg} />

      {details.length > 0 && (
        <FormBtn
          title={t("pages.addDamana.step2.submit")}
          loading={createVehicleTransferMutation.isPending}
        />
      )}

      <ActionModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        msg={
          <>
            <p className="text-center">
              {t("pages.addDamana.step2.success.msg")}
            </p>
            <CopyToClipboard
              text={damanaData?.serial_number}
              className="!text-success-200 !texl-xl"
            />
          </>
        }
        icon="success"
        primaryBtn={{
          text: t("pages.addDamana.step2.success.btn"),
          action: () => navigate(`/damana/${damanaData?.id}`),
        }}
      />
      <LoadingModal openModal={commissionMutation.isPending} />
    </form>
  );
};

export default Step2;
