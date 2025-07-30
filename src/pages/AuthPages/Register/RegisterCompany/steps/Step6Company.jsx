import { useState } from "react";
import MainInput from "../../../../../components/form/MainInput/MainInput";
import { FaCirclePlus } from "react-icons/fa6";

const groupOptions = ["مجموعة شركات إيصال", "مجموعة شركات هومى"];

const Step6Company = ({ formik, getError }) => {
  const [showAddGroupInput, setShowAddGroupInput] = useState(false);
  const [customGroupName, setCustomGroupName] = useState("");

  const handleAddGroup = () => {
    if (customGroupName.trim()) {
      formik.setFieldValue("group_id", { name: customGroupName });
      setCustomGroupName("");
      setShowAddGroupInput(false);
    }
  };

  return (
    <>
      <MainInput
        label="هل تنتمي شركتك إلى مجموعة شركات؟"
        id="group_id"
        type="select"
        name="group_id"
        value={formik.values.group_id?.name || ""}
        onChange={(e) =>
          formik.setFieldValue("group_id", { name: e.target.value })
        }
        error={getError("group_id")}
        options={[
          { label: "اختر مجموعة", value: "" },
          ...groupOptions.map((group) => ({ label: group, value: group })),
        ]}
      />

      <button
        type="button"
        className="mt-4 flex items-center gap-1 text-sm text-primary"
        onClick={() => setShowAddGroupInput(!showAddGroupInput)}
      >
        <FaCirclePlus className="text-2xl" />
        إضافة مجموعة جديدة
      </button>

      {showAddGroupInput && (
        <div className="mt-4 flex gap-2 items-center">
          <input
            type="text"
            value={customGroupName}
            onChange={(e) => setCustomGroupName(e.target.value)}
            placeholder="ادخل اسم المجموعة"
            className="flex-1 p-3 border border-gray-300 rounded-lg"
          />
          <button
            type="button"
            onClick={handleAddGroup}
            className="bg-primary text-white py-2 px-4 rounded-lg"
          >
            إضافة
          </button>
        </div>
      )}

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
