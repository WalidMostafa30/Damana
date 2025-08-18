import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { changeStatus, releaseRequest } from "../../services/damanaServices";
import { useEffect, useState } from "react";

const ActionsSection = ({ damana }) => {
  const { profile } = useSelector((state) => state.profile);

  // ⏱️ تايمر صرف الضمانة
  const [releaseTimer, setReleaseTimer] = useState(null);

  useEffect(() => {
    if (damana?.coming_request_release) {
      const interval = setInterval(() => {
        const now = new Date();
        const releaseTime = new Date(damana.coming_request_release);
        if (releaseTime < now) {
          setReleaseTimer("مسموح الآن بطلب الصرف ✅");
          clearInterval(interval);
        } else {
          const diff = releaseTime - now;
          const minutes = Math.floor(diff / 1000 / 60);
          const seconds = Math.floor((diff / 1000) % 60);
          setReleaseTimer(`${minutes}:${seconds} ⏳`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [damana?.coming_request_release]);

  // 🛠 تغيير الحالة
  const changeStatusMutation = useMutation({
    mutationFn: (status) => changeStatus({ id: damana.id, status }),
    onSuccess: (data) => {
      if (data.status) {
        toast.success("تم تحديث الحالة بنجاح");
        window.location.reload();
      } else {
        toast.error(data.error_message || "حدث خطأ");
      }
    },
    onError: () => {
      toast.error("فشل الاتصال بالخادم");
    },
  });

  // 💸 طلب صرف الضمانة
  const releaseRequestMutation = useMutation({
    mutationFn: () => releaseRequest({ id: damana.id }),
    onSuccess: (data) => {
      if (data.status) {
        toast.success("تم طلب صرف الضمانة بنجاح");
        window.location.reload();
      } else {
        toast.error(data.error_message || "حدث خطأ");
      }
    },
    onError: () => {
      toast.error("فشل الاتصال بالخادم");
    },
  });

  const handleChangeStatus = (status) => {
    const confirmMsg =
      status === "accepted" ? "هل تريد تأكيد الضمانة؟" : "هل تريد رفض الضمانة؟";

    if (!window.confirm(confirmMsg)) {
      toast("تم إلغاء العملية");
      return;
    }

    changeStatusMutation.mutate(status);
  };

  const handleReleaseRequest = () => {
    const confirmMsg =
      "هل تريد صرف الضمانة؟\n\nيجب إكمال إجراءات التنازل أولاً وإلا قد تُفرض رسوم إضافية.";

    if (!window.confirm(confirmMsg)) {
      toast("تم إلغاء العملية");
      return;
    }

    releaseRequestMutation.mutate();
  };

  if (!profile) return null;

  const isBuyer = damana?.buyer?.id === profile.id;
  const isSeller = damana?.seller?.id === profile.id;

  // 🚫 ممنوع أي أكشن
  const isDisabled = damana?.is_expired || damana?.blocked;

  return (
    <div className="mt-4 space-y-3">
      <Toaster position="top-left" />

      {/* 🔔 تنبيه الإلغاء */}
      {damana?.active_cancel_request && (
        <div className="p-3 rounded-xl bg-yellow-100 text-yellow-800 border border-yellow-400">
          {damana.active_cancel_request.cancelled_approved === null &&
            "تم طلب إلغاء الضمانة بانتظار الموافقة"}
          {damana.active_cancel_request.cancelled_approved === true &&
            "تمت الموافقة على طلب إلغاء الضمانة"}
          {damana.active_cancel_request.cancelled_approved === false &&
            `تم رفض طلب الإلغاء: ${damana.active_cancel_request.cancelled_rejected_reason}`}
        </div>
      )}

      {/* ✅ المشتري يقدر يقبل/يرفض إذا جديدة */}
      {isBuyer && damana.status === "new" && (
        <div className="flex flex-wrap gap-2">
          <button
            disabled={isDisabled}
            onClick={() => handleChangeStatus("accepted")}
            className={`mainBtn flex-1 min-w-[150px] ${
              isDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            تأكيد الضمانة
          </button>
          <button
            disabled={isDisabled}
            onClick={() => handleChangeStatus("rejected")}
            className={`mainBtn light flex-1 min-w-[150px] ${
              isDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            رفض الضمانة
          </button>
        </div>
      )}

      {/* 💸 طلب صرف الضمانة */}
      {isSeller && damana.status === "paid" && (
        <div className="space-y-2">
          <div className="text-sm text-gray-600">
            {releaseTimer && `⏱️ ${releaseTimer}`}
          </div>
          <button
            disabled={isDisabled || !damana.can_request_release}
            onClick={handleReleaseRequest}
            className={`mainBtn flex-1 min-w-[150px] ${
              isDisabled || !damana.can_request_release
                ? "opacity-50 cursor-not-allowed bg-gray-400"
                : ""
            }`}
          >
            طلب صرف الضمانة
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionsSection;
