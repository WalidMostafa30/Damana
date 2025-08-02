import { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MainInput from "../../../../../components/form/MainInput/MainInput";
import {
  createCompanyGroup,
  getCompanyGroups,
} from "../../../../../services/authService";

const Step6Company = ({ formik, getError }) => {
  const [showAddGroupInput, setShowAddGroupInput] = useState(false);
  const [customGroupName, setCustomGroupName] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["companyGroups"],
    queryFn: getCompanyGroups,
    select: (res) => res?.data || [],

    onError: (err) => {
      alert(err?.response?.data?.error_msg || "حدث خطأ أثناء جلب المجموعات");
    },
  });

  const groups = data || [];

  // إضافة مجموعة جديدة
  const createGroupMutation = useMutation({
    mutationFn: createCompanyGroup,
    onSuccess: (res) => {
      alert("تمت إضافة المجموعة بنجاح");

      // تحديد المجموعة المضافة أوتوماتيك
      if (res?.data) {
        formik.setFieldValue("group_id", {
          id: res.data.id,
          name: res.data.name,
        });
      }

      // تحديث بيانات المجموعات
      queryClient.invalidateQueries(["companyGroups"]);
      setCustomGroupName("");
      setShowAddGroupInput(false);
    },
    onError: (err) => {
      alert(err?.response?.data?.error_msg || "حدث خطأ أثناء إضافة المجموعة");
    },
  });

  // عند إضافة مجموعة جديدة
  const handleAddGroup = () => {
    if (!customGroupName.trim()) {
      alert("من فضلك أدخل اسم المجموعة");
      return;
    }
    createGroupMutation.mutate({ name: customGroupName });
  };

  // عند اختيار مجموعة من القائمة
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

  return (
    <>
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
      />

      {/* زر إضافة مجموعة جديدة */}
      <button
        type="button"
        className="mt-4 flex items-center gap-1 text-sm text-primary"
        onClick={() => setShowAddGroupInput(!showAddGroupInput)}
      >
        <FaCirclePlus className="text-2xl" />
        إضافة مجموعة جديدة
      </button>

      {/* إدخال اسم المجموعة الجديدة */}
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

      {/* Checkbox سياسة الخصوصية */}
      <label className="flex items-center gap-2 mt-6">
        <input
          type="checkbox"
          name="accept_policy_terms"
          checked={formik.values.accept_policy_terms === "yes"}
          onChange={(e) =>
            formik.setFieldValue(
              "accept_policy_terms",
              e.target.checked ? "yes" : ""
            )
          }
          className="h-5 w-5 accent-primary focus:ring-primary"
        />
        <span>
          الموافقة على سياسة{" "}
          <a href="#" className="text-primary font-semibold">
            الخصوصية
          </a>{" "}
          و{" "}
          <a href="#" className="text-primary font-semibold">
            شروط استخدام
          </a>{" "}
          ضمانة
        </span>
      </label>
    </>
  );
};

export default Step6Company;
