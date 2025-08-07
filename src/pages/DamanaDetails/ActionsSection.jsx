import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const ActionsSection = ({ damana }) => {
  const { profile } = useSelector((state) => state.profile);
  console.log("Damana ActionsSection", damana);
  console.log("profile", profile);

  const handleChangeStatus = (newStatus) => {
    const confirmMsg =
      newStatus === "accepted"
        ? "هل تريد تأكيد الضمانة؟"
        : "هل تريد رفض الضمانة؟";

    if (!window.confirm(confirmMsg)) {
      toast("تم إلغاء العملية 👏");
      return;
    }

    // Simulate API call
    fetch(`/api/change-status`, {
      method: "POST",
      body: JSON.stringify({ id: damana.id, status: newStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          toast.success("تم التحديث بنجاح");
          window.location.reload();
        } else {
          toast.error(data.error_message || "حدث خطأ");
        }
      })
      .catch(() => toast.error("فشل الاتصال بالخادم"));
  };

  const handleReleaseRequest = () => {
    const confirmMsg = `هل تريد صرف الضمانة؟\n\nيجب إكمال إجراءات التنازل أولاً وإلا قد تُفرض رسوم إضافية.`;

    if (!window.confirm(confirmMsg)) {
      toast("تم إلغاء العملية 👏");
      return;
    }

    fetch(`/api/release-request`, {
      method: "POST",
      body: JSON.stringify({ id: damana.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          toast.success("تم طلب صرف الضمانة");
          window.location.reload();
        } else {
          toast.error(data.error_message || "حدث خطأ");
        }
      })
      .catch(() => toast.error("فشل الاتصال بالخادم"));
  };

  if (!profile) return null;

  const isBuyer = damana?.buyer?.id === profile.id;
  const isSeller = damana?.seller?.id === profile.id;

  console.log("isBuyer", isBuyer);
  console.log("isSeller", isSeller);
  console.log("status", damana.status);
  console.log("is_paid", damana.is_paid);
  console.log("release_request", damana.release_request);

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
