import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { changeStatus, releaseRequest } from "../../services/damanaServices";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ActionsSection = ({ damana }) => {
  const { t } = useTranslation();
  const { profile } = useSelector((state) => state.profile);

  const [releaseTimer, setReleaseTimer] = useState(null);

  useEffect(() => {
    if (damana?.coming_request_release) {
      const interval = setInterval(() => {
        const now = new Date();
        const releaseTime = new Date(damana.coming_request_release);
        if (releaseTime < now) {
          setReleaseTimer(t("pages.actionsSection.timer.allowed"));
          clearInterval(interval);
        } else {
          const diff = releaseTime - now;
          const minutes = Math.floor(diff / 1000 / 60);
          const seconds = Math.floor((diff / 1000) % 60);
          setReleaseTimer(
            t("pages.actionsSection.timer.countdown", { minutes, seconds })
          );
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [damana?.coming_request_release, t]);

  const changeStatusMutation = useMutation({
    mutationFn: (status) => changeStatus({ id: damana.id, status }),
    onSuccess: (data) => {
      if (data.status) {
        toast.success(t("pages.actionsSection.toast.statusUpdated"));
        window.location.reload();
      } else {
        toast.error(
          data.error_message || t("pages.actionsSection.toast.error")
        );
      }
    },
    onError: () => {
      toast.error(t("pages.actionsSection.toast.serverError"));
    },
  });

  const releaseRequestMutation = useMutation({
    mutationFn: () => releaseRequest({ id: damana.id }),
    onSuccess: (data) => {
      if (data.status) {
        toast.success(t("pages.actionsSection.toast.releaseRequested"));
        window.location.reload();
      } else {
        toast.error(
          data.error_message || t("pages.actionsSection.toast.error")
        );
      }
    },
    onError: () => {
      toast.error(t("pages.actionsSection.toast.serverError"));
    },
  });

  const handleChangeStatus = (status) => {
    const confirmMsg =
      status === "accepted"
        ? t("pages.actionsSection.confirm.accept")
        : t("pages.actionsSection.confirm.reject");

    if (!window.confirm(confirmMsg)) {
      toast(t("pages.actionsSection.toast.cancelled"));
      return;
    }

    changeStatusMutation.mutate(status);
  };

  const handleReleaseRequest = () => {
    const confirmMsg = t("pages.actionsSection.confirm.release");

    if (!window.confirm(confirmMsg)) {
      toast(t("pages.actionsSection.toast.cancelled"));
      return;
    }

    releaseRequestMutation.mutate();
  };

  if (!profile) return null;

  const isBuyer = damana?.buyer?.id === profile.id;
  const isSeller = damana?.seller?.id === profile.id;
  const isDisabled = damana?.is_expired || damana?.blocked;

  return (
    <div className="mt-4 space-y-3">
      <Toaster position="top-left" />

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
          <button
            disabled={isDisabled}
            onClick={() => handleChangeStatus("accepted")}
            className={`mainBtn flex-1 min-w-[150px] ${
              isDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {t("pages.actionsSection.buttons.accept")}
          </button>
          <button
            disabled={isDisabled}
            onClick={() => handleChangeStatus("rejected")}
            className={`mainBtn light flex-1 min-w-[150px] ${
              isDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {t("pages.actionsSection.buttons.reject")}
          </button>
        </div>
      )}

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
            {t("pages.actionsSection.buttons.release")}
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionsSection;
