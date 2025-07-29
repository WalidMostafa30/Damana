import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./HomeSlider.css";
import homeBanner from "../../../assets/images/home-banner.png";

const data = [homeBanner, homeBanner, homeBanner];

const HomeSlider = () => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      autoplay={{ delay: 4000 }}
      speed={1000}
      loop={true}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination]}
      className="homeSlider"
    >
      {data?.map((item, index) => (
        <SwiperSlide key={index}>
          <img
            loading="lazy"
            src={item}
            alt={index}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeSlider;
