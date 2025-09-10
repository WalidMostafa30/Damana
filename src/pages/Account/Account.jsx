import { NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageTitle from "../../components/common/PageTitle";
import { useSelector } from "react-redux";

const Account = () => {
  const { t } = useTranslation();
  const { profile } = useSelector((state) => state.profile);

  return (
    <section className="pageContainer space-y-4">
      {/* عنوان الصفحة */}
      <PageTitle
        title={t("pages.account.account.title")}
        subtitle={t("pages.account.account.subtitle")}
      />

      <section className="baseWhiteContainer grid grid-cols-1 xl:grid-cols-4 gap-4">
        <div>
          {/* الروابط الجانبية */}
          <nav className="grid gap-2 lg:gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-1">
            <NavLink to="/profile" end className="profileLink">
              {t("pages.account.account.nav.profile")}
            </NavLink>
            {profile?.account_type !== "company" && (
              <>
                <NavLink to="/profile/bank-info" className="profileLink">
                  {t("pages.account.account.nav.bank_info")}
                </NavLink>
                <NavLink to="/profile/address" className="profileLink">
                  {t("pages.account.account.nav.address")}
                </NavLink>
              </>
            )}
            <NavLink to="/profile/remove-damana" className="profileLink">
              {t("pages.account.account.nav.remove_damana")}
            </NavLink>
            <NavLink to="/profile/support" className="profileLink">
              {t("pages.account.account.nav.support")}
            </NavLink>
            <NavLink to="/profile/password" className="profileLink">
              {t("pages.account.account.nav.password")}
            </NavLink>
            <NavLink to="/profile/terms" className="profileLink">
              {t("pages.account.account.nav.terms")}
            </NavLink>
          </nav>
        </div>

        {/* محتوى الصفحة (Outlet) */}
        <section className="xl:col-span-3 space-y-4 whiteContainer">
          <Outlet />
        </section>
      </section>
    </section>
  );
};

export default Account;
