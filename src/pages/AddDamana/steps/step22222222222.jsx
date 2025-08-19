import { useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { LuHandCoins } from "react-icons/lu";
import { CiDiscount1 } from "react-icons/ci";
import { FaMoneyBillWave } from "react-icons/fa";
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
import { useNavigate } from "react-router-dom";
import LoadingModal from "../../../components/modals/LoadingModal";

const commission_on_options = [
  { value: "buyer", label: "على المشتري" },
  { value: "seller", label: "البائع" },
  { value: "equally", label: "مناصفة 50% على المشتري و 50% على البائع" },
];

const formatNumber = (num) => {
  if (num === null || num === undefined || num === "") return "-";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num);
};

const Step2 = ({ formData, setFormData, configData }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [couponErrorMsg, setCouponErrorMsg] = useState("");
  const [couponServer, setCouponServer] = useState(null);
  const [details, setDetails] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [damanaData, setDamanaData] = useState("");
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  // تحقق الكوبون
  const couponMutation = useMutation({
    mutationFn: async (code) => await checkCoupon(code),
    onSuccess: (data) => {
      setCouponServer(data);
      setCouponErrorMsg("");
    },
    onError: (error) => {
      setCouponServer(null);
      setCouponErrorMsg(
        error?.response?.data?.error_msg || "كود الخصم غير صالح"
      );
    },
  });

  // API حساب العمولة
  const commissionMutation = useMutation({
    mutationFn: async (payload) => await getCommission(payload),
    onSuccess: (data) => {
      const newDetails = [
        {
          label: "قيمة المركبة",
          value: `${formatNumber(data.vehicle_price)} دينار أردني`,
        },
        {
          label: "عمولة الضمانة",
          value:
            formik.values.commission_on === "buyer"
              ? `${formatNumber(data.commission_value)} دينار على المشتري`
              : formik.values.commission_on === "seller"
              ? `${formatNumber(data.commission_value)} دينار على البائع`
              : `${formatNumber(
                  data.commission_value / 2
                )} دينار على البائع و ${formatNumber(
                  data.commission_value / 2
                )} دينار على المشتري`,
        },
        {
          label: "كود الخصم",
          value: formik.values.code || "-",
        },
        {
          label: "نسبة الخصم",
          value: data.discount
            ? `${formatNumber(data.discount)}${
                data.discount_type === "percentage" ? "%" : " دينار"
              }`
            : "-",
        },
        {
          label: "سعر الضمانة الكلي",
          value: `${formatNumber(
            data.vehicle_price_with_commission
          )} دينار أردني`,
        },
        {
          label: "المستحق للبائع",
          value: `${formatNumber(data.due_to_seller)} دينار أردني`,
        },
      ];

      if (data.transfer_commission > 0) {
        newDetails.splice(4, 0, {
          label: "ضمانة فورية",
          value: "نعم",
        });
      }
      setFormData({
        ...formData,
        broker_commission_value: data.broker_commission_value,
      });
      setDetails(newDetails);
    },
  });

  // إرسال طلب إنشاء الضمانة
  const createVehicleTransferMutation = useMutation({
    mutationFn: async (payload) => await createVehicleTransfer(payload),
    onSuccess: (data) => {
      setDamanaData(data);
      setOpenModal(true);
    },
    onError: (error) => {
      setErrorMsg(
        error?.response?.data?.error_msg || "حدث خطأ أثناء إنشاء الضمانة"
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
      vehicle_price: Yup.string().required("قيمة المركبة مطلوبة"),
      commission_on: Yup.string().required("اختيار عمولة ضمانة مطلوب"),
      transfer_commission: Yup.string().required("اختيار نوع التحويل مطلوب"),
    }),
    onSubmit: (values) => {
      setErrorMsg("");

      setFormData((prev) => ({
        ...prev,
        ...values,
      }));

      // const payload = {
      //   registration_number: formData.registration_number,
      //   buyer_national_number: formData.buyer_national_number,
      //   buyer_full_mobile: formData.buyer_full_mobile,
      //   vehicle_price: values.vehicle_price,
      //   commission_on: values.commission_on,
      //   code: values.code,
      //   transfer_type: values.transfer_commission,
      // };

      const payload = {
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
      };

      createVehicleTransferMutation.mutate(payload);
      console.log("📤 إرسال طلب إنشاء الضمانة:", payload);
    },
  });

  const getError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";

  // دالة تنفذ حساب العمولة بعد الخروج من أي حقل
  const [lastCommissionPayload, setLastCommissionPayload] = useState(null);

  const handleCommissionBlur = () => {
    const { vehicle_price, commission_on, code, transfer_commission } =
      formik.values;

    if (!vehicle_price || !commission_on) return;

    const payload = {
      vehicle_price,
      commission_on,
      transfer_commission,
    };

    if (couponServer?.discount) {
      payload.code = code;
    }

    // مقارنة مع آخر payload
    if (JSON.stringify(payload) === JSON.stringify(lastCommissionPayload)) {
      return; // مفيش تغيير => متبعتش طلب
    }

    setLastCommissionPayload(payload); // حفظ القيم الجديدة
    commissionMutation.mutate(payload);
  };
  const handleCopySerial = () => {
    if (damanaData?.serial_number) {
      navigator.clipboard.writeText(damanaData.serial_number).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <h3 className="text-xl lg:text-2xl font-bold text-primary">
        بيانات الضمانة
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput
          label="قيمة المركبة"
          id="vehicle_price"
          placeholder="ادخل قيمة المركبة"
          type="number"
          name="vehicle_price"
          icon={<FaMoneyBillWave />}
          value={formik.values.vehicle_price}
          onChange={formik.handleChange}
          onBlur={(e) => {
            formik.handleBlur(e);
            handleCommissionBlur();
          }}
          error={getError("vehicle_price")}
        />

        <MainInput
          label="اختر العمولة"
          type="select"
          id="commission_on"
          name="commission_on"
          options={[
            { value: "", label: "اختر العمولة" },
            ...commission_on_options,
          ]}
          icon={<LuHandCoins />}
          value={formik.values.commission_on}
          onChange={(e) => {
            formik.handleChange(e);
            handleCommissionBlur();
          }}
          error={getError("commission_on")}
        />
      </div>

      {/* كود الخصم */}
      <div>
        <p className="lg:text-lg font-bold mb-2">هل تمتلك كود خصم؟</p>
        <div className="flex flex-col gap-2 lg:w-1/2">
          <MainInput
            label="كود الخصم"
            type="text"
            name="code"
            id="code"
            placeholder="ادخل كود الخصم"
            icon={<CiDiscount1 />}
            value={formik.values.code}
            onChange={(e) => {
              formik.handleChange(e);
              setCouponServer(null);
            }}
            onBlur={(e) => {
              formik.handleBlur(e);
              handleCommissionBlur();
            }}
            error={getError("code")}
          />

          {couponServer?.discount && (
            <p className="text-success font-bold">
              حصلت على خصم {couponServer.discount}
              {couponServer.discount_type === "percentage" ? "%" : " دينار"}
            </p>
          )}
          <FormError errorMsg={couponErrorMsg} />

          {formik.values.code && (
            <FormBtn
              title="تحقق"
              type="button"
              loading={couponMutation.isPending}
              onClick={() => couponMutation.mutate(formik.values.code)}
            />
          )}
        </div>
      </div>

      {/* صرف ضمانة */}
      <h3 className="text-xl lg:text-2xl font-bold text-primary">صرف ضمانة</h3>
      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="transfer_commission"
            value="RTGS"
            checked={formik.values.transfer_commission === "RTGS"}
            onChange={formik.handleChange}
            className="w-5 h-5 accent-primary"
          />
          فورًا – بأسرع وقت ممكن (تُضاف {configData?.settings?.rtgs_fees}{" "}
          دنانير)
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="transfer_commission"
            value="ACH"
            checked={formik.values.transfer_commission === "ACH"}
            onChange={(e) => {
              formik.handleChange(e);
              handleCommissionBlur();
            }}
            className="w-5 h-5 accent-primary"
          />
          بشكل اعتيادي – يوصل بنفس اليوم أو اللي بعده (مجانًا)
        </label>
      </div>

      {details.length > 0 && <DetailsCard data={details} />}
      <FormError errorMsg={errorMsg} />
      {details.length > 0 && (
        <FormBtn
          title="ارسال ضمانه"
          loading={createVehicleTransferMutation.isPending}
        />
      )}

      <ActionModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        msg={
          <p>
            تم إنشاء الضمانة بنجاح رقم الضمانة{" "}
            <span
              className="font-bold text-success-200 cursor-pointer underline"
              onClick={handleCopySerial}
              title="اضغط للنسخ"
            >
              {damanaData?.serial_number}
            </span>
            {copied && (
              <span className="ml-2 text-xs text-primary">تم النسخ</span>
            )}
          </p>
        }
        icon="success"
        primaryBtn={{
          text: "اذهب الى صفحة الضمانه",
          action: () => navigate(`/damana/${damanaData?.id}`),
        }}
      />

      <LoadingModal openModal={commissionMutation.isPending} />
    </form>
  );
};

export default Step2;
