import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeStatus, releaseRequest } from "../../services/damanaServices";
import { useTranslation } from "react-i18next";
import Timer from "../../components/common/Timer";
import { useState } from "react";
import ActionModal from "../../components/modals/ActionModal";
import LoadingModal from "../../components/modals/LoadingModal";
import { usePermission } from "../../hooks/usePermission";

const ActionsSection = ({ damana }) => {
  const { t } = useTranslation();
  const { profile } = useSelector((state) => state.profile);
  const queryClient = useQueryClient();
  const { hasAndUser } = usePermission();

  const [openModal, setOpenModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    msg: "",
    icon: "info",
    primaryBtn: null,
  });

  const openActionModal = ({ msg, icon = "info", primaryBtn = null }) => {
    setModalConfig({ msg, icon, primaryBtn });
    setOpenModal(true);
  };

  const changeStatusMutation = useMutation({
    mutationFn: (status) => changeStatus({ id: damana.id, status }),
    onSuccess: (data) => {
      // ✅ تحديث البيانات بعد النجاح
      queryClient.invalidateQueries(["damana-details", damana.id]);

      if (data.status) {
        openActionModal({
          msg: t("pages.actionsSection.toast.statusUpdated"),
          icon: "success",
        });
      } else {
        openActionModal({
          msg: data.error_message || t("pages.actionsSection.toast.error"),
          icon: "error",
        });
      }
    },
    onError: () => {
      openActionModal({
        msg: t("pages.actionsSection.toast.serverError"),
        icon: "error",
      });
    },
  });

  const releaseRequestMutation = useMutation({
    mutationFn: () => releaseRequest({ id: damana.id }),
    onSuccess: (data) => {
      // ✅ تحديث البيانات بعد النجاح
      queryClient.invalidateQueries(["damana-details", damana.id]);

      if (data.status) {
        openActionModal({
          msg: t("pages.actionsSection.toast.releaseRequested"),
          icon: "success",
        });
      } else {
        openActionModal({
          msg: data.error_message || t("pages.actionsSection.toast.error"),
          icon: "error",
        });
      }
    },
    onError: (error) => {
      openActionModal({
        msg:
          error?.response?.data?.error_msg ||
          t("pages.actionsSection.toast.serverError"),
        icon: "error",
      });
    },
  });

  const handleChangeStatus = (status) => {
    const confirmMsg =
      status === "accepted"
        ? t("pages.actionsSection.confirm.accept")
        : t("pages.actionsSection.confirm.reject");

    openActionModal({
      msg: confirmMsg,
      icon: "protect",
      primaryBtn: {
        text:
          status === "accepted"
            ? t("pages.actionsSection.buttons.accept")
            : t("pages.actionsSection.buttons.reject"),
        action: () => changeStatusMutation.mutate(status),
      },
    });
  };

  const handleReleaseRequest = () => {
    const confirmMsg = t("pages.actionsSection.confirm.release");

    openActionModal({
      msg: confirmMsg,
      icon: "protect",
      primaryBtn: {
        text: t("pages.actionsSection.buttons.release"),
        action: () => releaseRequestMutation.mutate(),
      },
    });
  };

  if (!profile) return null;

  const isBuyer = damana?.buyer_company_id
    ? damana.buyer_company_id === profile.company_id
    : damana?.buyer?.id === profile.id;

  const isSeller = damana?.seller_company_id
    ? damana.seller_company_id === profile.company_id
    : damana?.seller?.id === profile.id;

  const isDisabled = damana?.is_expired || damana?.blocked;

  // ✅ لو أي Mutation شغالة نعرض مودال التحميل
  const isLoading =
    changeStatusMutation.isPending || releaseRequestMutation.isPending;

  return (
    <div className="mt-4 space-y-3">
      {damana?.active_cancel_request && (
        <div className="p-3 rounded-xl bg-yellow-100 text-yellow-800 border border-yellow-400">
          {damana.active_cancel_request.cancelled_approved === null &&
            t("pages.actionsSection.cancelRequest.pending")}
          {damana.active_cancel_request.cancelled_approved === true &&
            t("pages.actionsSection.cancelRequest.approved")}
          {damana.active_cancel_request.cancelled_approved === false &&
            t("pages.actionsSection.cancelRequest.rejected", {
              reason: damana.active_cancel_request.cancelled_rejected_reason,
            })}
        </div>
      )}

      {isBuyer && damana.status === "new" && (
        <div className="flex flex-wrap gap-2">
          {hasAndUser("damana.accept") && (
            <button
              disabled={isDisabled}
              onClick={() => handleChangeStatus("accepted")}
              className={`mainBtn flex-1 min-w-[150px] ${
                isDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {t("pages.actionsSection.buttons.accept")}
            </button>
          )}
          {hasAndUser("damana.reject") && (
            <button
              disabled={isDisabled}
              onClick={() => handleChangeStatus("rejected")}
              className={`mainBtn light flex-1 min-w-[150px] ${
                isDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {t("pages.actionsSection.buttons.reject")}
            </button>
          )}
        </div>
      )}

      {isSeller && damana.status === "paid" && (
        <div className="space-y-2">
          {damana?.coming_request_release && (
            <div className="mx-auto w-max my-2">
              <Timer expiryDate={damana.coming_request_release} />
            </div>
          )}

          {hasAndUser("damana.release") && (
            <button
              disabled={isDisabled || !damana.can_request_release}
              onClick={handleReleaseRequest}
              className={`mainBtn flex-1 min-w-[150px] ${
                isDisabled || !damana.can_request_release
                  ? "opacity-50 cursor-not-allowed bg-gray-400"
                  : ""
              }`}
            >
              {t("pages.actionsSection.buttons.release")}
            </button>
          )}
        </div>
      )}

      {/* مودال الأكشن */}
      <ActionModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        closeBtn
        msg={modalConfig.msg}
        icon={modalConfig.icon}
        primaryBtn={modalConfig.primaryBtn}
        lightBtn={{
          text: t("pages.RegisterPerson.modal.back"),
          action: () => setOpenModal(false),
        }}
      />

      {/* مودال التحميل */}
      <LoadingModal openModal={isLoading} />
    </div>
  );
};

export default ActionsSection;
