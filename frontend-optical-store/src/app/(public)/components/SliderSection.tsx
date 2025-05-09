// "use client";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectFade } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-fade";

// export default function HeroSlider() {
//   return (
//     <section className="relative w-full h-[80vh]">
//       <Swiper
//         modules={[Autoplay, EffectFade]}
//         autoplay={{ delay: 4000, disableOnInteraction: false }}
//         effect="fade"
//         loop
//         className="w-full h-full"
//       >
//         {["/img/modelo1.png", "/img/modelo2.png", "/img/modelo3.png"].map((img, i) => (
//           <SwiperSlide key={i}>
//             <div
//               className="w-full h-full bg-cover bg-center"
//               style={{
//                 backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${img})`,
//               }}
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Texto centralizado */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <h1 className="text-white text-2xl sm:text-4xl font-bold text-center px-4">
//           NÓS VALORIZAMOS O<br />
//           CUIDADO DA SUA SAÚDE OCULAR
//         </h1>
//       </div>
//     </section>
//   );
// }

"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

export default function HeroSlider() {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        effect="fade"
        loop
        className="w-full h-full"
      >
        {["/img/modelo1.png", "/img/modelo2.png", "/img/modelo3.png"].map((img, i) => (
          <SwiperSlide key={i}>
            <div
              className="w-full h-full flex items-center justify-center absolute top-0 left-0"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: 0,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Texto centralizado */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <h1 className="text-white text-2xl sm:text-4xl font-thin text-center px-4 drop-shadow-md">
          NÓS VALORIZAMOS O<br />
          CUIDADO DA SUA SAÚDE OCULAR
        </h1>
      </div>
    </section>
  );
}
