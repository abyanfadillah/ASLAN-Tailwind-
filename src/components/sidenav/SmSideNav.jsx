import React from "react";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserAuth } from "../../assets/database/AuthContext";
import Aos from "aos";
export default function SmSideNav() {
  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 600,
      easing: "ease-in-sine",
      delay: 100,
    });
  });
  const Navigation = [
    {
      id: "1",
      name: "Halaman Utama",
      link: "/",
      src: "https://cdn-icons-png.flaticon.com/512/2897/2897683.png",
    },
    {
      id: "2",
      name: "Kalkulasi Logistik",
      link: "/kalkulatorlogistik",
      src: "https://cdn-icons-png.flaticon.com/512/2897/2897616.png",
    },
    {
      id: "3",
      name: "DataLogistik",
      link: "/data",
      src: "https://cdn-icons-png.flaticon.com/512/1739/1739716.png",
    },
  ];

  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/masukakun");
      alert("Kamu Telah Keluar dari ASLAN");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <>
      <div
        data-aos="fade-down"
        className=" visible sm:invisible fixed z-30 flex flex-col w-64 h-fit px-4 py-8 bg-gray-800 border-2 border-slate-700 rounded-br-[18px]"
      >
        <h2 className="mb-3 text-center font-sans font-extrabold font text-2xl bg-clip-text bg-gradient-to-br from-blue-700 to-cyan-200 text-transparent">
          MENU
        </h2>

        <div className="flex flex-col justify-between flex-1 ">
          <nav>
            {Navigation.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 py-2 mt-2 rounded-md bg-gray-700 text-gray-200"
                    : "flex items-center px-4 py-2 mt-2  transition-colors duration-200 transform rounded-md text-gray-400 hover:bg-gray-700 hover:text-gray-200 "
                }
                to={item.link}
              >
                <span className="inline-block p-3 rounded-xl  bg-blue-300 ">
                  <img
                    className=" flex-shrink-0 object-cover w-6 h-6"
                    src={item.src}
                  />
                </span>

                <span className="mx-4 font-medium">{item.name}</span>
              </NavLink>
            ))}

            <hr className="my-6 border-gray-200 dark:border-gray-600" />
            <div className="flex flex-col items-center mt-6 -mx-2">
              <img
                className="object-cover w-12 h-12 mx-2 rounded-full"
                src="https://img.icons8.com/external-bearicons-glyph-bearicons/344/external-User-essential-collection-bearicons-glyph-bearicons.png"
                alt="avatar"
              />
              <h4 className="text-xs text- mx-2 mt-2 font-medium text-gray-200 hover:underline">
                {(user && user.email) || user?.displayName}
              </h4>
              <p
                onClick={handleLogout}
                className="mx-2 mt-1 text-sm font-medium text-gray-400 hover:underline"
              >
                Keluar
              </p>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
