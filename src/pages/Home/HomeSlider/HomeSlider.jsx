import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./HomeSlider.css";
import { getSlider } from "../../../services/staticDataService";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import LoadingSection from "../../../components/Loading/LoadingSection";

const HomeSlider = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSlider(),
    queryKey: ["termsAndConditions"],
    keepPreviousData: true,
  });
  const { t } = useTranslation();

  if (isLoading) return <LoadingSection />;

  if (isError)
    return (
      <div className="p-4 text-center">{t("pages.account.terms.error")} </div>
    );

  return (
    <Swiper
      dir="ltr"
      spaceBetween={10}
      slidesPerView={1}
      autoplay={{ delay: 4000 }}
      speed={1000}
      loop={true}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination]}
      className="homeSlider"
    >
      {data?.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="w-full h-80 md:h-96">
            <img
              loading="lazy"
              src={item.image_full_path}
              alt={`slider ${item.id}`}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeSlider;
