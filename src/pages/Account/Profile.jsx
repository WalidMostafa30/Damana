import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import MainInput from "../../components/form/MainInput/MainInput";
import { GoMail } from "react-icons/go";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import Avatar from "../../components/common/Avatar";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { profile, loading } = useSelector((state) => state.profile);

  const profileSchema = Yup.object({
    full_mobile: Yup.string()
      .min(9, "رقم الهاتف يجب أن يحتوي على 9 أرقام على الأقل")
      .required("رقم الهاتف مطلوب"),
    email: Yup.string()
      .email("البريد الالكتروني غير صالح")
      .required("البريد الالكتروني مطلوب"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      full_mobile: profile?.full_mobile,
      email: profile?.email || "",
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      console.log("📤 بيانات الإرسال:", values);
      setIsEditing(false);
    },
  });

  const getError = (field) => formik.touched[field] && formik.errors[field];

  if (loading) return <LoadingSection />;

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-10">
        <div className="flex gap-2">
          <Avatar
            image={profile?.profile_image_full_path}
            name={profile?.name}
            size="lg"
          />
          <div>
            <h3 className="text-lg lg:text-2xl font-bold text-primary mb-1">
              {profile?.name || "الاسم غير متاح"}
            </h3>
            <p>{profile?.full_mobile}</p>
          </div>
        </div>

        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className={`border border-neutral-300 px-4 py-2 rounded-xl flex items-center gap-2 lg:text-lg cursor-pointer ${
            isEditing ? "bg-secondary/30 border-secondary/30" : ""
          }`}
        >
          <FaRegEdit />
          تعديل
        </button>
      </div>

      <div>
        <h3 className="text-lg lg:text-2xl font-bold text-primary mb-2">
          البريد الالكتروني ورقم الهاتف
        </h3>

        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          <MainInput
            type="tel"
            id="phone"
            placeholder="96269077885+"
            label="رقم الهاتف"
            value={formik.values.full_mobile}
            onChange={(phone) => formik.setFieldValue("full_mobile", phone)}
            onBlur={formik.handleBlur}
            error={getError("full_mobile")}
            disabled={!isEditing}
          />

          <MainInput
            type="email"
            id="email"
            placeholder="yasmin@example.com"
            label="البريد الالكتروني"
            icon={<GoMail />}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={getError("email")}
            disabled={!isEditing}
          />

          {isEditing && (
            <button className="mainBtn lg:col-span-2" type="submit">
              حفظ
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default Profile;
