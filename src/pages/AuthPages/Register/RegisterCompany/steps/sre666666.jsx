import { useState } from "react";
import { FaCirclePlus, FaPeopleGroup, FaUserTie } from "react-icons/fa6";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MainInput from "../../../../../components/form/MainInput/MainInput";
import {
  createCompanyGroup,
  getCompanyGroups,
} from "../../../../../services/authService";
import ActionModal from "../../../../../components/modals/ActionModal";
import { IoCloseCircleOutline } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import PhoneInput from "../../../../../components/form/PhoneInput";

const Step6Company = ({ formik, getError }) => {
  const [showAddGroupInput, setShowAddGroupInput] = useState(false);
  const [customGroupName, setCustomGroupName] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginForm, setLoginForm] = useState({
    login_name: "",
    login_phone: "",
    authorizationFile: null,
  });

  console.log(loginForm);

  const modalMsg = (
    <>
      <h3 className="text-lg lg:text-2xl font-bold">تفويض بمشاركة البيانات</h3>
      <p className="text-sm lg:text-base">
        أنا الموقع أدناه بصفتي الشخصية عميل لدى ضمانة , أصرح لكم وأوافق على قيام
        البنك العربي وشركة ضمانة بالاستعلام عن البيانات الشخصية ...
      </p>
    </>
  );

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

  // اختيار مفوضين متعدد
  const handleCommissionerSelect = (e) => {
    const commissionerName = e.target.value;
    if (!commissionerName) return;

    const current = formik.values.loginusers || [];
    if (!current.includes(commissionerName)) {
      formik.setFieldValue("loginusers", [...current, commissionerName]);
    }
  };

  // حذف مفوض من loginusers
  const handleRemoveCommissioner = (name) => {
    const current = formik.values.loginusers || [];
    formik.setFieldValue(
      "loginusers",
      current.filter((u) => u !== name)
    );
  };

  const handleAddLoginAccount = () => {
    if (!loginForm.name || !loginForm.phone || !loginForm.authorizationFile) {
      toast.error("من فضلك أكمل كل الحقول");
      return;
    }

    const current = formik.values.login_accounts || [];
    formik.setFieldValue("login_accounts", [...current, loginForm]);

    // reset
    setLoginForm({ name: "", phone: "", authorizationFile: null });
    setShowLoginForm(false);
  };

  // ✅ حذف حساب
  const handleRemoveLoginAccount = (idx) => {
    const current = formik.values.login_accounts || [];
    formik.setFieldValue(
      "login_accounts",
      current.filter((_, i) => i !== idx)
    );
  };

  const login_accounts = formik.values.login_accounts;

  const addLogin = () => {
    const newLogin = {
      login_name: "",
      login_phone: "",
      authorizationFile: null,
    };
    formik.setFieldValue("login_accounts", [...login_accounts, newLogin]);
  };

  const removeLogin = (index) => {
    const updated = login_accounts.filter((_, i) => i !== index);
    formik.setFieldValue("login_accounts", updated);
  };

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
        className="mt-4 flex items-center gap-1 text-sm text-primary"
        onClick={() => setShowAddGroupInput(!showAddGroupInput)}
      >
        <FaCirclePlus className="text-2xl" />
        إضافة مجموعة جديدة
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

      {/* اختيار المفوضين */}
      <div className="mt-6">
        <MainInput
          label="اختر المفوضين"
          id="commissioners_select"
          type="select"
          value=""
          onChange={handleCommissionerSelect}
          options={[
            { label: "اختر مفوض", value: "" },
            ...formik.values.commissioners.map((c) => ({
              label: c.full_name,
              value: c.full_name, // 👈 بدل index إلى full_name
            })),
          ]}
          icon={<FaUserTie />}
        />

        {/* عرض المفوضين المختارين */}
        <div className="mt-4 flex flex-wrap gap-2">
          {(formik.values.loginusers || []).map((name, idx) => (
            <div
              key={idx}
              className="p-2 rounded-lg bg-secondary/10 flex items-center gap-2"
            >
              <span>{name}</span>
              <button
                type="button"
                className="text-error-100 text-2xl cursor-pointer"
                onClick={() => handleRemoveCommissioner(name)}
              >
                <IoCloseCircleOutline />
              </button>
            </div>
          ))}
        </div>

        {formik.errors.loginusers && formik.touched.loginusers && (
          <div className="text-error-100 text-sm mt-1">
            {formik.errors.loginusers}
          </div>
        )}
      </div>

      {/* ✅ إضافة حساب تسجيل دخول جديد */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setShowLoginForm(!showLoginForm)}
          className="flex items-center gap-1 text-sm text-primary"
        >
          <FaCirclePlus className="text-xl" />
          إضافة حساب تسجيل دخول جديد
        </button>

        {showLoginForm && (
          <>
            {login_accounts.map((login, index) => (
              <div
                key={index}
                className="mb-6 p-4 rounded-lg border border-neutral-300"
              >
                <p className="text-primary text-lg font-bold mb-4">
                  بيانات حساب الدخول {index + 1}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MainInput
                    label="الاسم"
                    id={`login_accounts.${index}.login_name`}
                    name={`login_accounts.${index}.login_name`}
                    value={login.login_name}
                    onChange={formik.handleChange}
                    error={getError(`login_accounts.${index}.login_name`)}
                  />

                  <PhoneInput
                    formik={formik}
                    name={`login_accounts.${index}.login_phone`}
                    combineValue={true}
                  />

                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      ملف خطاب التفويض
                    </label>
                    <input
                      type="file"
                      accept=".pdf,image/*"
                      onChange={(e) =>
                        formik.setFieldValue(
                          `login_accounts.${index}.authorizationFile`,
                          e.currentTarget.files[0] || null
                        )
                      }
                      className="whiteContainer"
                    />
                    {getError(`login_accounts.${index}.authorizationFile`) && (
                      <p className="text-error-100">
                        {getError(`login_accounts.${index}.authorizationFile`)}
                      </p>
                    )}
                  </div>
                </div>

                {login_accounts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLogin(index)}
                    className="text-red-500 mt-2 text-sm"
                  >
                    حذف الحساب
                  </button>
                )}
              </div>
            ))}

            <p
              className="text-secondary text-lg font-bold flex items-center gap-2 hover:brightness-75 cursor-pointer"
              onClick={addLogin}
            >
              <IoCloseCircleOutline className="text-2xl" />
              إضافة حساب جديد
            </p>
          </>
        )}

        {/* ✅ عرض الحسابات المضافة */}
        <div className="mt-4 space-y-2">
          {(formik.values.login_accounts || []).map((acc, idx) => (
            <div
              key={idx}
              className="p-2 border rounded-lg bg-white flex items-center justify-between"
            >
              <div>
                <p className="font-semibold">{acc.name}</p>
                <p className="text-sm">{acc.phone}</p>
                <p className="text-xs text-gray-500">
                  {acc.authorizationFile?.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveLoginAccount(idx)}
                className="text-error-100 text-xl"
              >
                <IoCloseCircleOutline />
              </button>
            </div>
          ))}
        </div>
      </div>

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
