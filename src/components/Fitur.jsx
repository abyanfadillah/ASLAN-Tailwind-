import React from "react";
import Aos from "aos";
import { useEffect } from "react";
export default function Fitur() {
  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 600,
      easing: "ease-in-sine",
      delay: 100,
    });
  });
  const kumpulanFitur = [
    {
      id: "1",
      judul: "Kalkulasi Logistik",
      konten:
        "Kalkulasi kebutuhan logistik berdasarkan faktor-faktor kebutuhan perjalanan selama melaut",
      link: "/",
      src: "https://cdn-icons-png.flaticon.com/512/2897/2897616.png",
    },
    {
      id: "2",
      judul: "Data Logistik",
      konten:
        "Menyimpan data kebutuhan logistik sebagai dokumentasi perjalanan",
      link: "/kalkulatorlogistik",
      src: "https://cdn-icons-png.flaticon.com/512/1163/1163497.png",
    },
    {
      id: "3",
      judul: "Pengadaan Logistik",
      konten:
        "Memesan kebutuhan logistik langsung pada produsen penyedia logistik",
      link: "/data",
      src: "https://cdn-icons-png.flaticon.com/512/1739/1739716.png",
    },
    {
      id: "4",
      judul: "Multi Platform",
      konten: "Bisa diakses dalam platorm yang lebih luas",
      link: "/data",
      src: "https://cdn-icons-png.flaticon.com/512/896/896530.png",
    },
  ];

  return (
    <>
      <div className="flex sm:ml-64 bg-gray-900 h-auto min-h-screen flex-col justify-center items-center">
        <div className=" container px-6 py-10 mx-auto ">
          <h1 className="text-3xl font-semibold  capitalize lg:text-4xl text-white">
            Fitur <br /> Asisten Logistik Nelayan
          </h1>

          <div className="mt-2">
            <span className="inline-block w-40 h-1 rounded-full bg-blue-500"></span>
            <span className="inline-block w-3 h-1 ml-1 rounded-full bg-blue-500"></span>
            <span className="inline-block w-1 h-1 ml-1 rounded-full bg-blue-500"></span>
          </div>

          <div className="mt-8 xl:mt-12 lg:flex lg:items-center">
            <div className="w-full lg:w-1/2 grid grid-cols-1 gap-8 xl:gap-16 md:grid-cols-2 pb-8">
              {kumpulanFitur.map((item) => (
                <div key={item.id} data-aos="fade-up" className="space-y-3">
                  <span className="inline-block p-2 rounded-xl md:mx-4 bg-blue-300 ">
                    <img className="w-12 h-12" src={item.src} />
                  </span>

                  <h1 className="text-2xl font-semibold capitalize text-white">
                    {item.judul}
                  </h1>

                  <p className=" text-gray-300">{item.konten}</p>
                </div>
              ))}
            </div>

            <div className="hidden lg:flex lg:w-1/2 lg:justify-center">
              <img
                data-aos="zoom-in"
                className="w-[28rem] h-[28rem] flex-shrink-0 object-cover xl:w-[34rem] xl:h-[34rem] rounded-full"
                src="https://images.unsplash.com/photo-1595009900544-9063bf483547?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
