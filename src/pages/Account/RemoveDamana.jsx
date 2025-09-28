import { useState } from "react";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import StepProgress from "../../components/common/StepProgress/StepProgress";
import MainInput from "../../components/form/MainInput/MainInput";
import { IoWarningOutline } from "react-icons/io5";
import { cancelDamana, fetchDamanat } from "../../services/damanaServices";
import LoadingSection from "../../components/Loading/LoadingSection";
import ActionModal from "../../components/modals/ActionModal";
import DamanaList from "../../components/common/DamanaList";
import InfiniteScroll from "react-infinite-scroll-component";
import FormError from "../../components/form/FormError";
import FormBtn from "../../components/form/FormBtn";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { usePermission } from "../../hooks/usePermission";

const RemoveDamana = () => {
  const { t } = useTranslation();

  const { data: appConfig } = useSelector((state) => state.appConfig);

  const { hasAndUser, loading } = usePermission();

  if (loading) return <LoadingPage />;

  const steps = t("pages.account.remove_damana.steps", { returnObjects: true });

  if (!hasAndUser("damana.cancel")) {
    return <Navigate to="/" replace />;
  }

  const [step, setStep] = useState(0);
  const [selectedDamanat, setSelectedDamanat] = useState([]);
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { data, fetchNextPage, hasNextPage, isError, error, isLoading } =
    useInfiniteQuery({
      queryKey: ["damanat", null, "cancellable"],
      queryFn: ({ pageParam = 1, queryKey }) =>
        fetchDamanat({ pageParam, queryKey }),
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextPage : undefined,
    });

  const cancelDamanaMutation = useMutation({
    mutationFn: cancelDamana,
    onSuccess: () => setOpenModal(true),
    onError: (error) =>
      setErrorMsg(
        error?.response?.data?.error_msg ||
          t("pages.account.remove_damana.errors.cancel")
      ),
  });

  const toggleSelect = (id) => {
    setSelectedDamanat((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleConfirmCancel = () => {
    if (!reason.trim()) {
      setReasonError(t("pages.account.remove_damana.reason_required"));
      return;
    }
    setReasonError("");
    cancelDamanaMutation.mutate({ ids: selectedDamanat, reason });
  };

  const resetAndBack = () => {
    setStep(0);
    setSelectedDamanat([]);
    setReason("");
    setReasonError("");
  };

  return (
    <>
      <h3 className="text-lg lg:text-2xl text-primary font-bold">
        {steps[step].title}
      </h3>
      <p className="text-neutral-500 lg:text-lg">{steps[step].description}</p>

      <StepProgress steps={steps} currentStep={step} />

      {isLoading && <LoadingSection />}
      {isError && (
        <FormError
          errorMsg={
            error?.response?.data?.error_msg ||
            t("pages.account.remove_damana.errors.load")
          }
        />
      )}

      {!isLoading && step === 0 && (
        <InfiniteScroll
          dataLength={data?.pages.flatMap((p) => p.data).length || 0}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={
            <p className="text-center p-4">
              {t("pages.account.remove_damana.load_more")}
            </p>
          }
          endMessage={
            <p className="text-center p-4">
              {t("pages.account.remove_damana.no_more")}
            </p>
          }
          style={{ overflow: "hidden" }}
        >
          <DamanaList
            data={data?.pages.flatMap((p) => p.data) || []}
            selectable
            selectedIds={selectedDamanat}
            onSelect={toggleSelect}
          />
        </InfiniteScroll>
      )}

      {step === 0 && selectedDamanat.length > 0 && (
        <FormBtn
          title={t("pages.account.remove_damana.next")}
          onClick={() => setStep(1)}
          variant="primary"
        />
      )}

      {step === 1 && (
        <div className="space-y-4">
          <MainInput
            label={t("pages.account.remove_damana.reason_label")}
            type="textarea"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            error={reasonError}
          />

          {appConfig?.settings?.bank_refund_commotion && (
            <p className="text-error-100 text-lg flex items-center gap-1">
              <IoWarningOutline className="text-2xl" />
              {t("pages.account.remove_damana.warning", {
                amount: appConfig?.settings?.bank_refund_commotion,
              })}
            </p>
          )}

          {errorMsg && <FormError errorMsg={errorMsg} />}

          <div className="flex flex-col md:flex-row items-center gap-4">
            <button onClick={resetAndBack} className="mainBtn min-w-[250px]">
              {t("pages.account.remove_damana.continue")}
            </button>
            <button
              onClick={handleConfirmCancel}
              className={`mainBtn danger min-w-[250px] ${
                cancelDamanaMutation.isPending && "cursor-wait contrast-50"
              }`}
              disabled={cancelDamanaMutation.isPending}
            >
              {cancelDamanaMutation.isPending
                ? t("pages.account.remove_damana.loading")
                : t("pages.account.remove_damana.confirm")}
            </button>
          </div>
        </div>
      )}

      <ActionModal
        openModal={openModal}
        msg={t("pages.account.remove_damana.success_msg")}
        icon="success"
        primaryBtn={{
          text: t("pages.account.remove_damana.go_to_damanat"),
          action: () => {
            setOpenModal(false);
            resetAndBack();
          },
        }}
      />
    </>
  );
};

export default RemoveDamana;
