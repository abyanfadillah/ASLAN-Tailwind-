import Aos from "aos";
import { useEffect } from "react";

export default function Hero() {
  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 600,
      easing: "ease-in-sine",
      delay: 100,
    });
  });
  return (
    <div className="sm:ml-64 relativ  overflow-hidden">
      <div className="w-full mx-auto bg-bg-auth">
        <div className=" relative p-10 pt-24 w-full  backdrop-blur-sm bg-white/10 sm:w-full sm:h-full sm:p-28 sm:pt-28">
          <main
            data-aos="fade-up"
            className=" w-fit place-item-center mx-auto rounded-2xl "
          >
            <div className=" text-center ">
              <h1 className="flex p-12 text-center text-[24px] max-w-sm  sm:max-w-full sm:w-full tracking-tight font-extrabold rounded-xl shadow-slate-800 shadow-2xl text-gray-800 sm:text-8xl">
                <span className="block xl:inline">
                  Asisten Logistik Nelayan
                </span>
              </h1>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
