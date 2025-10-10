import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MainInput from "../../components/form/MainInput/MainInput";
import FormBtn from "../../components/form/FormBtn";
import FormError from "../../components/form/FormError";
import { RiEdit2Fill, RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { MdDelete, MdEmail } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteUserRegister,
  getUserRegister,
  getUserRegisterPermissions,
  sendUserRegister,
  updateUserRegister,
} from "../../services/authService";
import { usePermission } from "../../hooks/usePermission";
import { Navigate } from "react-router-dom";

const UserManagement = () => {
  const [editingUser, setEditingUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const queryClient = useQueryClient();

  const { has } = usePermission();

  if (!has("users.manage")) {
    return <Navigate to="/profile" replace />;
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("اسم المستخدم مطلوب"),
    email: Yup.string()
      .email("بريد إلكتروني غير صالح")
      .required("البريد مطلوب"),
    mobile: Yup.string().required("رقم الهاتف مطلوب"),
    country_code: Yup.string().required("كود الدولة مطلوب"),
    password: Yup.string().when([], {
      is: () => !editingUser,
      then: (schema) =>
        schema
          .min(6, "كلمة المرور لا تقل عن 6 أحرف")
          .required("كلمة المرور مطلوبة"),
      otherwise: (schema) => schema.notRequired(),
    }),
    permissions: Yup.array(),
  });

  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUserRegister,
  });

  const { data: permissionsData } = useQuery({
    queryKey: ["permissions"],
    queryFn: getUserRegisterPermissions,
  });

  const addUserMutation = useMutation({
    mutationFn: sendUserRegister,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      setErrorMsg("");
    },
    onError: (error) => {
      setErrorMsg(
        error?.response?.data?.error_msg || "حدث خطأ أثناء إضافة المستخدم"
      );
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUserRegister,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      setErrorMsg("");
    },
    onError: (error) => {
      setErrorMsg(
        error?.response?.data?.error_msg || "حدث خطأ أثناء تعديل المستخدم"
      );
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUserRegister,
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const payload = {
      id: editingUser?.id,
      name: values.name,
      email: values.email,
      mobile: values.mobile,
      country_code: values.country_code,
      password: values.password,
      permissions: values.permissions,
    };

    if (editingUser) {
      await updateUserMutation.mutateAsync(payload);
      setEditingUser(null);
    } else {
      const { id, ...rest } = payload;
      await addUserMutation.mutateAsync(rest);
    }

    resetForm();
  };

  const handleEdit = (user, setValues) => {
    setEditingUser(user);
    setValues({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      country_code: user.country_code,
      password: "",
      permissions: user.company_permissions?.map((p) => p) || [],
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل انت متأكد من حذف المستخدم؟")) {
      await deleteUserMutation.mutateAsync(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-lg lg:text-2xl text-primary font-bold">
          اداره المستخدمين
        </h3>
      </div>

      <Formik
        enableReinitialize
        initialValues={{
          name: editingUser?.name || "",
          email: editingUser?.email || "",
          mobile: editingUser?.mobile || "",
          country_code: editingUser?.country_code || "962",
          password: "",
          permissions: editingUser?.company_permissions || [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          setValues,
        }) => (
          <Form className="space-y-6 baseWhiteContainer">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <MainInput
                label="اسم المستخدم"
                id="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
                placeholder="ادخل اسم المستخدم"
                icon={<FaUser />}
              />

              <MainInput
                label="البريد الإلكتروني"
                id="email"
                type="text"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
                placeholder="example@email.com"
                icon={<MdEmail />}
              />

              <MainInput
                label="رقم الهاتف"
                id="mobile"
                type="tel"
                value={`+${values.country_code}${values.mobile}`}
                onChange={(val, country) => {
                  const dialCode = country?.dialCode || values.country_code;

                  // احذف أي "+" أو "كود دولة" متكرر في بداية النص
                  const cleanedVal = val
                    .replace(/^\+/, "")
                    .replace(new RegExp(`^${dialCode}`), "")
                    .trim();

                  setFieldValue("mobile", cleanedVal);
                  setFieldValue("country_code", dialCode);
                }}
                onBlur={handleBlur}
                error={touched.mobile && errors.mobile}
                placeholder="ادخل رقم الهاتف"
              />

              <MainInput
                label="كلمة المرور"
                id="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password}
                placeholder="••••••••"
                icon={<RiLockPasswordFill />}
              />
            </div>

            {/* الصلاحيات */}
            <div>
              <label className="block font-bold mb-4 text-lg lg:text-xl">
                الصلاحيات :
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {permissionsData?.map((perm) => (
                  <label key={perm.value} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={perm.value}
                      checked={values.permissions.includes(perm.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFieldValue("permissions", [
                            ...values.permissions,
                            perm.value,
                          ]);
                        } else {
                          setFieldValue(
                            "permissions",
                            values.permissions.filter((p) => p !== perm.value)
                          );
                        }
                      }}
                      className="w-5 h-5 accent-primary cursor-pointer"
                    />
                    <span>{perm.label}</span>
                  </label>
                ))}
              </div>
              {touched.permissions && errors.permissions && (
                <p className="mt-2 text-error-100">{errors.permissions}</p>
              )}
            </div>

            <FormBtn
              title={editingUser ? "تعديل المستخدم" : "اضافة مستخدم"}
              loading={
                addUserMutation.isPending || updateUserMutation.isPending
              }
            />

            <FormError errorMsg={errorMsg} />

            {/* جدول المستخدمين */}
            <div className="overflow-x-auto mt-6 rounded-xl shadow">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-start font-medium">الاسم</th>
                    <th className="px-6 py-3 text-start font-medium">البريد</th>
                    <th className="px-6 py-3 text-start font-medium">الهاتف</th>
                    <th className="px-6 py-3 text-start font-medium">
                      الصلاحيات
                    </th>
                    <th className="px-6 py-3 text-start font-medium">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {usersLoading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        جاري التحميل...
                      </td>
                    </tr>
                  ) : usersData?.length > 0 ? (
                    usersData.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4">{user.name}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">
                          {user.country_code.startsWith("+")
                            ? user.country_code
                            : `+${user.country_code}`}
                          {user.mobile}
                        </td>
                        <td className="px-6 py-4">
                          {user.company_permissions?.map((p, i) => (
                            <span key={i} className="block">
                              {permissionsData?.find((perm) => perm.value === p)
                                ?.label || p}
                            </span>
                          ))}
                        </td>
                        <td className="px-6 py-4 space-x-2 space-y-2">
                          <button
                            type="button"
                            className="text-2xl text-secondary bg-secondary/10 hover:bg-secondary/30 p-2 rounded-lg"
                            onClick={() => handleEdit(user, setValues)}
                          >
                            <RiEdit2Fill />
                          </button>
                          <button
                            type="button"
                            className="text-2xl text-red-900 bg-red-900/10 hover:bg-red-900/30 p-2 rounded-lg"
                            onClick={() => handleDelete(user.id)}
                          >
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        لا يوجد مستخدمين مضافين بعد
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserManagement;
