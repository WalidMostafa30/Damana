import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { changeStatus, releaseRequest } from "../../services/damanaServices";

const ActionsSection = ({ damana }) => {
  const { profile } = useSelector((state) => state.profile);

  // تغيير الحالة
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

  // طلب صرف الضمانة
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
      toast("تم إلغاء العملية 👏");
      return;
    }

    changeStatusMutation.mutate(status);
  };

  const handleReleaseRequest = () => {
    const confirmMsg =
      "هل تريد صرف الضمانة؟\n\nيجب إكمال إجراءات التنازل أولاً وإلا قد تُفرض رسوم إضافية.";

    if (!window.confirm(confirmMsg)) {
      toast("تم إلغاء العملية 👏");
      return;
    }

    releaseRequestMutation.mutate();
  };

  if (!profile) return null;

  const isBuyer = damana?.buyer?.id === profile.id;
  const isSeller = damana?.seller?.id === profile.id;

  return (
    <div className="mt-4 space-y-3">
      <Toaster position="top-left" />

      {isBuyer && damana.status === "new" && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleChangeStatus("accepted")}
            className="mainBtn flex-1 min-w-[150px]"
          >
            ✅ تأكيد الضمانة
          </button>
          <button
            onClick={() => handleChangeStatus("rejected")}
            className="mainBtn light flex-1 min-w-[150px]"
          >
            ❌ رفض الضمانة
          </button>
        </div>
      )}

      {isSeller &&
        damana.status === "paid" &&
        damana.release_request === 0 &&
        damana.is_paid && (
          <button
            onClick={handleReleaseRequest}
            className="mainBtn flex-1 min-w-[150px]"
          >
            💸 طلب صرف الضمانة
          </button>
        )}

      {isSeller && damana.release_request === 1 && (
        <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded">
          تم طلب صرف الضمانة مسبقاً، وسيتم التحقق منها قريباً من قبل مسؤول
          النظام.
        </div>
      )}
    </div>
  );
};

export default ActionsSection;
