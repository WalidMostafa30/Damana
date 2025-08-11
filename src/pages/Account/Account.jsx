import { NavLink, Outlet } from "react-router-dom";
import PageTitle from "../../components/common/PageTitle";

const Account = () => {
  return (
    <section className="pageContainer space-y-4">
      <PageTitle
        title="الملف الشخصي"
        subtitle="هنا يمكنك الاطلاع على بيانات ملفك الشخصي وتعديل البيانات التي تريدها"
      />

      <section className="baseWhiteContainer grid grid-cols-1 xl:grid-cols-4 gap-4">
        <div>
          <nav className="grid gap-2 lg:gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-1">
            <NavLink to="/account" end className="profileLink">
              الملف الشخصي
            </NavLink>
            <NavLink to="/account/bank-info" className="profileLink">
              البيانات البنكية
            </NavLink>
            <NavLink to="/account/address" className="profileLink">
              العنوان
            </NavLink>
            <NavLink to="/account/remove-damana" className="profileLink">
              الغاء ضمانة
            </NavLink>
            <NavLink to="/account/support" className="profileLink">
              الدعم
            </NavLink>
            <NavLink to="/account/password" className="profileLink">
              تعديل كلمة المرور
            </NavLink>
            <NavLink to="/account/terms" className="profileLink">
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

export default Account;
