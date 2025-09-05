import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary text-white relative">
      <div className="container py-8 flex items-center justify-between">
        <ul className="flex flex-wrap items-center justify-center gap-5 lg:gap-10 w-full text-sm lg:text-base">
          <Link to="/page/privacy_policy">
            {t("components.layout.footer.privacyPolicy")}
          </Link>
          <Link to="/page/full_terms_and_conditions">
            {t("components.layout.footer.termsAndConditions")}
          </Link>
          <Link to="/page/about_us">
            {t("components.layout.footer.aboutUs")}
          </Link>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
