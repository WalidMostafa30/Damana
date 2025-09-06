import { useState } from "react";
import { FaCirclePlus, FaPeopleGroup } from "react-icons/fa6";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import MainInput from "../../../../../components/form/MainInput/MainInput";
import {
  createCompanyGroup,
  getCompanyGroups,
} from "../../../../../services/authService";
import ActionModal from "../../../../../components/modals/ActionModal";
import toast, { Toaster } from "react-hot-toast";
import Step6CompanyCommissioner from "./Step6CompanyCommissioner";
import Step6CompanyLoginAccounts from "./Step6CompanyLoginAccounts";

const Step6Company = ({ formik, getError }) => {
  const { t } = useTranslation();
  const [showAddGroupInput, setShowAddGroupInput] = useState(false);
  const [customGroupName, setCustomGroupName] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["companyGroups"],
    queryFn: getCompanyGroups,
    select: (res) => res?.data || [],
    onError: (err) => {
      toast(
        err?.response?.data?.error_msg ||
          t("pages.Step6Company.errors.groupFetchError")
      );
    },
  });

  const groups = data || [];

  // إضافة مجموعة جديدة
  const createGroupMutation = useMutation({
    mutationFn: createCompanyGroup,
    onSuccess: (res) => {
      toast.success(t("pages.Step6Company.addGroup.successMessage"));
      if (res?.data) {
        formik.setFieldValue("group_id", {
          id: res.data.id,
          name: res.data.name,
        });
      }
      queryClient.invalidateQueries(["companyGroups"]);
      setCustomGroupName("");
      setShowAddGroupInput(false);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.error_msg ||
          t("pages.Step6Company.addGroup.errorMessage")
      );
    },
  });

  const handleAddGroup = () => {
    if (!customGroupName.trim()) {
      toast.error(t("pages.Step6Company.errors.groupRequired"));
      return;
    }
    createGroupMutation.mutate({ name: customGroupName });
  };

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const selectedGroup = groups.find(
      (g) => String(g.id) === String(selectedId)
    );
    if (selectedGroup) {
      formik.setFieldValue("group_id", {
        id: selectedGroup.id,
        name: selectedGroup.name,
      });
    } else {
      formik.setFieldValue("group_id", null);
    }
  };

  const modalMsg = (
    <>
      <h3 className="text-lg lg:text-2xl font-bold">
        {t("pages.Step6Company.modal.title")}
      </h3>
      <p className="text-sm lg:text-base">{t("pages.Step6Company.modal.content")}</p>
    </>
  );

  return (
    <>
      <Toaster />

      {/* اختيار المجموعة */}
      <MainInput
        label={t("pages.Step6Company.groupQuestion")}
        id="group_id"
        type="select"
        name="group_id"
        value={formik.values.group_id?.id || ""}
        onChange={handleSelectChange}
        error={getError("group_id")}
        options={[
          {
            label: isLoading
              ? t("pages.Step6Company.loading")
              : t("pages.Step6Company.selectPlaceholder"),
            value: "",
          },
          ...groups.map((group) => ({
            label: group.name,
            value: group.id,
          })),
        ]}
        icon={<FaPeopleGroup />}
      />

      {/* زر إضافة مجموعة جديدة */}
      <button
        type="button"
        className="mt-4 flex items-center gap-1 text-primary cursor-pointer"
        onClick={() => setShowAddGroupInput(!showAddGroupInput)}
      >
        <FaCirclePlus
          className={`text-2xl ${
            showAddGroupInput ? "rotate-45" : ""
          } duration-200`}
        />
        {showAddGroupInput
          ? t("pages.Step6Company.addGroup.hide")
          : t("pages.Step6Company.addGroup.show")}
      </button>

      {showAddGroupInput && (
        <div className="mt-4 flex gap-2">
          <MainInput
            type="text"
            value={customGroupName}
            onChange={(e) => setCustomGroupName(e.target.value)}
            placeholder={t("pages.Step6Company.addGroup.inputPlaceholder")}
          />
          <button
            type="button"
            onClick={handleAddGroup}
            disabled={createGroupMutation.isPending}
            className="bg-secondary text-white py-2 px-4 rounded-lg cursor-pointer"
          >
            {createGroupMutation.isPending
              ? t("pages.Step6Company.addGroup.adding")
              : t("pages.Step6Company.addGroup.addButton")}
          </button>
        </div>
      )}

      {/* 👇 كمبوننت الحسابات */}
      {/* <Step6CompanyCommissioner formik={formik} getError={getError} /> */}
      <Step6CompanyLoginAccounts formik={formik} />

      {/* Checkbox سياسة الخصوصية */}
      <label className="flex items-center gap-2 mt-6">
        <input
          type="checkbox"
          name="accept_policy_terms"
          checked={formik.values.accept_policy_terms}
          onChange={(e) =>
            formik.setFieldValue("accept_policy_terms", e.target.checked)
          }
          className="h-5 w-5 accent-primary focus:ring-primary"
        />
        <span>
          {t("pages.Step6Company.privacyPolicy.label")}{" "}
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="text-primary font-semibold cursor-pointer underline"
          >
            {t("pages.Step6Company.privacyPolicy.linkText")}
          </button>{" "}
        </span>
      </label>
      {getError("accept_policy_terms") && (
        <p className="text-error-100">{getError("accept_policy_terms")}</p>
      )}

      <ActionModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        closeBtn
        msg={modalMsg}
        icon="protect"
        primaryBtn={{
          text: t("pages.Step6Company.modal.agreeButton"),
          action: () => {
            formik.setFieldValue("accept_policy_terms", true);
            setOpenModal(false);
          },
        }}
        lightBtn={{
          text: t("pages.Step6Company.modal.backButton"),
          action: () => setOpenModal(false),
        }}
      />
    </>
  );
};

export default Step6Company;
