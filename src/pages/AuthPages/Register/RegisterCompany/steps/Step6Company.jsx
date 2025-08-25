import { useState } from "react";
import { FaCirclePlus, FaPeopleGroup } from "react-icons/fa6";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  const [showAddGroupInput, setShowAddGroupInput] = useState(false);
  const [customGroupName, setCustomGroupName] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["companyGroups"],
    queryFn: getCompanyGroups,
    select: (res) => res?.data || [],
    onError: (err) => {
      toast(err?.response?.data?.error_msg || "حدث خطأ أثناء جلب المجموعات");
    },
  });

  const groups = data || [];

  // إضافة مجموعة جديدة
  const createGroupMutation = useMutation({
    mutationFn: createCompanyGroup,
    onSuccess: (res) => {
      toast.success("تمت إضافة المجموعة بنجاح");
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
        err?.response?.data?.error_msg || "حدث خطأ أثناء إضافة المجموعة"
      );
    },
  });

  const handleAddGroup = () => {
    if (!customGroupName.trim()) {
      toast.error("من فضلك أدخل اسم المجموعة");
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
      <h3 className="text-lg lg:text-2xl font-bold">تفويض بمشاركة البيانات</h3>
      <p className="text-sm lg:text-base">
        أنا الموقع أدناه بصفتي الشخصية عميل لدى ضمانة , أصرح لكم وأوافق على قيام
        البنك العربي وشركة ضمانة بالاستعلام عن البيانات الشخصية ...
      </p>
    </>
  );

  return (
    <>
      <Toaster />

      {/* اختيار المجموعة */}
      <MainInput
        label="هل تنتمي شركتك إلى مجموعة شركات؟"
        id="group_id"
        type="select"
        name="group_id"
        value={formik.values.group_id?.id || ""}
        onChange={handleSelectChange}
        error={getError("group_id")}
        options={[
          { label: isLoading ? "جاري التحميل..." : "اختر مجموعة", value: "" },
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
        {showAddGroupInput ? "ازالة المجموعة" : "إضافة مجموعة جديدة"}
      </button>

      {showAddGroupInput && (
        <div className="mt-4 flex gap-2">
          <MainInput
            type="text"
            value={customGroupName}
            onChange={(e) => setCustomGroupName(e.target.value)}
            placeholder="ادخل اسم المجموعة"
          />
          <button
            type="button"
            onClick={handleAddGroup}
            disabled={createGroupMutation.isPending}
            className="bg-secondary text-white py-2 px-4 rounded-lg cursor-pointer"
          >
            {createGroupMutation.isPending ? "جاري الإضافة..." : "إضافة"}
          </button>
        </div>
      )}

      {/* 👇 هنا استخدام الكمبوننتات الجديدة */}
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
          الموافقة على سياسة{" "}
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="text-primary font-semibold cursor-pointer underline"
          >
            الخصوصية و شروط استخدام ضمانة
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
          text: "أوافق على الشروط و المتابعه",
          action: () => {
            formik.setFieldValue("accept_policy_terms", true);
            setOpenModal(false);
          },
        }}
        lightBtn={{ text: "العوده", action: () => setOpenModal(false) }}
      />
    </>
  );
};

export default Step6Company;
