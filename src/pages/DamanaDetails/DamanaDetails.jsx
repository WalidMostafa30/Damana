import DetailsCard from "../../components/common/DetailsCard";
import ActionsSection from "./ActionsSection";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchDamanaDetails } from "../../services/damanaServices";
import LoadingPage from "../../components/Loading/LoadingPage";
import Timer from "../../components/common/Timer";
import { CiCalendarDate } from "react-icons/ci";
import CopyToClipboard from "../../components/common/CopyToClipboard";
// import { toArabicWord } from "number-to-arabic-words/dist/index-node.js";
import { useTranslation } from "react-i18next";

const DamanaDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const {
    data: damana,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["damana-details", id],
    queryFn: () => fetchDamanaDetails(id),
    enabled: !!id,
  });

  console.log("📌 بيانات الضمانة:", damana);

  if (isLoading) return <LoadingPage />;

  if (isError)
    return (
      <p className="text-center text-red-500 p-4 text-xl">
        {t("pages.damanaDetails.loadError")}: {error.message}
      </p>
    );

  const vehicleData = [
    damana?.plate_number_code && {
      label: t("pages.damanaDetails.fields.plateNumber"),
      value: damana.plate_number_code,
    },
    damana?.vehicle_type && {
      label: t("pages.damanaDetails.fields.vehicleType"),
      value: damana.vehicle_type,
    },
    damana?.category && {
      label: t("pages.damanaDetails.fields.category"),
      value: damana.category,
    },
    damana?.color && {
      label: t("pages.damanaDetails.fields.color"),
      value: damana.color,
    },
    damana?.chassis_number && {
      label: t("pages.damanaDetails.fields.chassisNumber"),
      value: damana.chassis_number,
    },
    damana?.registration_number && {
      label: t("pages.damanaDetails.fields.registrationNumber"),
      value: damana.registration_number,
    },
    damana?.registration_date && {
      label: t("pages.damanaDetails.fields.registrationDate"),
      value: damana.registration_date,
    },
    damana?.manufacture_year && {
      label: t("pages.damanaDetails.fields.manufactureYear"),
      value: damana.manufacture_year,
    },
    damana?.license_expiry_date && {
      label: t("pages.damanaDetails.fields.licenseExpiry"),
      value: damana.license_expiry_date,
    },
    damana?.licensing_center && {
      label: t("pages.damanaDetails.fields.licensingCenter"),
      value: damana.licensing_center,
    },
    damana?.engine_number && {
      label: t("pages.damanaDetails.fields.engineNumber"),
      value: damana.engine_number,
    },
    damana?.load_capacity && {
      label: t("pages.damanaDetails.fields.loadCapacity"),
      value: damana.load_capacity,
    },
    damana?.registration_type && {
      label: t("pages.damanaDetails.fields.registrationType"),
      value: damana.registration_type,
    },
    damana?.country_name && {
      label: t("pages.damanaDetails.fields.country"),
      value: damana.country_name,
    },
    damana?.vehicle_classification && {
      label: t("pages.damanaDetails.fields.vehicleClassification"),
      value: damana.vehicle_classification,
    },
    damana?.engine_capacity && {
      label: t("pages.damanaDetails.fields.engineCapacity"),
      value: damana.engine_capacity,
    },
  ].filter(Boolean);

  const pageTitle = (title, large = false, color = "var(--color-primary)") => (
    <h3
      className={`font-bold text-white px-4 py-2 rounded-se-2xl min-w-1/2 md:min-w-1/4 inline-block ${
        large ? "text-lg lg:text-2xl" : "lg:text-xl !bg-primary md:min-w-1/5"
      }`}
      style={{
        backgroundColor:
          large && color ? `#${color}` : "var(--color-secondary)",
      }}
    >
      {title}
    </h3>
  );

  const formatNumber = (num) => {
    if (num === null || num === undefined || num === "") return "-";
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <article className="pageContainer relative">
      {pageTitle(
        damana?.status_translate || t("pages.damanaDetails.loading"),
        true,
        damana?.status_color
      )}

      <section className="baseWhiteContainer space-y-4">
        <div className="whiteContainer flex items-start lg:items-center justify-between flex-col lg:flex-row gap-4">
          <div className="flex items-center gap-2">
            <p className="font-medium">
              {t("pages.damanaDetails.guaranteeNumber")}:
            </p>
            <CopyToClipboard text={damana?.serial_number} />
          </div>
          <div className="flex items-center gap-2">
            <p className="font-medium">
              {t("pages.damanaDetails.plateAndCode")}:
            </p>
            <p className="text-primary font-bold">{damana.plate_number_code}</p>
          </div>
          <div className="flex items-center gap-2">
            <CiCalendarDate className="text-2xl" />
            <p className="text-primary font-bold">
              {new Date(damana?.created_at).toLocaleDateString("en-GB")}
            </p>
          </div>
          <Timer expiryDate={damana?.schedule_expired_at} />
        </div>

        <div>
          {pageTitle(t("pages.damanaDetails.sellerInfo"))}
          <DetailsCard
            data={[
              {
                label: t("pages.damanaDetails.fields.name"),
                value: damana?.seller_company
                  ? damana?.seller_company.ar_name
                  : damana?.seller?.name,
              },
              {
                label: t("pages.damanaDetails.fields.phone"),
                value: damana?.seller_company
                  ? damana?.seller_company.phone
                  : damana?.seller?.full_mobile,
              },
              {
                label: t("pages.damanaDetails.fields.nationalId"),
                value: damana?.seller_company
                  ? damana?.seller_company.national_number
                  : damana?.seller?.national_number,
              },
            ].filter((item) => item.value)} // ← فلترة العناصر الفاضية
          />
        </div>

        <div>
          {pageTitle(t("pages.damanaDetails.buyerInfo"))}
          <DetailsCard
            data={[
              {
                label: t("pages.damanaDetails.fields.name"),
                value: damana?.buyer_company
                  ? damana?.buyer_company.ar_name
                  : damana?.buyer?.name,
              },
              {
                label: t("pages.damanaDetails.fields.phone"),
                value: damana?.buyer_company
                  ? damana?.buyer_company.phone
                  : damana?.buyer?.full_mobile,
              },
              {
                label: t("pages.damanaDetails.fields.nationalId"),
                value: damana?.buyer_company
                  ? damana?.buyer_company.national_number
                  : damana?.buyer?.national_number,
              },
            ].filter((item) => item.value)} // ← فلترة العناصر الفاضية
          />
        </div>

        <div>
          {pageTitle(t("pages.damanaDetails.vehicleInfo"))}
          <DetailsCard data={vehicleData} col={2} />
        </div>

        <div>
          {pageTitle(t("pages.damanaDetails.damanaInfo"))}
          <DetailsCard
            data={[
              {
                label: t("pages.damanaDetails.fields.vehiclePrice"),
                value: `${formatNumber(damana?.vehicle_price)} ${t(
                  "pages.damanaDetails.currency"
                )}`,
              },
              {
                label: t("pages.damanaDetails.fields.commissionBeforeDiscount"),
                value: `${formatNumber(
                  damana?.commission_value_before_discount
                )} ${t("pages.damanaDetails.currency")}`,
              },
              {
                label: t("pages.damanaDetails.fields.discountCode"),
                value: damana?.code,
              },
              {
                label: t("pages.damanaDetails.fields.discount"),
                value:
                  damana?.discount &&
                  `${formatNumber(damana?.discount)}${
                    damana?.discount_type === "percentage"
                      ? "%"
                      : ` ${t("pages.damanaDetails.currency")}`
                  }`,
              },
              {
                label: t("pages.damanaDetails.fields.commissionAfterDiscount"),
                value: `${formatNumber(damana?.commission_value)} ${t(
                  "pages.damanaDetails.currency"
                )}`,
              },
              {
                label: t("pages.damanaDetails.fields.commissionOn"),
                value:
                  damana?.commission_on === "buyer"
                    ? t("pages.addDamana.step2.commissionOn.options.buyer")
                    : damana?.commission_on === "seller"
                    ? t("pages.addDamana.step2.commissionOn.options.seller")
                    : damana?.commission_on === "equally"
                    ? t("pages.addDamana.step2.commissionOn.options.equally")
                    : "-",
              },

              {
                label: t("pages.damanaDetails.fields.totalPrice"),
                value: `${formatNumber(
                  damana?.vehicle_price_with_commission
                )} ${t("pages.damanaDetails.currency")}`,
              },
              // {
              //   label: t("pages.damanaDetails.fields.totalPriceInWords"),
              //   value: `${toArabicWord(
              //     Number(damana?.vehicle_price_with_commission)
              //   )} ${t("pages.damanaDetails.currency")} ${t(
              //     "pages.damanaDetails.only"
              //   )}`,
              // },
            ].filter(Boolean)}
          />
        </div>

        <ActionsSection damana={damana} />
      </section>
    </article>
  );
};

export default DamanaDetails;
