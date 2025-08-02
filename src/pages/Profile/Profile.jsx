import { NavLink, Outlet } from "react-router-dom";
import PageTitle from "../../components/common/PageTitle";
import { useEffect } from "react";
import { getProfileAct } from "../../store/profile/profileAction";
import { useDispatch } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileAct());
  }, [dispatch]);

  return (
    <section className="pageContainer space-y-4">
      <PageTitle
        title="الملف الشخصي"
        subtitle="هنا يمكنك الاطلاع على بيانات ملفك الشخصي وتعديل البيانات التي تريدها"
      />

      <section className="baseWhiteContainer grid grid-cols-1 xl:grid-cols-4 gap-4">
        <div>
          <nav className="grid gap-2 lg:gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-1">
            <NavLink to="/profile" end className="profileLink">
              الملف الشخصي
            </NavLink>
            <NavLink to="/profile/bank-info" className="profileLink">
              البيانات البنكية
            </NavLink>
            <NavLink to="/profile/address" className="profileLink">
              العنوان
            </NavLink>
            <NavLink to="/profile/remove-damana" className="profileLink">
              الغاء ضمانة
            </NavLink>
            <NavLink to="/profile/support" className="profileLink">
              الدعم
            </NavLink>
            <NavLink to="/profile/password" className="profileLink">
              تعديل كلمة المرور
            </NavLink>
            <NavLink to="/profile/terms" className="profileLink">
              الشروط والأحكام
            </NavLink>
          </nav>
        </div>

        <section className="xl:col-span-3 space-y-4 whiteContainer">
          <Outlet />
        </section>
      </section>
    </section>
  );
};

export default Profile;
