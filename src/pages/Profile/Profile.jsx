import { NavLink, Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <section className="pageContainer">
      <h2 className="text-3xl font-bold mb-4">الملف الشخصي</h2>
      <p className="text-lg text-neutral-500 mb-4">
        هنا يمكنك الاطلاع على بيانات ملفك الشخصي وتعديل البيانات التي تريدها
      </p>

      <section className="bg-base-white p-4 rounded-xl shadow-md grid grid-cols-1 xl:grid-cols-4 gap-4">
        <div>
          <nav className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-1">
            <NavLink to="/profile" className="profileLink">
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

        <section className="xl:col-span-3">
          <Outlet />
        </section>
      </section>
    </section>
  );
};

export default Profile;
