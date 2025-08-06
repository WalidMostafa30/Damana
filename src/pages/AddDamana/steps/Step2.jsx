import { useState, useEffect } from "react";
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

const Step2 = ({ finalData }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [couponErrorMsg, setCouponErrorMsg] = useState("");
  const [couponServer, setCouponServer] = useState(null);
  const [details, setDetails] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [damanaID, setDamanaID] = useState("");

  const navigate = useNavigate();

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
        error?.response?.data?.error_msg || "كود الخصم غير صالح"
      );
    },
  });

  // ✅ API حساب العمولة
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

      // ✅ لو transfer_commission > 0 أضف ضمانة فورية
      if (data.transfer_commission > 0) {
        newDetails.splice(4, 0, {
          label: "ضمانة فورية",
          value: "نعم",
        });
      }

      setDetails(newDetails);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // ✅ إرسال طلب إنشاء الضمانة
  const createVehicleTransferMutation = useMutation({
    mutationFn: async (payload) => await createVehicleTransfer(payload),
    onSuccess: (data) => {
      console.log("تم إنشاء الضمانة بنجاح ✅", data);
      setOpenModal(true);
      setModalMsg(
        <p>
          تم إنشاء الضمانة بنجاح رقم الضمانة <span>{data?.serial_number}</span>
        </p>
      );
      setDamanaID(data?.id);
    },
    onError: (error) => {
      setErrorMsg(
        error?.response?.data?.error_msg || "حدث خطأ أثناء إنشاء الضمانة"
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      vehicle_price: "",
      commission_on: "",
      code: "",
      transfer_commission: "", // ✅ الحقل الجديد
    },
    validationSchema: Yup.object({
      vehicle_price: Yup.string().required("قيمة المركبة مطلوبة"),
      commission_on: Yup.string().required("اختيار عمولة ضمانة مطلوب"),
      transfer_commission: Yup.string().required("اختيار نوع التحويل مطلوب"),
    }),
    onSubmit: (values) => {
      setErrorMsg("");

      const payload = {
        ...finalData,
        vehicle_price: values.vehicle_price,
        commission_on: values.commission_on,
        code: values.code || undefined,
        transfer_type: values.transfer_commission,
      };

      console.log("📦 Payload to API:", payload);
      createVehicleTransferMutation.mutate(payload);
    },
  });

  const getError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";

  // 🎯 متابعة تغير الحقول وطلب العمولة
  useEffect(() => {
    const { vehicle_price, commission_on, code, transfer_commission } =
      formik.values;

    if (!vehicle_price || !commission_on || !transfer_commission) return;

    const payload = {
      vehicle_price,
      commission_on,
      transfer_commission,
    };

    if (couponServer?.discount) {
      payload.code = code;
    }

    commissionMutation.mutate(payload);
  }, [
    formik.values.vehicle_price,
    formik.values.commission_on,
    formik.values.code,
    formik.values.transfer_commission,
    couponServer,
  ]);

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
          onBlur={formik.handleBlur}
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
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
            onBlur={formik.handleBlur}
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
          فورًا – بأسرع وقت ممكن (تُضاف 4 دنانير)
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="transfer_commission"
            value="ACH"
            checked={formik.values.transfer_commission === "ACH"}
            onChange={formik.handleChange}
            className="w-5 h-5 accent-primary"
          />
          بشكل اعتيادي – يوصل بنفس اليوم أو اللي بعده (مجانًا)
        </label>
      </div>

      {details && <DetailsCard data={details} />}

      <FormError errorMsg={errorMsg} />
      <FormBtn
        title="ارسال ضمانه"
        loading={createVehicleTransferMutation.isPending}
      />

      <ActionModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        msg={modalMsg}
        icon="protect"
        primaryBtn={{
          text: "اذهب الى صفحة الضمانه",
          action: () => {
            navigate(`/damana/${damanaID}`);
          },
        }}
      />
    </form>
  );
};

export default Step2;
