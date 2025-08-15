import { useState } from "react";
import { FaCirclePlus, FaPeopleGroup } from "react-icons/fa6";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MainInput from "../../../../../components/form/MainInput/MainInput";
import {
  createCompanyGroup,
  getCompanyGroups,
} from "../../../../../services/authService";
import ActionModal from "../../../../../components/modals/ActionModal";

const Step6Company = ({ formik, getError }) => {
  const [showAddGroupInput, setShowAddGroupInput] = useState(false);
  const [customGroupName, setCustomGroupName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const modalMsg = (
    <>
      <h3 className="text-lg lg:text-2xl font-bold">تفويض بمشاركة البيانات</h3>
      <p className="text-sm lg:text-base">
        أنا الموقع أدناه بصفتي الشخصية عميل لدى ضمانة , أصرح لكم وأوافق على قيام
        البنك العربي وشركة ضمانة بالاستعلام عن البيانات الشخصية العائدة لي
        ومعالجتها من خلال استخدام خدمات واجهة برمجة التطبيقات المفتوحة APIs
        المتوفرة من خلال نظام الربط البيني الحكومي , لأغراض التحقق من ملكية
        المركبة, كما أوافق على قيام البنك العربي بمعالجة بياناتي الشخصية بما
        يشمل الاسم، تاريخ الميلاد، العنوان، ورقم هوية الأحوال المدنية الخاص بي
        لأغراض تنفيذ الحوالات أو لأي غرض آخر لازم لغايات الامتثال بالقوانين
        والأنظمة والتعليمات واللوائح المعمول بها في المملكة. يبقى هذا التفويض
        مستمراً ومنتجا لأثاره دون قيد او شرط طيلة فترة عملية بيع المركبة، وذلك
        ضمن نطاق الاستخدام القانوني المصرّح به ويخضع في جميع الأوقات للرقابة
        الداخلية والتدقيق في البنك العربي
      </p>
    </>
  );

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
        icon={<FaPeopleGroup />}
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
            className="text-primary font-semibold cursor-pointer"
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
